import React,{useState} from 'react';
import './SignUpModal.scss'
import axios from 'axios';

const Modal = (props) => {
    const {open, close, userDatas, setUserDatas} = props;
    const [userInput, setUserInput] = useState('')
    const handleChange = (e) =>setUserInput(e.target.value); // input의 다음 바뀔 값

// user 이름(인풋) 데이터 보내기 
    const handleCreate = async() => {                           //인풋받은 텍스트와 다른 정보들을 하나의 오브젝트로 저장
        const initialUser = {user: userInput};
        if (userDatas.find(users => users.user === userInput) === undefined && userInput !== ''){
            alert('가입을 축하합니다!');
            window.location.reload();
            setUserDatas(prevstate => prevstate.concat(initialUser));
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

    return(
        <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
                <header>
                    회원가입
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                </header>
                <div className='sign-up-input-wrapper'>
                    <input 
                        value={userInput} 
                        onKeyPress={handleKeyPress} 
                        onChange={handleChange}
                        className='sign-up-input-box'
                        placeholder="이름을 입력하세요"
                    />
                </div>
                <div className='sign-up-button' onClick={handleCreate}>
                    가입
                </div>
            </section>
        ) : null}
      </div>
    );
};

export default Modal;