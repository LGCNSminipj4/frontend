import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { 
  Container, 
  PrimaryButton, 
  COLORS 
} from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

// --- Styles ---

const PageWrapper = styled(Container)`
  padding: 0;
  height: 100vh;
  min-height: unset;
  overflow: hidden;
`;

const HeaderPadding = styled.div`
  padding: 0 20px;
`;

const TabContainer = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid ${COLORS.border};
  background-color: ${COLORS.white};
  flex-shrink: 0;
`;

const TabButton = styled.div`
  flex: 1;
  text-align: center;
  padding: 14px 0;
  font-size: 15px;
  cursor: pointer;
  color: ${(props) => (props.$isActive ? COLORS.textMain : COLORS.textSub)};
  font-weight: ${(props) => (props.$isActive ? "700" : "400")};
  border-bottom: 2px solid ${(props) => (props.$isActive ? COLORS.textMain : "transparent")};
  transition: all 0.2s;
`;

const ScrollContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  
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
    border-bottom: none;
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
  color: ${COLORS.textSub};
  text-align: center;
  line-height: 1.2;
  flex-shrink: 0;
`;

const InfoBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ItemTitle = styled.div`
  font-size: 15px;
  color: ${COLORS.textMain};
  font-weight: 500;
`;

const ItemLink = styled.div`
  font-size: 13px;
  color: ${COLORS.textSub};
`;

const StarIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
  color: ${(props) => (props.$isFavorite ? COLORS.warning : COLORS.border)}; 
  transition: color 0.2s;
  padding: 4px;
`;

const FixedBottom = styled.div`
  padding: 16px 20px 40px 20px;
  background-color: ${COLORS.white};
  border-top: 1px solid #f5f5f5;
  flex-shrink: 0;
`;

// --- Component ---

const RecipeIndex = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('text'); 
    const [recipeList, setRecipeList] = useState([]);

    // Backend Simulation: Fetch data on mount
    useEffect(() => {
        // TODO: Replace with actual API call (e.g., axios.get('/api/recipes'))
        const fetchData = () => {
            const dummyData = Array.from({ length: 10 }, (_, i) => ({
                id: i,
                title: `레시피 제목 ${i + 1}`,
                link: '상세 링크',
                thumbnailUrl: '', // Image URL placeholder
                isFavorite: false // Default state (backend logic will determine this)
            }));
            setRecipeList(dummyData);
        };

        fetchData();
    }, []);

    // Toggle Favorite Status
    const handleToggleFavorite = (id) => {
        // TODO: Add API call to update favorite status on server
        // axios.post(`/api/recipes/${id}/favorite`)
        
        setRecipeList((prevList) =>
            prevList.map((item) =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    return (
        <PageWrapper>
            <HeaderPadding>
                <PageHeader title="레시피" />
            </HeaderPadding>

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

            <ScrollContainer>
                {recipeList.map((item) => (
                    <RecipeItem key={item.id}>
                        <ItemLeft>
                            <Thumbnail>
                                {/* TODO: Render actual image if item.thumbnailUrl exists */}
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
                            ★
                        </StarIcon>
                    </RecipeItem>
                ))}
            </ScrollContainer>

            <FixedBottom>
                <PrimaryButton onClick={() => navigate('/recipe/search')}>
                    다른 레시피 검색
                </PrimaryButton>
            </FixedBottom>
        </PageWrapper>
    );
};

export default RecipeIndex;