import firebase from 'firebase';
require('firebase/firestore');

export function addStartup() {

}

export async function getStartups() {
    var startupList = []

    const snapshot = await firebase
    .firestore()
    .collection("Startup")
    .get();

    snapshot.forEach( doc => {

        startupList.push({
            nome: doc.data().nome,
            descricao: doc.data().descricao,
            vagas: doc.data().vagas,
            imageURL: doc.data().imageURL,
            id: doc.data().id,
            applies: doc.data().applies,
            categorias: doc.data().categorias,
        });
    });

    return startupList
    
}