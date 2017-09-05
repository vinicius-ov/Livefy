/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet
} from 'react-native';

import SearchScreen from './SearchConcertController';
import PlaylistScreen from './PlaylistController';

import { StackNavigator, } from 'react-navigation';

const NavigationController = StackNavigator({ Home: { screen: SearchScreen }, Playlist: { screen: PlaylistScreen }, });

AppRegistry.registerComponent('Livefyy', () => NavigationController);





