import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import PropTypes from 'prop-types';
import { ScrollView, Text, View, Image, FlatList ,Alert,AsyncStorage} from 'react-native';
import { ListItem,Icon } from 'react-native-elements';
import { DrawerActions } from 'react-navigation';
import styles from './style'

class DrawerScreen extends Component {
  state = {
    activeNav: 'Employees',
    menus: [
      {
        Name: "Dashboard",
        Action: "Home1",
        icon: 'widgets',
        iconType:'MaterialIcons'
      },
      {
        Name: "Employees",
        Action: "Employees",
        icon: 'group',
        iconType:'MaterialIcons'
      },
      {
        Name: "Time Sheet",
        Action: "TimeSheet",
        icon: 'timeline',
        iconType:'MaterialIcons'
      }
    ],
    footerMenu:[
      {
        Name: "About",
        Action: "About",
        icon: 'info',
        iconType:'MaterialIcons'
      },
      {
        Name: "Logout",
        Action: "LoginScreen",
        icon: 'power-settings-new', 
        iconType:'MaterialIcons'
      }
    ]
  }
  navigateToScreen = (route) => () => {
    if(route === "LoginScreen"){
      Alert.alert(
        'Confirm',
        'Are you sure you want to logout?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Logout', onPress: () => this.logout()},
        ],
      )
    }else{
      const navigateAction = NavigationActions.navigate({
        routeName: route
      });
      this.props.navigation.dispatch(navigateAction);
      this.props.navigation.dispatch(DrawerActions.closeDrawer())
      this.setState({
        activeNav: route
      })
    }
  }
  logout = async () => {
    try {
      await AsyncStorage.removeItem('LoggedInEmployee');
      await AsyncStorage.removeItem('AllEmployeesList');
    } catch (error) {
      // Error saving data
    }
    this.props.navigation.navigate('LoginScreen')
  }
  renderItem = ({ item }) => (
    <ListItem
      bottomDivider
      containerStyle={{ borderBottomColor: '#cccccc38'}}
      title={item.Name}
      leftIcon={<Icon 
        name={item.icon}
        type= {item.iconType}
        color='#517fa4'
      />}
      onPress={this.navigateToScreen(item.Action)}
    />
  )
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{borderBottomColor: '#cccccc38'}}>
          <View style={styles.container}>
            <View style={styles.logoContainer}>
              <Image
                style={{ width: 240, height: 80 }}
                source={require('../../../assets/GTracker-logo.png')}
              />
            </View>
            <Text style={styles.settingText}>{this.props.navigation.state.params.EmployeeName}</Text>
            <FlatList
              data={this.state.menus}
              renderItem={this.renderItem}
              keyExtractor={item => item.Name}
            />
          </View>
        </ScrollView>
        <View style={{position: 'absolute', left: 0, right: 0, bottom: 0}}>
        <Text style={styles.settingText}>Settings</Text>
        <FlatList 
              data={this.state.footerMenu}
              renderItem={this.renderItem}
              keyExtractor={item => item.Name}
            />
        </View>
      </View>
    );
  }
}

DrawerScreen.propTypes = {
  navigation: PropTypes.object
};

export default DrawerScreen;
