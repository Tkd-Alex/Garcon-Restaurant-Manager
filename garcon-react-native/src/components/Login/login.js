import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity ,KeyboardAvoidingView } from 'react-native';
import { Container, Button, Text, Form, Item, Input, Label, Content, Toast } from 'native-base';

import { loginUser } from '../actions'
import { connect } from 'react-redux';

import LogoContainter from '../logoContainer'

const mapStateToProps = state => ({
  loginUser: state.loginUser
})

class Login extends Component {

  static navigationOptions = {
    title: "Accesso"
  }

  state = {
    mail: "",
    password: "",
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <LogoContainter/>
        <Container style={{ padding: 15 }}>
          <Content>
            <Form>
              <Item><Input onChangeText={(mail) => this.setState({mail})}
                           returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail" /></Item>
              <Item><Input onChangeText={(password) => this.setState({password})}
                           returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" /></Item>
            </Form>
            <Button onPress={() => {if(this.state.mail == "" || this.state.password == "")
                                      Toast.show({ text: 'Assicurati di aver inserito tutti i dati!', position: 'bottom', buttonText: 'Ok', duration: 2500 })
                                    else
                                      this.props.loginUser(this.state)
                                    }
                                  }
                    style={{ marginBottom: 10 }} block danger><Text>Accedi</Text></Button>
            <Button onPress={() => this.props.navigation.navigate("Registration", {})}
                    style={{ marginBottom: 10 }} block><Text>Registrati</Text></Button>
          </Content>
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
});


export default connect(mapStateToProps, { loginUser })(Login);
