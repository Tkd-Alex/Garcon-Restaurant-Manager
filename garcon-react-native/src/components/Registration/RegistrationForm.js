import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Picker, Button, Form } from 'native-base';

const Item = Picker.Item;

export default class RegistrationForm extends Component {

  constructor(props) {
      super(props);
      this.state = {
          selectedItem: undefined,
          selected1: 'key0',
          results: {
              items: [],
          },
      };
  }
  onValueChange(value: string) {
      this.setState({
          selected1: value,
      });
  }

  render() {
    return (
      <List>
        <ListItem>
          <InputGroup>
            <Icon name="ios-person" style={{ color: '#c0392b' }} />
            <Input returnKeyType="next" autoCorrect={true} placeholder="Nome completo" />
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Icon name="ios-mail" style={{ color: '#c0392b' }} />
            <Input returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail"  />
          </InputGroup>
        </ListItem>
        <ListItem>
          <InputGroup>
            <Icon name="ios-unlock" style={{ color: '#c0392b' }} />
            <Input returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" />
          </InputGroup>
        </ListItem>
        <ListItem iconLeft>
          <Icon name="ios-transgender" style={{ color: '#c0392b', paddingRight: 10}} />
          <Text>Sesso</Text>
          <Picker
            mode="dropdown"
            style={{width: 100}}
            selectedValue={this.state.selected1}
            onValueChange={this.onValueChange.bind(this)} >
              <Item label="Uomo" value="key0" />
              <Item label="Donna" value="key1" />
          </Picker>
        </ListItem>
      </List>
    );
  }
}
