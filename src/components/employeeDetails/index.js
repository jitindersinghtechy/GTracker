import React, { Component } from 'react';
import Const from '../common/constant'
import { Card } from 'react-native-elements';
var moment = require('moment');
import {
  Text,
  View,
  Image, NetInfo, AsyncStorage, StyleSheet, Dimensions, Platform,
  ImageBackground,
} from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import AppHeader from '../header';
import styles from '../style/details'
import commonFunction from '../common/functions'
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }
  state = {
    employee: this.props.navigation.state.params.EmployeeDetails,
    index: 0,
    routes: [
      { key: 'employeeCode', title: 'Employee' },
      { key: 'demoraphicDetail', title: 'Demoraphic' },
      { key: 'contactDetails', title: 'Contact' },
      { key: 'companyDetail', title: 'Company' }
    ],
  }
  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );
  goBack() {
    this.props.navigation.navigate('Home')
  }
  componentWillMount() {


  }

  updateEmployeeData = async (responseJson) => {
    try {
      var value = await AsyncStorage.getItem('AllEmployeesList');
      if (value !== null) {
        value = JSON.parse(value)
        var dataPosition = -1;
        value.map((data, index) => {
          if (responseJson.EmployeeId == data.EmployeeId) {
            dataPosition = index
          }
        })
        value[dataPosition] = responseJson
        commonFunction._storeData('AllEmployeesList', value)
      }
    } catch (error) {

    }
  }
  _renderScreens = ({ route }) => {
    switch (route.key) {
      case 'employeeCode':
        return <EmployeeCode employee={this.state.employee} />;
      case 'demoraphicDetail':
        return <DemoraphicDetail employee={this.state.employee} />;
      case 'contactDetails':
        return <ContactDetails employee={this.state.employee} />;
      case 'companyDetail':
        return <CompanyDetail employee={this.state.employee} />;
      default:
        return <EmployeeCode employee={this.state.employee} />;
    }
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <AppHeader title="Employee Details" goBack={this.goBack} back={true} />
        <TabView
          navigationState={this.state}
          renderTabBar={this._renderTabBar}
          renderScene={this._renderScreens}
          onIndexChange={index => this.setState({ index })}
        />

      </View>
    );
  }
}
class EmployeeCode extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={require('../../../assets/demo.png')}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={require('../../../assets/demo.png')}
            />
            <Text style={styles.userNameText}>{this.props.employee.Name}</Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {this.props.employee.EmpCode}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <Card containerStyle={styles.containerStyle}
          >
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Id</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.Id}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Status</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.Status === 1 ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>JoiningDate</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{moment(this.props.employee.JoiningDate).format("ddd, DD MMM YYYY")}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}

class DemoraphicDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.containerStyle}>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Name</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.Name}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Father's Name</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.FatherName}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Pan Number</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.PanNumber}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Adhar Card Number</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.AdharCardNumber}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Date Of Birth</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{moment(this.props.employee.DateOfBirth).format("DD MMM YYYY")}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}
class ContactDetails extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.containerStyle}>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Correspondence Address</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.CorrespondenceAddress}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Permanent Address</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.PermanentAddress}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Contact Number1</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.ContactNumber1}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Contact Number2</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.ContactNumber2}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Personal EmailId</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.PersonalEmailId}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Official EmailId</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.OfficialEmailId}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Official Email Password</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.OfficialEmailPassword}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>SkypeId</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.SkypeId}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}
class CompanyDetail extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Card containerStyle={styles.containerStyle}>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Designation</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.Designation}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Department</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.Department}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>BankId</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.BankId}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>Bank Account Number</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.BankAccountNumber}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.inputWrap}>
              <Text>IFSCCode</Text>
            </View>
            <View style={styles.inputWrap}>
              <Text>{this.props.employee.IFSCCode}</Text>
            </View>
          </View>
        </Card>
      </View>
    );
  }
}