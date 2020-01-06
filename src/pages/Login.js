import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, Animated, TouchableOpacity } from 'react-native';

import logomarca from '../assets/logomarca.png';
import fundo from '../assets/fundo.png';
import balao from '../assets/balao.png';

import FirstText from "../components/Login/FirstText";
import Join from '../components/Login/Join';



export default function Login() {
    const [balaoTranslation] = useState(new Animated.Value(70));
    const [shapeTranslation] = useState(new Animated.Value(200));
    const [disappear, setDisappear] = useState(false);
    const time = 5000;

    // useEffect(()=>{
    //     setDisappear(true);

    //     Animated.timing(balaoTranslation, {
    //         toValue: -1000,
    //         duration: 1000,
    //     }).start();
    // }, []);


    function reset(){
        Animated.timing(balaoTranslation, {
            toValue: 70,
            duration: time,
        }).start();

        Animated.timing(shapeTranslation, {
            toValue: 200,
            duration: time,
        }).start();

        setDisappear(false);
    }

    function handleChanges(){
        Animated.timing(balaoTranslation, {
            toValue: -500,
            duration: time,
        }).start();

        Animated.timing(shapeTranslation, {
            toValue: 500,
            duration: time,
        }).start();

        setDisappear(true);
    }
  
    return (
        <SafeAreaView style={styles.container}>
        
            <Image style={styles.logo} source={logomarca}  />

        
            <FirstText disappear={disappear} time={2000}/>
            <Join />

            <TouchableOpacity onPress={handleChanges} style={{ height: 50, width: 50, backgroundColor: 'grey' }}>
                <Text>Mudar</Text>
            </TouchableOpacity>

            <View style={styles.balaoContainer}>
                <Animated.View style={{ marginTop: balaoTranslation }}>
                    <Image style={styles.balao} source={balao} />
                </Animated.View>
            </View>
            
            <Animated.View style={[styles.backgroundShape, { marginTop: shapeTranslation }]}>
                <Image source={fundo} />
            </Animated.View>

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

   

    balaoContainer:{
        width: '100%',
        height: '100%',
        position: 'absolute',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },

    balao: {
        marginEnd: 20,
        width: 200,
        height: 290,

    },

    backgroundShape: {
        position: 'absolute',
        zIndex: -10,   
        height: '100%',
        width: '100%',
    },
});