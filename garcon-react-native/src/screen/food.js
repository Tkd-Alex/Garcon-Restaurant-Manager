import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, RefreshControl } from 'react-native';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import ListItemCustom from '../components/listItemCustom';
import { fetchProduct } from '../actions/productActions'


const mapStateToProps = state => ({
  product: state.product
})

const mapDispatchToProps = dispatch => ({
  fetchProduct: () => dispatch(fetchProduct('Food'))
})

class Food extends Component {

  static navigationOptions = {
    title: "Food"
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
            <ListItemCustom key={product._id} title={product.name} navigation={this.props.navigation}
                            description={product.ingredients.map(o => o.name).join(', ')} />
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Food);
