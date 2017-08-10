import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import { StackNavigator, NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Menu'})
  ]
})

export default class Home extends Component {

  static navigationOptions = {
    title: "Home"
  };

  componentWillMount() {
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    return (
      <Container>
        <Content />
        <Footer>
          <FooterTab>
            <Button vertical><Icon name="apps" /><Text>Apps</Text></Button>
            <Button vertical><Icon name="camera" /><Text>Camera</Text></Button>
            <Button vertical active><Icon active name="navigate" /><Text>Navigate</Text></Button>
            <Button vertical><Icon name="person" /><Text>Contact</Text></Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
