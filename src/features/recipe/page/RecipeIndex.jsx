import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipeIndex.css'; 

import PageHeader from '../../../components/common/PageHeader';

const RecipeIndex = () => {
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('text'); 
    const [recipeList, setRecipeList] = useState([]);

    // 탭 변경 시 더미 데이터 즉시 로드
    useEffect(() => {
        let dummyData = [];

        if (activeTab === 'text') {
            // 텍스트 레시피 더미 데이터 10개
            dummyData = Array.from({ length: 10 }, (_, i) => ({
                id: i,
                title: `자취생을 위한 초간단 요리 ${i + 1}탄`,
                description: `소요시간: ${10 + i}분 | 난이도: ${i % 3 === 0 ? '상' : '하'}`,
                isFavorite: i % 3 === 0, 
                type: 'text'
            }));
        } else {
            // 유튜브 영상 더미 데이터 10개
            dummyData = Array.from({ length: 10 }, (_, i) => ({
                id: 100 + i, 
                title: `[백종원 레시피] 절대 실패없는 메뉴 ${i + 1}`,
                description: `조회수 ${10 + i}만회 • ${i + 1}일 전`,
                isFavorite: i % 4 === 0,
                type: 'youtube'
            }));
        }

        setRecipeList(dummyData);
    }, [activeTab]);

    const handleToggleFavorite = (id) => {
        setRecipeList((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    const handleItemClick = (id) => {
        navigate(`/recipe/detail/${id}`);
    };

    return (
        <div className="recipe-page-wrapper">
            <div className="header-padding">
                <PageHeader title="레시피" />
            </div>

            {/* 탭 버튼 */}
            <div className="tab-container">
                <div 
                    className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
                    onClick={() => setActiveTab('text')}
                >
                    텍스트
                </div>
                <div 
                    className={`tab-button ${activeTab === 'youtube' ? 'active' : ''}`}
                    onClick={() => setActiveTab('youtube')}
                >
                    유튜브 (영상)
                </div>
            </div>

            {/* 리스트 영역 */}
            <div className="scroll-container">
                {recipeList.map((item) => (
                    <div key={item.id} className="recipe-item">
                        <div className="item-left" onClick={() => handleItemClick(item.id)}>
                            {/* 이미지는 아직 없음, 회색 박스만 표시 */}
                            <div className="thumbnail"></div>
                            
                            <div className="info-box">
                                <div className="item-title">{item.title}</div>
                                <div className="item-desc">{item.description}</div>
                            </div>
                        </div>
                        
                        <div 
                            className={`star-icon ${item.isFavorite ? 'favorite' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(item.id);
                            }}
                        >
                            ★
                        </div>
                    </div>
                ))}
            </div>

            {/* 하단 검색 버튼 */}
            <div className="fixed-bottom">
                <button 
                    className="primary-button" 
                    onClick={() => navigate('/recipe/search')}
                >
                    다른 레시피 검색
                </button>
            </div>
        </div>
    );
};

export default RecipeIndex;