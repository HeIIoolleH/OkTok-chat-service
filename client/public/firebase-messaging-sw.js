
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');


const firebaseConfig = {
  apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
  authDomain: "oktok-5bca4.firebaseapp.com",
  projectId: "oktok-5bca4",
  storageBucket: "oktok-5bca4.appspot.com",
  messagingSenderId: "934421356238",
  appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
  measurementId: "G-QGYKCGEB06"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const messaging = firebase.messaging();


messaging.onBackgroundMessage(messaging, (payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});

console.log(messaging);
