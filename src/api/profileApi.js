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

export function getFileFromFirebase(uid, content) {
  let type;
  if(content === "resume")
      type = "pdf";
  else
      type = "jpg"

  return new Promise((resolve, reject)=>{
    var storageRef = firebase.storage().ref();
    storageRef.child(`${uid}s/${content}.${type}`).getDownloadURL().then(function(url) {
    
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = function(event) {
        var blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      var img = document.getElementById('myimg');
      img.src = url;
    }).catch(function(error) {
      // Handle any errors
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