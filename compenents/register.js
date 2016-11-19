"use strict";
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class Login extends Component {
  render() {
    return (
      <View style={styles.searchBox}>
        <TouchableHighlight
          style={styles.highlight}
          onPress={() => {
            this.props.navigator.jumpBack()
          }}
          underlayColor="rgba(255,255,255,0.3)"
          >
          <Image source={{uri:'arrow'}} style={styles.arrow}></Image>
        </TouchableHighlight>
        <Text style={styles.title}>注册</Text>
        <TouchableHighlight
          style={styles.highlight}
          onPress={() => {
            this.props.navigator.jumpBack()
          }}
          underlayColor="rgba(255,255,255,0.3)"
          >
          <Text>登录</Text>
        </TouchableHighlight>
      </View>

    )
  }
}

const Styles = StyleSheet.create({
  searchBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:50,
    backgroundColor:'rgb(255, 238, 17)',
  },
  title:{
    fontSize:18,
    color:'rgb(145,78,7)'
  },
  arrow:{
    width:20,
    height:20,
    marginLeft:20,
    marginRight:10,
  },
  searth:{
    width:20,
    height:20,
    marginRight:20,
  },
  highlight:{
    height:50,
    justifyContent:'center'
  }
})
