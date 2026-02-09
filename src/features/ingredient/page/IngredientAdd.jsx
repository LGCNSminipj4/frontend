import React, { useState } from 'react';
import './IngredientAdd.css';
import { FiChevronLeft } from 'react-icons/fi';

const IngredientAdd = () => {
  const [ingredient, setIngredient] = useState({
    name: '',
    amount: '',
    unit: 'ml',
    regYear: '', regMonth: '', regDay: '',
    expYear: '', expMonth: '', expDay: '',
    category: ''
  });

  const years = Array.from({ length: 11 }, (_, i) => 2020 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngredient({ ...ingredient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ingredient.name) return alert('재료명을 입력해주세요!');
    console.log("새로 등록할 데이터:", ingredient);
    alert('새로운 재료가 등록되었습니다!');
    window.history.back();
  };

  return (
    <div className="add-container">
      <header className="add-header">
        <FiChevronLeft size={24} className="back-icon" onClick={() => window.history.back()} />
        <h2>재료 추가</h2>
      </header>

      <form className="add-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>재료명</label>
          <input 
            type="text" 
            name="name" 
            placeholder="재료 이름을 입력하세요"
            value={ingredient.name} 
            onChange={handleChange} 
          />
        </div>

        <div className="input-group">
          <label>용량</label>
          <div className="row">
            <input 
              type="number" 
              name="amount" 
              className="half" 
              placeholder="0"
              value={ingredient.amount} 
              onChange={handleChange} 
            />
            <select name="unit" className="half" value={ingredient.unit} onChange={handleChange}>
              <option value="ml">ml</option>
              <option value="g">g</option>
              <option value="개">개</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>등록일</label>
          <div className="date-row">
            <select name="regYear" value={ingredient.regYear} onChange={handleChange}>
              <option value="">년도</option>
              {years.map(y => <option key={y} value={y}>{y}년</option>)}
            </select>
            <select name="regMonth" value={ingredient.regMonth} onChange={handleChange}>
              <option value="">월</option>
              {months.map(m => <option key={m} value={m < 10 ? `0${m}` : m}>{m}월</option>)}
            </select>
            <select name="regDay" value={ingredient.regDay} onChange={handleChange}>
              <option value="">일</option>
              {days.map(d => <option key={d} value={d < 10 ? `0${d}` : d}>{d}일</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>소비기한</label>
          <div className="date-row">
            <select name="expYear" value={ingredient.expYear} onChange={handleChange}>
              <option value="">년도</option>
              {years.map(y => <option key={y} value={y}>{y}년</option>)}
            </select>
            <select name="expMonth" value={ingredient.expMonth} onChange={handleChange}>
              <option value="">월</option>
              {months.map(m => <option key={m} value={m < 10 ? `0${m}` : m}>{m}월</option>)}
            </select>
            <select name="expDay" value={ingredient.expDay} onChange={handleChange}>
              <option value="">일</option>
              {days.map(d => <option key={d} value={d < 10 ? `0${d}` : d}>{d}일</option>)}
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>카테고리</label>
          <select name="category" className="full" value={ingredient.category} onChange={handleChange}>
            <option value="">카테고리 선택</option>
            <option value="유제품">유제품</option>
            <option value="고기">고기</option>
            <option value="채소">채소</option>
            <option value="과일">과일</option>
            <option value="기타">기타</option>
          </select>
        </div>

        <div className="add-btn-container">
          <button type="submit" className="submit-btn">등록</button>
        </div>
      </form>
    </div>
  );
};

export default IngredientAdd;