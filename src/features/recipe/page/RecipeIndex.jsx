import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Container, PrimaryButton } from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

// --- 페이지 전용 스타일 ---

const PageWrapper = styled(Container)`
    padding: 0; /* 탭과 리스트가 화면에 꽉 차도록 패딩 제거 */
    height: 100vh; /* 전체 높이 고정 */
    min-height: unset; /* min-height 제거 */
    overflow: hidden; /* 전체 스크롤 막고 내부 스크롤 사용 */
`;

const TabContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ddd;
    flex-shrink: 0;
    background-color: #fff;
`;

const TabButton = styled.div`
    flex: 1;
    text-align: center;
    padding: 14px 0;
    font-size: 15px;
    cursor: pointer;
    color: ${(props) => (props.$isActive ? "#333" : "#aaa")};
    font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
    border-bottom: ${(props) => (props.$isActive ? "2px solid #333" : "2px solid transparent")};
    transition: all 0.2s;
`;

// 리스트 스크롤 영역 (중간 가변 영역)
const ScrollContainer = styled.div`
    flex: 1; 
    overflow-y: auto;
    padding: 20px 16px; /* 내부 컨텐츠 패딩 */
    
    /* 스크롤바 숨기기 */
    &::-webkit-scrollbar {
        display: none;
    }
`;

const RecipeItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;

    &:last-child {
        margin-bottom: 0;
    }
`;

const ItemLeft = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
`;

const Thumbnail = styled.div`
    width: 80px;
    height: 80px;
    background-color: #e0e0e0;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #888;
    text-align: center;
    line-height: 1.2;
`;

const InfoBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const ItemTitle = styled.div`
    font-size: 15px;
    color: #333;
    font-weight: 500;
`;

const ItemLink = styled.div`
    font-size: 13px;
    color: #888;
`;

const StarIcon = styled.div`
    font-size: 24px;
    cursor: pointer;
    color: ${(props) => (props.$isFavorite ? "#FFD700" : "#ccc")}; /* styled-components prop 경고 방지를 위해 $ prefix 권장 */
    transition: color 0.2s;
    padding: 4px;
`;

const FixedBottom = styled.div`
    padding: 16px 20px 40px 20px;
    background-color: #fff;
    border-top: 1px solid #f5f5f5;
    flex-shrink: 0;
`;

const RecipeIndex = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('text'); 

    const [recipeList, setRecipeList] = useState(
        Array.from({ length: 10 }, (_, i) => ({
            id: i,
            title: `레시피 제목 ${i + 1}`,
            link: '상세 링크',
            isFavorite: false 
        }))
    );

    const handleToggleFavorite = (id) => {
        setRecipeList((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    return (
        <PageWrapper>
            <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                <PageHeader title="레시피" />
            </div>

            {/* 탭 고정 */}
            <TabContainer>
                <TabButton 
                    $isActive={activeTab === 'text'} 
                    onClick={() => setActiveTab('text')}
                >
                    텍스트
                </TabButton>
                <TabButton 
                    $isActive={activeTab === 'youtube'} 
                    onClick={() => setActiveTab('youtube')}
                >
                    유튜브 (영상)
                </TabButton>
            </TabContainer>

            {/* 중간 스크롤 영역 */}
            <ScrollContainer>
                {recipeList.map((item) => (
                    <RecipeItem key={item.id}>
                        <ItemLeft>
                            <Thumbnail>
                                썸네일<br/>/ 아이콘
                            </Thumbnail>
                            <InfoBox>
                                <ItemTitle>
                                    {activeTab === 'text' ? `[텍스트] ${item.title}` : `[영상] ${item.title}`}
                                </ItemTitle>
                                <ItemLink>{item.link}</ItemLink>
                            </InfoBox>
                        </ItemLeft>
                        
                        <StarIcon 
                            $isFavorite={item.isFavorite}
                            onClick={() => handleToggleFavorite(item.id)}
                        >
                            {item.isFavorite ? "★" : "☆"}
                        </StarIcon>
                    </RecipeItem>
                ))}
            </ScrollContainer>

            {/* 하단 버튼 고정 */}
            <FixedBottom>
                <PrimaryButton onClick={() => navigate('/recipe/search')}>
                    다른 레시피 검색
                </PrimaryButton>
            </FixedBottom>
            
        </PageWrapper>
    );
};

export default RecipeIndex;