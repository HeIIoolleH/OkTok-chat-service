//프로젝트 버전 확인
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging.js");

const config = {
  //프로젝트 설정 > 일반 > 하단의 내 앱 부분 복사
  apiKey: "AIzaSyAH4weDag-J3VH6Jp4FEJ8VHhnyd1iXCvo",
  authDomain: "oktok-5bca4.firebaseapp.com",
  projectId: "oktok-5bca4",
  storageBucket: "oktok-5bca4.appspot.com",
  messagingSenderId: "934421356238",
  appId: "1:934421356238:web:ead5e7f8746643f90bba9f",
  measurementId: "G-CLRFZL7E1V"
};

// Initialize Firebase
firebase.initializeApp(config);

const messaging = firebase.messaging();

//백그라운드 서비스워커 설정
messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: payload,
    icon: "/firebase-logo.png",
  };
  
  self.registration.showNotification(notificationTitle, notificationOptions);
});