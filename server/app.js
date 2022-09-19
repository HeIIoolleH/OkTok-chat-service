// controller 불러오기
const createUser = require('./controller/createUser');
const getMsgs = require('./controller/getMsgs');
const getUsers = require('./controller/getUsers');
const createMsg = require('./controller/createMsg');


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
  credential: admin.credential.cert('./service_save/oktok-5bca4-firebase-adminsdk-bmkna-199a9503ab.json'),
});

// admin.initializeApp({
//   config: {
//     apiKey: "AIzaSyAqCiD3qWXYyz2btOrUnhoO_e-rB6BzUVY",
//     authDomain: "oktok-5bca4.firebaseapp.com",
//     projectId: "oktok-5bca4",
//     storageBucket: "oktok-5bca4.appspot.com",
//     messagingSenderId: "934421356238",
//     appId: "1:934421356238:web:a75aa2807fb9608a0bba9f",
//     measurementId: "G-QGYKCGEB06"
//   }
// });







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
const connectionUserIdList1 = [];
const connectionUserIdList2 = [];
const connectionUserIdList3 = [];

const tokens = [];


// ********************** room 1 *********************************
room1.on('connection', async(socket) => {
  const roomNumber = 1
  const chatDataAll = await getMsgs(roomNumber);

  console.log('room1 네임스페이스에 접속');

  await socket.on('forceDisconnect', async(userId) => {
    console.log('room1 네임스페이스 접속 해제');
    var index = connectionUserIdList1.indexOf(userId); 

    if (index > -1) {
      connectionUserIdList1.splice(index, userId);
    }
    room1.emit('userIdList',connectionUserIdList1);
    socket.disconnect();
  });

  

  await socket.on('userId',async (userId)=>{
    if(connectionUserIdList1.includes(userId)){
    }else{
      await connectionUserIdList1.push(userId);
    }
    await room1.emit('userIdList',connectionUserIdList1);
  })
  
  socket.emit('joinRoom', chatDataAll);
  
  socket.on('chatMessage', (msg) =>{
    console.log('메세지 작성');
    room1.emit('chatMessage', msg);
    createMsg(msg);
  })
  

  socket.on('postToken',async(token) => {
    if(tokens.includes(token) || token == ''){
      return;
    }else{
      const addToken = (token) => {
        tokens.push(token)
      };
      await addToken(token);
    };
  });
  console.log(tokens);


  socket.on('pushMsg',async(pushMsgNoneToken) =>{
    const pushMsg = pushMsgNoneToken;

    const addTokens = () =>{
      pushMsg.tokens = tokens;
    }
    await addTokens();
    

    console.log('pushmsg : ', pushMsg);
    admin.messaging().sendMulticast(pushMsg)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
  })

})



// ********************** room 2 *********************************
room2.on('connection', async(socket) => {
  const roomNumber = 2
  const chatDataAll = await getMsgs(roomNumber);

  console.log('room2 네임스페이스에 접속');

  await socket.on('forceDisconnect', async(userId) => {
    console.log('room2 네임스페이스 접속 해제');
    var index = connectionUserIdList2.indexOf(userId); 

    if (index > -1) {
      connectionUserIdList2.splice(index, userId);
    }
    room2.emit('userIdList',connectionUserIdList2);
    socket.disconnect();
  });

  

  await socket.on('userId',async (userId)=>{
    if(connectionUserIdList2.includes(userId)){
    }else{
      await connectionUserIdList2.push(userId);
    }
    await room2.emit('userIdList',connectionUserIdList2);
  })
  
  socket.emit('joinRoom', chatDataAll);
  
  socket.on('chatMessage', (msg) =>{
    console.log('메세지 작성');
    room2.emit('chatMessage', msg);
    createMsg(msg);
  })
  

  socket.on('postToken',async(token) => {
    if(tokens.includes(token) || token == ''){
      return;
    }else{
      const addToken = (token) => {
        tokens.push(token)
      };
      await addToken(token);
    };
  });
  console.log(tokens);

  socket.on('pushMsg',async(pushMsgNoneToken) =>{
    const pushMsg = pushMsgNoneToken;
    const addTokens = () =>{
      pushMsg.tokens = tokens;
    }
    await addTokens();
    
    console.log('pushmsg : ', pushMsg);
    admin.messaging().sendMulticast(pushMsg)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
    });
  })

})


  // ********************** room 3 *********************************
  room3.on('connection', async(socket) => {
    const roomNumber = 3
    const chatDataAll = await getMsgs(roomNumber);
  
    console.log('room3 네임스페이스에 접속');
  
    await socket.on('forceDisconnect', async(userId) => {
      console.log('room3 네임스페이스 접속 해제');
      var index = connectionUserIdList3.indexOf(userId); 
  
      if (index > -1) {
        connectionUserIdList3.splice(index, userId);
      }
      room3.emit('userIdList',connectionUserIdList3);
      socket.disconnect();
    });
  
    
  
    await socket.on('userId',async (userId)=>{
      if(connectionUserIdList3.includes(userId)){
      }else{
        await connectionUserIdList3.push(userId);
      }
      await room3.emit('userIdList',connectionUserIdList3);
    })
    
    socket.emit('joinRoom', chatDataAll);
    
    socket.on('chatMessage', (msg) =>{
      console.log('메세지 작성');
      room3.emit('chatMessage', msg);
      createMsg(msg);
    })
    
  
    socket.on('postToken',async(token) => {
      if(tokens.includes(token) || token == ''){
        return;
      }else{
        const addToken = (token) => {
          tokens.push(token)
        };
        await addToken(token);
      };
    });
    console.log(tokens);
  
    socket.on('pushMsg',async(pushMsgNoneToken) =>{
      const pushMsg = pushMsgNoneToken;
      const addTokens = () =>{
        pushMsg.tokens = tokens;
      }
      await addTokens();
      
      console.log('pushmsg : ', pushMsg);
      admin.messaging().sendMulticast(pushMsg)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
    })
  
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

// const isUserConnection = true;

// app.post('/get/connectingUser', (req,res) => {
//   (async() => {
//     if(connectionUserIdList.includes(req.body)){
//       isUserConnection = true;
//     }else{
//       await connectionUserIdList.push(req.body);
//       isUserConnection = false;
//     }
//   })
// })
// console.log(connectionUserIdList);


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
