"use strict";
import React, {Component} from 'react';
import GoodsDetail from './goodsDetail.js';

import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  Del,
} from 'react-native';

export default class GoodsLists extends Component {
  constructor(prop){
    super(prop);
    let goods = [{}];
    const GOOD_URL = this.props.listUrl;
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1,row2) => row1 !== row2
    });
    this.state = {
      goods:dataSource.cloneWithRows(goods),
      isShow:false
    }
    fetch(GOOD_URL)
      .then(res => res.json())
      .then(res => {
        this.setState({
          goods:dataSource.cloneWithRows(res.data.list),
          isShow: true
        })
      })
  };

  gotoDetail(tit){
    // alert(tit.name)
    this.props.navigator.push({name: 'GoodsDetail', component: GoodsDetail})
  };

  showGoods(good){
    function add0(m){return m<10?'0'+m:m };
    function format(shijianchuo){
      //shijianchuo是整数，否则要parseInt转换
      var time = new Date(shijianchuo*1000);
      var y = time.getFullYear();
      var m = time.getMonth()+1;
      var d = time.getDate();
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return y+'年'+add0(m)+'月'+add0(d)+'日';
    }
    var expired=format(good.skuInfo.expired_date);
    return (
      <TouchableHighlight
        style={indexStyle.highlight}
        onPress={() => this.gotoDetail(good)}
        underlayColor="rgba(34,36,38,1)"
        >
        <View style={indexStyle.good}>
          <Image source={{uri:good.skuInfo.skuThumbnail}} style={indexStyle.img} ></Image>
          <View style={indexStyle.contents}>
            <Text style={indexStyle.goodsName}>{good.name}</Text>
            <View style={indexStyle.priceLists}>
              <Text style={indexStyle.tagsText}>{good.tags[0].text}</Text>
              <Text style={indexStyle.price}>￥{(good.highest_price/100).toFixed(2)}</Text>
              <Text style={indexStyle.unPrice}>{(good.market_price/100).toFixed(2)}</Text>
            </View>
            <View style={indexStyle.cartBox}>
              <Text style={indexStyle.expired}>保质期至：{expired}</Text>
              <Image source={{ uri:'ic_shopcart' }} style={indexStyle.cart}></Image>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
  render() {
    if(!this.state.isShow){
      return(
        <View style={ indexStyle.container}>
          <ActivityIndicator
            style={{marginTop:200}}
            color="#ff5555"
            size="large"
          />
        </View>
      )
    }
    return (
      <ListView
        style={indexStyle.list}
        dataSource={ this.state.goods }
        renderRow={ this.showGoods.bind(this) }
      />
    )
  }
}

const indexStyle = StyleSheet.create({
  list:{
    paddingLeft:6,
    paddingRight:6
  },
  good:{
    flexDirection:'row',
    padding:6,
    backgroundColor: '#fff',
  },
  highlight:{
    marginBottom:5,
  },
  img:{
    width:100,
    height:100,
  },
  contents:{
    flex:1,
    paddingLeft:10,
  },
  goodsName:{
    fontSize: 14,
    color:'#555',
    height:34,
  },
  priceLists:{
    flexDirection:'row',
  },
  tagsText:{
    color:'#fff',
    borderRadius:3,
    paddingLeft:4,
    paddingRight:4,
    backgroundColor:'#ff5555',
    fontSize:12,
    lineHeight:14,
    height:14,
    marginTop:8,
  },
  price:{
    fontSize:20,
    color:'#F54',
  },
  unPrice:{
    marginLeft:6,
    fontSize:12,
    textDecorationLine:'line-through',
    marginTop:8,
    color:'#aaa'
  },
  cartBox:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  expired:{
    fontSize:12,
    color:'#999'
  },
  cart:{
    width:30,
    height:30
  }

})
