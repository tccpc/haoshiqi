"use strict";
import React, {Component} from 'react';
import SearchRes from './searchRes.js';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

export default class Search extends Component {
  constructor(prop){
    super(prop);
    this.state={
      text:''
    }
  }
  gotoSearchRes(data){
    this.props.navigator.push({name: 'SearchRes', component: SearchRes, passProps:{data:data}})
  };
  render() {
    return (
      <View style={styles.searchBox}>
        <Image source={{uri:'arrow'}} style={styles.arrow}></Image>
        <TextInput
          style={styles.search}
          placeholder="搜索"
          placeholderTextColor="#999"
          autoFocus={true}
          defaultValue="曲奇"
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
        <Text>搜索</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBox:{
    flexDirection:'row'
  },
  search:{
    flex:1,
    height:50
  },
  arrow:{
    width:20,
    height:26
  }
})
