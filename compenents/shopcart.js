"use strict";
import React, {Component} from 'react';
import Storage from 'react-native-storage';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
  AsyncStorage,
  Del,
} from 'react-native';

import EmptyCart from './emptyCart.js';
var storage = new Storage({
  // 最大容量，默认值1000条数据循环存储
  size: 1000,

  // 存储引擎：对于RN使用AsyncStorage，对于web使用window.localStorage
  // 如果不指定则数据只会保存在内存中，重启后即丢失
  storageBackend: AsyncStorage,

  // 数据过期时间，默认一整天（1000 * 3600 * 24 毫秒），设为null则永不过期
  defaultExpires: 1000 * 3600 * 24 * 7,

  // 读写时在内存中缓存数据。默认启用。
  enableCache: true,

  // 如果storage中没有相应数据，或数据已过期，
  // 则会调用相应的sync方法，无缝返回最新数据。
  // sync方法的具体说明会在后文提到
  // 你可以在构造函数这里就写好sync的方法
  // 或是写到另一个文件里，这里require引入
  // 或是在任何时候，直接对storage.sync进行赋值修改
})

export default class Shopcart extends Component {
  constructor(prop){
    super(prop);
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1,row2) => row1 !== row2
    });
    this.state = {
      hasShop:false,
      dataSource: dataSource.cloneWithRows([
        'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin', 'Jillian'
      ])
    }
  };
  gotoDetail(tit){
    this.props.navigator.push({name: 'GoodsDetail', component: GoodsDetail})
  };
  showShopCart(shopGood){
    return (
      <TouchableHighlight
        onPress={() => this.gotoDetail(good)}
        underlayColor="rgba(34,36,38,1)"
        >
        <View>
          <View style={CarStyles.shopName}>
            <Image source={{uri:'btg_icon_priority_3_selected'}} style={CarStyles.selectItem}/>
            <Text style={CarStyles.shoptit}>林荫茶叶旗舰店</Text>
            <Image source={{uri:'btg_icon_arrow_right_selected'}} style={CarStyles.arrowRight}/>
          </View>
          <View style={CarStyles.item}>
            <Image source={{uri:'btg_icon_priority_3_selected'}} style={CarStyles.rightSelectItem}/>
            <View style={CarStyles.itemright}>
              <View style={CarStyles.itemtop}>
                <Image source={{uri:'icon_red_coupon'}} style={CarStyles.goodimg}/>
                <View style={CarStyles.goodtext}>
                  <Text>[包邮]台湾竹叶堂日式麻糬抹茶大福+芝麻大福+米兰诺松塔 组合礼包 共1023g</Text>
                  <Text style={CarStyles.discribe}>原味乳酪味菠菜味蓝莓味|200g*2盒</Text>
                </View>
              </View>
              <View style={CarStyles.itembottom}>
                <View style={CarStyles.price}>
                  <Text style={CarStyles.salePrice}>￥29.90</Text>
                  <Text style={CarStyles.oldPrice}>76.00</Text>
                </View>
                <View style={CarStyles.num}>
                  <Text style={CarStyles.add}>-</Text>
                  <View style={CarStyles.shopNumber}><Text style={CarStyles.numtext}>1</Text></View>
                  <Text style={CarStyles.unadd}>+</Text>
                </View>
              </View>
              <View style={CarStyles.remain}><Text style={CarStyles.remaintext}>仅剩998件</Text></View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  render() {
    if(this.state.hasShop){
    return (
      <TouchableHighlight
        underlayColor="rgba(34, 26, 38, 0.1)"
      >
      <View>
      <EmptyCart />
      </View>
      </TouchableHighlight>
    )}
    return(
    <ListView
      renderRow={this.showShopCart.bind(this)}
      dataSource={this.state.dataSource}
    />
    )
  }
}
const CarStyles = StyleSheet.create({

  shopName:{
    height:44,
    borderBottomWidth:1,
    backgroundColor:'#fff',
    borderColor: '#ccc',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  selectItem:{
    width:20,
    height:20,
    marginLeft:5,
    marginRight:10,
  },
  shoptit:{
    flex:1,
  },
  arrowRight:{
    width:10,
    height:10,
    marginRight:190,
  },
  item:{
    height:130,
    flexDirection:'row',
    paddingTop:10,
    borderBottomWidth:1,
    borderColor:'#ccc',
  },
  rightSelectItem:{
    width:20,
    height:20,
    marginLeft:5,
    marginRight:10,
    marginTop:10,
  },
  itemright:{
    flex:1,
  },
  itemtop:{
    flexDirection:'row',
    height:50,
    flex:1,
  },
  goodimg:{
    width:50,
    height:50,
  },
  goodtext:{
    height:50,
    paddingLeft:5,
    paddingRight:5,
    flex:1,
  },
  itembottom:{
    flexDirection:'row',
    height:30,
    paddingTop:10,
  },
  discribe:{
    fontSize:12,
    color:'#999',
  },
  price:{
    flexDirection:'row',
    flex:1,
  },
  salePrice:{
    height:20,
    lineHeight:20,
    color:'red',
    paddingRight:12,
  },
  oldPrice:{
    fontSize:12,
    color:'#999',
    marginTop:2,
  },
  num:{
    flexDirection:'row',
    paddingRight:30,
    paddingLeft:30,
    flex:1,
  },
  add:{
    flex:1,
    textAlign:'right',
  },
  shopNumber:{
      width:25,
      height:20,
      marginLeft:5,
      marginRight:5,
      borderWidth:1,
      borderColor:'rgba(128,128,128,0.4)'
  },
  numtext:{
    textAlign:'center',
  },
  unadd:{
    flex:1,
    color:'#999',
  },
  remain:{
    height:50,
    flex:1,
    paddingLeft:5,
  },
  remaintext:{
    fontSize:10,
  },
})
