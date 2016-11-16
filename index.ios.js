/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React, { Component } from 'react';
 import Container from './compenents/Container';
 import {
   AppRegistry,
   StyleSheet,
   TabBarIOS,
   Text,
   View
 } from 'react-native';
 export default class haoshiqi extends Component {
   render() {
     return (
       <View style={styles.container}>
         <Container />
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     backgroundColor: '#F5FCFF',
   }
 });

 AppRegistry.registerComponent('haoshiqi', () => haoshiqi);
