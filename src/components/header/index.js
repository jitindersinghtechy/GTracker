import React from "react";
import { View, Text } from 'react-native'
import { Header, SearchBar } from 'react-native-elements'
export default class AppHeader extends React.Component {
  state = {
    searchBar: false,
    searchValue: ''
  }
  onCancelSearch() {
    this.setState({ searchBar: false })
    this.props.getEmployeesList('')
  }
  onChangeText = text => {
    this.props.getEmployeesList(text);
  }
  toggleSearch(){
    this.setState({
      searchBar: !this.state.searchBar
    }, function () {
            if(!this.state.searchBar){
              this.props.getEmployeesList('')
            }
    });
  }
  render() {
    return (
      <View>
        <Header
        containerStyle={{ backgroundColor: '#1bb555',borderBottomColor: '#1bb555' }} 
          leftComponent= {this.props.back?{ icon: 'arrow-back', color: '#fff', onPress: () => this.props.goBack() }:{ icon: 'menu', color: '#fff', onPress: () => this.props.openSideBar() }} 
          centerComponent={{ text: this.props.title, style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
          rightComponent={this.props.search?{ icon: !this.state.searchBar?'search':'close', color: '#fff', onPress: () => this.toggleSearch() }:<View></View>}
        />
        {this.state.searchBar ?
          <SearchBar
            lightTheme
            showLoading={this.props.loading}
            cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }}
            placeholder='Search'
            onClear={() => this.setState({ loading: false })}
            onChangeText={(text) => this.props.getEmployeesList(text)}
            onCancel={() => this.onCancelSearch()}
          /> : <View></View>}
      </View>

    );
  }
}