import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, RefreshControl } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3,
         Button, Icon, Title, List, ListItem, Text, Picker, Item } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { updateUser } from '../actions/authActions';

const mapStateToProps = state => ({
  user: state.auth.user,
  token: state.auth.token
})

const mapDispatchToProps = dispatch => ({
  updateUser: (user, idRestaurant) => dispatch(updateUser(user, idRestaurant))
})

class Settings extends Component {

  static navigationOptions = {
    title: "Settings"
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
          <View style={{padding: 10}}>
            <H3>Ristorante predefinito:</H3>
            <Picker
              mode="dropdown"
              style={{width: 300}}
              placeholder={this.props.user.preferences.defaultRestaurant.name}
              onValueChange={(id) => this.props.updateUser(this.props.token, id) }
              iosHeader="Ristorante">
                { this.props.user.restaurants.map(restaurant =>
                  <Item label={restaurant.name} key={restaurant._id} value={restaurant._id} />
                )}
            </Picker>
          </View>
        </Content>
      </Container>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
