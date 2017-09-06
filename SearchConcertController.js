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

import { StackNavigator, } from 'react-navigation';

export default class SearchConcertController extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2, }),
			loaded: false, 
	    	videoId: 'PPlgwo0bfQk',
			queryTerm: 'metallica',
	};
	}

	static navigationOptions = { title: 'Search Concerts', };

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

	_performVideoSearch(rowData){
		this.state.isLoading = true;
		//aqui vai a chamada para o backend no mundo ideal
		fetch('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+ rowData.id.videoId +'&key=AIzaSyCdgUFUubI6tRilTsqKghw18gig7Dri3dE')
		.then((response) => response.json())
		.then((responseJson) => {
			//parse description for timestamps
			let result = responseJson.items[0].snippet;
			let desc = result.description;
			let parts = desc.split('\n');
			let setList = [];
			let i;
			for (i in parts){
				console.log('PARTE ' + parts[i]);
				let res = /([0-9]{0,2}:)?[0-9]{2}:[0-9]{2}/.test(parts[i]); //here goes time as (hh:)mm:ss
				if (res){
					let trackTime = /([0-9]{0,2}:)?[0-9]{2}:[0-9]{2}/.exec(parts[i])[0];
					console.log(trackTime);
					let trackSplit = parts[i].split(trackTime);
					console.log(trackSplit);
					let trackName = trackSplit[0];
					if (trackName.length <= 0){
						trackName = trackSplit[1];
					}
					//console.log(trackName);
					let trackData = {timeStamp: trackTime, songName: trackName.trim()}
					//console.log(trackData);
					setList.push(trackData);
					//console.log('(*#&$(#&*(&@(*$&(@#&$(&@(' + setList);
				}
				
			}

			this.props.navigation.navigate('Playlist',{setlist:JSON.stringify(setList)});
		})
		.catch((error) => {
			Alert.alert(JSON.stringify(error));
		});
	}

	render() {
		//const { navigate } = this.props.navigation;
		return (
			<View style={{flex:1}}> 
				<View style={{flexDirection:'row', alignSelf:'center', paddingTop:10, paddingBottom:10}}>
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
									this._performVideoSearch(rowData);
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

