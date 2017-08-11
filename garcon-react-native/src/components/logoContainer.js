import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Container } from 'native-base';
import Colors from '../constants/Colors';

export default class LogoContainter extends Component {
  render() {
    return (
      <Container style={styles.logoContainter}>
        <Image style={{ width: 120, height: 120 }} source={ require('../../assets/images/iconWaiter.png') } />
        <Text style={styles.titleStyle}> Welcome to Garcon! Restaurant-Manager</Text>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  logoContainter:{
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleStyle: {
    color: Colors.tintColor,
    fontSize: 20,
    paddingTop: 10,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200
  }
});
