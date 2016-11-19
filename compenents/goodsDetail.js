"use strict";

import React, {Component} from 'react';

import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    ActivityIndicator,
    TouchableHighlight,
    Button,
    Dimensions,
    ScrollView,
} from 'react-native';

import Swiper from 'react-native-swiper';
const { width } = Dimensions.get('window')


export default class GoodsDetail extends Component {
  constructor(props) {
    super(props);

    const REQUEST_URL = "http://m.api.haoshiqi.net/product/iteminfo?device=pc&channel=h5&v=1.8.3&swidth=1920&sheight=1080&zoneId=857&terminal=wap&page=http%3A%2F%2Fm.haoshiqi.net%2F%23detail%3Fsid%3D8868%26channel_id%3Dh5&skuId=8868";

    this.fetchData(REQUEST_URL);

    this.state = {
      loading: false,
      goodDetail: null,
    }
  }

  fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          goodDetail: responseData,
          loading: true,
        })
      })
      .done();
  }

  _onPressBack() {
    this.props.navigator.jumpBack();
  }

  render() {
    if ( !this.state.loading ) {
      return (
        <View style={tabBarStyle.container}>
          <View style={tabBarStyle.loading}>
            <ActivityIndicator
              size="large"
              color="#ff5555"
            />
          </View>
        </View>
      )
    }

    let movie = this.state.goodDetail;
    return (
      <View style={tabBarStyle.container}>
        <View style={tabBarStyle.detailBar}>
          <TouchableHighlight style={tabBarStyle.backbuttonbox} onPress={()=>this._onPressBack()}>
            <Image
              style={tabBarStyle.backbutton}
              source={{uri:'arrow'}}
            />
          </TouchableHighlight>
          <View style={tabBarStyle.BarHeaderbox}>
            <Text style={tabBarStyle.BarHeader}>商品详情</Text>
          </View>
          <View style={tabBarStyle.sharebox}>
            <Image
              source={{uri: 'ic_share'}}
              style={tabBarStyle.share}
            />
          </View>
        </View>

        <ScrollView contentContainerStyle={tabBarStyle.ScrollViewbox}>
        <Swiper style={tabBarStyle.wrapper} height={310}
          showsPagination={true}
          autoplayTimeout={5}
          onMomentumScrollEnd={(e, state, context) => console.log('index:', state.index)}
          dot={<View style={{backgroundColor: 'rgba(180,0,0,.8)', width: 5, height: 5, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          activeDot={<View style={{backgroundColor: 'white', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3}} />}
          paginationStyle={{
            bottom: 18,justifyContent:"center",
          }} loop  autoplay>
          <View style={tabBarStyle.slide} title={<Text numberOfLines={1}>Aussie tourist dies at Bali hotel</Text>}>
            <Image resizeMode='stretch' style={tabBarStyle.image} source={{uri: movie.data.pics[0]}} />
          </View>
          <View style={tabBarStyle.slide} title={<Text numberOfLines={1}>Big lie behind Nine’s new show</Text>}>
            <Image resizeMode='stretch' style={tabBarStyle.image} source={{uri: movie.data.pics[1]}} />
          </View>
          <View style={tabBarStyle.slide} title={<Text numberOfLines={1}>Why Stone split from Garfield</Text>}>
            <Image resizeMode='stretch' style={tabBarStyle.image} source={{uri: movie.data.pics[2]}} />
          </View>
          <View style={tabBarStyle.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode='stretch' style={tabBarStyle.image} source={{uri: movie.data.pics[3]}} />
          </View>
          <View style={tabBarStyle.slide} title={<Text numberOfLines={1}>Learn from Kim K to land that job</Text>}>
            <Image resizeMode='stretch' style={tabBarStyle.image} source={{uri: movie.data.pics[4]}} />
          </View>
        </Swiper>
        <View style={tabBarStyle.itembox}>
          <Text style={tabBarStyle.itemtitle}>{movie.data.name}</Text>
          <View style={tabBarStyle.pricebox}>
            <Text style={tabBarStyle.newprice}>￥ {(movie.data.price/100).toFixed(2)}</Text>
            <Text style={tabBarStyle.oldprice}>{(movie.data.market_price/100).toFixed(2)}</Text>
          </View>
        </View>
        <View style={tabBarStyle.checkbox}>
            <Text style={tabBarStyle.checkdatebox}>已选： <Text style={tabBarStyle.checkdate}>{movie.data.attrs[0].value}、1件</Text></Text>
            <Image style={tabBarStyle.checkimage} source={{uri: 'my_arrow'}} />
        </View>
        <View style={tabBarStyle.Distributionbox}>
          <View style={tabBarStyle.Distributioninner}>
            <Text style={tabBarStyle.checkdatebox}>送至： <Text style={tabBarStyle.checkdate}>北京市</Text></Text>
            <Image style={tabBarStyle.checkimage} source={{uri: 'my_arrow'}} />
          </View>
          <View style={tabBarStyle.Distributioninner2}>
            <Text style={tabBarStyle.Distriinner2txt1}>促</Text>
            <Text style={tabBarStyle.Distriinner2txt2}>本商品满1件包邮</Text>
          </View>
        </View>
        <View style={tabBarStyle.bxbox}>
          <View style={tabBarStyle.bxboxinner1}>
            <Image style={tabBarStyle.bximg} source={{uri: 'ic_ensure'}} />
            <Text style={[tabBarStyle.bxtxt],{marginRight:15,fontSize:12,color:"#222"}}>{movie.data.labels[1].text}</Text>
            <Image style={tabBarStyle.bximg} source={{uri: 'ic_ensure'}} />
            <Text style={tabBarStyle.bxtxt}>{movie.data.labels[0].text}</Text>
          </View>
          <View style={tabBarStyle.bxboxinner1}>
            <Image style={tabBarStyle.bximg} source={{uri: 'ic_ensure'}} />
            <Text style={tabBarStyle.bxtxt}>{movie.data.labels[2].text}</Text>
          </View>
        </View>
        <View style={tabBarStyle.shopbox}>
          <View style={tabBarStyle.shopboxinner1}>
            <Image style={tabBarStyle.shopimg} source={{uri:movie.data.merchantInfo.logo}} />
            <View style={tabBarStyle.shoptitlebox}>
              <Text style={tabBarStyle.shoptitle}>{movie.data.merchantInfo.name}</Text>
              <View style={tabBarStyle.shoptitlebox2}>
                <Text style={tabBarStyle.shoppro}>{movie.data.merchantInfo.province}</Text>
                <Text style={tabBarStyle.shopcity}>{movie.data.merchantInfo.city}</Text>
              </View>
            </View>
            <Text style={tabBarStyle.shopgg}>进店逛逛</Text>
          </View>
          <View style={tabBarStyle.shopboxinner2}>
            <Text style={tabBarStyle.shopgb}>店铺公告：</Text>
            <Text style={tabBarStyle.shopneirong}>{movie.data.merchantInfo.notice}</Text>
          </View>
        </View>
        </ScrollView>
      </View>
    )
  }
}

const tabBarStyle = StyleSheet.create({
  ScrollViewbox:{
  },
  container: {
    backgroundColor: '#eae7ff',
    flex: 1,
  },
  detailBar:{
    backgroundColor: 'rgb(255, 238, 17)',
    height:44,
    flexDirection:'row',
  },
  backbuttonbox:{
    width:35,
    height:44,
    padding:12,
  },
  sharebox:{
    width:35,
    height:44,
    paddingTop:8,
  },
  BarHeaderbox:{
    height:44,
    paddingTop:12,
    flex: 1,
  },
  backbutton:{
    width:20,
    height:20,
  },
  BarHeader:{
    textAlign:"center"
  },
  share:{
    width:20,
    height:25,
  },
  wrapper: {
    height:310,
    borderBottomWidth: 5,
    borderColor: 'rgba(100, 53, 201, 0.1)',
  },
  bgimage: {
    flexDirection: 'row',
    flex: 1,
    resizeMode: 'cover',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  image: {
    flex: 1
  },
  itembox:{
    height:90,
    padding:10,
    paddingRight:0,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    backgroundColor: 'white'
  },
  itemtitle:{
    color:"#111",
  },
  pricebox:{
    marginTop:12,
    flexDirection: 'row',
  },
  newprice:{
    color:"red",
    marginRight:14,
    fontSize:17,
  },
  oldprice:{
    color:"#999999",
    marginRight:14,
    fontSize:12,
    paddingTop:5,
    textDecorationLine:'line-through',
  },
  checkbox:{
    marginTop:10,
    marginBottom:10,
    flexDirection: 'row',
    padding:10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    backgroundColor: 'white'
  },
  checkdatebox:{
    color:"#999999",
    flex:1,
    fontSize:12,
  },
  checkdate:{
    color:"#222",
    fontSize:12,
  },
  checkimage:{
    width:8,
    height:12,
    marginTop:3,
  },
  Distributionbox:{
    padding:10,
    borderTopWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    backgroundColor: 'white'
  },
  Distributioninner:{
    flexDirection: 'row',
  },
  Distributioninner2:{
    flexDirection: 'row',
    marginTop:12,
    paddingLeft:40,
  },
  Distriinner2txt1:{
    color:"#fff",
    width:16,
    borderRadius:4,
    backgroundColor:"red",
    fontSize:12,
    textAlign:"center",
    marginRight:8,
  },
  Distriinner2txt2:{
    color:"#222",
    fontSize:12,
  },
  bxbox:{
    marginBottom:10,
    padding:10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    backgroundColor: '#F4F4F4',
  },
  bxboxinner1:{
    marginRight:15,
    flexDirection: 'row',
  },
  bximg:{
    width:12,
    height:12,
    marginTop:2,
    marginRight:7,
  },
  bxtxt:{
    fontSize:12,
    color:"#222"
  },
  shopbox:{
    marginBottom:10,
    paddingTop:10,
    paddingBottom:10,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(100, 53, 201, 0.1)',
    backgroundColor: '#fff',
  },
  shopboxinner1:{
    paddingBottom:10,
    flexDirection: 'row',
    borderColor: 'rgba(100, 53, 201, 0.1)',
    borderBottomWidth: 1,
    paddingLeft:10,
    paddingRight:10,
  },
  shopimg:{
    width:30,
    height:30,
    marginRight:10
  },
  shoptitlebox2:{
    flexDirection: 'row',
  },
  shoptitlebox:{
    flex:1,
  },
  shoptitle:{
    fontSize:12,
    color:"#111",
  },
  shoppro:{
    fontSize:12,
    color:"#999999",
    paddingRight:8,
  },
  shopcity:{
    fontSize:12,
    color:"#999999",
  },
  shopgg:{
    color:'#8E8E8E',
    borderRadius:6,
    borderWidth: 1,
    width:76,
    height:23,
    textAlign:'center',
    paddingTop:2,
    marginTop:8,
    fontSize:13,
    borderColor: 'rgba(100, 53, 201, 0.2)',
  },
  shopboxinner2:{
    paddingLeft:10,
    paddingRight:10,
    flexDirection: 'row',
    paddingTop:10,
  },
  shopgb:{
    fontSize:12,
    color:"#999999",
  },
  shopneirong:{
    fontSize:12,
    color:"#111",
    flex:1,
    height:17,
  }
})
