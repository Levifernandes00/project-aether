import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Section from '../components/Home/Section';

export default class Search extends Component {

  render() {
    const { navigation } = this.props;
    const { search, category } = navigation.state.params;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" color="#999" size={32} />
        </TouchableOpacity>

        {category && (
          <Text style={styles.category}>{category}</Text>
        )}

        <Section search={search} category={category} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
  },

  category: {
    textAlign: 'center', 
    color: '#2B93B6', 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20, 
  },
});