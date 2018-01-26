import Fb from 'firebase';

const config = {
    apiKey: "AIzaSyA7ieRXHx3uH-CAqEECOnFJrINWYxDt0Zk",
    authDomain: "sunucouture-a4ea0.firebaseapp.com",
    databaseURL: "https://sunucouture-a4ea0.firebaseio.com",
    projectId: "sunucouture-a4ea0",
    storageBucket: "sunucouture-a4ea0.appspot.com",
    messagingSenderId: "839829875428"
};

const Firebase = Fb.initializeApp(config);

export default Firebase;