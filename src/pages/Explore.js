import React, { Component } from 'react';

import { View, Text, StyleSheet, StatusBar } from 'react-native';

// import { Container } from './styles';

export default class Register extends Component {

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  render() {
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#F9a' }}> Hello greetings! </Text>
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
