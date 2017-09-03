import Expo, { AppLoading } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { Root, Icon, FooterTab } from "native-base";
import { StackNavigator, TabNavigator, TabBarBottom } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import store from './src/store';

import Login from './src/screen/login';
import Registration from './src/screen/registration';

//Tab
import Food from './src/screen/food';
import Drink from './src/screen/drink';
import OrderTab from './src/screen/orderTab';
import OrdersTab from './src/screen/ordersTab';
import Settings from './src/screen/settings';

import EditProduct from  './src/screen/editProduct';
import Order from './src/screen/order';

import Colors from './src/constants/Colors';

const authNavigation = StackNavigator({
  Login: {screen: Login},
  Registration: {screen: Registration}
}, {headerMode: 'screen'});

const tabNavigation = TabNavigator({
  Food: {
    screen: Food,
    navigationOptions: {
      tabBarLabel:"Pietanze",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-pizza${focused ? '' : '-outline'}` : 'md-pizza'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  },
  Drink: {
    screen: Drink,
    navigationOptions: {
      tabBarLabel:"Bevande",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-beer${focused ? '' : '-outline'}` : 'md-beer'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  },
  OrderTab: {
    screen: OrderTab,
    navigationOptions: {
      tabBarLabel:"Comanda",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-document${focused ? '' : '-outline'}` : 'md-document'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  },
  OrdersTab: {
    screen: OrdersTab,
    navigationOptions: {
      tabBarLabel:"Riepilogo ordini",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-list${focused ? '' : '-outline'}` : 'md-list'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarLabel:"Impostazioni",
      tabBarIcon: ({ tintColor, focused }) => <Ionicons name={Platform.OS === 'ios' ? `ios-settings${focused ? '' : '-outline'}` : 'md-settings'}
                                                        size={30} color={focused ? Colors.tintColor : tintColor} />
    }
  },
  }, {
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.inactiveTintColor,
    },
    animationEnabled: true,
    swipeEnabled: true,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    headerMode: 'screen'
});

export const createRootNavigator = (signedIn = false) => {
  return StackNavigator(
    {
      authNavigation: {screen: authNavigation},
      tabNavigation: {screen: tabNavigation},
      editProduct: {screen: EditProduct},
      order: {screen: Order}
    }, {
      headerMode: 'none',
      initialRouteName: signedIn ? "tabNavigation" : "authNavigation"
    });
};

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem('garcon-token').then(res => {
      if (res !== null) resolve(true);
      else resolve(false);
    })
    .catch(err => reject(err));
  });
};

export default class App extends Component  {

  state = {
    isReady: false,
    signedIn: true,
  };

  componentWillMount() {
    this._cacheResourcesAsync();
    /*
    isSignedIn().then(res => this.setState({ signedIn: res, checkedSignIn: true }))
                   .catch(err => alert("An error occurred"));
    */
  }

  async _cacheResourcesAsync() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({isReady: true});
  }

  render() {

    if (!this.state.isReady) return <AppLoading />;
    else{
      const Navigation = createRootNavigator(this.state.signedIn);
      return (
        <Provider store={store}>
          <Root>
            <Navigation />
          </Root>
        </Provider>
      );
    }
  }
}

Expo.registerRootComponent(App);
