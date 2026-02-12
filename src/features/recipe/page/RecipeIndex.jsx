import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. useLocation 추가

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
    const location = useLocation(); // 2. location 훅 선언 (Unexpected use of 'location' 에러 해결)
    
    const [activeTab, setActiveTab] = useState('youtube'); 
    const [recipeList, setRecipeList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                setIsLoading(true);
                setRecipeList([]); 

                const token = localStorage.getItem('token');
                const config = { headers: { Authorization: `Bearer ${token}` } };

                if (activeTab === 'youtube') {
                    // [명세서 반영] 
                    // 1. POST 메서드 사용
                    // 2. 경로: /youtube/recipes/search
                    // 3. 쿼리 파라미터 ingredientName 필수 전송
                    // 4. Request Body는 빈 배열 [] 전송
                    const ingredient = location.state?.ingredient || "라면"; 
                    const response = await api.post(
                        `/youtube/recipes/search?ingredientName=${ingredient}`, 
                        [], 
                        config
                    );
                    setRecipeList(response.data);
                } else {
                    // 텍스트 레시피 엔드포인트 (기존 유지)
                    const response = await api.get('/recipes/text', config);
                    setRecipeList(response.data);
                }

            } catch (error) {
                console.error("레시피 목록 로드 실패:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRecipes();
    }, [activeTab, location.state?.ingredient]); // 재료가 바뀌어도 다시 호출

    const handleItemClick = (item) => {
        if (activeTab === 'youtube') {
            // [명세서 반영] 필드명: videoUrl
            if (item.videoUrl) {
                window.open(item.videoUrl, '_blank');
            }
        } else {
            navigate(`/recipe/detail/${item.RECIPE_ID}`);
        }
    };

    return (
        <FullPageWrapper>
            <PaddingBox>
                <PageHeader title="레시피" onBackClick={() => navigate('/fridge')} />
            </PaddingBox>

            <TabContainer>
                <TabItem 
                    $isActive={activeTab === 'youtube'}
                    onClick={() => setActiveTab('youtube')}
                >
                    유튜브 (영상)
                </TabItem>
                <TabItem 
                    $isActive={activeTab === 'text'}
                    onClick={() => setActiveTab('text')}
                >
                    텍스트
                </TabItem>
            </TabContainer>

            <ScrollableContent>
                {isLoading ? (
                    <div style={{ padding: '20px', textAlign: 'center' }}>로딩중...</div>
                ) : (
                    recipeList.map((item, index) => (
                        <RecipeCard key={item.videoUrl || index}>
                            <CardLeft onClick={() => handleItemClick(item)}>
                                {activeTab === 'youtube' ? (
                                    <img 
                                        src={item.thumbnailUrl} // [명세서 반영] 필드명: thumbnailUrl
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
                                            <span style={{ color: '#00C4B4', fontSize: '13px' }}>
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