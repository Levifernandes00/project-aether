import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, TouchableOpacity } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';


import Fire from '../../Fire';
import * as firebase from 'firebase';

export default class Profile extends Component {


  state = {
    uid: "",
    name: "",
    email: "",
    phone: "",
    
    modalVisible: false,
  }


  componentDidMount() {
    const { uid, displayName, email, phoneNumber } = firebase.auth().currentUser;
    this.setState({ uid, email, name: displayName, phone: phoneNumber });
  }

  signOutUser = () => {
    firebase.auth().signOut;
  }


  render() {
    return (
        <View style={styles.container}>            
            <View style={styles.logout}>
              <TouchableOpacity onPress={this.signOutUser}>
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
                <TouchableOpacity style={{ marginLeft: 30, }}>
                  <Feather name="upload" size={20} color="#2B93B6"/>
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity  
              style={styles.button}
              onPress={()=>{ this.setState({ modalVisible: true }) }}
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

              <TouchableOpacity 
                onPress={() => {
                  this.props.navigation.navigate('Startup')
                  this.setState({ modalVisible: false })
                }}
              >
                <View style={styles.startupContainer}>
                  <Image source={{ uri: 'https://computerworld.com.br/wp-content/uploads/2019/11/A-partir-de-dezembro-QuintoAndar-vai-intermediar-compra-e-venda-de-im%C3%B3veis.jpg' }} style={styles.startupImage}/>
                  <Text style={styles.startupName}>Airbnb</Text>
                </View>
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
