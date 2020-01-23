import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Image, Text, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default class Startup extends Component {
  state = {

  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }

  print = something => console.log(something)
  
  render() {
    const { navigation } = this.props
    const { startup } = navigation.state.params;

    return (
      <View style={{ flex: 1, paddingTop: 30, paddingHorizontal: 10}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" color="#999" size={32} />
        </TouchableOpacity>

        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => console.log(startup)}>
            <Image source={{ uri: `${startup.imageURL}` }} style={styles.avatar}/>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginTop: 20 }}>
            <Ionicons name="ios-arrow-down" size={32} color="#2B93B6" />
          </TouchableOpacity>
          <Text>{startup.nome}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
});
