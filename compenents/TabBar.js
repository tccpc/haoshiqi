"use strict";
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class TabBar extends Component {
  render() {
    if (!this.props.isTabBar) {
      return (<View></View>)
    }
    let tabBarData = [
      {title:'首页', icon:'ic_main_home', iconSelected:'ic_main_home_selected'},
      {title:'分类', icon:'ic_main_category', iconSelected:'ic_main_category_selected'},
      {title:'购物车', icon:'ic_main_shopcart', iconSelected:'ic_main_shopcart_selected'},
      {title:'我的', icon:'ic_main_mine', iconSelected:'ic_main_mine_selected'},
    ]
    let tabBars = tabBarData.map((item,index) => {
      return (
        <TouchableHighlight
          style={tabBarStyle.tabBar}
          underlayColor = "#fff"
          onPress={(route) => {
            this.props.navigator.replace(this.props.routes[index]);
          }} key={index}>
        <View key={index} >
            <Image source={ this.props.tabIndex === index ? { uri:item.iconSelected } : { uri:item.icon }} style={tabBarStyle.image}/>
            <Text style={ tabBarStyle.texts }>{ item.title }</Text>
        </View>
      </TouchableHighlight>
      )
    })
    return (
        <View style={tabBarStyle.footer}>
          {tabBars}
        </View>

    )
  }
}

const tabBarStyle = StyleSheet.create({
  footer:{
    height: 44,
    borderTopWidth:0.5,
    borderStyle: 'solid',
    borderColor: '#ddd',
    flexDirection: 'row',
    backgroundColor:'#f8f8f8'
  },
  tabBar:{
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    // color: '#914e07',
  },
  texts:{
    fontSize: 12,
    color: '#914e07',
  },
  image:{
    width: 24,
    height: 24,
    marginTop: 4,
  }
})
