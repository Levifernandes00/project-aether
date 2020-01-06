import React from 'react';
import { View, Animated, StyleSheet, Text, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

// import { Container } from './styles';

export default function Join() {
  return (
    <Animated.View style={styles.container}>
        <AntDesign name="user" size={40}/>

        <Text>Email</Text>
        <TextInput></TextInput>

    </Animated.View>
  );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

});