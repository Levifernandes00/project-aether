import firebase from 'firebase';
import { useReducer } from 'react';
require('firebase/firestore');

export function addStartup() {

}

export async function getStartupsBy(object) {
    let condition = {};
    
    if(object){
        if(object.uid) {
            condition.topic = "responsaveis";
            condition.comparison = "array-contains";
            condition.item = object.uid;
        }
        else if(object.category) {
            condition.topic = "categorias";
            condition.comparison = "array-contains";
            condition.item = object.category;
        }
    }
    else
        condition = null;
    return await getStartups(condition)

}


export async function getStartups(condition) {
    var startupList = []
    var snapshot;

    if(condition){
        snapshot = await firebase
            .firestore()
            .collection("Startup")
            .where(condition.topic, condition.comparison, condition.item)
            .get()
    }
    
    else {
        snapshot = await firebase
        .firestore()
        .collection("Startup")
        .get();
    }    

    if(snapshot){
        snapshot.forEach( doc => {
            startupList.push({
                nome: doc.data().nome,
                responsaveis: doc.data().responsaveis,
                descricao: doc.data().descricao,
                vagas: doc.data().vagas,
                imageURL: doc.data().imageURL,
                id: doc.data().id,
                applies: doc.data().applies,
                categorias: doc.data().categorias,
            });
        });
    }
    
    return startupList
}

export async function getStartupNotFrom(user){
   

    const startups = await getStartups();
   
    let newStartups = startups.filter(startup => {
        const applied = startup.applies.filter(apply => apply.uid === user.uid); //apply do usuário nessa startup

        return ! (startup.responsaveis.includes(user.uid) || startup.applies.includes(applied)) //verifica se o usuário está entre os responsáveis ou se está cadastrado e nega
    });
    return newStartups;
}

export async function addApply(userObject, id) {
    let applies = [];
    const docRef = await firebase.firestore().collection("Startup").doc(id);
    
    docRef 
    .get()
    .then(doc => {
        applies = doc.data().applies;
        applies.push(userObject);
        docRef.update({ applies })
    });

}


export async function getUsers() {
    let usersList = [];

    const snapshot = await firebase.firestore()
    .collection("Users")
    .get();


    snapshot.forEach( doc => {
        usersList.push({
            uid: doc.id,
            resume: doc.data().resume,
        })
    });

    return usersList;
}