import React, { Component } from 'react';

import { View, TouchableOpacity, Text } from 'react-native';

// import { Container } from './styles';

export default class Startup extends Component {
  state = {
    backgroundColor: "white",
    color: "#999",
  }

  componentDidUpdate(prevProps){
    if(prevProps.selected !== this.props.selected){
      if(this.props.selected){
        this.setState({ backgroundColor: "#2B93B6", color: "white" })
      }
      else{
        this.setState({ backgroundColor: "white", color: "#999" })
      }
    }
  }


  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{ textAlignVertical: 'center', backgroundColor: this.state.backgroundColor, margin: 5, borderRadius: 10, borderWidth: 0.3}}>
        <Text style={{color: this.state.color, margin: 10, textAlign: 'center'}}>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  }
}


