import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Image, Text, AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import api from './../services/api';
import { withNavigation } from 'react-navigation';

class StartupDescription extends Component {
  state = {
    modalVisible: false,
  }

  componentDidUpdate(prevProps) {
    if(this.props.visible !== prevProps.visible)
      this.setState({ modalVisible: true });
  }

  async handleApply() {
    const userid = await AsyncStorage.getItem("user");

    const response = await api.post(`/startup/${this.props.startup._id}/apply`, 
      null,
      {
        headers: { userid }
      }
    )

    this.setState({ modalVisible: false });
  }

  render() {
    const { startup, navigation } = this.props;
    return (

        <Modal
            animationType="fade"
            transparent={false}
            visible={this.state.modalVisible}
        >
            <TouchableOpacity 
                onPress={()=>{ this.setState({ modalVisible: false }); }}
                style={{ alignSelf: 'stretch', alignItems: 'flex-end', margin: 20 }}
            >
                <Ionicons name="md-close" size={30} color="#999"/>
            </TouchableOpacity>
            
            
              <View style={styles.container}>
                <Image style={styles.image} source={{ uri: `${startup.imageURL}` }} />
                <Text style={styles.name}>{startup.name}</Text>
                <Text style={styles.bio}>{startup.bio}</Text>

                <View style={styles.topic}> 
                  <Text style={styles.title}>Categories</Text>
                  {startup.categories.length !== 0 
                    ?
                      startup.categories.map(category => {
                        return(
                          <TouchableOpacity 
                            onPress={() => {
                              navigation.navigate('Search', { category });
                              this.setState({ modalVisible: false });
                            }} 
                            key={category} 
                            style={styles.categoryButton}
                          >
                            <Text style={styles.category}>{category}</Text>
                          </TouchableOpacity>
                        )
                      })
                    : (<Text style={styles.empty}>Opa ...</Text>)
                    }
                </View>

                <View style={styles.topic}>
                  <Text style={styles.title}>Jobs</Text>
                  <Text style={styles.vagas}>
                    {startup.jobs.join('\n')}
                  </Text>
                </View>

              </View>

            
            <View style={styles.apply}>
              <TouchableOpacity onPress={()=> this.handleApply()} style={styles.applyButton}>
                <Text style={styles.buttonText}>Apply</Text>
              </TouchableOpacity>
            </View>
        </Modal>

    );
  }
}

module.exports = withNavigation(StartupDescription);

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },

  image: {
    width: 80,
    height: 80,
    borderRadius: 11,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },

  bio: {
    fontSize: 13,
    color: '#999',
    width: '60%',
    marginTop: 10,
    lineHeight: 17,
    textAlign: 'center',
  },

  topic: {
    alignSelf: 'stretch',
    marginHorizontal: 40,
    marginTop: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  categoryButton: {
    marginTop: 10,
    marginLeft: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#999',
    borderRadius: 10,
    width: 100,
    height: 22,
  },

  category: {
    fontSize: 14,
    textAlign: 'center',
    color: "#999",
  },

  vagas: {
    marginLeft: 20,
    marginTop: 5,
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.50)',
    lineHeight: 24,
  },

  apply: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: 60,
    margin: 25,
  },

  applyButton: {
      marginBottom: 5,
      marginRight: 10,
  },

  buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'green',
  },
});