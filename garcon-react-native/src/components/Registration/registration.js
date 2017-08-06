import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text,
         Picker, Button, Form, Item, Grid, Col, Body, Thumbnail, Left, Right } from 'native-base';
import { ImagePicker } from 'expo';

import { registerUser } from '../actions'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  registerUser: state.registerUser
})

class Registration extends Component {

  static navigationOptions = {
    title: "Registrazione"
  };

  state = {
    image: null,
    fullName: "",
    mail: "",
    password: "",
    password_v: "",
    userSex: 'M'
  }

  onValueChange(value: string) {
      this.setState({
          userSex: value,
      });
  }

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Container style={{padding: 15}}>
          <Content>
            <List>
              <ListItem>
                <Left><Button onPress={ this.pickImage } iconLeft transparent danger><Icon name='camera' style={styles.iconForm} /><Text>Scegli foto</Text></Button></Left>
                <Right>{ this.state.image && <Thumbnail round size={80} source={{ uri: this.state.image }} /> }</Right>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="person" style={styles.iconForm} />
                  <Input returnKeyType="next" autoCorrect={true} placeholder="Nome completo" />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="mail" style={styles.iconForm} />
                  <Input returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail"  />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="unlock" style={styles.iconForm} />
                  <Input returnKeyType="next" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" />
                </InputGroup>
              </ListItem>
              <ListItem>
                <InputGroup>
                  <Icon name="unlock" style={styles.iconForm} />
                  <Input returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Conferma password" />
                </InputGroup>
              </ListItem>
              <ListItem iconLeft>
                <Icon name="transgender" style={styles.iconForm} />
                <Text>Sesso</Text>
                <Picker
                  mode="dropdown"
                  style={{width: 100}}
                  selectedValue={this.state.userSex}
                  iosHeader="Sesso"
                  onValueChange={this.onValueChange.bind(this)} >
                    <Item label="Uomo" value="M" />
                    <Item label="Donna" value="F" />
                </Picker>
              </ListItem>
            </List>
          </Content>
          <Button onPress={() => this.props.registerUser( {userObject: {"nome":"Alex", "cognome":"Maggio"}, password: "Eccoti" }) } style={{ marginBottom: 10 }} block><Text>Registrati</Text></Button>
        </Container>
      </KeyboardAvoidingView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  iconForm: {
    color: '#c0392b',
    paddingRight: 5,
    fontSize: 30
  }
});

export default connect(mapStateToProps, { registerUser })(Registration);
