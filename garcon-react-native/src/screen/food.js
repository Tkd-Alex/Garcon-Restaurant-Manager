import Expo, { Notifications } from 'expo';
import React, { Component } from 'react';
import { View, Platform, RefreshControl } from 'react-native';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

// Food is the main screen.
import registerForPushNotificationsAsync from '../registerNotification';

import Colors from '../constants/Colors';
import ProductListItem from '../components/productListItem';
import { fetchProduct } from '../actions/productActions';
import { editProduct, addProduct, incrementProduct } from '../actions/orderActions'

const mapStateToProps = state => ({
  product: state.food,
  order: state.order,
  user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: () => dispatch(fetchProduct('Food')),
  editProduct: () => dispatch(editProduct()),
  incrementProduct: (product) => dispatch(incrementProduct(product)),
  addProduct: (product) => dispatch(addProduct(product))
})

class Food extends Component {

  static navigationOptions = {
    title: "Food"
  };

  componentWillMount(){
    this.props.fetchProduct()
  }

  // Notifications
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  _registerForPushNotifications() {
    registerForPushNotificationsAsync(this.props.user);
    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener( this._handleNotification );
  }

  _handleNotification = ({ origin, data }) => {
    console.log( `Push notification ${origin} with data: ${JSON.stringify(data)}` );
  };

  state = {
    filterText: '',
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Body>
            <Title style={{color: "white"}}>Cibo</Title>
          </Body>
        </Header>
        <InputGroup borderType="underline" >
          <Icon ios="ios-search" android="md-search" style={{ color: Colors.inactiveTintColor }}/>
          <Input placeholder="Cerca..." onChangeText={(text) => this.setState({filterText: text})}/>
        </InputGroup>
        <Content refreshControl={ <RefreshControl onRefresh={this.props.fetchProduct} refreshing={this.props.product.isLoading} /> }>
          <List>
            {this.props.product.listProduct.filter(product =>
                                                   product.name.toLowerCase().includes(this.state.filterText.toLowerCase()))
                                           .map(product =>
            <ProductListItem key={product._id} product={product} navigation={this.props.navigation}
                            incrementCallback={this.props.order.listProduct.map(order => order.product).indexOf(product) > -1 ? this.props.incrementProduct : this.props.addProduct} />
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Food);
