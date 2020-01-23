import firebase from 'firebase';
require('firebase/firestore');

export function addStartup() {

}

export async function getStartupsBy(object) {
    var startupList = []
    var snapshot;

    console.log(object);
    if(object){
        if(object.uid) {
            console.log(object.uid)
            snapshot = await firebase
            .firestore()
            .collection("Startup")
            .where("responsaveis", "array-contains", object.uid)
            .get();
        }
        else if(object.category) {
            snapshot = await firebase
            .firestore()
            .collection("Startup")
            .where("categorias", "array-contains", object.category)
            .get();
        }
    }

    else {
        snapshot = await firebase
        .firestore()
        .collection("Startup")
        .get();
    }    
    
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