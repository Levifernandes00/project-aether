import React, { Component } from 'react';

import { View, Text, Image, StyleSheet, StatusBar, TouchableOpacity, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import api from './../services/api';


export default class Register extends Component {
  state = {
    startupList: [],
  }


  componentDidMount() {
    StatusBar.setHidden(true);
    this.setStartupList();
  }

  setStartupList = async () => {
    const uid = await AsyncStorage.getItem("user");

    const response = await api.get('/startupManaged', {
      headers: {userid: uid},
    });

    this.setState({ startupList: response.data });
  }

  render() {
    return (
        <View style={styles.container}>
             <TouchableOpacity 
                onPress={()=>{ this.setState({ modalVisible: false }) }}
                style={{ alignSelf: 'stretch', alignItems: 'flex-end', margin: 20 }}>
                <Ionicons name="md-close" size={30} color="#999"/>
              </TouchableOpacity>


              {this.state.startupList 
          
                ? this.state.startupList.map((startup, index) => {
                  return (
                    <TouchableOpacity 
                      key={startup._id}
                      onPress={() => {
                        this.props.navigation.navigate('Startup', { startup });
                      }}
                    >
                      <View style={styles.startupContainer}>
                        <Image source={{ uri: `${startup.imageURL}` }} style={styles.startupImage}/>
                        <Text style={styles.startupName}>{startup.name}</Text>
                      </View>
                    </TouchableOpacity>

                  );
                })

                : (<Text style={styles.empty}>Opa ...</Text>)
             } 
             
              <TouchableOpacity 
                onPress={() => this.handleAddNewStartup()}
                style={styles.addButton}
              >
                <Ionicons name="ios-add" color="#FFFF" size={20} />
              </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
       
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

    addButton: { 
      width: 25, 
      height: 25, 
      borderRadius: 30,
      backgroundColor: '#2B93B6', 
      justifyContent: 'center', 
      alignItems: 'center', 
      alignSelf: 'center',
      marginTop: 20,
  
    }
});
