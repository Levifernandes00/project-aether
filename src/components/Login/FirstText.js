import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Animated } from 'react-native';
import { Feather } from '@expo/vector-icons'


export default function FirstText({ disappear, time }) {

    const [fadeAnim] = useState(new Animated.Value(1));

    useEffect(()=>{
        if(disappear){
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: time,
            }).start();

        }
        
        else {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: time,
            }).start();
        }

    }, [disappear]);



  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>

        <View style={styles.titleContainer}>
            <Text style={styles.title}> Up your career</Text>
        </View>
        
        <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>Find the nearest startup to work </Text>
            <Feather name="arrow-right" size={34} color='#FFF' style={{ marginTop: 'auto' }} />
        </View>

    </Animated.View>
  );
}


const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        zIndex: 20,
    },

    titleContainer:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },

    title: {
        fontSize: 40,
        color: '#403BEB',
        fontWeight: 'bold',
        textAlign: 'center',
        width: 200,
    },


    subtitleContainer: {
        position: 'absolute',
        height: '100%',
        width: '80%',
        flexDirection: 'row',
        paddingBottom: 30,
    },

    subtitle: {
        color: '#FFF',
        fontSize: 25,
        width: 200,
        textAlign: 'left',
        marginLeft: 30,
        marginTop: 'auto',
    },
});
