import React, { Component } from 'react';

import { View, Text, StyleSheet, Image} from 'react-native';

// import { Container } from './styles';

export default class CategoryCard extends Component {
  render() {
    return (
      <View style={styles.card}>
        <Image 
          source={{ uri: `${this.props.imageURI}`  }}
          style={styles.image}  
        />
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    marginTop: 10,
    marginRight: 20,
    
  },

  image: {
    width: 100,
    height: 80,
    borderRadius: 20,
  },
  
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});