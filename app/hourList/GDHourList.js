/**
 * 小时风云榜 － 主框架
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
  InteractionManager,
  RefreshControl,
} from 'react-native';
import TopNav from '../main/GDTopNav';
import Search from '../home/GDSearch';
import HourCell from './GDHourCell';
import EmptyData from '../main/GDEmpty';

export default class GDHourList extends Component {
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
    fetchURI: 'http://guangdiu.com/api/getranklist.php',
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
          alert(JSON.stringify(err));
        });
    });
  }
  doRefresh() {
    this.fetchData();
  }
  endReached() {
    // 哎呀！到底啦！
  }
  pushToSearch() {
    this.props.navigator.push({
      component: Search
    });
  }
  renderRow(rowData) {
    return (
      <HourCell
        image={rowData.image}
        title={rowData.title}
      />
    );
  }
  renderListView() {
    if (this.state.loaded) {
      return (
        <ListView
          dataSource={this.state.dataSource}
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
  renderLeftItem() {
    return (
      <TouchableOpacity style={styles.topNavLeftViewStyle}>
        <Image source={{uri:'back'}}  style={styles.topNavLeftIconStyle} />
      </TouchableOpacity>
    )
  }
  renderCenterItem() {
    return (
      <TouchableOpacity>
        <Image source={{uri:'navtitle_rank_106x20'}}  style={styles.topNavCenterIconStyle} />
      </TouchableOpacity>
    )
  }
  renderRightItem() {
    return (
      <TouchableOpacity onPress={() => {this.pushToSearch()}} style={styles.topNavRightViewStyle}>
        <Image source={{uri:'search_icon_20x20'}}  style={styles.topNavRightIconStyle} />
      </TouchableOpacity>
    )
  }
  // 组件被渲染之前执行一次
  componentWillMount() {
  }
  // 组件渲染之后执行一次
  componentDidMount() {
    this.fatchData();
  }
  // 组件被销毁之前执行一次
  componentWillUnmount() {
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
  topNavLeftViewStyle: {
    width: 50,
    height: 20,
  },
  topNavLeftIconStyle: {
    width: 20,
    height: 20,
    marginLeft: 15,
  },
  topNavCenterIconStyle: {
    width: 106,
    height: 20,
  },
  topNavRightViewStyle: {
    width: 50,
    height: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  topNavRightIconStyle: {
    width: 20,
    height: 20,
    marginRight: 15,
  },
});