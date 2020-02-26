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
  
    }


  render() {
    const { startup } = this.props;

    return (
        <View style={styles.container}>
            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Name</Text>
                    <TouchableOpacity style={{ marginLeft: 30, }}>
                        <Feather name="edit" size={15} color="#2B93B6"/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{ startup.name }</Text>
            </View>


            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Description</Text>
                    <TouchableOpacity style={{ marginLeft: 30, }}>
                        <Feather name="edit" size={15} color="#2B93B6"/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{ startup.bio }</Text>
            </View>

            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Categorias</Text>
                    <TouchableOpacity style={{ marginLeft: 30, }}>
                        <Feather name="edit" size={15} color="#2B93B6"/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{ startup.categories.join('\n') }</Text>
            </View>

            <View style={styles.topicContainer}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.title}>Responsáveis</Text>
                    <TouchableOpacity onPress={() => {log()}} style={{ marginLeft: 30, }}>
                        <Feather name="edit" size={15} color="#2B93B6"/>
                    </TouchableOpacity>
                </View>
                <Text style={styles.text}>{ startup.responsible }</Text>
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
