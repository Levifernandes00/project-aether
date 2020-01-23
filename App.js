import React from 'react';
import Routes from './src/routes';
import firebaseConfig from './config';
import * as firebase from 'firebase';

firebase.initializeApp(firebaseConfig);


export default function App() {
  return (
    <Routes />
  );
}


