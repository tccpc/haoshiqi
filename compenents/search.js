"use strict";
import React, {Component} from 'react';
import SearchRes from './searchRes.js';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableHighlight,
} from 'react-native';

export default class Search extends Component {
  constructor(prop){
    super(prop);
    this.state={
      text:''
    }
  }
  gotoSearchRes(data){
    this.props.navigator.push({name: 'SearchRes', component: SearchRes, passProps:{data:data},isTabBar:false})
  };
  render() {
    return (
      <View style={styles.searchBox}>
        <TouchableHighlight
          style={styles.highlight}
          onPress={() => {
            this.props.navigator.jumpBack()
          }}
          underlayColor="rgba(255,255,255,0.3)"
          >
          <Image source={{uri:'arrow'}} style={styles.arrow}></Image>
        </TouchableHighlight>
        <TextInput
          style={styles.searchInput}
          placeholder="搜索"
          placeholderTextColor="#999"
          autoFocus={true}
          // defaultValue="曲奇"
          // editable={false}  禁用
          keyboardType="default"
          // multiline={true}  多行输入
          // clearButtonMode="while-editing"  ios 删除按钮
          underlineColorAndroid="transparent"
          // secureTextEntry={true}  密码输入点点点
          //事件
          // onFocus={()=>{console.log('focus')}}
          // onBlur={()=>{console.log('blur')}}
          // // onChange={(text)=>{console.log(text)}}
          onChangeText={(text)=>{this.setState({text:text})}}
          // onEndEditing={()=>{console.log('onEndEditing')}}
          onSubmitEditing={() => this.gotoSearchRes(this.state.text)}
        />
        <TouchableHighlight
          style={styles.highlight}
          onPress={() => {
            this.props.navigator.push({name: 'Search', component: Search})
          }}
          underlayColor="rgba(255,255,255,0.3)"
          >
          <Image source={{uri:'ic_sort_searth'}} style={styles.searth}></Image>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    height:50,
    backgroundColor:'rgb(255, 238, 17)',
  },
  searchInput:{
    flex:1
  },
  title:{
    fontSize:18,
    color:'rgb(145,78,7)'
  },
  arrow:{
    width:20,
    height:20,
    marginLeft:20,
    marginRight:10,
  },
  searth:{
    width:20,
    height:20,
    marginRight:20,
  },
  highlight:{
    height:50,
    justifyContent:'center'
  }
})
