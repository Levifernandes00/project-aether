import React, { Component } from 'react';

import { View, StyleSheet } from 'react-native';
import Section from '../components/Home/Section';

export default class Search extends Component {
  state = {

  }
  
  componentDidMount() {
    console.log(this.props.navigation)
  }


  render() {
    const { search, category } = this.props.navigation.state.params;

    return (
      <View>
        <Section search={search} category={category} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
});