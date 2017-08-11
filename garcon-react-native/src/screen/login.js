import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity ,KeyboardAvoidingView, Keyboard } from 'react-native';
import { Container, Button, Text, Form, Item, Input, Label, Content, Toast } from 'native-base';

import { loginUser } from '../actions/authActions'
import { connect } from 'react-redux';

import LogoContainter from '../components/logoContainer'

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
      <Container onPress={Keyboard.dismiss} style={styles.container}>
        {/* <LogoContainter/> */}
        <Container style={{ paddingTop: 20 }}>
          <Content padder>
            <Form>
              <Item><Input onChangeText={(mail) => this.setState({mail})}
                           returnKeyType="next" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} placeholder="E-Mail" /></Item>
              <Item><Input onChangeText={(password) => this.setState({password})}
                           returnKeyType="go" secureTextEntry autoCapitalize="none" autoCorrect={false} placeholder="Password" /></Item>
            </Form>
            <Button onPress={() => {if(this.state.mail == "" || this.state.password == "")
                                      Toast.show({ text: 'Assicurati di aver inserito tutti i dati!', position: 'bottom', buttonText: 'Ok', duration: 2500 })
                                    else
                                      this.props.loginUser(this.state, this.props.navigation)
                                    }
                                  }
                    style={{ marginTop: 10 }} block danger><Text>Accedi</Text></Button>
            <Button onPress={() => this.props.navigation.navigate("Registration", {})}
                    style={{ marginTop: 10 }} block><Text>Registrati</Text></Button>
          </Content>
        </Container>
      </Container>
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
