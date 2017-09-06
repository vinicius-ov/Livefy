import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	FlatList,
	Button,
	ActivityIndicator,
	Image,
	TouchableHighlight,
	Alert
} from 'react-native';

import { StackNavigator, } from 'react-navigation';

export default class PlaylistController extends Component {
	constructor(props) {
		super(props)
	}

	static navigationOptions = { title: 'Nome do show vai aqui', };

	render() {
		const { params } = this.props.navigation.state;
		console.log('#####################################################################');
		let list = JSON.parse(params.setlist);
		let indexx = -9;
		return (
			<View style={{flex:1}}>
				<View style={{padding:10}}>
					<Text>Aqui vai o player de musica</Text>
				</View>
				<FlatList
					data={list}
					renderItem={({item}) => 
						<View style={{flex:1, padding:10}}>
							
							<Text>{indexx++}  {item.songName}</Text>
						</View>
					}
					keyExtractor={(item, index) => index}	
			  />
			</View>
		);
	}


}