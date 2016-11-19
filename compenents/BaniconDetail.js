'use strict';

import React from 'react';

import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import HeaderBar from './headerBar';
import GoodsLists from './goodsLists';

class BaniconDetail extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.item.label);
    const GOOD_URL = `http://m.api.haoshiqi.net/product/itemssearch?category=${this.props.item.label}`;
    return (
      <View>
        <HeaderBar title={this.props.item.label} navigator={this.props.navigator}/>
        <GoodsLists listUrl={GOOD_URL} navigator={this.props.navigator} />
      </View>

    )
  }
}


export { BaniconDetail as default}
