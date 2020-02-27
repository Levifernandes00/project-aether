import React, { Component } from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';

// import { Container } from './styles';

class CategoryCard extends Component {


  render() {
    const { navigation, title, imageURI } = this.props;

    return (
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate("Search", { category: title })}
      >
        <Image 
          source={{ uri: `${imageURI}`  }}
          style={styles.image}  
        />
        <Text style={styles.text}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

module.exports = withNavigation(CategoryCard);


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