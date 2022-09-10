// importScripts('https://www.gstatic.com/firebasejs/3.4.0/firebase-app.js');

// const firebaseConfig = {
//         apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
//         authDomain: "oktok-5bca4.firebaseapp.com",
//         projectId: "oktok-5bca4",
//         storageBucket: "oktok-5bca4.appspot.com",
//         messagingSenderId: "934421356238",
//         appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
//         measurementId: "G-QGYKCGEB06"
//       }

// firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();


// messaging.setBackgroundMessageHandler(function(data) {
//   console.log('[firebase-messaging-sw.js] Received background message ', data);
//   // Show notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   return self.registration.showNotification(notificationTitle,
//       notificationOptions);
// });
// [END background_handler]




// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";
// importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js");        // 외부라이브러리를 가져오고 사용하기
// importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js");


// const firebaseConfig = {
//     apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
//     authDomain: "oktok-5bca4.firebaseapp.com",
//     projectId: "oktok-5bca4",
//     storageBucket: "oktok-5bca4.appspot.com",
//     messagingSenderId: "934421356238",
//     appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
//     measurementId: "G-QGYKCGEB06"
//   };
  
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   getMessaging(app);
  

  
  
//   function requestPermission() {
//     console.log('Requesting permission...');
//     Notification.requestPermission().then((permission) => {
//       if (permission === 'granted') {
//         console.log('Notification permission granted.');}
//     })
//   };

//   requestPermission();



// const messaging = getMessaging();

// // getToken(messaging, { vapidKey: 'BF04eeBPZxwgIoaIX7Q4U7HoAav-8SQKO848S1xRWAFezrRXFs9GhQE66j2d8AMTZQJP31DyFwRQlJFE3F_eAz8' })
// // .then((currentToken) => {
// //   if (currentToken) {
// //     // Send the token to your server and update the UI if necessary
// //     // ...
// //     console.log("currentToken :",currentToken);
// //   } else {
// //     // Show permission request UI
// //     console.log('No registration token available. Request permission to generate one.');
// //     // ...
// //   }
// // }).catch((err) => {
// //   console.log('An error occurred while retrieving token. ', err);
// //   // ...
// // });

// onMessage(messaging, (payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });


// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//   };
//   /* eslint-disable-next-line no-restricted-globals */
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
