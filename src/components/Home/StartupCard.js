import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity, Modal } from 'react-native';


import StartupDescripion from '../StartupDescription';
import { addApply, getUsers } from "../../api/startupsApi";
import { getResume } from "../../api/profileApi";

export default class Home extends Component {
  state = {
    modalVisible: false,
    startup: {},
  }

  constructor() {
    super();
    console.ignoredYellowBox = [
    'Setting a timer'
    ];
  }
  
  componentDidMount() {
    this.setState({ startup: this.props.startup })
  }


  async handleApply() {
    const { uid, displayName, email, phoneNumber } = this.props.user;    
    const userObject = {
      displayName,
      phoneNumber,
      uid,
      email
    }
    const resume = await getResume(uid);

    userObject.resume = resume;


    addApply(userObject, this.state.startup.id);
  }

  handleStartupDescription = () => {
    this.setState({ modalVisible: true });
    setTimeout(()=> this.setState({ modalVisible: false }), 400);
  }

  render() {
    const { startup } = this.props

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => this.handleStartupDescription()}>
            <Image style={styles.image} source={{ uri: `${startup.imageURL}` }} />
          </TouchableOpacity>
        </View>
        <View style={styles.description}>
          <TouchableOpacity onPress={() => console.log(startup)}>
            <Text style={styles.name}>{startup.nome}</Text>
            <Text numberOfLines={3} style={styles.vagas}>
              {startup.vagas.join('\n')}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.apply}>
          <TouchableOpacity onPress={()=> this.handleApply()} style={styles.applyButton}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
        </View>

        <StartupDescripion visible={this.state.modalVisible} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        borderColor: '#999',
        borderWidth: StyleSheet.hairlineWidth,
        height: 90,
        width: '100%',
        flexDirection: 'row',
    },

    imageContainer: {
        height: 90,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },

    image: {
        width: 80,
        height: 80,
        borderRadius: 11,
    },

    description: {
        paddingLeft: 10,
        width: '50%',
    },

    name: {
        marginTop: 2,
        fontSize: 16,
        fontWeight: 'bold',
    },

    vagas: {
        fontSize: 13,
        color: '#999',
        marginTop: 5,
    },

    apply: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        width: 60,
    },

    applyButton: {
        marginBottom: 5,
        marginRight: 10,
    },

    buttonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'green',
    },
});