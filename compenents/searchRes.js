"use strict";
import React, {Component} from 'react';
import GoodsLists from './goodsLists.js';
import HeaderBar from './headerBar.js';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';


export default class SearchRes extends Component {
  render() {
    const GOOD_URL = `http://m.api.haoshiqi.net/product/itemssearch?category=${this.props.data}`;
    // console.log(this.props.data);
    // GOOD_URL += this.props.data;
    // alert(GOOD_URL)
    return (
      <View>

        <HeaderBar title={this.props.data} navigator={this.props.navigator} />
        <GoodsLists listUrl={GOOD_URL} navigator={this.props.navigator} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBox:{
    flexDirection:'row'
  },
})
