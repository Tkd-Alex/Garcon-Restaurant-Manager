import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, RefreshControl } from 'react-native';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import ListItemCustom from '../components/listItemCustom';
import { fetchProduct } from '../actions/productActions';
import { editProduct, addProduct, incrementProduct } from '../actions/orderActions';

const mapStateToProps = state => ({
  product: state.drink,
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: () => dispatch(fetchProduct('Drink')),
  incrementProduct: (product) => dispatch(incrementProduct(product)),
  addProduct: (product) => dispatch(addProduct(product))
})

class Drink extends Component {

  static navigationOptions = {
    title: "Drink"
  };

  componentWillMount(){
    this.props.fetchProduct()
  }

  state = {
    filterText: '',
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Body>
            <Title style={{color: "white"}}>Bevande</Title>
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
            <ListItemCustom key={product._id} product={product} navigation={this.props.navigation}
                            incrementCallback={this.props.order.listOrder.map(order => order.product).indexOf(product) > -1 ? this.props.incrementProduct : this.props.addProduct} />
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Drink);
