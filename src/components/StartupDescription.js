import React, { Component } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default class StartupDescription extends Component {
  state = {
    modalVisible: false
  }

  componentDidUpdate(prevProps) {
    if(this.props.visible !== prevProps.visible)
      this.setState({ modalVisible: true });
  }

  render() {
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

        </Modal>

    );
  }
}

const styles = StyleSheet.create({

});