/**
 * 近半小时热门 － 主框架
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
  ListView,
  DeviceEventEmitter,
  InteractionManager,
  RefreshControl,
} from 'react-native';
import TopNav from '../main/GDTopNav';
import HalfHourHotCell from './GDHalfHourHotCell';
import EmptyData from '../main/GDEmpty';

export default class GDHalfHourHot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      isRefreshing: false,
    };
    this.fatchData = this.fetchData.bind(this); // 绑定方法 ？
    this.doRefresh = this.doRefresh.bind(this);
  }
  static defaultProps = {
    fetchURI: 'http://guangdiu.com/api/gethots.php',
  }
  fetchData() {
    this.setState({
      isRefreshing: true
    });
    // InteractionManager.runAfterInteractions 方法可以帮助延迟执行耗时任务，不影响界面渲染
    InteractionManager.runAfterInteractions(() => {
      fetch(this.props.fetchURI, { method: 'GET', catch: 'no-cache' })
        .then((response) => response.json())
        .then((responseData) => {
          let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
          this.setState({
            dataSource: ds.cloneWithRows(responseData.data),
            loaded: true,
            isRefreshing: false,
          }, () => {
            // do something with new state
            console.log('setState callback: do something with new state');
          });
        })
        .catch((err) => {
          //alert(JSON.stringify(err));
        });
    });
  }
  doRefresh() {
    this.fetchData();
  }
  endReached() {
    // 哎呀！到底啦！
  }
  pushToMain() {
    this.props.navigator.pop();
  }
  renderLeftItem() {
    return (
      <TouchableOpacity style={styles.topNavLeftViewStyle} onPress={() => this.pushToMain()}>
        <Image source={{uri:'back'}}  style={styles.topNavLeftIconStyle} />
      </TouchableOpacity>
    )
  }
  renderCenterItem() {
    return (
      <View style={styles.topNavCenterViewStyle}>
        <Text style={styles.topNavCenterIconStyle}>近半小时热门</Text>
      </View>
    )
  }
  renderRightItem() {
    return (
      <View style={styles.topNavRightViewStyle}>
        <Text style={styles.topNavRightIconStyle} > </Text>
      </View>
    )
  }
  renderRow(rowData) {
    return (
      <HalfHourHotCell
        image={rowData.image}
        title={rowData.title}
      />
    );
  }
  renderHeader() {
    return (
      <View style={styles.headerView}>
        <Text style={styles.headerText}>每5分钟更新一次</Text>
      </View>
    );
  }
  renderFooter() {
    return (
      <View style={styles.footerView}>
        <Text style={styles.footerText}>别扯了！到底啦～</Text>
      </View>
    );
  }
  renderListView() {
    if (this.state.loaded) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
          onEndReached={this.endReached}
          showHorizontalScrollIndicator={false}
          initialListSize={5}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.doRefresh}
              tintColor="silver"
              title="加载中..."
              titleColor="silver"
              colors={['silver', '#00ff00', '#0000ff']}
              progressBackgroundColor="#eeeeee"
            />
          }
        />
      );
    };
    return (
      <EmptyData />
    );
  }
  // 组件被渲染之前执行一次
  componentWillMount() {
    DeviceEventEmitter.emit('isHiddenTabbar', true);
  }
  // 组件渲染之后执行一次
  componentDidMount() {
    this.fatchData();
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
        {this.renderListView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  headerView: {
    flex: 1,
    height: 30,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  headerText: {
    fontSize: 12,
    color: '#cccccc',
  },
  footerView: {
    flex: 1,
    height: 30,
    alignItems:'center',
    justifyContent: 'center',
    backgroundColor: '#eeeeee',
  },
  footerText: {
    fontSize: 12,
    color: '#cccccc',
  },
  topNavLeftViewStyle: {
    width: 50,
    height: 20,
    marginLeft: 15,
  },
  topNavLeftIconStyle: {
    width: 20,
    height: 20,
  },
  topNavCenterViewStyle: {
    width: 120,
    height: 20,
    alignItems:'center',
    justifyContent: 'center',
  },
  topNavCenterIconStyle: {
    fontSize: 17,
    color: '#000000',
  },
  topNavRightViewStyle: {
    width: 50,
    height: 20,
    marginRight: 15,
  },
  topNavRightIconStyle: {
    fontSize: 17,
    color: 'green',
  },
});