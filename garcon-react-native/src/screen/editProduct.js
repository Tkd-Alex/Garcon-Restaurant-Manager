import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet, RefreshControl, ListView } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H2, Tab, Tabs, TabHeading,
         Button, Icon, Title, List, ListItem, Text, InputGroup, Input } from 'native-base';
import { connect } from 'react-redux';

import Colors from '../constants/Colors';
import { fetchIngredient } from '../actions/ingredientActions';
import { addProduct, editProduct } from '../actions/orderActions'

const mapStateToProps = state => ({
  ingredient: state.ingredient,
  order: state.order
})

const mapDispatchToProps = dispatch => ({
  fetchIngredient: () => dispatch(fetchIngredient()),
  addProduct: (product, navigation) => dispatch(addProduct(product, navigation)),
  editProduct: (product, index, navigation) => dispatch(editProduct(product, index, navigation)),
})

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class EditProduct extends Component {

  static navigationOptions = {
    title: "Modifica"
  };

  componentWillMount(){
    this.props.fetchIngredient();
  }

  constructor(props) {
    super(props);
    this.state = { filterText: '',
                   product:  this.copyElement(this.props.navigation.state.params.product),
                   dataSource: ds.cloneWithRows(this.props.navigation.state.params.product.ingredients) };
  }

  copyElement(item){
    return JSON.parse(JSON.stringify(item))
  }

  customIndexOf(item, array){
    for(var i in array)
      if(JSON.stringify(item) == JSON.stringify(array[i]))
        return i;
    return -1;
  }

  deleteRow(ingredient) {
    var product = this.copyElement(this.state.product)
    product.ingredients.splice(this.customIndexOf(ingredient, product.ingredients), 1);
    this.setState({ product: product,
                    dataSource: this.state.dataSource.cloneWithRows(product.ingredients)
                  })
  }

  renderRow(ingredient, section, index) {
    return (
      <ListItem key={ingredient._id}>
        <Body>
          <Text>{ingredient.name}</Text>
        </Body>
        <Right>
          <Button onPress={this.deleteRow.bind(this, ingredient)}
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
            <Button transparent onPress={() => {  if(this.props.navigation.state.params.index > -1)
                                                    this.props.editProduct(this.state.product, this.props.navigation.state.params.index, this.props.navigation)
                                                  else
                                                    this.props.addProduct(this.state.product, this.props.navigation)
                                                }
                                        } >
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
                <Content>
                  <ListView enableEmptySections key={this.state.product.ingredients} dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} />
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
                <Input placeholder="Cerca..." onChangeText={(text) => this.setState({filterText: text})}/>
              </InputGroup>
              <Content refreshControl={ <RefreshControl onRefresh={this.props.fetchIngredient} refreshing={this.props.ingredient.isLoading} /> } >
                <List>
                  {this.props.ingredient.listIngredient.filter(ingredient =>
                                                        ingredient.name.toLowerCase().includes(this.state.filterText.toLowerCase()))
                                                       .map(ingredient =>
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
