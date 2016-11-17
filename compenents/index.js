"use strict";
import React, {Component} from 'react';
import GoodsDetail from './goodsDetail.js';
import GoodsLists from './goodsLists.js';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight
} from 'react-native';

const GOOD_URL = 'http://m.api.haoshiqi.net/product/recommendproducts?pageLimit=20';

export default class Index extends Component {
  constructor(prop){
    super(prop);

  };

  render() {
    return (
        <View style={ indexStyle.container}>
          <View style = { indexStyle.indexBar}>
            <Image source={{uri:'ic_main_logo'}} style={{width:60,height:20,marginTop:15,marginLeft:10}}></Image>
            <View style={indexStyle.search}>
              <Image source={{uri:'ic_main_search'}} style={{width:22,height:22}}></Image>
              <Text>搜索您想找的商品</Text>
            </View>
            <View style={indexStyle.city}>
              <Text>北京市</Text>
              <Image source={{uri:'ic_arrow_location'}} style={{width:21,height:38}}></Image>
            </View>
          </View>
          <GoodsLists listUrl={GOOD_URL} navigator={this.props.navigator} />
        </View>
    )
  }
}

const indexStyle = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f8f8f8',
  },
  indexBar:{
    flexDirection: 'row',
    backgroundColor: 'rgb(255, 238, 17)',
    height: 50,
  },
  search:{
    margin:10,
    borderRadius:4,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex:1,
  },
  city:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})