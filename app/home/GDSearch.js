/**
 * 搜索 － 主框架
 *
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter,
} from 'react-native';
import TopNav from '../main/GDTopNav';

export default class GDSearch extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
  }
  static defaultProps = {
    name: '张三',
    ID: '110110199001011234'
  }
  pushToMain() {
    this.props.navigator.pop();
  }
  renderLeftItem() {
    return (
      <TouchableOpacity style={styles.topNavLeftViewStyle} onPress={() => {this.pushToMain()}}>
        <Image source={{uri:'back'}}  style={styles.topNavLeftIconStyle} />
      </TouchableOpacity>
    )
  }
  renderCenterItem() {
    return (
      <View style={styles.topNavCenterViewStyle}>
        <Text style={styles.topNavCenterIconStyle}>搜索</Text>
      </View>
    )
  }
  renderRightItem() {
    return (
      <View style={styles.topNavRightViewStyle}>
        <Text style={styles.topNavRightIconStyle}> </Text>
      </View>
    )
  }
  // 组件被渲染之前执行一次
  componentWillMount() {
    DeviceEventEmitter.emit('isHiddenTabbar', true);
  }
  // 组件渲染之后执行一次
  componentDidMount() {
  }
  // 组件被销毁之前执行一次
  componentWillUnmount() {
    DeviceEventEmitter.emit('isHiddenTabbar', false);
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
    width: 60,
    height: 20,
    alignItems:'center',
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