// import firebase from "firebase/compat/app";
// import "firebase/compat/messaging";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAH4weDag-J3VH6Jp4FEJ8VHhnyd1iXCvo",
//   authDomain: "oktok-5bca4.firebaseapp.com",
//   projectId: "oktok-5bca4",
//   storageBucket: "oktok-5bca4.appspot.com",
//   messagingSenderId: "934421356238",
//   appId: "1:934421356238:web:ead5e7f8746643f90bba9f",
//   measurementId: "G-CLRFZL7E1V"
// };

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

// const { REACT_APP_VAPID_KEY } = process.env;
// const publicKey = REACT_APP_VAPID_KEY;

// export const getToken = async (setTokenFound) => {
//   let currentToken = "";

//   try {
//     currentToken = await messaging.getToken({ vapidKey: publicKey });
//     if (currentToken) {
//       setTokenFound(true);
//     } else {
//       setTokenFound(false);
//     }
//   } catch (error) {
//     console.log("An error occurred while retrieving token. ", error);
//   }

//   return currentToken;
// };

// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     messaging.onMessage((payload) => {
//       resolve(payload);
//     });
//   });
