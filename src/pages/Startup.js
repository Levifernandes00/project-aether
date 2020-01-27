import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Image, Text, StatusBar, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, Feather } from '@expo/vector-icons'

import ProfileCard from "../components/Startup/ProfileCard";
import Information from '../components/Startup/Information';

export default class Startup extends Component {
  state = {
    visible: false,
    animation: new Animated.Value(0),
    vagas: [],
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.setState({ vagas: this.props.navigation.state.params.startup.vagas })
  }

  showInformation() {
    const visible = this.state.visible

    this.setState({ visible: !visible });

    Animated.timing(this.state.animation, {
      toValue: visible ? 0 : 180,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }
  
  handleExcludeJob(text) {
    const novasVagas = 
    this.state.vagas.filter(vaga => {
      return vaga !== text
    });

    this.setState({ vagas: novasVagas });
  }

  render() {
    const { navigation } = this.props
    const { startup } = navigation.state.params;

    const rotateInterpolate = 
      this.state.animation.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"]
      });

    const animatedStyle = {
      transform: [
        {
          rotate: rotateInterpolate,
        },
      ]
    }

    return (
      <ScrollView style={{ flex: 1, paddingTop: 30, paddingHorizontal: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" color="#999" size={32} />
        </TouchableOpacity>

        <View style={{ width: '100%', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => console.log(startup)}>
            <Image source={{ uri: `${startup.imageURL}` }} style={styles.avatar}/>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[{ marginTop: 20 }, animatedStyle]}
            onPress={() => this.showInformation() }
          >
            <Ionicons name="ios-arrow-down" size={32} color="#2B93B6" />
          </TouchableOpacity>
        </View>

        {this.state.visible && 
          <Information startup={startup} />
        }

        <View style={styles.topicContainer}>
          <Text style={styles.title}>Vagas</Text>

          { startup.vagas 
          
          ? 
            this.state.vagas.map(vaga => {
              return(
                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                  <Text style={styles.job}>{ `${vaga} \n` }</Text>
                  <TouchableOpacity 
                    style={{ marginLeft: 10 }}
                    onPress={()=>this.handleExcludeJob(vaga)}
                  >
                      <Ionicons name="md-close" size={15} color="#999"/>
                  </TouchableOpacity>
                </View>
              )
            })
          :
            (<Text style={styles.empty}>Opa ...</Text>)
          }

          <TouchableOpacity 
            style={{ width: 40, height: 20, backgroundColor: '#2B93B6', justifyContent: 'center', alignItems: 'center' }}
          >
            <Ionicons name="ios-add" color="#FFFF" size={20} />
          </TouchableOpacity>
          
        </View>

        <View>
          <Text style={styles.title}>Applies</Text>
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <ProfileCard />
          <View style={{ height: 50, }} />
        </View>
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },

  title: {
    marginTop: 30,
    color: '#403BEB',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
