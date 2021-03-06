import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyClGmtJFwh9FElhyg2-a4nqnaA_ZZ52J0A",
    authDomain: "e-clothing-98f66.firebaseapp.com",
    databaseURL: "https://e-clothing-98f66.firebaseio.com",
    projectId: "e-clothing-98f66",
    storageBucket: "e-clothing-98f66.appspot.com",
    messagingSenderId: "198603804808",
    appId: "1:198603804808:web:603edbcbfb259fb2724f3d",
    measurementId: "G-PH15PR3FR7"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if (!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {

            console.log('error creating user ', error.message)
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;