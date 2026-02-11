import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { 
    Container, 
    Label, 
    StyledSelect, 
    PrimaryButton 
} from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

// ... (스타일 컴포넌트 생략 - 기존 유지)
const PageWrapper = styled(Container)`
    padding: 0; 
    height: 100vh;
    min-height: unset;
    overflow: hidden; 
`;
const FilterContainer = styled.div` padding: 0 16px 20px 16px; flex-shrink: 0; border-bottom: 1px solid #f0f0f0; `;
const FilterRow = styled.div` display: flex; gap: 10px; margin-bottom: 20px; `;
const FilterGroup = styled.div` flex: 1; display: flex; flex-direction: column; gap: 8px; `;
const ResultContainer = styled.div` flex: 1; display: flex; flex-direction: column; overflow: hidden; `;
const TabContainer = styled.div` display: flex; width: 100%; border-bottom: 1px solid #ddd; flex-shrink: 0; margin-top: 10px; `;
const TabButton = styled.div` flex: 1; text-align: center; padding: 14px 0; font-size: 15px; cursor: pointer; color: ${(props) => (props.$isActive ? "#333" : "#aaa")}; font-weight: ${(props) => (props.$isActive ? "bold" : "normal")}; border-bottom: ${(props) => (props.$isActive ? "2px solid #333" : "2px solid transparent")}; transition: all 0.2s; `;
const ScrollArea = styled.div` flex: 1; overflow-y: auto; padding: 20px 16px; &::-webkit-scrollbar { display: none; } `;
const RecipeItem = styled.div` display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; margin-bottom: 20px; border-bottom: 1px solid #eee; &:last-child { margin-bottom: 0; border-bottom: none; } `;
const ItemLeft = styled.div` display: flex; align-items: center; gap: 16px; `;
const Thumbnail = styled.div` width: 80px; height: 80px; background-color: #e0e0e0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #888; text-align: center; line-height: 1.2; `;
const InfoBox = styled.div` display: flex; flex-direction: column; gap: 6px; `;
const ItemTitle = styled.div` font-size: 15px; color: #333; font-weight: 500; `;
const ItemLink = styled.div` font-size: 13px; color: #888; `;
const StarIcon = styled.div` font-size: 24px; cursor: pointer; color: ${(props) => (props.$isFavorite ? "#FFD700" : "#ccc")}; padding: 4px; `;
const fadeInOut = keyframes` 0% { opacity: 0; transform: translate(-50%, 20px); } 10% { opacity: 1; transform: translate(-50%, 0); } 90% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, 20px); } `;
const ToastMessage = styled.div` position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 12px 24px; border-radius: 20px; font-size: 14px; z-index: 1000; white-space: nowrap; animation: ${fadeInOut} 2s ease-in-out forwards; `;

const OPTIONS = {
    culture: ["한식", "일식", "양식", "중식", "아시안"],
    method: ["볶음", "국/찌개", "구이", "생식", "조림/찜"],
    lifestyle: ["초간단", "한그릇", "술안주", "도시락", "다이어트"]
};

const RecipeSearch = () => {
    const navigate = useNavigate();
    
    // 필터 상태
    const [filters, setFilters] = useState({
        culture: "",
        method: "",
        lifestyle: ""
    });

    const [isSearched, setIsSearched] = useState(false);
    const [activeTab, setActiveTab] = useState('text');
    const [showToast, setShowToast] = useState(false);
    const [results, setResults] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = async () => {
        if (!filters.culture || !filters.method || !filters.lifestyle) {
            setShowToast(true);
            return;
        }

        setIsSearched(true);

        /* [API 연동: ] 
           검색 필터를 쿼리 파라미터로 전송
        */
        // 더미 데이터 주석 처리
        /*
        setResults(Array.from({ length: 10 }, (_, i) => ({
            RECIPE_ID: i,
            RECIPE_NM_KO: `검색된 레시피 ${i + 1} (${filters.culture})`, // title -> RECIPE_NM_KO
            SUMRY: '상세보기',
            isFavorite: false
        })));
        */
       setResults([]); 
    };

    const handleToggleFavorite = (id) => {
        setResults(prev => prev.map(item => 
            item.RECIPE_ID === id ? { ...item, isFavorite: !item.isFavorite } : item
        ));
    };

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => setShowToast(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    return (
        <PageWrapper>
            <div style={{ padding: '0 16px' }}>
                <PageHeader title="레시피" />
            </div>

            <FilterContainer>
                <FilterRow>
                    <FilterGroup>
                        <Label>요리 문화</Label>
                        <StyledSelect name="culture" value={filters.culture} onChange={handleFilterChange}>
                            <option value="" disabled>선택</option>
                            {OPTIONS.culture.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </StyledSelect>
                    </FilterGroup>
                    <FilterGroup>
                        <Label>조리 방식</Label>
                        <StyledSelect name="method" value={filters.method} onChange={handleFilterChange}>
                            <option value="" disabled>선택</option>
                            {OPTIONS.method.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </StyledSelect>
                    </FilterGroup>
                    <FilterGroup>
                        <Label>라이프 스타일</Label>
                        <StyledSelect name="lifestyle" value={filters.lifestyle} onChange={handleFilterChange}>
                            <option value="" disabled>선택</option>
                            {OPTIONS.lifestyle.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                        </StyledSelect>
                    </FilterGroup>
                </FilterRow>

                <PrimaryButton onClick={handleSearch} style={{ padding: '14px', fontSize: '15px' }}>
                    검색
                </PrimaryButton>
            </FilterContainer>

            {isSearched && (
                <ResultContainer>
                    <TabContainer>
                        <TabButton $isActive={activeTab === 'text'} onClick={() => setActiveTab('text')}>텍스트</TabButton>
                        <TabButton $isActive={activeTab === 'youtube'} onClick={() => setActiveTab('youtube')}>유튜브 (영상)</TabButton>
                    </TabContainer>

                    <ScrollArea>
                        {results.map((item) => (
                            <RecipeItem key={item.RECIPE_ID}>
                                <ItemLeft>
                                    <Thumbnail>썸네일</Thumbnail>
                                    <InfoBox>
                                        <ItemTitle>{activeTab === 'text' ? `[텍스트] ${item.RECIPE_NM_KO}` : `[영상] ${item.RECIPE_NM_KO}`}</ItemTitle>
                                        <ItemLink>{item.SUMRY}</ItemLink>
                                    </InfoBox>
                                </ItemLeft>
                                <StarIcon 
                                    $isFavorite={item.isFavorite}
                                    onClick={() => handleToggleFavorite(item.RECIPE_ID)}
                                >
                                    {item.isFavorite ? "★" : "☆"}
                                </StarIcon>
                            </RecipeItem>
                        ))}
                    </ScrollArea>
                </ResultContainer>
            )}

            {showToast && <ToastMessage>형식을 모두 선택 해주세요</ToastMessage>}
        </PageWrapper>
    );
};

export default RecipeSearch;