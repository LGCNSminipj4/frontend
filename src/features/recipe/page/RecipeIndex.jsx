import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    StarIcon,
    FixedBottomArea
} from '../../../components/common/Styles';

const RecipeIndex = () => {
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('text'); 
    const [recipeList, setRecipeList] = useState([]);

    // 탭 변경 시 데이터 로드
    useEffect(() => {
        /* [API 연동: 텍스트,  유튜브] 
           백엔드 요청 시 필터링 파라미터 전달 필요 (type=text or youtube)
        */
        
        // 더미 데이터 주석 처리
        /*
        let dummyData = [];
        if (activeTab === 'text') {
            dummyData = Array.from({ length: 10 }, (_, i) => ({
                RECIPE_ID: i,
                RECIPE_NM_KO: `자취생을 위한 초간단 요리 ${i + 1}탄`, // title -> RECIPE_NM_KO
                SUMRY: `소요시간: ${10 + i}분`, // description -> SUMRY
                LEVEL_NM: i % 3 === 0 ? '상' : '하',
                isFavorite: i % 3 === 0, 
            }));
        } else {
            dummyData = Array.from({ length: 10 }, (_, i) => ({
                RECIPE_ID: 100 + i, 
                RECIPE_NM_KO: `[백종원 레시피] 절대 실패없는 메뉴 ${i + 1}`,
                SUMRY: `조회수 ${10 + i}만회`,
                isFavorite: i % 4 === 0,
            }));
        }
        setRecipeList(dummyData);
        */
       
       setRecipeList([]); 

    }, [activeTab]);

    const handleToggleFavorite = (id) => {
        setRecipeList((prevList) =>
            prevList.map((item) =>
                item.RECIPE_ID === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    const handleItemClick = (id) => {
        navigate(`/recipe/detail/${id}`);
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
                {recipeList.map((item) => (
                    <RecipeCard key={item.RECIPE_ID}>
                        <CardLeft onClick={() => handleItemClick(item.RECIPE_ID)}>
                            <ThumbnailBox />
                            
                            <CardInfo>
                                <CardTitle>{item.RECIPE_NM_KO}</CardTitle>
                                <CardDesc>
                                    {item.SUMRY} 
                                    {item.LEVEL_NM && ` | 난이도: ${item.LEVEL_NM}`}
                                </CardDesc>
                            </CardInfo>
                        </CardLeft>
                        
                        <StarIcon 
                            $active={item.isFavorite}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(item.RECIPE_ID);
                            }}
                        >
                            ★
                        </StarIcon>
                    </RecipeCard>
                ))}
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