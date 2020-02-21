import React, { Component } from 'react';

import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, Image, AsyncStorage, ToastAndroid} from 'react-native';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

import CategorySelection from './../components/Startup/CategorySelection';
import api from './../services/api';


export default class RegisterProfile extends Component {
  state = {
    name: "",
    bio: "",
    imageURL: "",
    reponsible: [],
    categories: [
      {name: "EdTech", selected: false},
      {name: "ConstruTech", selected: false},
      {name: "FinTech", selected: false},
      {name: "HealthTech", selected: false},
      {name: "AR/VR", selected: false},
    ],
  }

  componentDidMount(){
    AsyncStorage.getItem("user").then(id =>{
      this.setState({ responsible: [id] })
    })
  }

  handleSelection(name) {
    const categories = [... this.state.categories];

    categories.forEach(category =>{
      if(category.name === name){
        category.selected = !category.selected;
      }
    });

    this.setState({ categories });
    
  }

  selectPicture = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    if(granted) {
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [1, 1],
      });
      if (!cancelled) this.setState({ imageURL: uri });
    }
  };

  async register() {
    const { name, bio, imageURL, responsible, categories } = this.state;

    const selectedCategories = this.filterCategories(categories);

    const response = await api.post('/startup', { 
      name, 
      bio, 
      imageURL, 
      responsible, 
      categories: selectedCategories 
    });

    const { error, _id } = response.data;

    if(error){
      ToastAndroid.show(error, ToastAndroid.LONG);
    }
    else{
      this.props.navigation.goBack();
    }
  }

  filterCategories(categories){
    let selectedCategories = [];
    
    categories.forEach(category => {
      if(category.selected){
        selectedCategories.push(category.name);
      }
    });
    
    return selectedCategories;
  }

  render() {
    const { navigation } = this.props;
    const { imageURL } = this.state;

    return (
      <KeyboardAvoidingView 
        behavior="padding"
        style={styles.container}
      >

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Ionicons name="ios-arrow-round-back" color="#999" size={32} />
        </TouchableOpacity>
          
        <View style={styles.formContainer}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={()=>{this.selectPicture()}}>
              { imageURL !== "" 
              ?
                (<Image source={{uri: imageURL}} style={{ width: 50, height: 50,  }} />)
              :
                (<AntDesign name="pluscircleo" size={40} />)}
            </TouchableOpacity>
            <Text style={{ color: 'red' }}> *</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.inputName}>Name<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
              style={styles.input}
              placeholder="Type here your name"
              placeholderTextColor="#999"
              autoCapitalize='sentences'
              autoCorrect={false}
              value={this.state.name}
              onChangeText={text => {this.setState({ name: text })}}
            />

            <Text style={styles.inputName}>Description<Text style={{ color: 'red' }}> *</Text></Text>
            <TextInput
              style={[styles.input, {
                
                height: 50,
              }]}
              placeholder="Type here your startup description"
              placeholderTextColor="#999"
              autoCapitalize='none'
              autoCorrect={true}
              multiline={true}
              value={this.state.bio}
              onChangeText={text => {this.setState({ bio: text })}}
            />

            <Text style={styles.inputName}>Categories<Text style={{ color: 'red' }}> *</Text></Text>
              <View style={styles.categories}>
                {this.state.categories &&
                this.state.categories.map(category =>
                  (
                    <CategorySelection 
                      key={category.name}
                      selected={category.selected}  
                      onPress={() => this.handleSelection(category.name)}
                    > 
                      {category.name} 
                    </CategorySelection>
                  )
                )
                }
              </View>
            
          </View>

          <TouchableOpacity onPress={() => this.register()} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
           
      </KeyboardAvoidingView>
    );
  }
}


const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      padding: 10,
    },  

    back: {
      marginTop: -40,
      marginLeft: 10,
    },

    formContainer:{
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
        
        marginTop: 10,
        height: 25,
        fontSize: 14,
        alignSelf: 'stretch',
        justifyContent: "flex-start",
        alignItems: 'center',
        textAlignVertical: 'top',
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

    categories: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-evenly',
      
      paddingVertical: 10,
    },

    singUpButton: { 
      alignSelf: 'center',
      marginTop: 20,
    },

});
