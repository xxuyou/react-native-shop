/**
 * 顶部导航 － 组件
 *
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';

const {width, heihgt} = Dimensions.get('window');

export default class GDTopNav extends Component {
  static propTypes = {
    leftItem: PropTypes.func,
    centerItem: PropTypes.func,
    rightItem: PropTypes.func,
  };

  renderLeftItem() {
    if (this.props.leftItem === undefined) return;
    return this.props.leftItem();
  };

  renderCenterItem() {
    if (this.props.centerItem === undefined) return;
    return this.props.centerItem();
  };

  renderRightItem() {
    if (this.props.rightItem === undefined) return;
    return this.props.rightItem();
  };

  render() {
    return (
      <View style={styles.container} >
        <View>{this.renderLeftItem()}</View>
        <View>{this.renderCenterItem()}</View>
        <View>{this.renderRightItem()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: Platform.OS === 'ios' ? 64 : 44,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#eeeeee',
    paddingTop: Platform.OS === 'ios' ? 15 : 0,
  }
});