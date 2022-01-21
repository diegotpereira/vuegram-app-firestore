import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'


// firebase init
const firebaseConfig = {
    apiKey: "AIzaSyB4WJ_nspMyFA_zsSZ9ky_SoQiS2QOp70I",
    authDomain: "website-ecom-ff223.firebaseapp.com",
    databaseURL: "https://website-ecom-ff223-default-rtdb.firebaseio.com",
    projectId: "website-ecom-ff223",
    storageBucket: "website-ecom-ff223.appspot.com",
    messagingSenderId: "144186283636",
    appId: "1:144186283636:web:e5d9499049bab1749f6321",
    measurementId: "G-5JT4P2YBDN"
}
firebase.initializeApp(firebaseConfig)

// Utils
const db = firebase.firestore()
const auth = firebase.auth()

// referências de coleção
const colecaoUsuarios = db.collection('usuarios')
const colecaoComentarios = db.collection('comentarios')
const colecaoPostagens = db.collection('postagens')
const colecaoCurtidas = db.collection('curtidas')

export {
    db,
    auth,
    colecaoUsuarios,
    colecaoComentarios,
    colecaoPostagens,
    colecaoCurtidas
}