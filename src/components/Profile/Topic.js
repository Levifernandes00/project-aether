import React, { Component } from 'react';

import { View, TextInput, TouchableOpacity, StyleSheet, Text, AsyncStorage } from 'react-native';
import { Feather } from '@expo/vector-icons'

import api from './../../services/api';

export default class Profile extends Component {
    state={
        uid: "",
        value: "",
        editable: false,
    }

    componentDidMount(){
        AsyncStorage.getItem("user").then(id => {
            this.setState({value: this.props.value, uid: id});
        })
        
    }

    edit() {
        this.setState({ editable: true });
    }

    async save() {
        this.setState({ editable: false });
        const query = this.getQuery();


        const response = await api.post(`/user/${this.state.uid}/update`, {
            [query]: this.state.value,
        })

        console.log(response.data);
    }

    getQuery() {
        const { title } = this.props;
        let query;

        switch(title){
            case 'Name':
                query='name';
                break;
            case 'Email':
                query = 'email';
                break;
            case 'Phone':
                query="phoneNumber";
                break;
            case 'Resume':
                query = 'resume';
                break; 
        }
        
        return query;
    }

  render() {
    const { title, value } = this.props;

    const editStyles = () => {
        if(this.state.editable){
            return { 
                borderBottomColor: "#2B93B6", 
                borderBottomWidth: StyleSheet.hairlineWidth
            }
        }
    }

    return (
        <View style={styles.topicContainer}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.title}>{title}</Text>
                <TouchableOpacity onPress={ () => this.edit() } style={{ marginLeft: 30, }}>
                    <Feather name="edit" size={15} color="#2B93B6"/>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <TextInput
                style={[styles.text, editStyles()]}
                value={this.state.value || value}
                onChangeText={text => {
                    this.setState({ value: text });
                }}
                editable={this.state.editable}
                />
                {this.state.editable && (
                    <TouchableOpacity onPress={ () => this.save() } style={{ marginLeft: 10, }}>
                        <Feather name="check" size={20} color="green"/>
                    </TouchableOpacity> 
                )}
                
            </View>
            
        </View>
    );
  }
}

const styles = StyleSheet.create({
    

    topicContainer: {
      alignSelf: 'stretch',
      marginTop: 30,
    },

    title: {
      color: '#403BEB',
      fontSize: 18,
    },

    text: {
      color: '#999',
      fontSize: 16,
      width: '50%'
    },

  
  
});
