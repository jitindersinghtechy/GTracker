import React, { Component } from "react";
import {  Image, View, ScrollView, ActivityIndicator, ProgressBarAndroid,TouchableHighlight } from 'react-native';
import AppHeader from '../header'
import styles from '../style/details'
import Const from '../common/constant'
import { Card } from 'react-native-elements';
import * as d3 from 'd3'
import { Tooltip ,Text} from 'react-native-elements';
import ImageView from 'react-native-image-view';
import commonFunctions from "../common/functions";
var moment = require('moment');
const ReplacementImage = 'data:image/png;base64,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';
export default class TimeSheetDetails extends React.Component {
    state = {
        employee: this.props.navigation.state.params.EmployeeDetails,
        selectedDate: moment(this.props.navigation.state.params.selectedDate).format('YYYY-M-DD') ,
        employeeScreens: [],
        employeeScreensWithImg: [],
        isImageViewVisible:false,
        TimeDiff: 0,
        IdleTime: 0,
        ActualWork: 0,
        loading:true
    }
    goBack = () => {
        this.props.navigation.navigate('TimeSheet')
    }
    componentWillMount = async () => {
        var LoggedInEmployee   = await  commonFunctions._getStoreData('LoggedInEmployee');
     if(LoggedInEmployee){
        this.setState({
            OrganizationID : LoggedInEmployee.OrganizationID
        }, () => {
        this.getEmployeeScreens();
        })
     }
        this._isMounted = true;
    }
    getEmployeeScreens(){
        var body = {
            EmpCode: this.state.employee.EmpCode,
            DateForTimeSheet: this.state.selectedDate,
            OrganizationID: this.state.OrganizationID
        }
        fetch(Const.API_ROOT + Const.GET_EMPLOYEE_SCREENS, {
            method: 'POST',
            headers: Const.API_HEADER,
            body: JSON.stringify(body),
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.length) {
                    this.setState({
                        employeeScreens: responseJson,
                    })
                    var expensesByName = d3.nest()
                        .key(function (d) { return d.Hour; })
                        .entries(this.state.employeeScreens);
                    this.setState({
                        employeeScreensWithImg: expensesByName,
                        loading: false
                    })
                    this.getBase64Img(0);
                    this.getTimeSheetData();

                } else {
                    this.setState({
                        loading: false,

                    })
                }
            })
            .catch((error) => {
                this.setState({
                    loading: false
                })
                console.error(error);
            })
    }
    getTimeSheetData = () => {
        this.setState({
            Employees: [],
            loader: true
        })
        var body = {
            OrganizationID: this.state.OrganizationID,
            DateForTimeSheet: this.state.selectedDate,
            SelectedEmployeeId: this.state.employee.EmpCode,
            active: true
        }
        fetch(Const.API_ROOT + Const.GET_TIMING_DATA, {
            method: 'POST',
            headers: Const.API_HEADER,
            body: JSON.stringify(body),
        }).then((response) => response.json())
            .then((responseJson) => {
                responseJson = responseJson[0];
                this.setState({
                    TimeDiff: this.getHours(responseJson.TimeDiff),
                    IdleTime: this.getHours(responseJson.IdleTime),
                    ActualWork: this.getHours(responseJson.ActualWork),
                    pageLoaded:true
                })
            })
            .catch((error) => {
                this.setState({
                    pageLoaded:true
                })
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
        return hours + " : " + minutes;
    }
    componentWillUnmount = () => {
        this._isMounted = false;
    }
    async getBase64Img(i) {
        if (this._isMounted) {
            var body = {
                organizationID: 1,
                employeeCode: this.state.employee.EmpCode,
                date: this.state.employeeScreens[i].ImgFolder,
                imageName: this.state.employeeScreens[i].ImageName,
                token: "$5klpow4"
            }
            var ImageName = this.state.employeeScreens[i].ImageName;
            try {
                const res = await fetch(Const.API_ROOT + Const.GET_EMPLOYEE_BASE64_IMAGE, {
                    method: 'POST',
                    headers: Const.API_HEADER,
                    body: JSON.stringify(body),
                });
                const responseJson = await res.json();
                if (responseJson.GetEmployeeImageBase64Result) {
                    this.state.employeeScreens[i]["imgString"] = `data:image/png;base64,${responseJson.GetEmployeeImageBase64Result}`;

                    this.setState({
                        employeeScreens: this.state.employeeScreens,
                    })
                }
                this.setState({
                    ['imgloader' + ImageName]: true
                })
                i++;
                if (i < this.state.employeeScreens.length) {
                    this.getBase64Img(i)
                }
            } catch (e) {
                i++;
                if (i < this.state.employeeScreens.length) {
                    this.getBase64Img(i)
                }
                this.setState({
                    ['imgloader' + ImageName]: true
                })
            }
        }
    }
    getIdleStatus(IsIdleTime, KeyStrokes, MouseStrokes) {
        if (IsIdleTime > 0) {
            return 0;
        } else {
            var progress = parseInt((KeyStrokes + MouseStrokes) * 100 / 600)
            if (progress > 100) {
                progress = 100;
            }
            return progress;
        }
    }
    tConvert(time) {
        // Check correct time format and split into components
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join(''); // return adjusted time or original string
    }
    getActualTime(time) {
        if (time) {
            var actualTime = time.split("T")[1].split('.')[0];
            return this.tConvert(actualTime);
        }

    }
    showImg = (url) =>{
        this.setState({
            imgToShow:url,
            isImageViewVisible:true
        })
    }
    render() {
        return (
            <View>
                <ImageView
    images={[
        {
            source: {
                uri: this.state.imgToShow,
            }, 
        },
    ]}
    onClose = {()=>this.setState({isImageViewVisible:false})}
    imageIndex={0}
    isVisible={this.state.isImageViewVisible}
/>
                <AppHeader title="Time Sheet Details" goBack={this.goBack} back={true} />
                <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text>{this.state.employee.Name + ' (' + this.state.employee.EmpCode + ')' + ' / ' + this.state.selectedDate}</Text>
                </View>
                </View>
                <View style={styles.row}>
                <View style={styles.inputWrap}>
                <Text>Total Time: {this.state.TimeDiff}</Text>
                </View>
                <View style={styles.inputWrap}>
                <Text>Idle Time: {this.state.IdleTime}</Text>
                </View>
                <View style={styles.inputWrap}>
                <Text>Work: {this.state.ActualWork}</Text>
                </View>
                </View>
                <View>
                    {this.state.loading?<ActivityIndicator style={styles.loading} size="large" color="#0000ff" />:
                    <ScrollView style={{ marginBottom: 300 }}>
                        {this.state.employeeScreensWithImg.length ? this.state.employeeScreensWithImg.map((data, i) => (
                            <View key={i}>
                                <Text style={{marginTop:15}} h4>{this.tConvert(data.key.length < 2 ? '0' + data.key + ":00:00" : data.key + ":00:00")}</Text>
                                <View>
                                    {data.values.map((tile, j) => (
                                        <Card key={j} containerStyle={styles.containerStyleTimeSheet}>
                                            {this.state['imgloader' + tile.ImageName] ? <TouchableHighlight onPress={() => this.showImg(tile.imgString)}><Image 
                                                style={styles.timeSheetImage}
                                                source={{ uri: tile.imgString ? tile.imgString : ReplacementImage }}
                                            /></TouchableHighlight>  : <View style={styles.timeSheetImage}><ActivityIndicator style={{ marginTop: 50 }} size="large" color="#0000ff" /></View>}
                                            <Tooltip containerStyle={{ height:70 }} popover={<Text style={{color:'#fff'}}>
                                                Mouse Strokes :   {tile.MouseStrokes}{"\n"}
                                                Key Strokes :   {tile.KeyStrokes}{"\n"}
                                                Percentage   :   {this.getIdleStatus(tile.IsIdleTime, tile.KeyStrokes, tile.MouseStrokes)}
                                            </Text>}>
                                                <View style={parseInt(tile.KeyStrokes + tile.MouseStrokes) === 0 ? styles.backgroundRed : this.getIdleStatus(tile.IsIdleTime, tile.KeyStrokes, tile.MouseStrokes) < 5 ? styles.backgroundYellow : styles.titleDiv}>
                                                    <View>
                                                        <Text> {this.getActualTime(tile.DateOfScreenshot)}</Text>
                                                    </View>
                                                    <ProgressBarAndroid
                                                        styleAttr="Horizontal"
                                                        indeterminate={false}
                                                        progress={this.getIdleStatus(tile.IsIdleTime, tile.KeyStrokes, tile.MouseStrokes) / 100}
                                                    />
                                                </View>
                                            </Tooltip>
                                        </Card>
                                    ))}
                                </View>
                            </View>
                        )) : <View>
                                <Text style={{textAlign:"center"}}>
                                    No screenshot found!
                        </Text>
                            </View>}
                    </ScrollView>}
                </View>


            </View>
        );
    }
}

