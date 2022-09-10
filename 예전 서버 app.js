const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const cors = require('cors')

const corsOptions = {
  origin: "*", // 출처 허용 옵션
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};
app.use(cors(corsOptions));
app.use(express.json());




const admin = require('firebase-admin')


admin.initializeApp({
  config: {
    apiKey: "AIzaSyAH4weDag-J3VH6Jp4FEJ8VHhnyd1iXCvo",
    authDomain: "oktok-5bca4.firebaseapp.com",
    projectId: "oktok-5bca4",
    storageBucket: "oktok-5bca4.appspot.com",
    messagingSenderId: "934421356238",
    appId: "1:934421356238:web:ead5e7f8746643f90bba9f",
    measurementId: "G-CLRFZL7E1V"
  }
});




// ***********************************************************
// ************socket.io를 이용한 websocket 통신***************
// ***********************************************************

http.listen(8001, function() {
  console.log('listening on *:8001');
});

app.get('/',function(req,res){
  res.send('소켓 서버 8001포트에 연결되었습니다!');
});


// room에 따른 socket 설정

const room1 = io.of('/room1');
const room2 = io.of('/room2');
const room3 = io.of('/room3');


room1.on('connection', async(socket) => {

  const chatDataAll = await chatDataDB.findAll({
    attributes: ['text', 'user_id', 'room_num'],
    where:{
      room_num: 1
    }
  });

  console.log('room1 네임스페이스에 접속');

  socket.on('forceDisconnect', function() {
    console.log('room1 네임스페이스 접속 해제');
    socket.disconnect();
  });
  
  
  socket.emit('joinRoom', chatDataAll);

  
  socket.on('chatMessage', (chatData) =>{
    room1.emit('chatMessage', chatData);
    chatDataDB.create({
      text: chatData.text,
      user_id: chatData.user_id,
      room_num: chatData.roomNum
    });
  })


  // socket.on('pushMsg',(pushMsg) =>{
  //   admin.messaging().sendMulticast(pushMsg)
  //   .then((response) => {
  //     // Response is a message ID string.
  //     console.log('Successfully sent message:', response);
  //   })
  //   .catch((error) => {
  //     console.log('Error sending message:', error);
  //   });
  // })

})


room2.on('connection', async(socket) => {

  const chatDataAll = await chatDataDB.findAll({
    attributes: ['text', 'user_id', 'room_num'],
    where:{
      room_num: 2
    }
  });

  console.log('room2 네임스페이스에 접속');

  socket.on('forceDisconnect', function() {
    console.log('room2 네임스페이스 접속 해제');
    socket.disconnect();
  });
  
  
  socket.emit('joinRoom', chatDataAll);

  
  socket.on('chatMessage', (chatData) =>{
    room2.emit('chatMessage', chatData);
    chatDataDB.create({
      text: chatData.text,
      user_id: chatData.user_id,
      room_num: chatData.roomNum
    });
  })


  // socket.on('pushMsg',(pushMsg) =>{
  //   admin.messaging().sendMulticast(pushMsg)
  //   .then((response) => {
  //     // Response is a message ID string.
  //     console.log('Successfully sent message:', response);
  //   })
  //   .catch((error) => {
  //     console.log('Error sending message:', error);
  //   });
  // })

})


room3.on('connection', async(socket) => {

  const chatDataAll = await chatDataDB.findAll({
    attributes: ['text', 'user_id', 'room_num'],
    where:{
      room_num: 3
    }
  });

  console.log('room3 네임스페이스에 접속');

  socket.on('forceDisconnect', function() {
    console.log('room3 네임스페이스 접속 해제');
    socket.disconnect();
  });
  
  
  socket.emit('joinRoom', chatDataAll);

  
  socket.on('chatMessage', (chatData) =>{
    room3.emit('chatMessage', chatData);
    chatDataDB.create({
      text: chatData.text,
      user_id: chatData.user_id,
      room_num: chatData.roomNum
    });
  })


  // socket.on('pushMsg',(pushMsg) =>{
  //   admin.messaging().sendMulticast(pushMsg)
  //   .then((response) => {
  //     // Response is a message ID string.
  //     console.log('Successfully sent message:', response);
  //   })
  //   .catch((error) => {
  //     console.log('Error sending message:', error);
  //   });
  // })

})



// *********************************************
// ***********axios를 이용한 http 통신***********
// *********************************************


app.get('/get', (req,res) => {
  (async() => {
    const userDatas = await userDataDB.findAll({
      attributes: ['user', 'user_id']
  });
    res.send({userData:userDatas});
  })();
})

app.post('/user-create', (req, res) => {
  (async()=> {
    try {
      await userDataDB.create({
        user: req.body.user
      })
    } catch (e) {
      res.status(777).send(e);
    }
  })();
});

// app.post('/user-delete',(req, res) => {
//   (async() => {
//     try {
//       await user_data.destroy({ where: { user_id : req.params.userID } });
//       await chat_data.destroy({ where: { user_id : req.params.userID } });
//     } catch (e) {
//       res.status(888).send(e);
//     }

//   })();
// });






module.exports = app;