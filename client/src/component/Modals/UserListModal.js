import React from 'react';
import './UserListModal.scss'

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, roomId, userList, disconnetSocket, returnList } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            OkTok Room{roomId} UserList
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          {userList.map((li,index)=>{
            return(
            <div className='userList'>{li}</div>
            )
          })}
          <div className='buttons'>
            <div className='disconnet-button' onClick={()=> 
                {disconnetSocket()
                  returnList()
                }
                }>
                채팅방 나가기
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;