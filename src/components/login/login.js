import React, { Component } from "react";

import styles from "./style";
import { Button,Keyboard, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, Image, NetInfo,AsyncStorage } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from '../side-menu'
import Const from '../common/constant'
import { showMessage, hideMessage } from "react-native-flash-message";
import commonFunctions from '../common/functions'
class LoginScreen extends React.Component {
  state = {
    username: '',
    password: '',
    loading: false
  }

  componentWillMount() {
  this._retrieveData();
  }
  _storeData = async (data) => {
    try {
      await AsyncStorage.setItem('LoggedInEmployee', JSON.stringify(data));
    } catch (error) {
      // Error saving data
    }
  }
  _retrieveData = async () => {
    try {
      var value = await AsyncStorage.getItem('LoggedInEmployee');
      if (value !== null) {
        value = JSON.parse(value)
        commonFunctions.getEmployeesListFromServer(value.OrganizationID);
        this.props.navigation.navigate('Home', { EmployeeName: value.Name })
      }
     } catch (error) {
       // Error retrieving data
     }
  }
  onLoginPress() {
    NetInfo.isConnected.fetch().done(
      (isConnected) => {
        if (isConnected) {  
          this.setState({
            loading: true
          }, function () {
            body = {
              OfficialEmailId: this.state.username,
              password: this.state.password
            }
            fetch(Const.API_ROOT + Const.VALIDATE_USER, { 
              method: 'POST',
              headers: Const.API_HEADER,
              body: JSON.stringify(body),
            }).then((response) => response.json())
              .then((responseJson) => {
                this.setState({
                  loading: false
                })
               if (responseJson.length) {
                if (responseJson[0].RoleId === 1) {
                  this._storeData(responseJson[0]);
                  this.props.navigation.navigate('Home', { EmployeeName: responseJson[0].Name })
                  commonFunctions.getEmployeesListFromServer(responseJson[0].OrganizationID);
                } else {
                  showMessage({
                    message: "Error",
                    description: "Sorry! only administrator can login.",
                    icon: "danger",
                    type: "danger",
                  });
                }
                
                } else {
                  showMessage({
                    message: "Error",
                    description: "Invalid username or password!",
                    icon: "danger",
                    type: "danger",
                  });
                }
              })
              .catch((error) => {
                console.error(error);
              })
          });
        } else {
          showMessage({
            message: "Error",
            description: "No internet connection!",
            icon: "danger",
            type: "danger",
          });
        }
      }
    );

  }
  render() {
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior="padding">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
              <View style={styles.logoContainer}>
                <Image
                  style={{ width: 80, height: 80 }}
                  source={require('../../../assets/icon.png')}
                />
              </View>
              <TextInput placeholder="Username" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(username) => this.setState({ username })} value={this.state.username} />
              <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} onChangeText={(password) => this.setState({ password })} value={this.state.password} secureTextEntry={true} />
              <View style={styles.loginButton}>
                <Button
                  title={'Login'}
                  onPress={() => this.onLoginPress()}
                />
              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const App = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  Home: { screen: Home },
},
  {
    headerMode: 'none',
    cardStyle: { backgroundColor: '#FFFFFF' },
    navigationOptions: {
      headerVisible: false,
    }
  }
);
export default App;