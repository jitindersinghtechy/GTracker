import {createDrawerNavigator, createAppContainer} from 'react-navigation'
import Home from '../home/home'
import About from '../about'
import Employees from '../employees'
import TimeSheet from '../timesheet'
import DrawerScreen from './drawer'
const AppDrawerNavigator = createDrawerNavigator({
  Home1 : Home,
  About:About,
  Employees:Employees,
  TimeSheet:TimeSheet
},{
  initialRouteName: 'Home1',
  contentComponent: DrawerScreen
})
export default AppDrawerNavigator; 