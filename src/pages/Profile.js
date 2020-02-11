import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity, StatusBar } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from "expo-document-picker";

import * as firebase from 'firebase';
import { getStartupsBy } from '../api/startupsApi';
import { uriToBlob, uploadToFirebase, linkResume } from '../api/profileApi';

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
    startupList: [],
  }


  componentDidMount() {
    StatusBar.setHidden(true);
    const { uid, displayName, email, phoneNumber } = firebase.auth().currentUser;
    this.setState({ uid, email, name: displayName, phone: phoneNumber,});
  }

  signOutUser = () => {
    firebase.auth().signOut();
    this.props.navigation.navigate("Loading");
    console.log("Something")
  }

  setStartupList = async () => {
    const startupList = await getStartupsBy(this.state);
    this.setState({ startupList });
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

  handleAddNewStartup() {

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

            <TouchableOpacity  
              style={styles.button}
              onPress={()=>{ this.setState({ modalVisible: true }); this.setStartupList() }}
            >
              <Text style={styles.buttonText}>Gerenciar Startups</Text>
            </TouchableOpacity>

            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
            >
              <TouchableOpacity 
                onPress={()=>{ this.setState({ modalVisible: false }) }}
                style={{ alignSelf: 'stretch', alignItems: 'flex-end', margin: 20 }}>
                <Ionicons name="md-close" size={30} color="#999"/>
              </TouchableOpacity>


              {this.state.startupList 
          
                ? this.state.startupList.map((startup, index) => {
                  return (
                    <TouchableOpacity 
                      key={startup.id}
                      onPress={() => {
                        this.props.navigation.navigate('Startup', { startup });
                        this.setState({ modalVisible: false });
                      }}
                    >
                      <View style={styles.startupContainer}>
                        <Image source={{ uri: `${startup.imageURL}` }} style={styles.startupImage}/>
                        <Text style={styles.startupName}>{startup.nome}</Text>
                      </View>
                    </TouchableOpacity>

                  );
                })

                : (<Text style={styles.empty}>Opa ...</Text>)
             } 
             
              <TouchableOpacity 
                onPress={() => this.handleAddNewStartup()}
                style={{ width: 100, height: 20, backgroundColor: '#2B93B6', justifyContent: 'center', alignItems: 'center', marginLeft: 20 }}
              >
                <Ionicons name="ios-add" color="#FFFF" size={20} />
              </TouchableOpacity>
              
            </Modal>
            
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

    startupContainer: {
      borderColor: '#999',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 25,
      width: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 10,
      marginHorizontal: 20,
    },

    startupImage: {
      width: 50,
      height: 50,
      borderRadius: 20,
    },

    startupName: {
      fontSize: 16,
    },
});
