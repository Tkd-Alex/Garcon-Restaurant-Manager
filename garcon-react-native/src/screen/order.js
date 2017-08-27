import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet, ListView } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3,
         Button, Icon, Title, List, ListItem, Text, Card, CardItem } from 'native-base';

import Colors from '../constants/Colors';
import OrderCardItem from '../components/orderCardItem'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class Order extends Component {

  static navigationOptions = {
    title: "Order"
  };

  constructor(props) {
    super(props);
    this.state = {  order: this.props.navigation.state.params.order,
                    dataSource: ds.cloneWithRows(this.props.navigation.state.params.order.listProduct) };
  }

  renderRow(product, section, index) {
    return (
      <OrderCardItem product={product} key={product._id} />
    )
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Left>
           <Button onPress={() => this.props.navigation.goBack()} transparent>
             <Icon style={{color: "white"}} name='arrow-back' />
           </Button>
          </Left>
          <Body>
            <Title style={{color: "white"}}>Comanda</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <ListView enableEmptySections key={this.state.order.listProduct} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
        </Content>
      </Container>
    );
  }
}
