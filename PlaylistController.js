import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	Text,
	View,
	TextInput,
	ListView,
	Button,
	ActivityIndicator,
	Image,
	TouchableHighlight,
	Alert
} from 'react-native';

import { StackNavigator, } from 'react-navigation';

export default class PlaylistController extends Component {
	constructor(props) {
		super(props);
		    this.state = { 
				dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
		    	queryTerm: 'metallica',
        };
	}

	static navigationOptions = { title: 'Nome do show vai aqui', };

	render() {
		return (
		  <View style={{flex:1}}>
			
		  </View>
		);
	}


}