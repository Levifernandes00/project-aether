import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as firebase from 'firebase';

import SearchBar from '../components/Home/SearchBar';
import CategorySection from '../components/Home/CategorySection';
import Section from '../components/Home/Section';

export default class Register extends Component {

  constructor() {
    super();
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
  }
  
  state = {
    uid: "",
    email: "",
    displayName: "",
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    const { email, displayName, uid } = firebase.auth().currentUser
    this.setState({ email, displayName, uid })
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
