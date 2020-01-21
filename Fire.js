import firebaseConfig from './config';
import * as firebase from 'firebase';
require('firebase/firestore')

class Fire {
    constructor() {
        firebase.initializeApp(firebaseConfig);
    }

    uploadPhotoAsync = async uri => {
        const path = `photos/${this.uid}/${Date.now()}.jpg`

        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .path(path)
                .put(file);

            upload.on(
                "stated_changed", 
                snapshot => {}, 
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }   
            );
        })
    }

    getAllStartupsBy = () => {
        return firebase.firestore().collection("Startup").get();
    }

    get firestore() {
        return firebase.firestore();
    }

    get uid() {
        return firebase.auth().currentUser.uid;
    }

    get currentUser() {
        return firebase.auth().currentUser;
    }

    get timestamps() {
        return Date.now();
    }
}

Fire.shared = new Fire();
export default Fire;