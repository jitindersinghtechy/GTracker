import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/components/login/login'
import FlashMessage from "react-native-flash-message";
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginScreen />
        <FlashMessage position="top" />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
