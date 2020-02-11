import * as firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';


export function uriToBlob(uri) {

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        // return the blob
        resolve(xhr.response);
      };
      
      xhr.onerror = function() {
        // something went wrong
        reject(new Error('uriToBlob failed'));
      };
      // this helps us get a blob
      xhr.responseType = 'blob';
      xhr.open('GET', uri, true);
      
      xhr.send(null);
    });
}


export function uploadToFirebase(blob, content, uid) {
    let type;
    if(content === "resume")
        type = "pdf";
    else
        type = "jpg"

    return new Promise((resolve, reject)=>{
      var storageRef = firebase.storage().ref();
      storageRef.child(`${uid}s/${content}.${type}`).put(blob, {
        contentType: `${content}/${type}`
      }).then((snapshot)=>{
        blob.close();
        resolve(snapshot);
      }).catch((error)=>{
        reject(error);
      });
    });
}

export function linkResume(uid, resumePath) {
    firebase.firestore()
        .collection("Users")
        .doc(uid)
        .update({
            resume: resumePath
        })
}

export async function getResume(uid) {
    

    const response = await firebase.firestore()
    .collection("Users")
    .doc(uid)
    .get()

   return response.data().resume;
}

export async function addUser(uid) {
  await firebase.firestore()
  .collection("Users")
  .doc(uid)
  .set({
    uid
  })
}