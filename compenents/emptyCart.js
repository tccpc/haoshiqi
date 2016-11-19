"use strict";
import React, {Component} from 'react';
import {
  AppRegistry,
  View,
  Text,
  Image,
  StyleSheet,
  Navigator,
  TouchableHighlight,
} from 'react-native';

export default class EmptyCart extends Component {
  render() {
    return (
      <View style={emptyCartStyles.emptycontainer}>
          <Image source={{uri:'bg_shopcart_empty'}} style={emptyCartStyles.bgimg}>
            <Image source={{uri:'bg_shopcart_empty_in'}} style={emptyCartStyles.inimg}></Image>
            <Text style={emptyCartStyles.emptytit}>温馨提示：您的购物车没有任何商品</Text>
          </Image>
      </View>
    )
  }
}

const emptyCartStyles = StyleSheet.create({
  emptycontainer: {
    marginTop:54,
    "height": 250,
  },
  bgimg:{
    height:400,
    paddingLeft:60,
    paddingRight:60,
    paddingTop:50,
  },
  inimg:{
    height:150,
    alignItems:'center',
    justifyContent:'center',
  },
  emptytit:{
    textAlign:'center',
    marginTop:25,
  },
});
