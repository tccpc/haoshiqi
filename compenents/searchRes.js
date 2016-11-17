"use strict";
import React, {Component} from 'react';
import GoodsLists from './goodsLists.js';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

const GOOD_URL = 'http://m.api.haoshiqi.net/product/recommendproducts?pageLimit=20';

export default class SearchRes extends Component {
  render() {
    // console.log(this.props.data);
    return (
      <View>

        <Text>搜索结果</Text>
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
