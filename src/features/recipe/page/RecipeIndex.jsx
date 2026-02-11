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
        /* [API 연동:  텍스트,  유튜브] 
           
           1. 텍스트 탭 (activeTab === 'text')
              - 백엔드 응답: { RECIPE_ID, RECIPE_NM_KO, SUMRY, LEVEL_NM, ... }
           
           2. 유튜브 탭 (activeTab === 'youtube')
              - 백엔드 응답: { thumbnail, title, link }  <-- 여기 수정됨
        */
        
        setRecipeList([]); // 연동 전 빈 배열 초기화

    }, [activeTab]);

    // 아이템 클릭 핸들러
    const handleItemClick = (item) => {
        if (activeTab === 'youtube') {
            // 유튜브는 링크로 이동 (새 창)
            if (item.link) {
                window.open(item.link, '_blank');
            }
        } else {
            // 텍스트는 내부 상세 페이지 이동
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
                {recipeList.map((item, index) => (
                    // 유튜브는 ID가 없을 수 있으므로 index를 키로 사용하거나 link 사용
                    <RecipeCard key={item.RECIPE_ID || index}>
                        <CardLeft onClick={() => handleItemClick(item)}>
                            
                            {/* 썸네일 처리: 유튜브면 이미지, 텍스트면 회색 박스 */}
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
                                {/* 제목 처리 */}
                                <CardTitle>
                                    {activeTab === 'youtube' ? item.title : item.RECIPE_NM_KO}
                                </CardTitle>
                                
                                {/* 설명/링크 처리 */}
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
                        
                        {/* 즐겨찾기(별) 아이콘 주석 처리 */}
                        {/*
                        <StarIcon 
                            $active={item.isFavorite}
                            onClick={(e) => {
                                e.stopPropagation();
                                // handleToggleFavorite(item.RECIPE_ID);
                            }}
                        >
                            ★
                        </StarIcon>
                        */}
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