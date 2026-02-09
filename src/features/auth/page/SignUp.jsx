import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
  const [selectedCultures, setSelectedCultures] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState([]);
  const [selectedLifeStyles, setSelectedLifeStyles] = useState([]);

  const cultures = ['한식', '일식', '양식', '중식', '아시안'];
  const methods = ['볶음', '국/찌개', '구이', '생식', '조림/찜'];
  const lifeStyles = ['초간단', '한그릇', '술안주', '도시락', '다이어트'];


  const toggleSelection = (item, selectedList, setList) => {
    if (selectedList.includes(item)) {
      setList(selectedList.filter((i) => i !== item));
    } else {
      setList([...selectedList, item]);
    }
  };

  return (
    <div className="signup-container">
      <div className="header-area">
        <button className="back-btn" onClick={() => window.history.back()}>〈</button>
        <h1 className="title">회원가입</h1>
      </div>

      <div className="form-content">
        <div className="input-group">
          <label>아이디</label>
          <div className="input-row">
            <input type="text" className="main-input" placeholder="아이디 입력(6~20자)" />
            <button className="check-btn">중복확인</button>
          </div>
        </div>

        <div className="input-group">
          <label>비밀번호</label>
          <input type="password" className="main-input" placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 6~20자)" />
        </div>

        <div className="input-group">
          <label>비밀번호 확인</label>
          <input type="password" className="main-input" placeholder="비밀번호 재입력" />
        </div>

        <div className="input-group">
          <label>이름</label>
          <input type="text" className="main-input" placeholder="이름을 입력해주세요" />
        </div>

        <div className="input-group">
          <label>생년월일</label>
          <div className="birth-row">
            <select className="main-input"><option>년도</option></select>
            <select className="main-input"><option>월</option></select>
            <select className="main-input"><option>일</option></select>
          </div>
        </div>

        <div className="input-group">
          <label>요리 문화</label>
          <div className="chip-container">
            {cultures.map((item) => (
              <button
                key={item}
                className={`chip-button ${selectedCultures.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item, selectedCultures, setSelectedCultures)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>조리 방식</label>
          <div className="chip-container">
            {methods.map((item) => (
              <button
                key={item}
                className={`chip-button ${selectedMethods.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item, selectedMethods, setSelectedMethods)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="input-group">
          <label>라이프 스타일</label>
          <div className="chip-container">
            {lifeStyles.map((item) => (
              <button
                key={item}
                className={`chip-button ${selectedLifeStyles.includes(item) ? 'selected' : ''}`}
                onClick={() => toggleSelection(item, selectedLifeStyles, setSelectedLifeStyles)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button className="submit-button">회원가입</button>
      </div>
    </div>
  );
};

export default SignUp;
