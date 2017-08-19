import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet, RefreshControl } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H2, Tab, Tabs, TabHeading,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { fetchIngredient } from '../actions/ingredientActions';

const mapStateToProps = state => ({
  ingredient: state.ingredient
})

const mapDispatchToProps = dispatch => ({
  fetchIngredient: () => dispatch(fetchIngredient()),
})

class EditProduct extends Component {

  static navigationOptions = {
    title: "Modifica"
  };

  componentWillMount(){
    this.props.fetchIngredient()
  }

  state = {
    filterText_present: '',
  };

  render() {
    return (
      <Container>
        <Header hasTabs androidStatusBarColor={Colors.tintColorDark} style={{ backgroundColor: Colors.tintColor }}>
          <Left>
           <Button onPress={() => this.props.navigation.goBack()} transparent>
             <Icon style={{color: "white"}} name='arrow-back' />
           </Button>
         </Left>
          <Body>
            <Title style={{color: "white"}}>Modifica</Title>
          </Body>
          <Right></Right>
        </Header>
        <Tabs>
          <Tab heading={ <TabHeading style={{backgroundColor: Platform.OS === 'ios' ? 'ghostwhite' : Colors.tintColor}}>
                          <Icon style={{color: Platform.OS === 'ios' ? Colors.tintColorDark: 'white'}} ios='ios-remove' android='md-remove'/>
                          <Text style={{color: Platform.OS === 'ios' ? Colors.tintColorDark: 'white'}} >Rimuovi</Text>
                        </TabHeading>}>
              <Container>
                <InputGroup borderType="underline" >
                  <Icon ios="ios-search" android="md-search" style={{ color: Colors.inactiveTintColor }}/>
                  <Input placeholder="Cerca..." onChangeText={(text) => this.setState({filterText_remove: text})}/>
                </InputGroup>
                <Content>
                  <List>
                    {this.props.navigation.state.params.product.ingredients.map(ingredient =>
                    <ListItem key={ingredient._id}>
                      <Body>
                        <Text>{ingredient.name}</Text>
                      </Body>
                      <Right>
                        <Button style={styles.smallestButton} small danger><Icon ios='ios-remove' android='md-remove' /></Button>
                       </Right>
                    </ListItem>
                    )}
                  </List>
                </Content>
              </Container>
          </Tab>
          <Tab heading={ <TabHeading style={{backgroundColor: Platform.OS === 'ios' ? 'ghostwhite' : Colors.tintColor}}>
                          <Icon style={{color: Platform.OS === 'ios' ? Colors.tintColorDark: 'white'}} ios='ios-add' android='md-add'/>
                          <Text style={{color: Platform.OS === 'ios' ? Colors.tintColorDark: 'white'}} >Aggiungi</Text>
                        </TabHeading>}>
            <Container>
              <InputGroup borderType="underline" >
                <Icon ios="ios-search" android="md-search" style={{ color: Colors.inactiveTintColor }}/>
                <Input placeholder="Cerca..." onChangeText={(text) => this.setState({filterText_add: text})}/>
              </InputGroup>
              <Content refreshControl={ <RefreshControl onRefresh={this.props.fetchIngredient} refreshing={this.props.ingredient.isLoading} /> } >
                <List>
                  {this.props.ingredient.listIngredient.map(ingredient =>
                  <ListItem key={ingredient._id}>
                    <Body>
                      <Text>{ingredient.name}</Text>
                    </Body>
                    <Right>
                      <Button style={styles.smallestButton} small success><Icon ios='ios-add' android='md-add' /></Button>
                     </Right>
                  </ListItem>
                  )}
                </List>
              </Content>
            </Container>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  smallestButton: {
    paddingLeft: 5,
    paddingRight: 5,
    marginLeft: 5
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
