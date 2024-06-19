// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { FacebookAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { arrayRemove, arrayUnion, deleteField, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



// Initialize Firebase




class FireClass {
    firebaseConfig;
    app;
    DATABASE;
    AUTH;
    STORAGE;

    constructor(firebaseConfig) {
        this.app = initializeApp(firebaseConfig);
        this.DATABASE = getFirestore(this.app);
        this.AUTH = getAuth(this.app)
        this.STORAGE = getStorage(this.app)
    }


    auth = {
        signUpEmailPass: async (email, password) => {
            createUserWithEmailAndPassword(AUTH, email, password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    return userCredential
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    return errorMessage
                });
        },

        loginEmailPass: async (email, password) => {
            signInWithEmailAndPassword(AUTH, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(userCredential)
                    return userCredential
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },



        loginWith: async (provider) => {

            const returnProvider = (_provider) => {

                switch (_provider) {
                    case 'google': {
                        return new GoogleAuthProvider()
                        break;
                    }
                    case 'facebook': {
                        return new FacebookAuthProvider()
                        break;
                    }



                    default:
                        break;
                }


            }


            signInWithPopup(AUTH, returnProvider(provider))
                .then((result) => {
                    const thisProvider = (provider == 'google') ? GoogleAuthProvider :
                        (provider == 'facebook') ? FacebookAuthProvider : null

                    // This gives you a  Access Token. You can use it to access the Google API.
                    const credential = thisProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    // IdP data available using getAdditionalUserInfo(result)
                    // ...
                    console.log(user)
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorMessage)
                    // ...

                });
        },

        checkCurrentUser: () => {
            return this.AUTH.currentUser
        },



        logout: async () => {
            signOut(AUTH).then(() => {
                // Sign-out successful.
            }).catch((error) => {
                // An error happened.
            });

        },
        sendVerification: async () => {
            sendEmailVerification(auth.currentUser)
                .then(() => {
                    // Email verification sent!
                    // ...
                });
        },

        sendPasswordReset: async () => {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    // Password reset email sent!
                    // ..
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        },


    }

    data = {
        addToDocumentCollection: async (collection, Doc, field, data) => {
            console.log(collection, Doc, field, data)
            if (Doc) {
                try {
                    await setDoc(doc(DATABASE, collection, Doc), {
                        [field]: data,
                    }, { merge: true });
                } catch (error) {
                    console.log(error.message)
                }
            }

        },

        updateDocumentCollection: async (collection, Doc, Field, Value) => {

            await updateDoc(doc(DATABASE, collection, Doc), {
                [Field]: Value ? Value : deleteField()
            });
        },

        updateDocumentCollectionArrayItem: async (collection, Doc, Field, Value, remove) => {
            await updateDoc(doc(DATABASE, collection, Doc), {
                [Field]: !remove ? arrayUnion(Value) : arrayRemove(Value)
            });
        },

        fetchDocument: async (collection, document, setterfunction) => {
            const docRef = doc(DATABASE, collection, document);
            try {
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    if (setterfunction) setterfunction(docSnap.data());
                    return docSnap.data()
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            } catch (error) {
                console.log(error.message)
            }
        }
    }

}


export default FireClass
