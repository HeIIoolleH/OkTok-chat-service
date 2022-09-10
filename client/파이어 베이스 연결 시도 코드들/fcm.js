import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";


const config = {
  //프로젝트 설정 > 일반 > 하단의 내앱에서 확인
  apiKey: "AIzaSyAH4weDag-J3VH6Jp4FEJ8VHhnyd1iXCvo",
  authDomain: "oktok-5bca4.firebaseapp.com",
  projectId: "oktok-5bca4",
  storageBucket: "oktok-5bca4.appspot.com",
  messagingSenderId: "934421356238",
  appId: "1:934421356238:web:ead5e7f8746643f90bba9f",
  measurementId: "G-CLRFZL7E1V"
};

const app = initializeApp(config);
const messaging = getMessaging();

// //토큰값 얻기
getToken(messaging, {
  vapidKey:'BF04eeBPZxwgIoaIX7Q4U7HoAav-8SQKO848S1xRWAFezrRXFs9GhQE66j2d8AMTZQJP31DyFwRQlJFE3F_eAz8',
})
  .then((currentToken) => {
    if (currentToken) {
      // Send the token to your server and update the UI if necessary
      // ...
      console.log("currentToken :",currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
      // ...
    }
  })
  .catch((err) => {
    console.log("An error occurred while retrieving token. ", err);
    // ...
  });

//포그라운드 메시지 수신

onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // ...
});

