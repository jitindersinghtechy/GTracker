import React, { Component } from "react";
import { Text, Button, View, FlatList, ActivityIndicator, StyleSheet, AsyncStorage,Image,RefreshControl  } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import AppHeader from '../header'
import EmployeeDetails from '../employeeDetails'
import { createStackNavigator } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import commonFunctions from '../common/functions'
class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Employees: [],
      loading: true,
      showFiler: false,
      EmployeeStatus: 1,
      currentMonthAppraisal: 0,
      searchText: '',
      allData: [],
      EmployeeStatusFilter: true,
      currentMonthAppraisalFilter: false,
      showAll: false,
      refreshing: false,
    }
    this.renderItem = this.renderItem.bind(this);
    this.getEmployeeListFromLocal = this.getEmployeeListFromLocal.bind(this);
  }
  _onRefresh= async () => 
   {
    this.setState({refreshing: true});
    var LoggedInEmployee   = await  commonFunctions._getStoreData('LoggedInEmployee');
     if(LoggedInEmployee){
      commonFunctions.getEmployeesListFromServer(LoggedInEmployee.OrganizationID);
     }
    setTimeout(()=>{
      this.getEmployeeListFromLocal();
      this.setState({refreshing: false});
    }, 2000)
  }
  componentWillMount() {
    this.setState({
      loading: true
    })
    this.getEmployeeListFromLocal();
  }
  getEmployeeListFromLocal = async () => {
    try {
      var value = await AsyncStorage.getItem('AllEmployeesList');
      if (value !== null) {
        value = JSON.parse(value)
        this.setState({
          allData: value,
          loading: false
        }, function () {
          this.state.allData.map((data) => {
            if (data.Status === 1) {
                this.state.Employees.push(data)
            }
          })
          this.setState({
            Employees:this.state.Employees
          })
        });
      }
    } catch (error) {
      this.setState({
        loading: false
      })
    }
  }
  getEmployeesList = async (SearchText, EmployeeStatus, currentMonthAppraisal) => {
    this.setState({
      Employees: [],
      loading: true,
      showAll: false,
      EmployeeStatus: EmployeeStatus != undefined ? EmployeeStatus : this.state.EmployeeStatus,
      SearchText: SearchText != undefined ? SearchText : this.state.SearchText,
      currentMonthAppraisal: currentMonthAppraisal != undefined ? currentMonthAppraisal : this.state.currentMonthAppraisal
    }, function () {
      if (SearchText === "ShowAll") {
        this.setState({
          Employees: this.state.allData,
          loading: false,
          showAll: true,
          EmployeeStatus: 0,
          SearchText: '',
          currentMonthAppraisal: 0,
          EmployeeStatusFilter: false,
          currentMonthAppraisalFilter: false,
        })
      } else {
        
        this.state.allData.map((data) => {

          if (data.Status == this.state.EmployeeStatus && data.Name.indexOf(this.state.SearchText) != -1 && data.currentMonthAppraisal == this.state.currentMonthAppraisal) {
              this.state.Employees.push(data)
          }
        })
        this.setState({
          Employees: this.state.Employees,
          loading: false,
          EmployeeStatusFilter: this.state.EmployeeStatus == 0? false : true,
          currentMonthAppraisalFilter: this.state.currentMonthAppraisal == 0 ? false : true,
          showAll:this.state.currentMonthAppraisal == 0 && this.state.EmployeeStatus == 0 ?true:false
        })
      } 

    })
  }
  showEmployeeInfo(item) {
    this.props.navigation.navigate('EmployeeDetails', { EmployeeDetails: item });
  }

  renderItem = ({ item }) => (
//     <Card containerStyle={{margin: 10, borderRadius: 4}}
//   title={item.Name}
//   >
//   <Image
//             style={styles.profileImg}
//             resizeMode="cover"
//             source={require('../../../assets/demo.jpg')}
//           />

//   <Text style={{marginTop:-50,marginLeft:70}}>
//   {item.Designation+' / '+item.Id}
//   </Text>
//   <Text style={{marginBottom: 12,marginTop:0,marginLeft:70}}>
//   Date of joining : {moment(item.JoiningDate).format("MM/DD/YYYY")}
//   </Text>
// </Card>
    <ListItem
      bottomDivider
      title={item.EmpCode?item.Name +' / ' + item.EmpCode:item.Name}
      subtitle={item.BloodGroup?item.Department+"\n"+'BloodGroup : '+item.BloodGroup:item.Department+"\n"+'BloodGroup : N/A'}
      leftAvatar={<Image
                    style={styles.profileImg}
                    resizeMode="cover"
                    source={require('../../../assets/demo.png')}
                  />
      }
      onPress={() => this.showEmployeeInfo(item)}
      // rightIcon={{ name: 'chevron-right' }}
      containerStyle={{ borderBottomColor: '#7171714f' }}
    />
  )
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
        <AppHeader openSideBar={this.props.navigation.openDrawer} getEmployeesList={this.getEmployeesList} loading={this.state.loading} search={true} title="Employees List" />
        <View>
          {this.state.loading ? <ActivityIndicator style={styles.loading} size="large" color="#0000ff" /> : this.state.Employees.length ? 
          <FlatList
         
            refreshControl={
            <RefreshControl
            colors={["#9Bd35A", "#689F38"]}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
           }
            data={this.state.Employees}
            renderItem={this.renderItem}
            keyExtractor={item => item.EmployeeId}
          /> : <Text style={styles.textCenter}>No Records Found!</Text>
          }
        </View>
        <ActionButton buttonColor="#1bb555"
          renderIcon={active => active ? (<Icon name="filter-list" type='MaterialIcons' color="#fff" />) : (<Icon name="filter-list" type='MaterialIcons' color="#fff" />)}>
          />}>
          <ActionButton.Item buttonColor={!this.state.showAll ? '#dddddd' : '#2dc84d'} title="See All" onPress={() => this.getEmployeesList('ShowAll')}>
            <Icon name="playlist-add-check" type='MaterialIcons' color="#fff" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={!this.state.EmployeeStatusFilter ? '#dddddd' : '#2dc84d'} title="Status Active" onPress={() => this.getEmployeesList(this.state.SearchText, this.state.EmployeeStatus == 0? 1 : 0, this.state.currentMonthAppraisal)}>
            <Icon name="verified-user" type='MaterialIcons' color="#fff" />
          </ActionButton.Item>
          <ActionButton.Item buttonColor={!this.state.currentMonthAppraisalFilter ? '#dddddd' : '#2dc84d'} title="Current Month Appraisal" onPress={() => this.getEmployeesList(this.state.searchText, this.state.EmployeeStatus, this.state.currentMonthAppraisal === 0 ? 1 : 0)}>
            <Icon name="attach-money" type='MaterialIcons' color="#fff" />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  loading: {
    paddingTop: 300
  },
  textCenter: {
    paddingTop: 300,
    alignSelf: 'center', 
    position: 'absolute'
  }, 
  profileImg: {
    height: 60,
    width: 60,
    borderRadius: 40,
  },

})
const App = createStackNavigator({
  Home: { screen: HomeScreen },
  EmployeeDetails: { screen: EmployeeDetails },
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