import Expo, { AppLoading } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from "native-base";
import { StackNavigator } from 'react-navigation';

import { Provider } from 'react-redux';
import store from './src/store';

import Login from './src/screen/login';
import Registration from './src/screen/registration';
import Home from './src/screen/home';
import Menu from './src/screen/menu';

const Navigation = StackNavigator({
  Login: {screen: Login},
  Registration: {screen: Registration},
  Home: {screen: Home},
  Menu: {screen: Menu}
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
        <Root>
          <Navigation />
        </Root>
      </Provider>
    );
  }
}

Expo.registerRootComponent(App);
