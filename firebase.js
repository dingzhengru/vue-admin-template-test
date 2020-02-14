import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyAdTlkurDetgw7egdEvThtGEMgoMCtUx8o',
    authDomain: 'vue-admin-template-test.firebaseapp.com',
    databaseURL: 'https://vue-admin-template-test.firebaseio.com',
    projectId: 'vue-admin-template-test',
    storageBucket: 'vue-admin-template-test.appspot.com',
    messagingSenderId: '299469333370',
    appId: '1:299469333370:web:a621943a428c604d7b6cc3'
};
firebase.initializeApp(firebaseConfig);

let db = firebase.firestore();


export { db }