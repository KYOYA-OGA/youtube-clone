import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBRpcCPcianPA0TNk0zYFYFu3lCEpzOIms',
  authDomain: 'not-real-yt.firebaseapp.com',
  projectId: 'not-real-yt',
  storageBucket: 'not-real-yt.appspot.com',
  messagingSenderId: '108460849913',
  appId: '1:108460849913:web:8cd72c777945f0e7e50028',
}

firebase.initializeApp(firebaseConfig)

export default firebase.auth()
