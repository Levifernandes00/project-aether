import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CategoryCard from './CategoryCard';


export default class Home extends Component {
  render() {
    return (
        <ScrollView 
          style={styles.scroll} 
          horizontal={true}
          disableScrollViewPanResponder={true}
          
        >
            <CategoryCard title="Edtech" imageURI='https://cdn-cv.r4you.co/wp-content/uploads/2018/10/iStock-536613027.jpg' />
            <CategoryCard title="Edtech" imageURI='https://cdn-cv.r4you.co/wp-content/uploads/2018/10/iStock-536613027.jpg' />
        </ScrollView>
    
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 150,
  },
});