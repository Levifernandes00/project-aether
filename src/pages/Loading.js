import React from 'react'
import { View, Text, ActivityIndicator, StyleSheet, Image, StatusBar } from 'react-native';
import logo from "../assets/logo.png";
import * as firebase from 'firebase';

export default class Loading extends React.Component {
    componentDidMount() {
      StatusBar.setHidden(true);
      firebase.auth().onAuthStateChanged(user => this.props.navigation.navigate(user ? 'Home' : 'Auth'))
    }

  render() {
    return (
      <View style={styles.container}>
        <Image source={logo} style={{ height: 60, width: 60, marginBottom: 50}}/>
        <ActivityIndicator size="large" />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})