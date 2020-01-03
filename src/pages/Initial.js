import React from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text } from 'react-native';

import logomarca from '../assets/logomarca.png';
import fundo from '../assets/fundo.png';
import balao from '../assets/balao.png';


export default function Initial() {
  return (
    <SafeAreaView style={styles.container}>
        {/* <Image source={fundo} style={styles.backgroundForm} /> */}
        <Image source={logomarca} style={styles.logo} />

        <View style={styles.titleContainer}>
            <Text style={styles.title}> Up your career</Text>
        </View>

        <Text style={{ fontWeight: 'bold', color: '#000' }}> Olá!! </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    backgroundForm: {
        position: 'absolute',
        marginBottom: -101010,
        zIndex: 50,
    },

    logo: {
        marginTop: 40,
        marginLeft: 20,
    },

    titleContainer:{
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    title: {
        fontSize: 48,
        color: '#403BEB',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 300,
    },
});