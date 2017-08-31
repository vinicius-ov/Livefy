/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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

export default class Livefyy extends Component {
	constructor(props) {
		super(props);
		this.state = { dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
		loaded: false, 
	    videoId: 'PPlgwo0bfQk',
		queryTerm: 'pearl jam',};
	}

	_getVideosByQueryTerm() {
		if (this.state.queryTerm === ''){
			Alert.alert('Busca vazia!');
		}else{
			this._performSearch();
		}
	}

	_performArtistSearch(){
		this.state.isLoading = true;
		fetch('https://www.googleapis.com/youtube/v3/search?part=id,snippet&q='+this.state.queryTerm+',full,live&maxResults=20&key=AIzaSyCdgUFUubI6tRilTsqKghw18gig7Dri3dE')
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({ dataSource: this.state.dataSource.cloneWithRows(responseJson.items),
				loaded: true, });
		})
		.catch((error) => {
			Alert.alert('error');
		});
	}

	_performVideoSearch(){
		this.state.isLoading = true;
		//aqui vai a chamada para o backend no mundo ideal
		fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+ this.state.videoId +'&key=AIzaSyCdgUFUubI6tRilTsqKghw18gig7Dri3dE')
		.then((response) => response.json())
		.then((responseJson) => {
			//parse description for timestamps
			var result = responseJson.items[0].snippet;
			var desc = result.description;
			var parts = desc.split('\n');
			var list = [];
			var i;
			for (i in parts){
				var patt = new RegExp("([0-9]{2}:)?[0-9]{2}:[0-9]{2}");
				var res = /[0-9]{2}:[0-9]{2}/.exec(parts[i]); //here goes time as (hh:)mm:ss
				console.log(res);
				console.log(typeof(res) === 'object' ? 'a':'b');
		}
			
			//Alert.alert(list)
			
		})
		.catch((error) => {
			Alert.alert(JSON.stringify(error));
		});
	}

	render() {
		return (
			<View > 
				<View style={{flexDirection:'row', alignSelf:'center', paddingTop:40, paddingBottom:20}}>
					<TextInput
						style={styles.textInput}
						onChangeText={(queryTerm) => this.setState({queryTerm})}
						value={this.state.queryTerm}
						placeholder = 'Buscar artista aqui'
					/>
					<Button
						title='Buscar'
						onPress={() => this._performArtistSearch()}
					/>
				</View>
					<ListView 
						dataSource={this.state.dataSource}
						renderRow={(rowData) => 
							<TouchableHighlight 
								underlayColor='#ffc299'
								onPress={() => {
									this.state.videoId = rowData.id.videoId;
									this._performVideoSearch();
									}} >
								<View style={{flexDirection:'row', paddingTop: 10, paddingLeft:10, paddingBottom: 10}}>
									<Image
										style={{width: 120, height: 90}}
										source={{uri: rowData.snippet.thumbnails.medium.url}}
									/>
									<Text style={{paddingLeft: 10}}>
										{rowData.snippet.title}
									</Text>          							
								</View>
							</TouchableHighlight>
						} //renderRow
					/> 
			</View> //master view
		);
	} //render

} //class

const styles = StyleSheet.create({
	textInput: {
		height: 40,
		width: 280,
		borderColor: 'gray',
		borderWidth: 2,
	}
});

AppRegistry.registerComponent('Livefyy', () => Livefyy);





