'use strict';

import React from 'react';

import {
  View,
  Text,
  Image,
  StyleSheet,
  ListView
} from 'react-native';


class FlashSale extends React.Component {
  constructor(props){
    super(props);

    const REQUEST_URL = 'http://m.api.haoshiqi.net/common/index?device=iphone&channel=h5&v=1.8.3&swidth=414&sheight=736&zoneId=857&terminal=wap&page=http%3A%2F%2Fm.haoshiqi.net%2F';

    this.fetchData(REQUEST_URL);

    var expiredTime = new Date().getTime().toString().split("");
    expiredTime.splice(-3,3);
    this.state = {
      prolist: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      }),
      expiredTime:expiredTime
    };
    var that = this;
    setInterval(function(){
      that.state.expiredTime = new Date().getTime().toString().split("");
      that.state.expiredTime.splice(-3,3);
      that.setState({
        expiredTime: that.state.expiredTime
      })
    },1000);

  }




  fetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          prolist: this.state.prolist.cloneWithRows(responseData.data.marketingActivities),
        });
      })
      .done();
  }

  renderprolist(pro) {
    if(pro.price) {
      let arrprice = pro.price.toString().split("");
      arrprice.splice(2,0,".");
      arrprice.unshift("￥");
      var price = arrprice.join("");
    } else {
      var price = "";
    }


      var deadline =pro.expiredTime - this.state.expiredTime.join("");
      var d = parseInt(deadline/3600/24);
      var h = parseInt(deadline/3600%24);
      var m = parseInt(deadline/60)-24*d*60-h*60;
      var s = deadline-d*24*3600-h*3600-m*60;

      if(s.toString().length<2){
        s = '0' + s;
      }
      if(d.toString().length<2){
        d = '0' + d;
      }
      if(h.toString().length<2){
        h = '0' + h;
      }
      if(m.toString().length<2){
        m = '0' + m;
      }


    return (
      <View style={styles.flashsalebox}>
        <View style={styles.bgbox}>
          <Image
            source={{uri:pro.icon}}
            style={styles.bgImage}
          >
          <View style={styles.timetxt}>
            <Text style={styles.deadline}>{pro.timeText}</Text>
              <Text style={styles.deadline,styles.timenumbg}>{d}</Text><Text style={styles.deadline}>天</Text>
              <Text style={styles.deadline,styles.timenumbg}>{h}</Text><Text style={styles.deadline}>小时</Text>
              <Text style={styles.deadline,styles.timenumbg}>{m}</Text><Text style={styles.deadline}>分</Text>
              <Text style={styles.deadline,styles.timenumbg}>{s}</Text><Text style={styles.deadline}>秒</Text>

          </View>



          </Image>
        </View>
        <View style={styles.bottomtxt}>
          <Text style={styles.label}>{pro.label}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
      </View>

    )
  }

  render() {

    return (
        <ListView
          dataSource={this.state.prolist}
          renderRow={this.renderprolist.bind(this)}
          style={{backgroundColor: '#f1f1f1'}}
        />
    );
  }

}

const styles = StyleSheet.create({
  flashsalebox: {
    marginBottom: 8,
  },
  bgbox:{
    height: 200,
  },
  bgImage: {
    flex:1,
    justifyContent: 'flex-end',
    resizeMode: 'cover',
  },
  timetxt: {
    height: 25,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingLeft: 10,
    flexDirection: 'row',
  },
  deadline: {
    color: 'white',
    fontSize: 12,
    lineHeight: 20,
  },
  timenumbg:{
    backgroundColor:'rgba(255,255,255,0.5)',
    borderRadius: 2,
    height: 16,
    width:16,
    lineHeight: 16,
    fontSize: 12,
    textAlign: 'center',
    marginRight: 4,
    marginLeft: 4,
    marginTop: 4,
    color: 'black',
  },
  bottomtxt: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label:{
    height: 35,
    paddingTop: 7,
    paddingBottom: 7,
    paddingLeft: 10,
    color: 'black',
  },
  price: {
    color: 'red',
    paddingTop: 7,
    paddingBottom: 7,
    paddingRight: 10,
  }
})

export { FlashSale as default};
