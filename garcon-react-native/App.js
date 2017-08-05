import Expo from 'expo';
import { AppLoading } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Login from './src/components/Login/Login';

export default class App extends Component  {

  state = {
    isReady: false,
  };

  componentWillMount() {
    this._cacheResourcesAsync();
  }

  async _cacheResourcesAsync() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }
    return (
      <Login />
    );
  }
}

Expo.registerRootComponent(App);
