import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { AntDesign } from "@expo/vector-icons";

// import { Container } from './styles';

export default class RegisterProfile extends Component {
  navigation = this.props.navigation;

  render() {
    return (
        <KeyboardAvoidingView 
          behavior="padding"
          style={styles.container}>
          
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity>
              <AntDesign name="pluscircleo" size={40} />
            </TouchableOpacity>
            <Text style={{ color: 'red' }}> *</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.inputName}>Name<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your name"
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={false}
            />

            <Text style={styles.inputName}>Email<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your email"
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={false}
            />

            <Text style={styles.inputName}>Password<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your password"
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={false}

            />

            <Text style={styles.inputName}>Description <Text style={styles.optional}>(optional)</Text></Text>
            <TextInput
                style={styles.input}
                placeholder="Type here your startup description"
                placeholderTextColor="#999"
                autoCapitalize='none'
                autoCorrect={true}
                numberOfLines={3}

            />
          </View>
          

          <TouchableOpacity style={styles.button}>
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
