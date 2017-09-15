import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, RefreshControl, StyleSheet } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3, Switch, InputGroup,
         Button, Icon, Title, List, ListItem, Text, Picker, Item, Input } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { changeDefaultRestaurant, changeNotificationNewOrder, addWaiter } from '../actions/authActions';

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  changeDefaultRestaurant: (token, idRestaurant) => dispatch(changeDefaultRestaurant(token, idRestaurant)),
  changeNotificationNewOrder: (token, bool) => dispatch(changeNotificationNewOrder(token, bool)),
  addWaiter: (token, restaurant, mail) => dispatch(addWaiter(token, restaurant, mail))
})

class Settings extends Component {

  static navigationOptions = {
    title: "Settings"
  };

  state = {
    newWaiter: ""
  };

  render() {
    return (
      <Container>
        <Header androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Body>
            <Title style={{color: "white"}}>Impostazioni</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem iconLeft>
              <Icon style={styles.iconForm} ios='ios-notifications' android="md-notifications" />
              <Text>Notifiche nuovo ordine</Text>
              <Right><Switch onValueChange={(bool) => this.props.changeNotificationNewOrder(this.props.token, bool) }
                             value={this.props.user.preferences.newOrderNotification} /></Right>
            </ListItem>
            { this.props.user.preferences && this.props.user.restaurants && this.props.user.preferences.defaultRestaurant?
              <ListItem iconLeft>
                <Icon style={styles.iconForm} ios='ios-home' android="md-home" />
                <Text>Ristorante predefinito</Text>
                <Right><Picker
                  mode="dropdown"
                  style={{width: 250}}
                  placeholder={this.props.user.preferences.defaultRestaurant.name}
                  onValueChange={(id) => this.props.changeDefaultRestaurant(this.props.token, id) }
                  iosHeader="Ristorante">
                    { this.props.user.restaurants.map(restaurant =>
                      <Item label={restaurant.name} key={restaurant._id} value={restaurant._id} />
                    )}
                </Picker></Right>
              </ListItem>
              : null
            }
            { this.props.user.admin && this.props.user._id.toString() == this.props.user.preferences.defaultRestaurant.owner.toString() ?
              <ListItem iconLeft>
                <Icon ios='ios-person-add' android="md-person-add" style={styles.iconForm} />
                <Input returnKeyType="next" autoCorrect={true} placeholder="Mail nuovo cameriere"
                       onChangeText={(newWaiter) => this.setState({newWaiter})} value={this.state.newWaiter} />
                <Right>
                  <Button small success onPress={() => this.props.addWaiter(this.props.token, this.props.user.preferences.defaultRestaurant, this.state.newWaiter)}>
                    <Icon ios='ios-add' android='md-add' />
                  </Button>
                </Right>
              </ListItem>
              : null
            }
          </List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  iconForm: {
    color: Colors.tintColor,
    padding: 5,
    fontSize: 30
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
