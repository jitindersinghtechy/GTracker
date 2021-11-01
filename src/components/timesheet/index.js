import React, { Component } from "react";
import { Text, Image, View, ActivityIndicator, ScrollView,TouchableHighlight  } from 'react-native';
import AppHeader from '../header'
import styles from '../style/details'
import { Card } from 'react-native-elements';
import Const from '../common/constant'
import commonFunctions from "../common/functions";
import DatePicker from 'react-native-datepicker'
import TimeSheetDetails from '../timesheetdetails'
import { createStackNavigator } from 'react-navigation';
import SearchableDropdown from 'react-native-searchable-dropdown';
var moment = require('moment');
class TimeSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            EmployeesTimeSheet: [],
            loading: true,
            EmployeesList:[{
                id: '',
                name: 'All',
              }],
            selectedDate:moment().format('YYYY-MM-DD'),
            SelectedEmployeeId:''
        }
    }
    componentWillMount = async () => {
     var LoggedInEmployee   = await  commonFunctions._getStoreData('LoggedInEmployee');
     if(LoggedInEmployee){
        this.setState({
            OrganizationID : LoggedInEmployee.OrganizationID
        }, () => {
        this.getTimeSheetData();
        })
     }
     this.getEmployeeListFromLocal();
    }
    getEmployeeListFromLocal = async () => {
        try {
          var value   = await  commonFunctions._getStoreData('AllEmployeesList');
          if (value !== null) {
            var item = {};
            value.map((tile, j) => (
              tile.Status == "1"?item.name = tile.Name:'',
              tile.Status == "1"?item.id = tile.EmpCode:'',
              tile.Status == "1"?this.state.EmployeesList.push(item):'',
              item = {}
          ))
            this.setState({
                EmployeesList: this.state.EmployeesList,
            })
            console.log('EmployeesList'+JSON.stringify(this.state.EmployeesList))
          }
        } catch (error) {
        }
      }
    getTimeSheetData = () => {
        this.setState({
            EmployeesTimeSheet: [],
            loading: true
        })
        var body = {
            OrganizationID: this.state.OrganizationID,
            DateForTimeSheet: moment(this.state.selectedDate).format('YYYY-M-DD'),
            SelectedEmployeeId:this.state.SelectedEmployeeId,
            active: true
        } 
        fetch(Const.API_ROOT + Const.GET_TIMING_DATA, {
            method: 'POST',
            headers: Const.API_HEADER,
            body: JSON.stringify(body),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length) {
                    this.setState({
                        EmployeesTimeSheet: responseJson,
                        loading: false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }
    getHours = (minutes) => {
        var hours = Math.floor(minutes / 60);
        var minutes = (minutes % 60)
        if (hours < 0) {
            hours = 0;
        }
        if (minutes < 0) {
            minutes = 0;
        }
        return hours + " hours " + minutes + " minutes";
    }
    handleChange= (date)=>{
        this.setState({
            selectedDate: date
        }, () => {
            this.getTimeSheetData();
        })
    }
    goToDetails = (data) =>{
        this.props.navigation.navigate('TimeSheetDetails', { EmployeeDetails: data,selectedDate:this.state.selectedDate });
    }
    render() {
        return (
            <View>
                <AppHeader openSideBar={this.props.navigation.openDrawer} title="Time Sheet" />
                <View style={styles.row}>
                <View style={[styles.inputWrap,styles.DatePicker]}>
                <DatePicker
        date={this.state.selectedDate}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36,
            borderColor:'#cccccc3d'
          },
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.handleChange(date)}}
      />
      </View>
      <View style={styles.inputWrap}>
      <SearchableDropdown 
            //   onTextChange={text => alert(text)}
        onItemSelect={(item) => this.setState({ SelectedEmployeeId: item.id }, () => {
            this.getTimeSheetData();
        })}
        containerStyle={{ padding: 5 }}
        textInputStyle={{
          padding: 12,
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 5
        }}
        itemStyle={{
          padding: 10,
          marginTop: 2,
          backgroundColor: '#ddd',
          borderColor: '#bbb',
          borderWidth: 1,
        }}
        itemTextStyle={{ color: '#222' }}
        itemsContainerStyle={{ maxHeight: 140, 
        //      position: 'absolute',
        // right: 0,
        // top: 53,
        // marginLeft: 10
         }}
        items={this.state.EmployeesList}
        defaultIndex={2}
        placeholder="Search Employee"
        resetValue={false}
        underlineColorAndroid="transparent"
      />
      </View>
                </View>
              
                {this.state.loading ? <ActivityIndicator style={styles.loading} size="large" color="#0000ff" /> :
                    <ScrollView style={{marginBottom:180,zIndex: 0}}>
                        {this.state.EmployeesTimeSheet.map((data, j) => {
                            return (
                                <TouchableHighlight  onPress={() => this.goToDetails(data)} key={j} underlayColor='#fff'>
                                <Card containerStyle = {styles.containerStyle} 
                                    title={data.Name}>
                                    <View style={styles.row}>
                                        <View style={styles.ImgWrap}>
                                            <Image
                                                style={styles.profileImg}
                                                resizeMode="cover"
                                                source={require('../../../assets/demo.png')}
                                            />
                                        </View>
                                        <View style={styles.inputWrap}>
                                            <Text>{data.EmpCode + "\n" + data.Designation}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.inputWrap}>
                                            <Text>Hour Worked</Text>
                                        </View>
                                        <View style={styles.inputWrap}>
                                            <Text>{data.TimeDiff ? this.getHours(data.TimeDiff) : '0'}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.inputWrap}>
                                            <Text>Idle Time</Text>
                                        </View>
                                        <View style={styles.inputWrap}>
                                            <Text>{data.IdleTime ? this.getHours(data.IdleTime) : '0'}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.row}>
                                        <View style={styles.inputWrap}>
                                            <Text>Actual Work</Text>
                                        </View>
                                        <View style={styles.inputWrap}>
                                            <Text>{data.ActualWork ? this.getHours(data.ActualWork) : '0'}</Text>
                                        </View>
                                    </View>
                                </Card>
                                </TouchableHighlight>
                            );
                        })}
                    </ScrollView>}




            </View>
        );
    }
}
const App = createStackNavigator({
    TimeSheet: { screen: TimeSheet },
    TimeSheetDetails: { screen: TimeSheetDetails },
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

