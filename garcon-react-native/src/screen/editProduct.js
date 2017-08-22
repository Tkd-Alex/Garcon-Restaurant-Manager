import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet, RefreshControl, ListView } from 'react-native';
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
    this.props.fetchIngredient();
  }

  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = { filterText_present: '',
                   filterText_remove: '',
                   product: this.props.navigation.state.params.product,
                   dataSource: ds.cloneWithRows(this.props.navigation.state.params.product.ingredients) };
  }

  _deleteRow(section, index, ingredient) {
    var product = this.state.product
    product.ingredients.splice(product.ingredients.indexOf(ingredient), 1);
    alert(JSON.stringify(product)); //The splice is correct.
    this.setState({ product: product,
                    dataSource: this.state.dataSource.cloneWithRows(product.ingredients)
                  })
  }

  renderRow(ingredient, section, index) {
    return (
      <ListItem key={ingredient.index}>
        <Body>
          <Text>{ingredient.name}</Text>
        </Body>
        <Right>
          <Button onPress={this._deleteRow.bind(this, section, index, ingredient)}
                  style={styles.smallestButton} small danger><Icon ios='ios-remove' android='md-remove' /></Button>
         </Right>
      </ListItem>
    )
  }

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
          <Right>
            <Button transparent>
              <Icon style={{color: "white"}} name='cart' />
            </Button>
          </Right>
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
                  <ListView dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
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
                      <Button onPress={ () => { var product = this.state.product;
                                                product.ingredients = product.ingredients.concat(ingredient);
                                                this.setState({ product: product,
                                                                dataSource: this.state.dataSource.cloneWithRows(product.ingredients)
                                                              })
                                      }}
                              style={styles.smallestButton} small success><Icon ios='ios-add' android='md-add' /></Button>
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
