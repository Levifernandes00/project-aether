import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default class Home extends Component {

  handleApply() {

  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: `${this.props.imageURI}` }} />
        </View>
        <View style={styles.description}>
          <Text style={styles.name}>{this.props.name}</Text>
          <Text numberOfLines={3} style={styles.vagas}>
            {this.props.vagas}
          </Text>
        </View>
        <View style={styles.apply}>
          <TouchableOpacity onPress={()=> this.handleApply()} style={styles.applyButton}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderColor: '#999',
        borderWidth: StyleSheet.hairlineWidth,
        height: 90,
        width: '100%',
        flexDirection: 'row',
    },

    imageContainer: {
        height: 90,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 11,
    },

    description: {
        paddingLeft: 10,
        width: '50%',
    },

    name: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },

    vagas: {
        fontSize: 13,
        color: '#999',
        marginTop: 5,
    },

    apply: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: 60,
    },

    applyButton: {
        marginBottom: 5,
        marginRight: 10,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'green',
    },
});