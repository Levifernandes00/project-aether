import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Text, Animated, TouchableOpacity, KeyboardAvoidingView, StatusBar } from 'react-native';

import logomarca from '../assets/logomarca.png';
import fundo from '../assets/fundo.png';
import balao from '../assets/balao.png';

import FirstText from "../components/Login/FirstText";
import Join from '../components/Login/Join';

import * as firebase from 'firebase';

export default function Login({ navigation }) {
    const [balaoTranslation] = useState(new Animated.Value(70));
    const [shapeTranslation] = useState(new Animated.Value(200));
    const [disappear, setDisappear] = useState(false);
    const [appear, setAppear] = useState(false);
    const time = 4000;


    useEffect(()=> { StatusBar.setHidden(true) }, []);
    
    function handleChanges(){
        Animated.timing(balaoTranslation, {
            toValue: -500,
            duration: time,
        }).start();

        Animated.timing(shapeTranslation, {
            toValue: 530,
            duration: time,
        }).start();

        setDisappear(true);

        setTimeout(() => setAppear(true), 2500);
    }
  
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
        
            <Image style={styles.logo} source={logomarca}  />


            { !disappear &&
                (<TouchableOpacity 
                    style={{ position: 'absolute', flex: 1, height: '100%', width: '100%', paddingTop: 50}}
                    onPress={handleChanges}    
                >
                    <FirstText disappear={disappear} time={2000}/>
                </TouchableOpacity>)
            }

            <Join appear={appear} time={2500} navigation={navigation}/>
    
            
            <View style={styles.balaoContainer}>
                <Animated.View style={{ marginTop: balaoTranslation }}>
                    <Image style={styles.balao} source={balao} />
                </Animated.View>
            </View>
            
            <Animated.View style={[styles.backgroundShape, { marginTop: shapeTranslation }]}>
                <Image source={fundo} />
            </Animated.View>

        </KeyboardAvoidingView>
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