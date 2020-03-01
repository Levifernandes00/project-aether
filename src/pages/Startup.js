import React, { Component } from 'react';

import { View, TouchableOpacity, StyleSheet, Image, Text, StatusBar, Animated, TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


import ProfileCard from "../components/Startup/ProfileCard";
import Information from '../components/Startup/Information';
import Jobs from '../components/Startup/Jobs';
import api, { BASE_URL } from './../services/api';


export default class Startup extends Component {
  _isMounted = false;

  state = {
    visible: false,
    animation: new Animated.Value(0),
    applies: [],
  }

  componentDidMount() {
    StatusBar.setHidden(true);
    const { startup } = this.props.navigation.state.params;
    this.setState({ vagas: startup.jobs, applies: startup.applies });
    this._isMounted = true;
  }

  componentDidUpdate(prevProps, prevState){
    if(this.props.navigation.state.params.startup !== prevProps.navigation.state.params.startup && this._isMounted){
      const { startup } = this.props.navigation.state.params;
      console.log(startup);

      this.setState({ applies: startup.applies });
    }
  }


  componentWillUnmount(){
    this._isMounted = false;
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
 
  selectPicture = async (id) => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    
    if(granted) {
      
      const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        base64: true,
        aspect: [1, 1],
      });
      if (!cancelled) {
        this.setState({ imageURL: uri });

        const data = new FormData();
        let filename = uri.split('/').pop();

        // Infer the type of the image
       
        data.append('file', {uri, type: 'image/jpeg', name: `${filename}`})
      
        const post = await api.post('/postStartup', data, {
          headers: {startupid: id}
        });

        this.props.navigation.goBack();

      }
    }
  }

  render() {
    const { navigation } = this.props
    const { startup } = navigation.state.params;
    const { applies } = this.state;

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
          <TouchableOpacity onPress={() => this.selectPicture(startup._id)}>
            <Image source={{ uri: `${BASE_URL}${startup.imageURL}` }} style={styles.avatar}/>
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
          <Jobs jobs={startup.jobs} id={startup._id} />
        </View>

        <View>
          <Text style={styles.title}>Applies</Text>
          {applies.size !== 0 
          
          ? applies.map(apply => {
              return (<ProfileCard key={apply} apply={apply} startupid={startup._id} />);
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
