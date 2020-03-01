import React, { Component } from 'react';

import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from "@expo/vector-icons";
import api from './../../services/api';
// import { Container } from './styles';

export default class Information extends Component {
    state = { 
        responsible: [],
    }

    componentDidMount() {
        this.getResponsible();
    }

    async getResponsible(){
        const { responsible } = this.props.startup;
        var responsibleUsers = [];
        
        responsible.forEach(async resp => {
            const response = await api.get('/user', {
                headers: {id: resp}
            });

            responsibleUsers.push(response.data.email);
            this.setState({ responsible: responsibleUsers });
        });

        

    }


  render() {
    const { startup } = this.props;

    return (
        <View style={styles.container}>
            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Name</Text>
                </View>
                <Text style={styles.text}>{ startup.name }</Text>
            </View>


            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Description</Text>
                </View>
                <Text style={styles.text}>{ startup.bio }</Text>
            </View>

            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Categorias</Text>
                </View>
                <Text style={styles.text}>{ startup.categories.join('\n') }</Text>
            </View>

            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Responsáveis</Text>
                </View>
                <Text style={styles.text}>{ this.state.responsible.join('\n') }</Text>
            </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
    },

    topicContainer: {
        alignSelf: 'stretch',
        marginTop: 20,
    },

    title: {
        color: '#403BEB',
        fontSize: 14,
    },

    text: {
        marginTop: 4,
        color: '#999',
        fontSize: 12,
    },
});
