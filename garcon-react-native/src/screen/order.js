import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet, ListView } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3,
         Button, Icon, Title, List, ListItem, Text, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import OrderCardItem from '../components/orderCardItem'

import { updateOrder } from '../actions/orderActions'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  updateOrder: (order) => dispatch(updateOrder(order)),
})

class Order extends Component {

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
            <Title style={{color: "white"}}>Comanda: { this.state.order.tableNumber }</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <ListView enableEmptySections key={this.state.order.listProduct} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
          <Button onPress={() => { this.props.updateOrder(this.state.order) }} style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} iconLeft block success><Icon name='checkmark' /><Text>Ordine pronto!</Text></Button>
          <Button style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} iconLeft block warning><Icon name='logo-usd' /><Text>Conferma pagamento</Text></Button>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
