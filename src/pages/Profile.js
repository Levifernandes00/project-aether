import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";

import * as firebase from 'firebase';
import { uriToBlob, uploadToFirebase, linkResume } from '../api/profileApi';
import api from './../services/api';

export default class Profile extends Component {
  constructor() {
    super();
    console.ignoredYellowBox = [
      'Setting a timer'
    ];
  }


  state = {
    uid: "",
    name: "",
    email: "",
    phone: "",
    
    modalVisible: false,
  }


  componentDidMount() {
    StatusBar.setHidden(true);
    const { uid, displayName, email, phoneNumber } = firebase.auth().currentUser;
    this.setState({ uid, email, name: displayName, phone: phoneNumber,});
  }

  async signOutUser() {
    firebase.auth().signOut();
    await AsyncStorage.clear();
    this.props.navigation.navigate("Loading");
  }

 

  handleResumePress = () => {
    DocumentPicker.getDocumentAsync({})
    .then(result => {

      if( result.type !== 'cancel'){
        const { uri } = result;
        return uriToBlob(uri);
      }
        
    })
    .then(blob => {
      return uploadToFirebase(blob, "resume", this.state.uid);
    })
    .then(snapshot => {
      linkResume(this.state.uid, snapshot.metadata.fullPath)
      console.log(snapshot)
    })
    .catch(error => {
      throw error;
    });
  }


  render() {
    return (
        <View style={styles.container}>            
            <View style={styles.logout}>
              <TouchableOpacity onPress={() => this.signOutUser()}>
                <MaterialCommunityIcons name="logout" size={20} color="#403BEB" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.avatar}>
              <Ionicons name="ios-add" size={48} color="#FFF" />
            </TouchableOpacity>

            <View style={styles.topicContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Name</Text>
                <TouchableOpacity style={{ marginLeft: 30, }}>
                  <Feather name="edit" size={15} color="#2B93B6"/>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{this.state.name}</Text>
            </View>

            <View style={styles.topicContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Email</Text>
                <TouchableOpacity style={{ marginLeft: 30, }}>
                  <Feather name="edit" size={15} color="#2B93B6"/>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{this.state.email}</Text>
            </View>

            <View style={styles.topicContainer}>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>Phone</Text>
                <TouchableOpacity style={{ marginLeft: 30, }}>
                  <Feather name="edit" size={15} color="#2B93B6"/>
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{this.state.phone}</Text>
            </View>

            <View style={styles.topicContainer}>
              <Text style={styles.title}>Resume</Text>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>resume.pdf</Text> 
                <TouchableOpacity onPress={() => this.handleResumePress()} style={{ marginLeft: 30, }}>
                  <Feather name="upload" size={20} color="#2B93B6"/>
                </TouchableOpacity>
              </View>
            </View>
            
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        paddingVertical: 30,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    logout: {
      alignSelf: 'stretch',
      alignItems: 'flex-end',
    },

    avatar: {
      marginTop: 30,
      width: 100,
      height: 100,
      borderRadius: 50,
      backgroundColor: '#E1E3E6',
      justifyContent: 'center',
      alignItems: 'center',
    },

    topicContainer: {
      alignSelf: 'stretch',
      marginTop: 30,
    },

    title: {
      color: '#403BEB',
      fontSize: 18,
    },

    text: {
      color: '#999',
      fontSize: 16,
    },

    button: {
      marginTop: 30,
      width: 150,
      height: 30,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#403BEB',
    },

    buttonText: {
      color: '#FFF',
    },

  
});
