// "use strict";
import React, {Component} from 'react';
import Storage from 'react-native-storage';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ListView,
  AsyncStorage,
  ActivityIndicator,
  TouchableHighlight,
  Del,
} from 'react-native';

import EmptyCart from './emptyCart.js';
var storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24 * 7,
  enableCache: true,
})

export default class Shopcart extends Component {
  constructor(prop){
    super(prop);
    const REQUEST_URL = "http://m.api.haoshiqi.net/product/iteminfo?device=pc&channel=h5&v=1.8.3&swidth=1920&sheight=1080&zoneId=857&terminal=wap&page=http%3A%2F%2Fm.haoshiqi.net%2F%23detail%3Fsid%3D8868%26channel_id%3Dh5&skuId=8868";
    let dataSource = new ListView.DataSource({
      rowHasChanged: (row1,row2) => row1 !== row2
    });
    let cart=[{}];
    let id=[];
    this.state = {
      hasShop:false,
      dataSource:dataSource.cloneWithRows(cart)
    }
  };

   fetchShopData () {
    storage.load({
      key: 'user',
      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true,
      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: false
    }).then(ret => {
      console.log(1);
      console.log(ret.cart);
        for(var j=0;j<ret.cart.length;j++){
            id[j]=ret.cart[j].skuId;
        }
    }).catch(err => {
      // if(ret.cart.length>=0){
      //  this.state.hasShop=true;
      //  }
    });
      // for(var i=0;i<id.length;i++){
      //   fetch(REQUEST_URL)
      //     .then(res => res.json())
      //     .then(res => {
      //       cart.push(res.data.list[1]);
      //   })
      // }
  };
  gotoDetail(tit){
    this.props.navigator.push({name: 'GoodsDetail', component: GoodsDetail})
  };
  showShopCart(shopGood){
    return (
      <View>
      </View>
      // <TouchableHighlight
      //   onPress={() => this.gotoDetail(good)}
      //   underlayColor="rgba(34,36,38,1)"
      //   >
      //   <View>
      //     <View style={CarStyles.shopName}>
      //       <Image source={{uri:'btg_icon_priority_3_selected'}} style={CarStyles.selectItem}/>
      //       <Text style={CarStyles.shoptit}>林荫茶叶旗舰店</Text>
      //       <Image source={{uri:'btg_icon_arrow_right_selected'}} style={CarStyles.arrowRight}/>
      //     </View>
      //     <View style={CarStyles.item}>
      //       <Image source={{uri:'btg_icon_priority_3_selected'}} style={CarStyles.rightSelectItem}/>
      //       <View style={CarStyles.itemright}>
      //         <View style={CarStyles.itemtop}>
      //           <Image source={{uri:'shopGood.skuInfo.skuPic'}} style={CarStyles.goodimg}/>
      //           <View style={CarStyles.goodtext}>
      //             <Text>{shopGood.name}</Text>
      //             <Text style={CarStyles.discribe}>{shopGood.skuInfo.attr[0].name}{shopGood.skuInfo.attr[0].value}</Text>
      //           </View>
      //         </View>
      //         <View style={CarStyles.itembottom}>
      //           <View style={CarStyles.price}>
      //             <Text style={CarStyles.salePrice}>￥{(shopGood.highest_price/100).toFixed(2)}</Text>
      //             <Text style={CarStyles.oldPrice}>{(shopGood.market_price/100).toFixed(2)}</Text>
      //           </View>
      //           <View style={CarStyles.num}>
      //             <Text style={CarStyles.add}>-</Text>
      //             <View style={CarStyles.shopNumber}><Text style={CarStyles.numtext}>1</Text></View>
      //             <Text style={CarStyles.unadd}>+</Text>
      //           </View>
      //         </View>
      //         <View style={CarStyles.remain}><Text style={CarStyles.remaintext}>仅剩998件</Text></View>
      //       </View>
      //     </View>
      //   </View>
      // </TouchableHighlight>
    )
  }
  render() {
    this.fetchShopData();
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
      // <View>
      // </View>
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
