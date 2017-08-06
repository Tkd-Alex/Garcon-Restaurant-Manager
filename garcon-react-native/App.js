import Expo, { AppLoading } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './src/components/store';

import Login from './src/components/Login/login';
import Registration from './src/components/Registration/registration';

const Navigation = StackNavigator({
  Login: {screen: Login},
  Registration: {screen: Registration}
});

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
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
