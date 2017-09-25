import Expo, { Notifications } from 'expo';
import React, { Component } from 'react';
import { View, Platform, RefreshControl } from 'react-native';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

// Food is the main screen.
import registerForPushNotificationsAsync from '../registerNotification';

import Colors from '../constants/Colors';
import ProductListItem from '../components/ProductListItem';
import { fetchProduct } from '../actions/productActions';
import { editProduct, addProduct, incrementProduct, fetchOrder } from '../actions/orderActions'

const mapStateToProps = state => ({
  product: state.food,
  order: state.order,
  user: state.auth.user,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: (restaurant, token) => dispatch(fetchProduct('Food', restaurant, token)),
  editProduct: () => dispatch(editProduct()),
  incrementProduct: (product) => dispatch(incrementProduct(product)),
  addProduct: (product) => dispatch(addProduct(product)),
  fetchOrder: (restaurant, token) => dispatch(fetchOrder(restaurant, token))
})

class Food extends Component {

  static navigationOptions = {
    title: "Food"
  };

  _fetchProduct = () => {
    if(this.props.user.preferences && this.props.user.preferences.defaultRestaurant)
      this.props.fetchProduct(this.props.user.preferences.defaultRestaurant, this.props.token)
  }

  // Notifications
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
    this.props.navigation.addListener('focus', this._fetchProduct);
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  _registerForPushNotifications() {
    registerForPushNotificationsAsync(this.props.user, this.props.token);
    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener( this._handleNotification );
  }

  _handleNotification = ({ origin, data }) => {
    if(origin == 'selected' && data.type == 'order') this.props.navigation.navigate("order", {order: data.order})
    else if(origin == 'received' && data.type == 'order'){
      //this.props.navigation.navigate("OrdersTab");
      if(this.props.user.preferences && this.props.user.preferences.defaultRestaurant)
        this.props.fetchOrder(this.props.user.preferences.defaultRestaurant, this.props.token)
    }
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
        <Content refreshControl={ <RefreshControl onRefresh={this._fetchProduct.bind(this)} refreshing={this.props.product.isLoading} /> }>
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
