import React, {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import './Login.css'

const Login = (props) => {
    const userData = props.userData;
    const setUserData = props.setUserData;
    const setUserId = props.setUserId;
    const setIsLogin = props.setIsLogin;

// **********axios를 이용한 http 통신으로 데이터 불러오고 보내주기*********
// 데이터 받기
    const getUserDB = async () => {
        try{
            const result = await axios.get('http://192.168.0.14:8000/get');
            return result.data;
        }catch(e){
            alert('getUserData :', e.message)
        }
    };
    
    const setUserDataFromServer = async() => {
        const userDatas = await getUserDB();
        const {userData: userDataDB} = userDatas || {};
        setUserData(userDataDB);
    };

    
    useEffect(() => {
        if (userData.length === 0){
            setUserDataFromServer();
        }
    });

// 유저 데이터 추가 
    const [userInput, setUserInput] = useState('')
    const handleChange = (e) =>setUserInput(e.target.value); // input의 다음 바뀔 값


// user 이름(인풋) 데이터 보내기 
    const handleCreate = async() => {                           //인풋받은 텍스트와 다른 정보들을 하나의 오브젝트로 저장
        const initialUser = {user: userInput};
        if (userData.find(users => users.user === userInput) === undefined && userInput !== ''){
            alert('가입을 축하합니다!');
            window.location.reload();
            setUserData(prevstate => prevstate.concat(initialUser));
            await axios.post("http://192.168.0.14:8000/user-create",initialUser);
        }
        if (userInput === ''){
            alert('계정은 빈 이름이면 안됩니다.');
        }else{
            alert('이미 있는 계정입니다.');
            window.location.reload();
        }
    };


    const handleKeyPress = (e) => {
      // 눌려진 키가 enter면 handleCreate 호출
      if(e.key === 'Enter') {
        handleCreate();
      }
    };

// 로그인
    const [input, setInput] = useState('');
    const userChange = (e) => setInput(e.target.value); // input의 다음 바뀔 값

    const checkLogin = () => {
        if (userData.find(users => users.user === input) !== undefined){
            const loginUser = userData.find(users => users.user === input)
            setUserId(loginUser.user_id);
            setIsLogin(true);
        }else{
            alert('계정이 없습니다. 가입을 해주세요.')
        }
    };

    const userKeyPress = (e) => {
        // 눌려진 키가 enter면 handleCreate 호출
        if(e.key === 'Enter') {
          checkLogin();
        }
      };



// 유저 데이터 삭제
    // const handleRemove = (userID) => {                                    // (후에) x표시 클릭을 통해 지정된 item의 id를 찾고 filter를 통해 제거하는 기능
    // setUserData(userData.filter(user => user.userID !== userID));
    // };

    
    
    return (
        <main className='login-templete'>
            <div className='input-wrapper'>
                <input 
                    value={input} 
                    onKeyPress={userKeyPress} 
                    onChange={userChange}
                    className='input-box'
                />
                <div className='button' onClick={checkLogin}>
                    로그인
                </div>
            </div>
            <div className='input-wrapper'>
                <input 
                    value={userInput} 
                    onKeyPress={handleKeyPress} 
                    onChange={handleChange}
                    className='input-box'
                />
                <div className='button' onClick={handleCreate}>
                가입
                </div>
            </div>
        </main>
    );
};

export default Login;