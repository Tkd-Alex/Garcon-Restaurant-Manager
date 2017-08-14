import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import ListItemCustom from '../components/ListItemCustom';
import { fetchProduct } from '../actions/productActions'

function mapStateToProps (state) {
  return {
    listProduct: state.product
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchProduct: () => dispatch(fetchProduct('Food'))
  }
}

class Food extends Component {

  static navigationOptions = {
    title: "Food"
  };

  componentWillMount(){
    this.props.fetchProduct()
    console.log(this.props)
  }

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
          <Input placeholder="Cerca..." />
        </InputGroup>
        <Content>
          <List>
            {this.props.listProduct.listProduct.map(product =>
            <ListItemCustom key={product._id} title={product.name}
                            description={product.ingredients.map(o => o.name).join(', ')} />
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Food);
