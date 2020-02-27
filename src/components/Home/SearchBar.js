import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import logomarca from '../../assets/logomarca.png'
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { withNavigation } from 'react-navigation';


class SearchBar extends Component {
  state = {
    search: "",
  }


  render() {
    const { search } = this.state;
    const { navigation } = this.props;

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', alignItems: 'center' }}>
              <Image source={logomarca} style={styles.logo}/>
            </View>
            <Text style={styles.title}> Do you have any preference ?</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput 
                style={styles.searchInput}
                placeholder="Type here the startup, job or category"
                placeholderTextColor="#999"
                autoCorrect={false}
                value={search}
                onChangeText={text => this.setState({ search: text })}

              />
              <TouchableOpacity
                style={{ marginLeft: 10, }} 
                onPress={() => navigation.navigate('Search', { search })}
              >
                <AntDesign name="search1" size={20} color="#403BEB"/>
              </TouchableOpacity>
            </View>
        </View>
    
    );
  }
}

module.exports = withNavigation(SearchBar);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingTop: 30,
        paddingHorizontal: 20,
        borderBottomColor: '#999',
        borderBottomWidth: StyleSheet.hairlineWidth,
    },

    logo: {
      height: 30,
      width: 51,
    },

    title: {
      fontSize: 16,
      color: '#403BEB',
      marginTop: 10,
      fontWeight: '500',
    },

    searchInput: {
      width: '90%',
      height: 35,
      backgroundColor: '#e5e5e5',
      marginBottom: 10,
      marginTop: 10,
      paddingLeft: 10,
    },
});