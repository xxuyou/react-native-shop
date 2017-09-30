/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
} from 'react-native';
import Main from './app/main/GDMain';

export default class GD extends Component {
  render() {
    return (
      <Main />
    );
  }
}

AppRegistry.registerComponent('GD', () => GD);
