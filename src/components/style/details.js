
import {
Platform
} from 'react-native';
export default {

    header:{
        backgroundColor: "#1bb555",
        height:120,
      },
      avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom:10,
        alignSelf:'center',
        position: 'absolute',
        marginTop:130
      },
      name:{
        fontSize:22,
        color:"#FFFFFF",
        fontWeight:'600',
      },
      bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding:10,
      },
      name:{
        fontSize:28,
        color: "#696969",
        fontWeight: "600"
      },
      info:{
        fontSize:22,
        color: "#1bb555",
        marginTop:10
      },
      description:{
        fontSize:16,
        color: "#696969",
        marginTop:10,
        textAlign: 'center'
      },
      buttonContainer: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom:20,
        width:250,
        borderRadius:30,
        backgroundColor: "#00BFFF",
      },
       mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 200
      }, container: {
        flex: 1,
      },
      tabbar: {
        backgroundColor: '#3f51b5',
      },
      tab: {
        width: 120,
      },
      indicator: {
        backgroundColor: '#ffeb3b',
      },
      label: {
        color: '#fff',
        fontWeight: '400',
        textAlign:'center'
      },
      cardContainer: {
        backgroundColor: '#FFF',
        borderWidth: 0,
        flex: 1,
        margin: 0,
        padding: 0,
      },
      emailContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
      },
      headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35,
      },
      headerContainer: {},
      headerColumn: {
        backgroundColor: 'transparent',
        ...Platform.select({
          ios: {
            alignItems: 'center',
            elevation: 1,
            marginTop: -1,
          },
          android: {
            alignItems: 'center',
          },
        }),
      },
      scroll: {
        backgroundColor: '#FFF',
      },
      telContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        paddingTop: 30,
      },
      userAddressRow: {
        alignItems: 'center',
        flexDirection: 'row',
      },
      userCityRow: {
        backgroundColor: 'transparent',
      },
      userCityText: {
        color: '#fff',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
      },
      userImage: {
        borderColor:'#1bb555',
        borderRadius: 85,
        borderWidth: 3,
        height: 170,
        marginBottom: 15,
        width: 170,
      },
      userNameText: {
        color: '#FFF',
        fontSize: 22,
        fontWeight: 'bold',
        paddingBottom: 8,
        textAlign: 'center',
      },
      containerStyle:{
        borderRadius: 4,zIndex: 0
      },row: {
        flexDirection: "row"
      },
      inputWrap: {
        flex: 1,
        borderColor: "#cccccc3d",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding:2
      },
     ImgWrap: {
        borderColor: "#cccccc3d",
        borderBottomWidth: 1,
        marginBottom: 10,
        padding:5,
        width:80,
        textAlign:'center'
      },
      profileImg:{
       height:50,
       width:50,
       marginTop:-12,
       marginRight:30
      },
      loading:{
        marginTop:230
      },
      containerStyleTimeSheet:{
        borderRadius: 4,
        padding:10,
        height:220
      },
      timeSheetImage:{
        height: 150, width: '100%'
      },titleDiv: {
        padding: 5,
        marginTop:5
    },
    backgroundYellow: {
        backgroundColor: 'yellow',
        padding: 5,
        marginTop:5
    },
    backgroundRed: {
        backgroundColor: 'red',
        padding: 5,
        marginTop:5
    },
    DatePicker:{
      marginTop:15
    }
};
