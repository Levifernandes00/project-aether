import React, { Component } from 'react';

import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

import api from './../../services/api';


export default class Startup extends Component {
  state = {
    vagas:[],
  }
  
  componentDidMount() {
    let jobs = this.props.jobs;
    let vagas = []

    jobs.forEach(job => {
      vagas.push({ name: job, editable: false});
    })

    this.setState({ vagas })
  }

  async saveJobList(){
    let jobs = [];
    this.state.vagas.forEach(vaga => {
      jobs.push(vaga.name);
    })

    await api.post(`startup/${this.props.id}/update`, { jobs });
  }

  async handleExcludeJob(text) {
    const novasVagas = 
    this.state.vagas.filter(vaga => {
      return vaga.name !== text
    });

    console.log(novasVagas);

    await this.setState({ vagas: novasVagas });
    this.saveJobList();
  }

  addJob(){
    let vagas = this.state.vagas;
    vagas.push({ editable: true });
    this.setState({ vagas });
  }

  editStyles = (editable) => {
    if(editable){
        return { 
            borderBottomColor: "#2B93B6", 
            borderBottomWidth: StyleSheet.hairlineWidth
        }
    }
  }

  save(name) {
    let jobs = this.state.vagas;
   
    let newJob = jobs[jobs.length - 1];
    newJob.name = name;
    newJob.editable = false;


    this.setState({ vagas: jobs });
    this.saveJobList();
  }

  renderItem(job){
    let { name, editable } = job;
    let nome = name

    return (
      <View key={name} style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>
        <TextInput 
          editable={editable} 
          style={[styles.job ,this.editStyles(editable)]} 
          value={nome}
          onChangeText={text => {return (nome = text)}}
        />
        <TouchableOpacity 
        style={{ marginLeft: 10 }}
        onPress={()=>this.handleExcludeJob(name)}
        >
          <Ionicons name="md-close" size={15} color="#999"/>
        </TouchableOpacity>

        {editable && (
          <TouchableOpacity onPress={ () => this.save(nome) } style={{ marginLeft: 10, }}>
            <Feather name="check" size={20} color="green"/>
          </TouchableOpacity> 
        )}
      </View>
    )
  }

  render() {
    const { vagas } = this.state;

    
  


    return(
     <View>
      {vagas &&
        vagas.map(vaga => this.renderItem(vaga))
      }

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => this.addJob()}
      >
        <Ionicons name="ios-add" color="#FFFF" size={20} />
      </TouchableOpacity>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  job: {

  },

  addButton: { 
    marginTop: 10,
    width: 40, 
    height: 20, 
    backgroundColor: '#2B93B6', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});