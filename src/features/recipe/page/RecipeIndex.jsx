import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// --- 스타일 정의 ---

const Wrapper = styled.div`
    max-width: 375px;
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column; /* 세로 배치 */
    box-sizing: border-box;
    position: relative;
`;

const Header = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    flex-shrink: 0;
    border-bottom: 1px solid #f0f0f0;
`;

const BackIcon = styled.div`
    position: absolute;
    left: 16px;
    cursor: pointer;
    font-size: 20px;
    color: #888;
`;

const HeaderTitle = styled.h1`
    font-size: 18px;
    font-weight: normal;
    color: #000;
    margin: 0;
`;

const TabContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ddd;
    flex-shrink: 0;
`;

const TabButton = styled.div`
    flex: 1;
    text-align: center;
    padding: 14px 0;
    font-size: 15px;
    cursor: pointer;
    color: ${(props) => (props.isActive ? "#333" : "#aaa")};
    font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
    border-bottom: ${(props) => (props.isActive ? "2px solid #333" : "2px solid transparent")};
    transition: all 0.2s;
`;

//리스트 스크롤 영역 (중간 가변 영역)
const ScrollContainer = styled.div`
    flex: 1; 
    overflow-y: auto;
    padding: 20px 16px;
    
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
    color: ${(props) => (props.isFavorite ? "#FFD700" : "#ccc")}; /* 노란색 vs 회색 */
    transition: color 0.2s;
    padding: 4px; /* 터치 영역 확보 */
`;

const FixedBottom = styled.div`
    padding: 16px 20px 40px 20px; /* 하단 여백 넉넉히 */
    background-color: #fff;
    border-top: 1px solid #f5f5f5; /* 구분선 */
    flex-shrink: 0; /* 크기 줄어들지 않음 */
`;

const SearchButton = styled.button`
    width: 100%;
    padding: 16px;
    background-color: #d9d9d9;
    border: none;
    border-radius: 6px;
    font-size: 15px;
    color: #333;
    cursor: pointer;
    font-weight: 500;

    &:hover {
        background-color: #ccc;
    }
`;

const RecipeIndex = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('text'); // 'text' or 'youtube'

    // 초기 데이터 생성 
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
        <Wrapper>
            {/* 상단 고정 */}
            <Header>
                <BackIcon onClick={() => navigate(-1)}>&lt;</BackIcon>
                <HeaderTitle>레시피</HeaderTitle>
            </Header>

            {/* 탭 고정 */}
            <TabContainer>
                <TabButton 
                    isActive={activeTab === 'text'} 
                    onClick={() => setActiveTab('text')}
                >
                    텍스트
                </TabButton>
                <TabButton 
                    isActive={activeTab === 'youtube'} 
                    onClick={() => setActiveTab('youtube')}
                >
                    유튜브 (영상)
                </TabButton>
            </TabContainer>

            {/* 중간 스크롤 영역 (직사각형 구역) */}
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
                        
                        {/* 클릭 시 handleToggleFavorite 실행 */}
                        <StarIcon 
                            isFavorite={item.isFavorite}
                            onClick={() => handleToggleFavorite(item.id)}
                        >
                            {item.isFavorite ? "★" : "☆"}
                        </StarIcon>
                    </RecipeItem>
                ))}
            </ScrollContainer>

            {/* 하단 버튼 고정 */}
            <FixedBottom>
                <SearchButton onClick={() => navigate('/recipe/search')}>
                    다른 레시피 검색
                </SearchButton>
            </FixedBottom>
            
        </Wrapper>
    );
};

export default RecipeIndex;