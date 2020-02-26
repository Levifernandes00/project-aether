import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

import SearchBar from '../components/Home/SearchBar';
import CategorySection from '../components/Home/CategorySection';
import Section from '../components/Home/Section';

import api from './../services/api';

export default class Register extends Component {

  state = {
    
    uid: "",
    displayName: "",
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    const user = firebase.auth().currentUser;
  }
  
 
  render() {
    return (
      <View style={styles.container}>
        <SearchBar />

        <ScrollView style={{ paddingLeft: 20 }}>
          <Text style={styles.title}>Categories</Text>
          <CategorySection />

          <Text style={styles.title}>Startups available</Text>
          <Section />
        </ScrollView>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
  },

  title: {
    marginTop: 10,
    color: '#2B93B6',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
