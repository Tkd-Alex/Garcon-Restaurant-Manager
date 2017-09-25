import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet, RefreshControl } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3,
         Button, Icon, Title, List, ListItem, Text, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';

import { fetchOrder } from '../actions/orderActions'
import Colors from '../constants/Colors';

import Moment from 'react-moment';

const mapStateToProps = state => ({
  order: state.order,
  user: state.auth.user,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  fetchOrder: (restaurant, token) => dispatch(fetchOrder(restaurant, token))
})

class OrdersTab extends Component {

  static navigationOptions = {
    title: "OrdersTab"
  };

  _fetchOrder = () =>{
    if(this.props.user.preferences && this.props.user.preferences.defaultRestaurant)
      this.props.fetchOrder(this.props.user.preferences.defaultRestaurant, this.props.token)
  }

  componentDidMount(){
    this.props.navigation.addListener('focus', this._fetchOrder);
  }

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Body>
            <Title style={{color: "white"}}>Riepilogo ordini</Title>
          </Body>
        </Header>
        <Content refreshControl={ <RefreshControl onRefresh={this._fetchOrder.bind(this)} refreshing={this.props.order.isLoading} /> }>
          <List>
            {this.props.order.listOrders.map(order =>
              <Card key={order._id} style={{flex: 0}}>
                <CardItem button onPress={() => this.props.navigation.navigate("order", {order: order})}>
                  <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                      <H3>
                        Tavolo: {order.tableNumber}
                      </H3>
                      <Moment format="DD/MM/YYYY HH:mm:ss" note element={Text}>{order.date}</Moment>
                  </View>
                </CardItem>
                <CardItem style={{paddingTop: 0}}>
                  <Left style={{justifyContent: 'center'}}>
                    <Icon name={order.complete ? 'checkmark': 'close' } style={{fontSize: 40, color: order.complete ? 'green' : 'red' }} />
                    <Text>Pronto</Text>
                  </Left>
                  <Left style={{justifyContent: 'center'}}>
                    <Icon name={order.paid ? 'checkmark': 'close' } style={{fontSize: 40, color: order.paid ? 'green' : 'red' }} />
                    <Text>Pagato</Text>
                  </Left>
                  <Left style={{justifyContent: 'center'}}>
                    <Icon name="logo-euro" style={{fontSize: 20}} />
                    <Text>{order.totalPrice.toFixed(2)}</Text>
                  </Left>
                </CardItem>
              </Card>
            )}
          </List>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTab);
