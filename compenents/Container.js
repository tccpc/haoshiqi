"use strict";
import React, {Component} from 'react';
import TabBar from './TabBar.js';
import Index from './index.js';
import Category from './category.js';
import Shopcart from './shopcart.js';
import Mine from './mine.js';

import {
  View,
  Text,
  StyleSheet,
  Navigator
} from 'react-native';


export default class Container extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 0,
      isTabBar:true,
    }
  }
  configureScene(route, routeStack) {
    if (route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }
  renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.passProps} />;
  }
  render() {
    const routes = [
      {name: 'Index', component: Index},
      {name: 'Category', component: Category},
      {name: 'Shopcart', component: Shopcart},
      {name: 'Mine', component: Mine}
    ];
    return (
      <View style = {containerStyle.container}>

        <Navigator
          initialRoute={routes[0]}
          // initialRouteStack={routes}
          configureScene = {this.configureScene}
          renderScene = {this.renderScene}
          onWillFocus = {(nextRoute) => {
             if(nextRoute != routes[this.state.tabIndex]){
                this.setState({
                  tabIndex: routes.indexOf(nextRoute)
                })
             }
             this.state.isTabBar = true;
             if(nextRoute.isTabBar === false){
               this.state.isTabBar = nextRoute.isTabBar;
             }
          }}
          navigationBar={
            <TabBar navigator={navigator} routes={routes} tabIndex={this.state.tabIndex} isTabBar={this.state.isTabBar}/>
          }
        />
      </View>
    )
  }
}

const containerStyle = StyleSheet.create({
  container:{
    flex: 1,
  },
  contents: {
    flex: 1,
  },

})
