import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../../../api/axios';

import PageHeader from '../../../components/common/PageHeader';
import { 
    PrimaryButton, 
    TabContainer, 
    TabItem 
} from '../../../components/common/CommonStyles';
import {
    FullPageWrapper,
    PaddingBox,
    ScrollableContent,
    RecipeCard,
    CardLeft,
    ThumbnailBox,
    CardInfo,
    CardTitle,
    CardDesc,
    FixedBottomArea
} from '../../../components/common/Styles';

const RecipeIndex = () => {
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('text'); 
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // 탭 변경 시 데이터 로드
    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setIsLoading(true);
                setRecipeList([]); // 로딩 중엔 목록 비우기

                let endpoint = '';
            
                if (activeTab === 'text') {
                    endpoint = '/recipes/text'; 
                } else {
                    endpoint = '/recipes/youtube'; 
                }

                // 2. API 호출
                const response = await api.get(endpoint);
                
                console.log(`${activeTab} 목록 응답:`, response.data);
                setRecipeList(response.data);

            } catch (error) {
                console.error("레시피 목록 로드 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, [activeTab]);

    // 아이템 클릭 핸들러
    const handleItemClick = (item) => {
        if (activeTab === 'youtube') {
            // 유튜브는 링크로 이동 (새 창)
            if (item.link) {
                window.open(item.link, '_blank');
            }
        } else {
            // 텍스트는 내부 상세 페이지 이동 (ID 필드명 
            navigate(`/recipe/detail/${item.RECIPE_ID}`);
        }
    };

    return (
        <FullPageWrapper>
            <PaddingBox>
                <PageHeader title="레시피" />
            </PaddingBox>

            <TabContainer>
                <TabItem 
                    $isActive={activeTab === 'text'}
                    onClick={() => setActiveTab('text')}
                >
                    텍스트
                </TabItem>
                <TabItem 
                    $isActive={activeTab === 'youtube'}
                    onClick={() => setActiveTab('youtube')}
                >
                    유튜브 (영상)
                </TabItem>
            </TabContainer>

            <ScrollableContent>
                {isLoading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>로딩중...</div>
                ) : (
                    recipeList.map((item, index) => (
                        <RecipeCard key={item.RECIPE_ID || index}>
                            <CardLeft onClick={() => handleItemClick(item)}>
                                
                                {/* 썸네일 처리 */}
                                {activeTab === 'youtube' ? (
                                    <img 
                                        src={item.thumbnail} 
                                        alt="thumbnail" 
                                        style={{ 
                                            width: '80px', 
                                            height: '80px', 
                                            borderRadius: '8px', 
                                            objectFit: 'cover',
                                            backgroundColor: '#eee',
                                            marginRight: '16px' 
                                        }} 
                                    />
                                ) : (
                                    <ThumbnailBox />
                                )}
                                
                                <CardInfo>
                                    <CardTitle>
                                        {activeTab === 'youtube' ? item.title : item.RECIPE_NM_KO}
                                    </CardTitle>
                                    
                                    <CardDesc>
                                        {activeTab === 'youtube' ? (
                                            <span style={{ color: '#888', fontSize: '13px' }}>
                                                영상 보러가기 &gt;
                                            </span>
                                        ) : (
                                            <>
                                                {item.SUMRY} 
                                                {item.LEVEL_NM && ` | 난이도: ${item.LEVEL_NM}`}
                                            </>
                                        )}
                                    </CardDesc>
                                </CardInfo>
                            </CardLeft>
                        </RecipeCard>
                    ))
                )}
            </ScrollableContent>

            <FixedBottomArea>
                <PrimaryButton onClick={() => navigate('/recipe/search')}>
                    다른 레시피 검색
                </PrimaryButton>
            </FixedBottomArea>
        </FullPageWrapper>
    );
};

export default RecipeIndex;