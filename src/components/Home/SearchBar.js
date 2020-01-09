import React, { Component } from 'react';

import { View, Text, StyleSheet } from 'react-native';


export default class SearchBar extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Text> Olá </Text>
        </View>
    
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderColor: '#000',
        borderWidth: StyleSheet.hairlineWidth,
    },
});