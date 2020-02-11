import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import StartupCard from './StartupCard';
import { getStartupsBy, getUsers, getStartupNotFrom } from '../../api/startupsApi';
import { TouchableOpacity } from 'react-native-gesture-handler';

console.disableYellowBox = true;

export default class Section extends Component {
  constructor() {
    super();
  }

  state = {
    uid: "",
    startupList: [],
  }

  componentDidMount() {
    this.setStartupList();
  }

  componentDidUpdate(){
    this.setStartupList();
  }

  setStartupList = async () => {
    const startupList = await getStartupNotFrom(this.props.user);
    this.setState({ startupList });
  }

  render() {
    const { user } = this.props;

    return (

      <View style={styles.container}>
      {this.state.startupList 
         
        ? this.state.startupList.map((startup, index) => {
          return (
            <StartupCard
              key={startup.id} 
              startup={ startup }  
              user = { user }
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