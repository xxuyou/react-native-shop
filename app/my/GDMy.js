/**
 * 个人中心 － 主框架
 *
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  TouchableOpacity,
} from 'react-native';
import TopNav from '../main/GDTopNav';
import Option from '../home/GDOption';

export default class GDMy extends Component {
  pushToOption() {
    this.props.navigator.push({
      component: Option
    });
  }
  renderLeftItem() {
    return (
      <TouchableOpacity style={styles.topNavLeftViewStyle}>
        <Image source={{uri:'back'}}  style={styles.topNavLeftIconStyle} />
      </TouchableOpacity>
    )
  }
  renderCenterItem() {
    return (
      <TouchableOpacity style={styles.topNavCenterViewStyle}>
        <Text style={styles.topNavCenterIconStyle} >个人中心</Text>
      </TouchableOpacity>
    )
  }
  renderRightItem() {
    return (
      <TouchableOpacity style={styles.topNavRightViewStyle} onPress={() => {this.pushToOption()}}>
        <Text style={styles.topNavRightIconStyle} >设置</Text>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={styles.container} >
        <TopNav
          leftItem={() => this.renderLeftItem()}
          centerItem={() => this.renderCenterItem()}
          rightItem={() => this.renderRightItem()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  topNavLeftViewStyle: {
    width: 50,
    height: 20,
  },
  topNavLeftIconStyle: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  topNavCenterViewStyle: {
    width: 100,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavCenterIconStyle: {
    fontSize: 18,
    color: '#000000',
  },
  topNavRightViewStyle: {
    width: 50,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNavRightIconStyle: {
    fontSize: 16,
    color: 'grey',
    marginRight: 15,
  },
});