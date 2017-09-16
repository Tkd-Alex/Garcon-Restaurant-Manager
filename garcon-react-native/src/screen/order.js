import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet, ListView, Alert } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3, Toast,
         Button, Icon, Title, List, ListItem, Text, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import OrderCardItem from '../components/orderCardItem'

import { updateOrder, editOrder } from '../actions/orderActions'

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  updateOrder: (order, restaurant, token, navigation) => dispatch(updateOrder(order, restaurant, token, navigation)),
  editOrder: (order, restaurant, token, navigation) => dispatch(editOrder(order, restaurant, token, navigation))
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
          <Right>
            <Button onPress={() => {
              if(!this.state.order.paid)
              Alert.alert(
                'Modificare?',
                'Sei sicuro di volere modificare l\'ordine?',
                [
                  {text: 'NO', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                  {text: 'SI', onPress: () => this.props.editOrder(this.state.order, this.props.user.preferences.defaultRestaurant, this.props.token, this.props.navigation)},
                ],
                { cancelable: false }
              );
              else Toast.show({ text: "L'ordine è già stato pagato!", position: 'bottom', duration: 3000, type: 'danger' })
              }} transparent >
              <Icon style={{color: "white"}} android='md-list-box' ios="ios-list-box"/>
            </Button>
          </Right>
        </Header>
        <Content>
          <ListView enableEmptySections key={this.state.order.listProduct} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
          <Button onPress={() => { this.state.order.complete ? Toast.show({ text: "L'ordine è già stato contrassegnato!", position: 'bottom', duration: 3000, type: 'danger' }) : this.props.updateOrder(this.state.order, this.props.user.preferences.defaultRestaurant, this.props.token, this.props.navigation) }}
                  iconLeft block success
                  style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} ><Icon name='checkmark' /><Text>Ordine pronto!</Text></Button>
          <Button onPress={() => { if(!this.state.order.complete) Toast.show({ text: "Devi prima confermare l'ordine!", position: 'bottom', duration: 3000, type: 'danger' })
                                   else if(this.state.order.paid) Toast.show({ text: "L'ordine è già stato pagato!", position: 'bottom', duration: 3000, type: 'danger' })
                                   else this.props.updateOrder(this.state.order, this.props.user.preferences.defaultRestaurant, this.props.token, this.props.navigation) }}
                  iconLeft block warning
                  style={{ marginTop: 10, marginLeft: 10, marginRight: 10 }} ><Icon name='logo-usd' /><Text>Conferma pagamento</Text></Button>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
