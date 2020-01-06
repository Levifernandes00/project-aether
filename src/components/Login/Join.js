import React, { useEffect, useState } from 'react';
import { View, Animated, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'

// import { Container } from './styles';

export default function Join({ appear, time }) {
    const [fadeAnim] = useState(new Animated.Value(0));
    const [heightAnim] = useState(new Animated.Value(0));

    const {height, width} = Dimensions.get('window');

    useEffect(()=>{
        if(appear){
            Animated.timing(heightAnim, {
                toValue: height,
                duration: time,
            }).start();

            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: time,
            }).start();

        }
        
        else {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: time,
            }).start();
        }

    }, [appear]);

    function handleSignIn() {
        
    };

    function handleForgotten() {

    };


  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim, height: heightAnim }]}>
        
        <KeyboardAvoidingView 
            style={styles.form}
            behavior="height"

        >
            <FontAwesome name="user-circle" size={45} color="#2B93B6"/>   

            <Text style={styles.inputName}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your email"
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={false}

             />
            <Text style={styles.inputName}>Password</Text>
            <TextInput 
                style={styles.input}
                placeholder="Type here your password"
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={false}    
            />

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Log in</Text>
            </TouchableOpacity>

            <View style={{ marginTop: 30 }}>
                <TouchableOpacity onPress={handleForgotten}>
                    <Text style={styles.subtext}>Forgot your passoword?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleSignIn}>
                    <Text style={styles.subtext}>Don't have account yet? <Text style={styles.signin}>Sing in</Text></Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    </Animated.View>
  );
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
        marginTop: -100,
        width: '100%',
        height: 200,
        maxWidth: 300,      
        justifyContent: 'center',
        alignItems: 'center'
    },

    inputName: {
        fontSize: 17,
        marginTop: 30,
        width: '100%',
        
        textAlign: 'left',
        color: '#403BEB',
        alignSelf: 'stretch'
    },

    input: {
        borderColor: '#2B93B6',
        borderBottomWidth: 1,
        width: '100%',
        
        height: 34,
        fontSize: 14,
        alignSelf: 'stretch'
    },

    button: {
        marginTop: 30,
        height: 35,
        width: 100,
        backgroundColor: '#403BEB',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',        
    },

    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFF',
    },

    subtext: {
        fontSize: 14,
        color: '#2B93B6',
        alignSelf: 'stretch',
        textAlign: 'left',
    },

    signin: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#403BEB',
    },

});