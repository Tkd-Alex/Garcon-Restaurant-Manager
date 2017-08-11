import React, { Component } from 'react';
import { Container, Content,  Header, Left, Body, Right,
         Button, Icon, Title, List, ListItem, Text } from 'native-base';

export default class Food extends Component {

  static navigationOptions = {
    title: "Food"
  };

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: "#c0392b" }}>
          <Body>
            <Title>Cibo</Title>
          </Body>
        </Header>
        <Content>
          <List>
            <ListItem>
              <Text>Simon Mignolet</Text>
            </ListItem>
            <ListItem>
              <Text>Nathaniel Clyne</Text>
            </ListItem>
            <ListItem>
              <Text>Dejan Lovren</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
