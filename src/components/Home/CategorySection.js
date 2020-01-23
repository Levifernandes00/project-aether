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
            <CategoryCard title="Edutech" imageURI='https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=709&q=80' />
            <CategoryCard title="ConstruTech" imageURI='https://images.unsplash.com/photo-1485083269755-a7b559a4fe5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' />
        </ScrollView>
    
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    maxHeight: 150,
  },
});