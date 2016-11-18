"use strict";
import React, {Component} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';


export default class HeaderBar extends Component {
  render() {

    return (
      <View style={styles.searchBox}>
        
        <Image source={{uri:'arrow'}} style={styles.arrow}></Image>
        <Text style={styles.title}>搜索结果</Text>
        <Image source={{uri:'ic_sort_searth'}} style={styles.searth}></Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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
  },
  searth:{
    width:20,
    height:20,
    marginRight:20,
  }
})
