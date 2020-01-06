import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Text, Animated } from 'react-native';


export default function FirstText({ disappear, time }) {

    const [fadeAnim] = useState(new Animated.Value(1)); // Initial value for opacity: 0

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
        </View>

    </Animated.View>
  );
}


const styles = StyleSheet.create({
    container: {
        padding: 0,
        flex: 1,
        zIndex: 1,
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
        marginTop: 'auto',
        marginBottom: 50,
    },

    subtitle: {
        zIndex: 10,
        color: '#FFF',
        fontSize: 25,
        width: 200,
        textAlign: 'left',
        marginLeft: 30,

    },
});
