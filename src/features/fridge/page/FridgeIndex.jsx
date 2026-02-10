import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './FridgeIndex.css'; 
import { 
  FiMenu, FiPlusCircle, FiTrash2, 
  FiUser, FiLogOut, FiAlertTriangle 
} from 'react-icons/fi';
import logoImg from '../../../components/images/Fridge.png';

const FridgeIndex = () => {
  const navigate = useNavigate(); 

  // --- 상태 관리 ---
  const [userName, setUserName] = useState('XX');
  const [activeTab, setActiveTab] = useState('냉장');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // 임시 데이터 (나중에 백엔드 연동)
  const [ingredients, setIngredients] = useState([
    { id: 1, name: '두부', dDay: 'D-4', category: '냉장', urgent: false },
    { id: 2, name: '우유', dDay: 'D-1', category: '냉장', urgent: true },
  ]);

  const filteredItems = ingredients.filter(item => item.category === activeTab);

  // [추가] 아이템 클릭 핸들러
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  };

  return (
    <div className="fridge-main">
      {/* --- 사이드 메뉴 (Drawer) --- */}
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

      {/* --- 헤더 --- */}
      <header className="fridge-header">
        <div className="logo-area">
          <img src={logoImg} alt="Fridge.png" className="header-logo" />
        </div>
        <FiMenu size={28} className="menu-icon" onClick={() => setIsDrawerOpen(true)} />
      </header>

      {/* --- 유저 배지 --- */}
      <div className="user-title-container">
        <div className="user-badge">{userName}의 냉장고</div>
      </div>

      {/* --- 메인 카드 영역 --- */}
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
              <div 
                key={item.id} 
                className="ingredient-item"
                onClick={() => handleItemClick(item)} // [추가] 클릭 시 팝업 열기
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

      {/* --- 기능 선택 팝업 --- */}
      {isPopupOpen && selectedItem && (
        <div className="popup-overlay" onClick={() => setIsPopupOpen(false)}>
          <div className="selection-popup" onClick={(e) => e.stopPropagation()}>
            <h3>{selectedItem.name}</h3>
            <div className="popup-btn-group">
              {/* 수정 페이지로 이동 (state로 데이터 전달) */}
              <button 
                className="popup-btn" 
                onClick={() => navigate('/ingredient/edit', { state: selectedItem })}
              >
                재료 수정
              </button>
              {/* 레시피 검색 페이지로 이동 */}
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