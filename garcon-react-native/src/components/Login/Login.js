import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainter}>
          <Image
            style={styles.logo}
            source={require('../../../assets/images/iconWaiter.png')}
          />
          <Text style={styles.title}>
            Welcome to Garson! Restaurant-Manager
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bdc3c7',
  },
  logoContainter:{
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 100,
    height: 100
  },
  title: {
    color: '#c0392b',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
