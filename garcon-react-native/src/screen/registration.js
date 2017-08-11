import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Image, Keyboard } from 'react-native';
import { Container, Content, List, ListItem, InputGroup, Input, Icon, Text, Toast,
         Picker, Button, Form, Item, Grid, Col, Body, Thumbnail, Left, Right } from 'native-base';
import { ImagePicker } from 'expo';

import { registerUser } from '../actions/authActions'
import { connect } from 'react-redux';
import Colors from '../constants/Colors';

const mapStateToProps = state => ({
  registerUser: state.registerUser
})

class Registration extends Component {

  static navigationOptions = {
    title: "Registrazione"
  };

  state = {
    image: null,
    fullname: "",
    mail: "",
    password: "",
    password_v: "",
    age: 18,
    userSex: 'M'
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
      <Container onPress={Keyboard.dismiss} style={styles.container}>
        <Content>
          <List>
            {/*
            <ListItem>
              <Left><Button onPress={ this.pickImage } iconLeft transparent danger><Icon ios='ios-camera' android="md-camera" style={styles.iconForm} /><Text>Scegli foto</Text></Button></Left>
              <Right>{ this.state.image && <Thumbnail round size={80} source={{ uri: this.state.image }} /> }</Right>
            </ListItem>
            */}
            <ListItem>
              <InputGroup>
                <Icon ios='ios-person' android="md-person" style={styles.iconForm} />
                <Input onChangeText={(fullname) => this.setState({fullname})}
                       returnKeyType="next" autoCorrect={true} placeholder="Nome completo" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon ios='ios-mail' android="md-mail" style={styles.iconForm} />
                <Input onChangeText={(mail) => this.setState({mail})}
                       returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail"  />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon ios='ios-lock' android="md-lock" style={styles.iconForm} />
                <Input onChangeText={(password) => this.setState({password})}
                       returnKeyType="next" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon ios='ios-lock' android="md-lock" style={styles.iconForm} />
                <Input  onChangeText={(password_v) => this.setState({password_v})}
                        returnKeyType="next" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Conferma password" />
              </InputGroup>
            </ListItem>
            <ListItem>
              <InputGroup>
                <Icon ios='ios-calendar' android="md-calendar" style={styles.iconForm} />
                <Input  onChangeText={(age) => this.setState({age})}
                        returnKeyType="go" keyboardType="number-pad" placeholder="Anni" />
              </InputGroup>
            </ListItem>
            <ListItem iconLeft>
              <Icon ios='ios-transgender' android="md-transgender" style={styles.iconForm} />
              <Text>Sesso</Text>
              <Picker
                mode="dropdown"
                style={{width: 100}}
                selectedValue={this.state.userSex}
                iosHeader="Sesso"
                onValueChange={(userSex) => this.setState({userSex})} >
                  <Item label="Uomo" value="M" />
                  <Item label="Donna" value="F" />
              </Picker>
            </ListItem>
          </List>
        </Content>
        <Button onPress={() => {  if(this.state.fullname == "" || this.state.mail == "" || this.state.password == "" || this.state.password_v == "" || this.state.age == "")
                                    Toast.show({ text: 'Assicurati di aver inserito tutti i dati!', position: 'bottom', buttonText: 'Ok', duration: 2500 })
                                  else if(this.state.password != this.state.password_v)
                                    Toast.show({ text: 'Le password inserite non coincidono!', position: 'bottom', buttonText: 'Ok', duration: 2500 })
                                  else if(this.state.age > 99 || this.state.age < 18)
                                    Toast.show({ text: 'L\'età deve essere compresa tra i 18 e i 99 anni!', position: 'bottom', buttonText: 'Ok', duration: 2500 })
                                  else
                                    this.props.registerUser(this.state, this.props.navigation)
                                }
                          }
                style={{ marginBottom: 10, marginTop: 10 }} block><Text>Registrati</Text></Button>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 15
  },
  iconForm: {
    color: Colors.tintColor,
    padding: 5,
    fontSize: 30
  }
});

export default connect(mapStateToProps, { registerUser })(Registration);
