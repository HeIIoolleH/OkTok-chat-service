import React, {useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import './Login.scss'
import Modal from '../Modals/SignUpModal';

const Login = (props) => {
    const userDatas = props.userDatas;
    const setUserDatas = props.setUserDatas;
    const setUserId = props.setUserId;
    const setIsLogin = props.setIsLogin;

    const [modalOpen, setModalOpen] = useState(false);
    const [isUserConnection, setIsUserConnection] = useState(true);

    const openModal = () => {
        setModalOpen(true);
      };

    const closeModal = () => {
        setModalOpen(false);
    };

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
        setUserDatas(userDataDB);
    };

    
    useEffect(() => {
        if (userDatas.length === 0){
            setUserDataFromServer();
        }
    });

// // 유저 데이터 추가 
//     const [userInput, setUserInput] = useState('')
//     const handleChange = (e) =>setUserInput(e.target.value); // input의 다음 바뀔 값


// // user 이름(인풋) 데이터 보내기 
//     const handleCreate = async() => {                           //인풋받은 텍스트와 다른 정보들을 하나의 오브젝트로 저장
//         const initialUser = {user: userInput};
//         if (userDatas.find(users => users.user === userInput) === undefined && userInput !== ''){
//             alert('가입을 축하합니다!');
//             window.location.reload();
//             setuserDatas(prevstate => prevstate.concat(initialUser));
//             await axios.post("http://192.168.0.14:8000/user-create",initialUser);
//         }
//         if (userInput === ''){
//             alert('계정은 빈 이름이면 안됩니다.');
//         }else{
//             alert('이미 있는 계정입니다.');
//             window.location.reload();
//         }
//     };


//     const handleKeyPress = (e) => {
//       // 눌려진 키가 enter면 handleCreate 호출
//       if(e.key === 'Enter') {
//         handleCreate();
//       }
//     };

// 로그인
    const [input, setInput] = useState('');
    const userChange = (e) => setInput(e.target.value); // input의 다음 바뀔 값

    const checkLogin = () => {
        if (userDatas.find(users => users.user === input) !== undefined){
            const loginUser = userDatas.find(users => users.user === input);
            setUserId(loginUser.user_id);
            setIsLogin(true);
        }
        if(userDatas.find(users => users.user === input) === undefined){
            alert('계정이 없습니다. 가입을 해주세요.')
            setModalOpen(true);
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
    // setUserDatas(userDatas.filter(user => user.userID !== userID));
    // };

    
    
    return (
        <main className='login-templete'>
            <div className='input-wrapper'>
                <input 
                    value={input} 
                    onKeyPress={userKeyPress} 
                    onChange={userChange}
                    className='input-box'
                    placeholder="이름을 입력하세요"
                />
            </div>
            <div className='button' onClick={checkLogin}>
                로그인
            </div>
            <footer>
                <button className='sign-up' onClick={()=>{
                    openModal();
                }}>
                    회원가입
                </button>
                <Modal open={modalOpen} close={closeModal} header="Modal heading"
                userDatas={userDatas}
                setUserDatas={setUserDatas}></Modal>
            </footer>
        </main>
    );
};

export default Login;