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
        <FullPageWrapper>
            {/* 헤더 영역 (좌우 패딩 적용) */}
            <PaddingBox>
                <PageHeader title="레시피" />
            </PaddingBox>

            {/* 탭 버튼 */}
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

            {/* 리스트 영역 (스크롤 가능) */}
            <ScrollableContent>
                {recipeList.map((item) => (
                    <RecipeCard key={item.id}>
                        {/* 카드 왼쪽 영역 (클릭 시 상세 이동) */}
                        <CardLeft onClick={() => handleItemClick(item.id)}>
                            {/* 이미지는 아직 없음, 회색 박스만 표시 */}
                            <ThumbnailBox />
                            
                            <CardInfo>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDesc>{item.description}</CardDesc>
                            </CardInfo>
                        </CardLeft>
                        
                        {/* 즐겨찾기 별 아이콘 */}
                        <StarIcon 
                            $active={item.isFavorite}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleToggleFavorite(item.id);
                            }}
                        >
                            ★
                        </StarIcon>
                    </RecipeCard>
                ))}
            </ScrollableContent>

            {/* 하단 검색 버튼 (고정) */}
            <FixedBottomArea>
                <PrimaryButton onClick={() => navigate('/recipe/search')}>
                    다른 레시피 검색
                </PrimaryButton>
            </FixedBottomArea>
        </FullPageWrapper>
    );
};

export default RecipeIndex;