/**
 * 空数据页面
 *
 * @flow
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class GDEmpty extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>糟糕！没有数据！</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: '#cccccc',
  }
});