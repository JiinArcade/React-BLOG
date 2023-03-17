import React from 'react'
import './Blog.css'
import { useState } from 'react';

const Blog = () => {
  const [title, setTitle] = useState([
    "Title1",
    "Title2",
    "Title3",
  ])

  // 모달창을 띄우기 위한 상태값 / 초기값 = false
  let [modal, setModal] = useState(false);
  // 모달창에 표시될 제목 글의 인덱스 / 초기값 = 0
  let [modalTitle, setModalTitle] = useState(0);

  const name = ["이름1", "이름2", "이름3"]

  return (
    <div>
      <div className='nav'>
        <h1>BLOG</h1>
      </div>

      {
        title.map((item, i) => {
          return (
            // map으로 html요소를 반복할 때는 고유의 key값을 넣어줘야 한다.
            <div className='list' key={i} onClick={() =>
              // {
              // 조건문
              //   if(modal && modalTitle === i) {
              //     setModal(false)
              //   } else {
              //     setModal(true);
              //     setModalTitle(i)
              //   }
              // }


              // 삼항연산자에 onClick(()=>{modal && modalTitle === i~~ }) 작성시 에러 발생
              // Expected an assignment or function call and instead saw an expression
              // 할당 또는 함수를 예상 했는데 표현식이 나왔다는 에러

              // 해결방법1 : { } 중괄호 제거
              // onClick(()=> modal && modalTitle === i~~ )

              // 해결방법2 : 조건 앞에 retrun 추가
              // onClick(()=>{return modal && modalTitle === i~~ })

              // 에러 발생 이유 
              // 1. {} 중괄호를 생략해야 함수의 body가 표현식으로 인식하기 때문에 return이 없어도 값을 반환한다.
              // 2. 함수 내부에서 삼항연산자를 사용하여 값을 반환하려면 반드시 return이 있어야 한다. r
              //    return이 없을 경우 해당 표현식의 결과값을 반환하지 않는다.

              // 현재 모달창이 열려있고, 클릭한 글 제목과 모달창에 표시되는 글 인덱스가 같다면 ? (조건)
              // true일 때 실행 : setModal(false)를 호출해서 모달을 닫는다.
              // false일 때 실행 : setModal(true)로 모달을 열고, 
              // setModalTitle(i)로 모달창에 표시될 글 제목의 인덱스를 업데이트 한다.

              // && 논리 연산자는 좌항의 값이 참일 때, 우항을 계산한다.
              // modal이 true일 경우, modalTitle과 i가 같은지 비교한다.
              // 좌항 modal이 false일 경우 바로 false를 반환한다.
              modal && modalTitle === i ? setModal(false) : (setModal(true), setModalTitle(i))

            }>
              <h4>{item}</h4>
              <p>안녕하세요 저는 {name[i]} 입니다.</p>
              <button onClick={() => {
                let copy = [...title];
                copy.splice(i, 1);
                setTitle(copy);
              }}>글삭제</button>
            </div>
          )
        })
      }

      {/* 
        조건부 렌더링 : modal이 true일 때만 <Modal/> 컴포넌트를 렌더링 한다.
        false, null, undefined, 0, Nan, 빈 문자열('')은 false를 반환한다. 그 외의 값은 ture
        && 좌측이 true면 연산자 우측을 반환하고, false라면 바로 false를 반환한다.
        그래서 modal 값이 false인 경우에는 && 연산자 우측인 Modal 컴포넌트가 실행되지 않는다.
      */}
      {modal && <Modal modalTitle={modalTitle} title={title} closeModal={() => setModal(false)} />}
    </div>
  )
}

function Modal(props) {
  return (
    <div className='modal'>
      <h4>{props.title[props.modalTitle]}</h4>
      <p>Content</p>
      <button onClick={props.closeModal}>닫기</button>
    </div>
  )
}

export default Blog