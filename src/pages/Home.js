import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import * as firebase from "firebase";

import SearchBar from '../components/Home/SearchBar'

export default class Register extends Component {
  state = {
    email: "",
    displayName: "",
  }

  componentDidMount() {
    const { email, displayName } = firebase.auth().currentUser;
    
    this.setState({ email, displayName })
  }

  signOutUser = () => {
    firebase.auth().signOut;
  }


  render() {
    return (
        <View style={styles.container}>
            <SearchBar />
            
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: 25,
    },
});
