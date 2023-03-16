import React, { useState } from 'react';
import './Blog.css';

const names = ['강해민', '강해민 원숭이', '강해민 노빠꾸'];

const Blog = () => {
  const [titles, setTitles] = useState(['강해민', '강해민 원숭이', '강해민 노빠꾸']);
  const [selectedTitleIndex, setSelectedTitleIndex] = useState(-1);

  const handleDelete = (index) => {
    const newTitles = [...titles];
    newTitles.splice(index, 1);
    setTitles(newTitles);
    setSelectedTitleIndex(-1);
  };

  const renderTitles = () => {
    return titles.map((title, index) => (
      <div className="list" key={index} onClick={() => setSelectedTitleIndex(index)}>
        <h4>{title}</h4>
        <p>안녕하세요 {names[index]} 입니다.</p>
        <button onClick={() => handleDelete(index)}>글삭제</button>
      </div>
    ));
  };

  return (
    <div>
      <div className="nav">
        <h1>BLOG</h1>
      </div>
      {renderTitles()}
      <Modal title={selectedTitleIndex !== -1 ? titles[selectedTitleIndex] : ''} onClose={() => setSelectedTitleIndex(-1)} />
    </div>
  );
};

const Modal = ({ title, onClose }) => {
  const content = "만나서 반가워요!";

  return (
    <div className="modal" style={{ display: title ? 'block' : 'none' }}>
      <h4>{title}</h4>
      <p>{content}</p>
      <button onClick={onClose}>닫기</button>
    </div>
  );
};

export default Blog;