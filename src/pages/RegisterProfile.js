import React, { Component, useEffect } from 'react';

import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from 'react-native';
import { AntDesign, Feather } from "@expo/vector-icons";
import * as firebase from 'firebase';
import api from './../services/api';


export default class RegisterProfile extends Component {

  state = {
      name: "",
      email: "",
      password: "",
  };


  handleSingUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then( userCredentials => {
        userCredentials.user.updateProfile({
          displayName: this.state.name
        });
        const response = api.post('/user', { 
          name: this.state.name, 
          email: this.state.email, 
        }).then(async data => {
          await AsyncStorage.setItem("user", data._id);
        }); 
      
      })
      .catch(error => alert(error.message));
  }
  
  render() {
    return (
        <KeyboardAvoidingView 
          behavior="padding"
          style={styles.container}>

          <TouchableOpacity>
            <AntDesign name="pluscircleo" size={40} />
          </TouchableOpacity>

          <View style={styles.form}>
            <Text style={styles.inputName}>Name<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your name"
                placeholderTextColor="#999"
                autoCapitalize='words'
                autoCorrect={false}
                onChangeText={text => this.setState({name: text})}
            />

            <Text style={styles.inputName}>Email<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your email"
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={text => this.setState({email: text})}
            />

            <Text style={styles.inputName}>Password<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your password"
                secureTextEntry
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={false}
                onChangeText={text => this.setState({password: text})}

            />
          </View>

          <View style={styles.resumeView}>
            <Text style={styles.resumeText}>Upload your resumé <Text style={styles.optional}>(optional)</Text></Text>
            <TouchableOpacity>
              <Feather name="upload" size={30} color="#2B93B6"/>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={this.handleSingUp}>
                <Text style={styles.buttonText}>Sing Up</Text>
         </TouchableOpacity>

         <TouchableOpacity 
            style={styles.singUpButton} 
            onPress={()=> this.props.navigation.navigate("Login")} 
        >
            <Text style={styles.subtext}>Already have an account <Text style={styles.signin}>Sing In</Text></Text>
        </TouchableOpacity>
           
        </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    form: {
      width: '80%',
      
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

    resumeView: {
      marginTop: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },

    resumeText: {
      color: '#403BEB',
      textAlign: 'center',
      fontSize: 17,
      marginBottom: 20,
    },

    optional: {
      color: '#999',
      fontSize: 14,
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

    singUpButton: { 
      alignSelf: 'center',
      marginTop: 20,
    },

});
