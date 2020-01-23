import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import StartupCard from './StartupCard';
import { getStartupsBy } from '../../api/startupsApi';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Section extends Component {

  state = {
    startupList: [],
  }

  componentDidMount() {
    this.setStartupList();
  }

  setStartupList = async () => {
    const startupList = await getStartupsBy(null);
    this.setState({ startupList });
  }

  render() {

    return (
      <View style={styles.container}>
      {this.state.startupList 
         
        ? this.state.startupList.map((startup, index) => {
          return (
            <StartupCard
              key={startup.id} 
              imageURI={startup.imageURL} 
              name={startup.nome}
              vagas={startup.vagas.join('\n')}  
            />
          );
        })

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