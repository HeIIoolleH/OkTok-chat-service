// controller 불러오기
const createUser = require('./controller/createUser.js');
const getMsgs = require('./controller/getMsgs.js');
const getUsers = require('./controller/getUsers.js');
const createMsg = require('./controller/createMsg.js')








// http 접속을 위한 cor 옵션 넣기
const cors = require('cors')

// express 설정
const express = require('express');
const app = express();

// socket 설정 및 http통신->socket통신
const http = require('http').Server(app);
const io = require('socket.io')(http);


// cors 옵션 설정
const corsOptions = {
  origin: "*", // 출처 허용 옵션 - 전체 출처 허용
  credential: true, // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
};

app.use(cors(corsOptions));


app.use(express.json());



const admin = require('firebase-admin');






admin.initializeApp({
  config: {
    apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
    authDomain: "oktok-5bca4.firebaseapp.com",
    projectId: "oktok-5bca4",
    storageBucket: "oktok-5bca4.appspot.com",
    messagingSenderId: "934421356238",
    appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
    measurementId: "G-QGYKCGEB06"
  }
});







// ***********************************************************
// ************socket.io를 이용한 websocket 통신***************
// ***********************************************************

http.listen(8001, function() {
  console.log('listening on *:8001');
});

app.get('/',function(req,res){
  res.send('서버잘 작동중~~');
});


// room에 따른 socket 설정

const room1 = io.of('/room1');
const room2 = io.of('/room2');
const room3 = io.of('/room3');

const tokens = [];

// ********************** room 1 *********************************
room1.on('connection', async(socket) => {
  const roomNumber1 = 1
  const chatDataAll = await getMsgs(roomNumber1);

  console.log('room1 네임스페이스에 접속');

  socket.on('forceDisconnect', function() {
    console.log('room1 네임스페이스 접속 해제');
    socket.disconnect();
  });
  
  socket.on('postToken',async(token) => {
    if(tokens.includes(token)){
      console.log("1231231231231231231");
      return;
    }else{
      const addToken = (token) => {
        tokens.push(token)
      };
      await addToken(token);
    };
  })

  socket.emit('joinRoom', chatDataAll);

  socket.on('chatMessage', (msg) =>{
    room1.emit('chatMessage', msg);
    createMsg(msg);
  })

  // socket.on('pushMsg',async(pushMsgNoneToken) =>{
  //   const pushMsg = pushMsgNoneToken;
  //   const addTokens = () =>{
  //     pushMsg.tokens = tokens;
  //   }
  //   await addTokens(pushMsgNoneToken);

  //   console.log('pushmsg : ', pushMsg);
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



// ********************** room 2 *********************************
room2.on('connection', async(socket) => {
  const roomNumber2 = 2
  const chatDataAll = await getMsgs(roomNumber2);

  console.log('room2 네임스페이스에 접속');

  socket.on('forceDisconnect', function() {
    console.log('room2 네임스페이스 접속 해제');
    socket.disconnect();
  });
  
  socket.on('postToken',(token) => {
    if(tokens.includes(token)){
      return;
    }else{
      tokens.push(token)
    };
  })

  socket.emit('joinRoom', chatDataAll);

  socket.on('chatMessage', (msg) =>{
    room2.emit('chatMessage', msg);
    createMsg(msg);
  })


  // socket.on('pushMsg',(pushMsgNoneToken) =>{
  //   const pushMsg = pushMsgNoneToken;
  //   const addTokens = () =>{
  //     pushMsg.tokens = tokens;
  //   }
  //   addTokens(pushMsgNoneToken);
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


  // ********************** room 3 *********************************
  room3.on('connection', async(socket) => {
    const roomNumber3 = 3
    const chatDataAll = await getMsgs(roomNumber3);
  
    console.log('room3 네임스페이스에 접속');
  
    socket.on('forceDisconnect', function() {
      console.log('room3 네임스페이스 접속 해제');
      socket.disconnect();
    });
    
    socket.on('postToken',(token) => {
      if(tokens.includes(token)){
        return;
      }else{
        tokens.push(token)
      };
    })
  
    socket.emit('joinRoom', chatDataAll);
  
    socket.on('chatMessage', (msg) =>{
      room3.emit('chatMessage', msg);
      createMsg(msg);
    })
  

    // socket.on('pushMsg',(pushMsgNoneToken) =>{
    //   const pushMsg = pushMsgNoneToken;
    //   const addTokens = () =>{
    //     pushMsg.tokens = tokens;
    //   }
    //   addTokens(pushMsgNoneToken);
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
    const userDatas = await getUsers();

    res.send({userData:userDatas});

  })();
})

app.post('/user-create', (req, res) => {
  const newUserData = req.body
  try {
    createUser(newUserData);
  } catch (e) {
    res.status(777).send(e);
  }
});



// // ***** terminal 명령어를 통한 DB Table 생성 *****
// const db = require('./models/index.js');
// const sequelize = db.sequelize;

// (async () => {
//   await sequelize.sync({ force: true });
// })();
// //  await sequelize.sync({ force: true });  // 서버가 실행될 때 시퀄라이저의 스키마를 DB에 적용시키는 기능
// //  force: true -> 기존 테이블이 있다면 건드리지 않는 것을 강제로 sync 메소드에 옵션 객체(변경점)를 전달하는 코드
// //  옵션 객체를 기존 테이블을 날리고 새 코드에 맞춰 저장하는 방법이니 실제에서는 사용 X

module.exports = app;
