import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, StatusBar, AsyncStorage } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import * as firebase from 'firebase';
import { uriToBlob, uploadToFirebase, linkResume } from '../api/profileApi';
import api from './../services/api';

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
    phone: "",
    imageURL: "",
    resume: "",
    
    modalVisible: false,
  }


  componentDidMount() {
    StatusBar.setHidden(true);
    const { displayName, email, phoneNumber } = firebase.auth().currentUser;
    this.getUser();
    this.setState({ email, name: displayName, phone: phoneNumber,});
  }

  async getUser(){
    const id = await AsyncStorage.getItem("user");
    this.getPhoto(id);
    this.setState({ uid: id });
  }
  
  async getPhoto(_id){
    const response = await api.get('user',
    {
      headers: {id: _id}
    });

    const { photoURL } = response.data;

    if(photoURL){
      this.setState({ imageURL: photoURL });
    }
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
      this.setState({ resume: snapshot.metadata.fullPath });
    })
    .catch(error => {
      throw error;
    });
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

        const blob = await uriToBlob(uri);
        const snapshot = await uploadToFirebase(blob, "image", this.state.uid);

        const { fullPath } = snapshot.metadata;
        
        const response = await api.post(`user/${this.state.uid}/update`, {
          photoURL: fullPath,
        });

        console.log(response.data);
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
            <Topic title="Phone" value={this.state.phone}/>

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
