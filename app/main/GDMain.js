/**
 * 主入口文件
 * 主界面
 *
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  Platform,
  DeviceEventEmitter,
} from 'react-native';
import Home from '../home/GDHome';
import Ht from '../ht/GDHt';
import HourList from '../hourList/GDHourList';
import My from '../my/GDMy';
import TabNavigator from 'react-native-tab-navigator';

export default class GDMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home',
      isHiddenTabbar: false,
    }
  }
  // 重复输出多个 tabBarItem
  renderTabBarItem(title, selectedTab, image, selectedImage, component) {
    return (
      <TabNavigator.Item
        selected={this.state.selectedTab === selectedTab}
        title={title}
        titleStyle={styles.tabbarTitleStyle}
        selectedTitleStyle={styles.selectedTitleStyle}
        renderIcon={() => <Image source={{uri:image}} style={styles.tabbarIconStyle} />}
        renderSelectedIcon={() => <Image source={{uri:selectedImage}} style={styles.tabbarIconStyle} />}
        onPress={() => this.setState({ selectedTab: selectedTab })}>
        <Navigator
          initialRoute={{
            name: selectedTab,
            component: component
          }}
          renderScene={(route, navigator) => {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator} />
          }}
        />
      </TabNavigator.Item>
    )
  }

  // 组件被渲染之前执行一次
  componentWillMount() {
    this.description = DeviceEventEmitter.addListener('isHiddenTabbar', (data) => {
      this.noticeHiddenTabbar(data);
    });
  }

  // 组件被销毁之前执行一次
  componentWillUnmount() {
    this.description.remove();
  }

  noticeHiddenTabbar(data) {
    this.setState({
      isHiddenTabbar: data,
    });
  }

  render() {
    return (
      <TabNavigator
        tabBarStyle={this.state.isHiddenTabbar ? styles.tabBarHiddenStyle : styles.tabBarShowStyle}
        sceneStyle={this.state.isHiddenTabbar ? styles.sceneHiddenStyle : styles.sceneShowStyle}
      >
        {/* 首页 */}
        {this.renderTabBarItem('首页', 'home', 'tabbar_home_30x30', 'tabbar_home_selected_30x30', Home)}
        {/* 海淘 */}
        {this.renderTabBarItem('海淘', 'ht', 'tabbar_abroad_30x30', 'tabbar_abroad_selected_30x30', Ht)}
        {/* 小时风云榜 */}
        {this.renderTabBarItem('风云', 'hourList', 'tabbar_rank_30x30', 'tabbar_rank_selected_30x30', HourList)}
        {/* 个人中心 */}
        {this.renderTabBarItem('我的', 'my', 'tabbar_rank_30x30', 'tabbar_rank_selected_30x30', My)}
      </TabNavigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  tabbarIconStyle: {
    width: Platform.OS === 'ios' ? 22 : 18,
    height: Platform.OS === 'ios' ? 22 : 18,
  },
  tabbarTitleStyle: {
    fontSize: 12,
    marginBottom: Platform.OS === 'ios' ? 5 : 2,
  },
  selectedTitleStyle: {
    color: '#000000',
  },
  tabBarShowStyle: {
    height: Platform.OS === 'ios' ? 50 : 45,
    overflow: 'visible',
  },
  tabBarHiddenStyle: {
    height: 0,
    overflow: 'hidden',
  },
  sceneShowStyle: {
    paddingBottom: Platform.OS === 'ios' ? 50 : 45,
  },
  sceneHiddenStyle: {
    paddingBottom: 0,
  }
});
