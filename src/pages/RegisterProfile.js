import React, { Component } from 'react';

import { View, Text, StyleSheet, StatusBar } from 'react-native';

// import { Container } from './styles';

export default class RegisterProfile extends Component {
  state = {

  };
  
  render() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#F9a' }}> Register </Text>
        </View>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
