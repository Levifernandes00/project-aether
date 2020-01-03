import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text } from 'react-native';

import logomarca from '../assets/logomarca.png';
import fundo from '../assets/fundo.png';
import balao from '../assets/balao.png';


export default function Initial() {
  return (
    <SafeAreaView style={styles.container}>
       
        <Image style={styles.logo} source={logomarca}  />

        <View style={styles.titleContainer}>
            <Text style={styles.title}> Up your career</Text>
        </View>
        
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Find the nearest startup to work </Text>
        </View>


        <View style={styles.balaoContainer}>
            <Image style={styles.balao} source={balao} />
        </View>
        
        <Image style={styles.backgroundShape} source={fundo} />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        zIndex: 1,
    },

    logo: {
        marginTop: 40,
        marginLeft: 20,
    },

    titleContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    title: {
        fontSize: 40,
        color: '#403BEB',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 200,
    },

    balaoContainer:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    balao: {
        marginTop: 70,
        marginEnd: 20,
        width: 200,
        height: 290,

    },

    backgroundShape: {
        position: 'absolute',
        zIndex: -10,
        marginTop: 200,   
        height: '100%',
        width: '100%',
    },

    subtitleContainer: {

        marginBottom: 10,
        marginTop: 300,
    },


    subtitle: {
        zIndex: 10,
        color: '#FFF',
        fontSize: 25,
        width: 200,
        textAlign: 'left',
        marginLeft: 30,

    },
});