import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Image, Text, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons'

import ProfileCard from "../components/Startup/ProfileCard";
import Information from '../components/Startup/Information';

export default class Startup extends Component {
  state = {

  }

  componentDidMount() {
    StatusBar.setHidden(true);
  }
  
  render() {
    const { navigation } = this.props
    const { startup } = navigation.state.params;

    return (
      <ScrollView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 20}}>
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
        </View>

        <Information startup={startup} />

        <Text style={styles.title}>Applies</Text>
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <ProfileCard />
        <View style={{ height: 50, }} />
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  title: {
    marginTop: 30,
    color: '#403BEB',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
