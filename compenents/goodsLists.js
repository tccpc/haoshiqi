"use strict";
import React, {Component ,AsyncStorage } from 'react';
import GoodsDetail from './goodsDetail.js';
import Login from './login.js';
import Storage from 'react-native-storage';

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

  gotoDetail(goods){
    // alert(tit.name)
    this.props.navigator.push({name: 'GoodsDetail', component: GoodsDetail, passProps:goods,isTabBar:false})
  };
  addCart(goods){
    storage.load({
      key: 'user',

      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true,

      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: false
    }).then(ret => {
      console.log(ret);
      for (let i=0;i<ret.cart.length;i++){
        if(ret.cart[i].skuId == goods.skuInfo.skuId){
          ret.cart[i].count++;
          storage.save({
            key: 'user',  // 注意:请不要在key中使用_下划线符号!
            rawData: {
              num:'13804778325',
              name:'崔哥哥',
              pw:'12345678',
              cart:ret.cart
            }
          });
          return;
        }
      }
      ret.cart.push({
         skuId: goods.skuInfo.skuId,
         count: 1,
      })
      storage.save({
        key: 'user',  // 注意:请不要在key中使用_下划线符号!
        rawData: {
          num:'13804778325',
          name:'崔哥哥',
          pw:'12345678',
          cart:ret.cart
        }
      });
    }).catch(err => {
      console.log('用户登录');
      // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
        // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
        storage.save({
          key: 'user',  // 注意:请不要在key中使用_下划线符号!
          rawData: {
            num:'13804778325',
            name:'崔哥哥',
            pw:'12345678',
            cart:[]
          },

          // 如果不指定过期时间，则会使用defaultExpires参数
          // 如果设为null，则永不过期
          expires: 1000 * 3600
        });
    })
    // if(!user){
    //   this.props.navigator.push({name: 'Login', component: Login,isTabBar:false})
    // }
  }
  onEndReached(){

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
          <Image source={{uri:good.skuInfo.skuPic}} style={indexStyle.img} ></Image>
          <View style={indexStyle.contents}>
            <Text style={indexStyle.goodsName}>{good.name}</Text>
            <View style={indexStyle.priceLists}>
              <Text style={indexStyle.tagsText}>{good.tags[0].text}</Text>
              <Text style={indexStyle.price}>￥{(good.highest_price/100).toFixed(2)}</Text>
              <Text style={indexStyle.unPrice}>{(good.market_price/100).toFixed(2)}</Text>
            </View>
            <View style={indexStyle.cartBox}>
              <Text style={indexStyle.expired}>保质期至：{expired}</Text>
              <TouchableHighlight
                onPress={() => this.addCart(good)}
                underlayColor="rgba(255,255,255,0.3)"
                >
                <Image source={{ uri:'ic_shopcart' }} style={indexStyle.cart}></Image>
              </TouchableHighlight>
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
        onEndReached={this.onEndReached}
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
