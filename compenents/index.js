"use strict";
import React, {Component} from 'react';
import GoodsDetail from './goodsDetail.js';
import GoodsLists from './goodsLists.js';
import FlashSale from './FlashSale';
import BannerList from './BannerList';
import Search from './search.js';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ActivityIndicator,
  ScrollView,
  TouchableHighlight
} from 'react-native';

const GOOD_URL = 'http://m.api.haoshiqi.net/product/recommendproducts?pageLimit=20';

export default class Index extends Component {
  constructor(prop){
    super(prop);

  };
  gotoSearch(){
    // alert(tit.name)Search
    this.props.navigator.push({name: 'Search', component: Search,isTabBar:false})
  };
  render() {
    return (
        <View style={ indexStyle.container}>
          <View style = { indexStyle.indexBar}>
            <Image source={{uri:'ic_main_logo'}} style={{width:60,height:20,marginTop:15,marginLeft:10}}></Image>
            <TouchableHighlight
              style={{flex:1}}
              onPress={() => this.gotoSearch()}
              underlayColor="rgba(255,255,255,0.1)"
              >
              <View style={indexStyle.search}>
                <Image source={{uri:'ic_main_search'}} style={{width:16,height:16}}></Image>
                <Text>搜索您想找的商品</Text>
              </View>
            </TouchableHighlight>
            <View style={indexStyle.city}>
              <Text>北京市</Text>
              <Image source={{uri:'ic_arrow_location'}} style={{width:21,height:38}}></Image>
            </View>
          </View>
          <ScrollView>
            <BannerList navigator={this.props.navigator}/>
            <FlashSale />
            <GoodsLists listUrl={GOOD_URL} navigator={this.props.navigator} />
          </ScrollView>
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
    paddingLeft:10,
    alignItems: 'center',
    flex:1,
  },
  city:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
