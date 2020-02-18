import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';

import StartupCard from './StartupCard';
import api from './../../services/api';

export default class Section extends Component {
  constructor() {
    super();
  }

  state = {
    uid: "",
    startupList: [],
    user: {},
  }

  componentDidMount(){
    this.setStartupList();
  }
  
  componentDidUpdate(prevProps, prevState) {
    if(prevState.startupList !== this.state.startupList){
      this.setStartupList();
    }
  }


  async setStartupList() {
    const uid = await AsyncStorage.getItem("user");
    console.log(uid);

    const response = await api.get('/startups', {
      headers: {userid: uid},
    });

    this.setState({ startupList: response.data })
  }

  render() {
    
    return (

      <View style={styles.container}>
      {this.state.startupList 
         
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
    marginRight: 20,
  },

  empty: {
    alignItems: 'center',
    color: '#999',
    marginTop: 20,
  },
});