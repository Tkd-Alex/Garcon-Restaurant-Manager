import Expo from 'expo';
import React, { Component } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { Container, Content,  Header, Left, Body, Right, H3,
         Button, Icon, Title, List, ListItem, Text, Card, CardItem } from 'native-base';

import Colors from '../constants/Colors';

export default class OrderCardItem extends Component {
	render() {
		return(
			<Card style={{flex: 0}}>
				<CardItem>
					<Left>
						<H3>
							{this.props.product.product.name}
						</H3>
					</Left>
				</CardItem>
				{ this.props.product.product.ingredients.length > 0 &&
					<CardItem style={{paddingTop: 0, paddingBottom: 0}}>
						<Body>
							<Text>
								{this.props.product.product.ingredients.map(o => o.name).join(', ')}
							</Text>
						</Body>
					</CardItem>
				}
				<CardItem>
					<Left>
						<Icon name="logo-euro" />
						<Text>{this.props.product.totalPrice.toFixed(2)}</Text>
					</Left>
					<Left>
						<Icon android="md-cube" ios="ios-cube"/>
						<Text>{this.props.product.quantity}</Text>
					</Left>
				</CardItem>
			</Card>
		)
	}
}
