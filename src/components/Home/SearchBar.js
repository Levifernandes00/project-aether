import React, { Component } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native';

import logomarca from '../../assets/logomarca.png'
import { TextInput } from 'react-native-gesture-handler';


export default class SearchBar extends Component {
  render() {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Image source={logomarca} style={styles.logo}/>
            </View>
            <Text style={styles.title}> Do you have any preference ?</Text>
            <TextInput 
              style={styles.searchInput}
              placeholder="Type here the startup you want"
              placeholderTextColor="#999"
              autoCorrect={false}
            />
        </View>
    
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 30,
        paddingHorizontal: 20,
        borderBottomColor: '#999',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    logo: {
      height: 30,
      width: 51,
    },

    title: {
      fontSize: 16,
      color: '#403BEB',
      marginTop: 10,
      fontWeight: '500',
    },

    searchInput: {
      width: '100%',
      height: 35,
      backgroundColor: '#f5f5f5',
      marginBottom: 10,
      marginTop: 10,
      paddingLeft: 10,
    },
});