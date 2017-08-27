import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3,
         Button, Icon, Title, List, ListItem, Text, Card, CardItem } from 'native-base';
import { connect } from 'react-redux';
import Prompt from 'react-native-prompt';

import Colors from '../constants/Colors';
import { editProduct, removeProduct, incrementProduct, decrementProduct,
         newOrder } from '../actions/orderActions'

const mapStateToProps = state => ({
  order: state.order,
  auth: state.auth
})

const mapDispatchToProps = dispatch => ({
  incrementProduct: (product) => dispatch(incrementProduct(product)),
  decrementProduct: (product) => dispatch(decrementProduct(product)),
  removeProduct: (product) => dispatch(removeProduct(product)),
  newOrder: (order) => dispatch(newOrder(order))
})

class OrderTab extends Component {

  static navigationOptions = {
    title: "OrderTab"
  };

  state = {
    promptVisible: false
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Left></Left>
          <Body>
            <Title style={{color: "white"}}>Comanda</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => {if(this.props.order.listProduct.length < 1) alert("Impossibile proseguire")
                                                else this.setState({ promptVisible: true })}}>
              <Icon style={{color: "white"}} name='basket' />
            </Button>
          </Right>
        </Header>
        <Content>
          {this.props.order.listProduct.map((order, index) =>
         <Card key={index} style={{flex: 0}}>
             <CardItem>
             <Left>
                 <H3>
                   {order.product.name}
                 </H3>
             </Left>
           </CardItem>
           { order.product.ingredients.length > 0 &&
           <CardItem>
             <Body>
               <Text>
                 {order.product.ingredients.map(o => o.name).join(', ')}
               </Text>
             </Body>
           </CardItem>
          }
           <CardItem>
             <Left>
               <Icon name="logo-euro" />
               <Text>{order.totalPrice.toFixed(2)}</Text>
             </Left>
             <Left>
               <Icon android="md-cube" ios="ios-cube"/>
               <Text>{order.quantity}</Text>
             </Left>
             <Right>
               <View style={styles.buttonContainer}>
               <Button style={styles.smallestButton} small success
                       onPress={() => this.props.incrementProduct(order.product)} ><Icon ios='ios-add' android='md-add' /></Button>
               <Button style={styles.smallestButton} small danger
                       onPress={() => order.quantity-1 > 0 ? this.props.decrementProduct(order.product) : this.props.removeProduct(order.product)} ><Icon ios='ios-remove' android='md-remove' /></Button>
               { order.product.category == 'Food' &&
               <Button style={styles.smallestButton} small warning
                       onPress={() => this.props.navigation.navigate("editProduct", {product: order.product, index: index})} ><Icon ios='ios-restaurant' android='md-restaurant' /></Button>
               }
               </View>
             </Right>
           </CardItem>
          </Card> )}

          <Prompt
            title="Inserisci il numero del tavolo"
            placeholder=""
            defaultValue="0"
            visible={this.state.promptVisible}
            onCancel={() => this.setState({ promptVisible: false })}
            onSubmit={  (value) => this.setState({ promptVisible: false },
                                           () => {  var order = { tableNumber: value,
                                                                  listProduct: this.props.order.listProduct,
                                                                  totalPrice: this.props.order.listProduct.reduce( (a, b) =>  ({ totalPrice: a.totalPrice + b.totalPrice}) ).totalPrice,
                                                                  waiter: this.props.auth.user == null ? 'DEBUG_XXX' : this.props.auth.user._id
                                                                }
                                                    this.props.newOrder(order);
                                                  })
                     }/>

        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  smallestButton: {
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderTab);
