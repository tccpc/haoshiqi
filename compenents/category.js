"use strict";
import React, {Component} from 'react';

import Search from './search.js';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight
} from 'react-native';

export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:[
        {"cgname":"休闲零食",
          "cgdetail":["饼干糕点","坚果炒货","糖果巧克力","膨化食品","肉脯干卤味"]
        },
        {"cgname":"饮料冲调",
          "cgdetail":["咖啡茶饮","水/饮料","含乳饮料","果蔬汁/蜂蜜冲饮","酒"]
        },
        {"cgname":"速食调味",
          "cgdetail":["罐头速食","调味酱料","粮油"]
        }
      ]
    }
  }

  gotoSearch(){
    // alert(tit.name)Search
    this.props.navigator.push({name: 'Search', component: Search,isTabBar:false})
  };

  render() {
    let categories = this.state.category.map((cate,index) => {

      return (
        <View key={index} style={styles.categorybox}>
          <TouchableHighlight
           underlayColor="rgba(255,0,0,1)"
          >
            <View style={styles.catetitle}>
              <Image
               source={{uri:'aliwx_topbar_at_icon_new'}}
               style={styles.listbg}
              />
              <Text style={styles.catetitletxt}>{cate.cgname}</Text>
              <Image
               source={{uri:'my_arrow'}}
               style={styles.arrow}
              />
            </View>
          </TouchableHighlight>
          <Text style={styles.btn}>
            123
          </Text>
        </View>
      )
    })
    return (
      <View>
        <TouchableHighlight
          onPress={() => this.gotoSearch()}
          underlayColor="rgba(255,255,255,0.1)"
          style={styles.headBar}
          >
          <View style={styles.searchbg}>
            <Image source={{uri:'ic_main_search'}} style={{width:16,height:16}}></Image>
            <Text>搜索您想找的商品</Text>
          </View>
        </TouchableHighlight>
        <View>{categories}</View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  headBar: {
    backgroundColor: '#ffee11',
    height: 44,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 8,
    paddingBottom: 8
  },
  searchbg: {
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingLeft:10,
    borderRadius:4,
    height:28,
    alignItems: 'center',
  },
  categorybox: {
    backgroundColor: 'white',
    marginBottom: 5
  },
  catetitle: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1
  },
  listbg: {
    height:5,
    width:5,
    marginRight: 5
  },
  catetitletxt: {
    fontSize:16,
    color:'black'
  },
  arrow: {
    width:10,
    height:20,
    scaleX: 0.6,
    scaleY: 0.5,
    marginLeft: 250
  },
  btn: {
    borderWidth:1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 2,
    margin:2
  }




})
