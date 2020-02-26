import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Image, Text, StatusBar, Animated, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, Feather } from '@expo/vector-icons'

import ProfileCard from "../components/Startup/ProfileCard";
import Information from '../components/Startup/Information';
import api from './../services/api';


export default class Startup extends Component {
  _isMounted = false;

  state = {
    visible: false,
    animation: new Animated.Value(0),
    vagas: [],
    textInput:[],
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    this.setState({ vagas: this.props.navigation.state.params.startup.jobs });
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.vagas !== this.state.vagas && this._isMounted){
      this.save();
    }
  }

  componentWillUnmount(){
    this._isMounted = false;
  }

  async save() {
    await api.post(`startup/${this.props.navigation.state.params.startup._id}/update`,
    {
      jobs: this.state.vagas,
    });
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

  addJob(key){

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

          { startup.jobs 
          
          ? 
            this.state.vagas.map(vaga => {
              return(
                <View key={vaga} style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
                  <TextInput style={styles.job}>{ `${vaga} \n` }</TextInput>
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
          {startup.applies.size !== 0 
          
          ? startup.applies.map(apply => {
              return (<ProfileCard key={apply._id} apply={apply} />);
            })
          
          : (<Text style={styles.empty}>Opa ...</Text>)
          }
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
