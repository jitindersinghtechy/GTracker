import React, { Component } from "react";
import { Text, Image, View,StyleSheet } from 'react-native';
import AppHeader from '../header'
import styles from '../style/details'
export default class HomeScreen extends React.Component {
  render() {
    return (
      <View>
        <AppHeader openSideBar={this.props.navigation.openDrawer} title="Home" />
        <View style={styles.mainContainer}>
          <Image
            style={{ width: 80, height: 80 }}
            source={require('../../../assets/icon.png')}
          />
          <View style={styles.body}>
            <View style={styles.bodyContent}>
              <Text style={styles.info}>Welcome To GTracker</Text>
             
            </View>
        </View>
        </View
        >

      </View>
    );
  }
}

