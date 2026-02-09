import React, { useState } from 'react';
import './FridgeIndex.css';
import { 
  FiMenu, FiX, FiPlusCircle, FiTrash2, 
  FiUser, FiLogOut, FiAlertTriangle 
} from 'react-icons/fi';

const FridgeIndex = () => {
  const [userName, setUserName] = useState('XX');
  const [activeTab, setActiveTab] = useState('냉장');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const filteredItems = ingredients.filter(item => item.category === activeTab);

  return (
    <div className="fridge-main">
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <button onClick={() => setIsDrawerOpen(false)} className="close-btn">
            <FiMenu size={28} />
          </button>
        </div>
        
        <div className="drawer-content">
          <ul className="main-menu">
            <li>
              <span>재료 추가</span>
              <FiPlusCircle size={22} />
            </li>
            <li>
              <span>쓰레기통</span>
              <FiTrash2 size={22} />
            </li>
            <li>
              <span>마이페이지</span>
              <FiUser size={22} />
            </li>
          </ul>

          <div className="drawer-footer">
            <button className="logout-btn">
              로그아웃 <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {isDrawerOpen && <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>}

<header className="fridge-header">
        <div className="logo-area">
          <span className="logo-sub">(로고)</span>
          <span className="logo-main">냉장고를 부탁해</span>
        </div>
        <FiMenu size={28} className="menu-icon" onClick={() => setIsDrawerOpen(true)} />
      </header>

      <div className="user-title-container">
        <div className="user-badge">{userName}의 냉장고</div>
      </div>

      <div className="fridge-card">
        <nav className="tab-nav">
          {['냉장', '냉동', '실온'].map(tab => (
            <button
              key={tab}
              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="sort-area">
          <button className="sort-btn">정렬 ≡</button>
        </div>

        <div className="ingredient-list">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div key={item.id} className="ingredient-item">
                <div className="info">
                  <div className="name">{item.name}</div>
                  <div className={`d-day ${item.urgent ? 'urgent' : ''}`}>{item.dDay}</div>
                </div>
                {item.urgent && <FiAlertTriangle className="alert-icon" />}
              </div>
            ))
          ) : (
            <div className="empty-container">
              <p className="empty-msg">등록된 재료가 없습니다.</p>
              <p className="empty-sub-msg">새로운 재료를 추가해보세요!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FridgeIndex;