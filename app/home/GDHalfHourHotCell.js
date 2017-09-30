/**
 * 近半小时热门 － 行数据
 *
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  Dimensions,
  Platform,
} from 'react-native';

const {width, heihgt} = Dimensions.get('window');

export default class GDHalfHourHotCell extends Component {
  static propTypes = {
    image: PropTypes.string,
    title: PropTypes.string,
  }
  render() {
    return (
      <View style={styles.container} >
        <Image source={{uri:this.props.image}} style={styles.imageStyle} />
        <View>
          <Text numberOfLines={3} style={styles.textStyle}>{this.props.title}</Text>
        </View>
        <Image source={{uri:'icon_cell_rightArrow'}} style={styles.imageArrowStyle} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    marginBottom: 0.5,
    paddingTop: 4,
    paddingBottom: 4,
  },
  imageStyle: {
    marginLeft:10,
    marginRight:0,
    width: 70,
    height: 70,
  },
  textStyle: {
    width: width * 0.60,
  },
  imageArrowStyle: {
    width: 10,
    height: 10,
    marginRight:10
  },
});