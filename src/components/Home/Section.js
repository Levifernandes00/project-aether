import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';

import StartupCard from './StartupCard';
import api from './../../services/api';

export default class Section extends Component {
  _isMounted = false;
  
  state = {
    uid: "",
    startupList: [],
    user: {},
  }

  componentDidMount(){

    this.setStartupList(this.props);

    this._isMounted = true;
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.startupList !== this.state.startupList && this._isMounted){
      this.setStartupList(this.props);
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }


  async setStartupList(props) {
    const uid = await AsyncStorage.getItem("user");
    let route = '/startups';

    if(props !== undefined){
      const { category, search } = props;

      if(category){
        route += `/${category}`;
        
      }
      else if (search){
        route += `/search/${search}`
      }
    }

    const response = await api.get(route, {
      headers: {userid: uid},
    });

    this.setState({ startupList: response.data })
  }

  render() {
    
    return (

      <View style={styles.container}>
      {this.state.startupList && this.state.startupList.length !== 0 
         
        ? this.state.startupList.map((startup, index) => {
          return (
            <StartupCard
              key={startup._id} 
              startup={ startup }  
            />
          );
        })

        : (<Text style={styles.empty}>Opa ...</Text>)
      } 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  empty: {
    alignItems: 'center',
    color: '#999',
    marginTop: 20,
  },
});