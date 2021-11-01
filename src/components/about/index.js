import React, { Component } from "react";
import { Text, Image, View,StyleSheet } from 'react-native';
import AppHeader from '../header';
import styles from '../style/details';
var moment = require('moment');
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <AppHeader openSideBar={this.props.navigation.openDrawer} title="About" />
        <View style={styles.mainContainer}>
          <Image
            style={{ width: 80, height: 80 }}
            source={require('../../../assets/icon.png')}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.name}>GTracker</Text>
              <Text style={styles.info}>Version 1.0</Text>
              <Text style={styles.description}>© {moment().format('YYYY')} Techbit All Rights Reserved</Text>
            </View>
        </View>
        </View
        >

      </View>
    );
  }
}


