import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import StartupCard from './StartupCard';
import { getStartups } from '../../api/startupsApi';

export default class Section extends Component {

  state = {
    startupList: [],
  }

  componentDidMount() {
    getStartups(this.onStartupsReceived);
  }

  onStartupsReceived = startupList => {
    console.log(startupList);
    this.setState({ startupList })
    console.log(this.state.startupList);
  }

  renderCards = () => {
    return 
    Object.values(this.state.startupList).map(startup => {
      (
        <StartupCard
          key={startup.id} 
          imageURI={startup.imageURL} 
          name={startup.nome}
          vagas={startup.vagas.join('\n')}  
        />
      )
    }); 
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.startupList 
        ? this.renderCards()

        : (<Text style={styles.empty}>Opa ...</Text>)
      }
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginRight: 20,
  },

  empty: {
    alignItems: 'center',
    color: '#999',
    marginTop: 20,
  },
});