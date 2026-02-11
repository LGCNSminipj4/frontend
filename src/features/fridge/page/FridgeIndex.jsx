import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './FridgeIndex.css'; 
import { 
  FiMenu, FiPlusCircle, FiTrash2, 
  FiUser, FiLogOut, FiAlertTriangle, 
  FiCheck
} from 'react-icons/fi';
import logoImg from '../../../components/images/Fridge.png';
import api from '../../../api/axios';

const FridgeIndex = () => {
  const navigate = useNavigate(); 

  const [userName, setUserName] = useState('XX');
  const [activeTab, setActiveTab] = useState('냉장');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // (기본값: 등록일순)
  const [sortType, setSortType] = useState('regDate'); 
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const [ingredients, setIngredients] = useState([]);

  // ---  데이터 불러오기 ---
  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        // 백엔드 엔드포인트 호출
        const response = await api.get('/ingredients'); 
        setIngredients(response.data);
      } catch (error) {
        console.error("데이터 불러오기 실패:", error);
      }
    };

    fetchIngredients();
  }, []);

  // --- D-Day 계산 ---
  const calculateDDay = (targetDate) => {
    if (!targetDate) return '-';
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'D-Day';
    return diffDays > 0 ? `D-${diffDays}` : `D+${Math.abs(diffDays)}`;
  };

  const filteredItems = ingredients
    .filter(item => 
      item.storage_condition === activeTab && 
      item.status === 'ACTIVE'
    )
    .sort((a, b) => {
      if (sortType === 'regDate') {
        return new Date(b.storage_date) - new Date(a.storage_date);
      } else {
        return new Date(a.expiration_date) - new Date(b.expiration_date);
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
            <li onClick={() => navigate('/mypage/edit')}>
              <span>회원정보 수정</span>
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
            filteredItems.map(item => {
              const dDayText = calculateDDay(item.expirtation_date);
              const isUrgent = dDayText === 'D-Day' || (dDayText.startsWith('D-') && parseInt(dDayText.split('-')[1]) <= 3) || dDayText.startsWith('D+');

              return (
                <div 
                  key={item.ingredients_id} 
                  className="ingredient-item"
                  onClick={() => handleItemClick(item)}
                >
                  <div className="info">
                    <div className="name">{item.ingredients_name}</div>
                    <div className={`d-day ${isUrgent ? 'urgent' : ''}`}>{dDayText}</div>
                  </div>
                  {isUrgent && <FiAlertTriangle className="alert-icon" />}
                </div>
              );
            })
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
            <h3>{selectedItem.ingredients_name}</h3>
            <div className="popup-btn-group">
              <button 
                className="popup-btn" 
                onClick={() => navigate('/ingredient/edit', { state: selectedItem })}
              >
                재료 수정
              </button>
              <button 
                className="popup-btn" 
                onClick={() => navigate('/recipe', { state: { ingredient: selectedItem.ingredients_name } })}
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