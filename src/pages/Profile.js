import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as firebase from 'firebase';
import { uriToBlob, uploadToFirebase, linkResume } from '../api/profileApi';
import api, { BASE_URL } from './../services/api';

import Topic from './../components/Profile/Topic';

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
    phoneNumber: "",
    imageURL: "",
    resume: "resume.pdf",
    
    modalVisible: false,
  }


  componentDidMount() {
    StatusBar.setHidden(true);
    const { displayName, email, phoneNumber } = firebase.auth().currentUser;
    this.getUser();
  }

  async getUser(){
    const id = await AsyncStorage.getItem("user");
    this.syncUser(id);
    this.setState({ uid: id });
  }
  
  async syncUser(_id){
    const response = await api.get('user',
    {
      headers: {id: _id}
    });

    let { photoURL, name, email, phoneNumber } = response.data;

    photoURL= `${BASE_URL}${photoURL}`;

    if(photoURL){
      this.setState({ imageURL: photoURL, name, email, phoneNumber });
    }
  }

  async signOutUser() {
    firebase.auth().signOut();
    await AsyncStorage.clear();
    this.props.navigation.navigate("Loading");
  } 

  handleResumePress = async () => {
    const { uri } = await DocumentPicker.getDocumentAsync({ type: "application/pdf" })
    
    if(uri) {
      const data = new FormData();
        let filename = uri.split('/').pop();

        // Infer the type of the image
       
        data.append('file', {uri, type: 'application/pdf', name: `${filename}`})
      
        const post = await api.post('/postProfile', data, {
          headers: {userid: this.state.uid}
        });

        this.setState({ resume: filename });
        console.log(post);

    }
  }


  selectPicture = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    if(granted) {
      
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [1, 1],
      });
      if (!cancelled) {
        this.setState({ imageURL: uri });

        const data = new FormData();
        let filename = uri.split('/').pop();

        // Infer the type of the image
       
        data.append('file', {uri, type: 'image/jpeg', name: `${filename}`})
      
        const post = await api.post('/postProfile', data, {
          headers: {userid: this.state.uid}
        });

        console.log(post);

      }
    }
  };

  render() {
    return (
        <View style={styles.container}>            
            <View style={styles.logout}>
              <TouchableOpacity onPress={() => this.signOutUser()}>
                <MaterialCommunityIcons name="logout" size={20} color="#403BEB" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => this.selectPicture()}  style={styles.avatar}>
              { this.state.imageURL !== ""
              
              ? (<Image source={{ uri: this.state.imageURL }} style={[styles.avatar]} />)

              : (<Ionicons name="ios-add" size={48} color="#FFF" />)
              }
              
            </TouchableOpacity>

            <Topic title="Name" value={this.state.name} />            
            <Topic title="Email" value={this.state.email} />
            <Topic title="Phone" value={this.state.phoneNumber}/>

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
