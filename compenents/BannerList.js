'use strict';

import React from 'react';

import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';

import BaniconDetail from './BaniconDetail';

class BannerList extends React.Component{
  constructor(props) {
    super(props);

    const REQUEST_URL = 'http://m.api.haoshiqi.net/common/index?device=iphone&channel=h5&v=1.8.3&swidth=414&sheight=736&zoneId=857&terminal=wap&page=http%3A%2F%2Fm.haoshiqi.net%2F';

    this.fetchData(REQUEST_URL);

    this.state = {
      bannerImg:" ",
      subButtons:[],
      newBeancurdCubeList: [{"icon":" "},{"icon":" "},{"icon":" "}]
    }
  }

  fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          bannerImg: responseData.data.bannerList[0].image,
          subButtons:responseData.data.subButtonList,
          newBeancurdCubeList:responseData.data.newBeancurdCubeList
        });
      })
      .done();
  }
  toBaniconDetail(item) {
    this.props.navigator.push({name: 'BaniconDetail', component: BaniconDetail,passProps:{item:item}, isTabBar:false})
  }
  render() {
    let subButtonList = this.state.subButtons.map((item,index) => {
      return (
        <TouchableHighlight
          onPress={() =>this.toBaniconDetail(item)}
          underlayColor="rgba(255,255,255,0)"
          key={index} style={styles.subButton}
        >
          <View style={styles.subcenter}>
            <Image
              source={{uri:item.icon}}
              style={styles.subButtonimg}
            />
            <Text>
            {item.label}
            </Text>
          </View>
        </TouchableHighlight>
      )
    })
    return(
      <View style={styles.banbg}>
        <Image
          source = {{uri:this.state.bannerImg}}
          style = {styles.bannerbg}
        />
        <View style={styles.subButtonList}>
          {subButtonList}
        </View>
        <View style={styles.advbox}>
          <Image
           source={{uri:this.state.newBeancurdCubeList[0].icon}}
           style={styles.advleft} />
          <View>
            <Image
              source={{uri:this.state.newBeancurdCubeList[1].icon}}
              style={styles.advright}
            />
            <Image
              source={{uri:this.state.newBeancurdCubeList[2].icon}}
              style={styles.advright}
            />
          </View>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  banbg: {
    backgroundColor: '#f1f1f1',
  },
  bannerbg: {
    height: 232,
  },
  subButtonList: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginBottom: 4
  },
  subButton: {
    flex: 1,
    marginTop:10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  subcenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  subButtonimg: {
    height: 40,
    width: 40,
    borderRadius:5,
  },
  advbox: {
    flexDirection: 'row'
  },
  advleft: {
    width:200,
    height: 200,
    marginBottom: 4,
    marginRight: 4,
  },
  advright: {
    width: 156,
    height:98,
    marginBottom: 4,

  }
})

export { BannerList as default }
