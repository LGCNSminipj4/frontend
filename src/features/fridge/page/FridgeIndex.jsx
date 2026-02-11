import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './FridgeIndex.css'; 
import { 
  FiMenu, FiPlusCircle, FiTrash2, 
  FiUser, FiLogOut, FiAlertTriangle, 
  FiCheck
} from 'react-icons/fi';
import logoImg from '../../../components/images/Fridge.png';

const FridgeIndex = () => {
  const navigate = useNavigate(); 

  const [userName, setUserName] = useState('XX');
  const [activeTab, setActiveTab] = useState('냉장');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 정렬 상태 (기본값: 등록일순)
  const [sortType, setSortType] = useState('regDate'); 
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const [ingredients, setIngredients] = useState([
    { id: 1, name: '두부', dDay: 'D-4', category: '냉장', urgent: false, regDate: '2024-05-10', expDate: '2024-05-24' },
    { id: 2, name: '우유', dDay: 'D-1', category: '냉장', urgent: true, regDate: '2024-05-15', expDate: '2024-05-21' },
  ]);

  const filteredItems = ingredients
    .filter(item => item.category === activeTab)
    .sort((a, b) => {
      if (sortType === 'regDate') {
        // 등록일순 (최신순)
        return new Date(b.regDate) - new Date(a.regDate);
      } else {
        // 유통기한 임박순 (D-Day 짧은 순)
        return new Date(a.expDate) - new Date(b.expDate);
      }
    });

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

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
            <li onClick={() => navigate('/ingredient/add')}>
              <span>재료 추가</span>
              <FiPlusCircle size={22} />
            </li>
            <li onClick={() => navigate('/consumption')}>
              <span>소비완료</span>
              <FiCheck size={22} />
            </li>
            <li onClick={() => navigate('/trash')}>
              <span>쓰레기통</span>
              <FiTrash2 size={22} />
            </li>
            <li onClick={() => navigate('/mypage')}>
              <span>마이페이지</span>
              <FiUser size={22} />
            </li>
          </ul>

          <div className="drawer-footer">
            <button className="logout-btn" onClick={() => console.log('로그아웃')}>
              로그아웃 <FiLogOut size={18} />
            </button>
          </div>
        </div>
      </div>
      
      {isDrawerOpen && <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>}

      <header className="fridge-header">
        <div className="logo-area">
          <img src={logoImg} alt="Fridge.png" className="header-logo" />
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

        <div className="sort-area" style={{ position: 'relative' }}>
          <button className="sort-btn" onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}>
            {sortType === 'regDate' ? '등록일순' : '유통기한 임박순'} ≡
          </button>
          
          {isSortMenuOpen && (
            <div className="sort-dropdown" style={{
              position: 'absolute', top: '35px', right: '0',
              background: 'white', border: '1px solid #ccc', borderRadius: '8px',
              zIndex: 10, overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
            }}>
              <div 
                style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '14px' }}
                onClick={() => { setSortType('regDate'); setIsSortMenuOpen(false); }}
              >
                등록일순
              </div>
              <div 
                style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '14px', borderTop: '1px solid #eee' }}
                onClick={() => { setSortType('expDate'); setIsSortMenuOpen(false); }}
              >
                유통기한 임박순
              </div>
            </div>
          )}
        </div>

        <div className="ingredient-list">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <div 
                key={item.id} 
                className="ingredient-item"
                onClick={() => handleItemClick(item)}
              >
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

      {isPopupOpen && selectedItem && (
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="selection-popup" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedItem.name}</h3>
            <div className="popup-btn-group">
              <button 
                className="popup-btn" 
                onClick={() => navigate('/ingredient/edit', { state: selectedItem })}
              >
                재료 수정
              </button>
              <button 
                className="popup-btn" 
                onClick={() => navigate('/recipe', { state: { ingredient: selectedItem.name } })}
              >
                레시피 검색
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FridgeIndex;