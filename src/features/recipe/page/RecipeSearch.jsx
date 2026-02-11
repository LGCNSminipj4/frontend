import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import api from '../../../api/axios';

import { 
    Container, 
    Label, 
    StyledSelect, 
    PrimaryButton 
} from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

const PageWrapper = styled(Container)` padding: 0; height: 100vh; min-height: unset; overflow: hidden; `;
const FilterContainer = styled.div` padding: 0 16px 20px 16px; flex-shrink: 0; border-bottom: 1px solid #f0f0f0; `;
const FilterRow = styled.div` display: flex; gap: 10px; margin-bottom: 20px; `;
const FilterGroup = styled.div` flex: 1; display: flex; flex-direction: column; gap: 8px; `;
const ResultContainer = styled.div` flex: 1; display: flex; flex-direction: column; overflow: hidden; `;
const TabContainer = styled.div` display: flex; width: 100%; border-bottom: 1px solid #ddd; flex-shrink: 0; margin-top: 10px; `;
const TabButton = styled.div` flex: 1; text-align: center; padding: 14px 0; font-size: 15px; cursor: pointer; color: ${(props) => (props.$isActive ? "#333" : "#aaa")}; font-weight: ${(props) => (props.$isActive ? "bold" : "normal")}; border-bottom: ${(props) => (props.$isActive ? "2px solid #333" : "2px solid transparent")}; transition: all 0.2s; `;
const ScrollArea = styled.div` flex: 1; overflow-y: auto; padding: 20px 16px; &::-webkit-scrollbar { display: none; } `;
const RecipeItem = styled.div` display: flex; align-items: center; justify-content: space-between; padding-bottom: 20px; margin-bottom: 20px; border-bottom: 1px solid #eee; &:last-child { margin-bottom: 0; border-bottom: none; } `;
const ItemLeft = styled.div` display: flex; align-items: center; gap: 16px; cursor: pointer; `; 
const Thumbnail = styled.div` width: 80px; height: 80px; background-color: #e0e0e0; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #888; text-align: center; line-height: 1.2; overflow: hidden; `; 
const InfoBox = styled.div` display: flex; flex-direction: column; gap: 6px; `;
const ItemTitle = styled.div` font-size: 15px; color: #333; font-weight: 500; `;
const ItemLink = styled.div` font-size: 13px; color: #888; `;
const fadeInOut = keyframes` 0% { opacity: 0; transform: translate(-50%, 20px); } 10% { opacity: 1; transform: translate(-50%, 0); } 90% { opacity: 1; transform: translate(-50%, 0); } 100% { opacity: 0; transform: translate(-50%, 20px); } `;
const ToastMessage = styled.div` position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%); background-color: rgba(0, 0, 0, 0.8); color: white; padding: 12px 24px; border-radius: 20px; font-size: 14px; z-index: 1000; white-space: nowrap; animation: ${fadeInOut} 2s ease-in-out forwards; `;

const OPTIONS = {
    culture: ["한식", "일식", "양식", "중식", "아시안"],
    method: ["볶음", "국/찌개", "구이", "생식", "조림/찜"],
    lifestyle: ["초간단", "한그릇", "술안주", "도시락", "다이어트"]
};

const RecipeSearch = () => {
    // ... (기존 hooks 유지)
    const navigate = useNavigate();
    const [filters, setFilters] = useState({ culture: "", method: "", lifestyle: "" });
    const [isSearched, setIsSearched] = useState(false);
    const [activeTab, setActiveTab] = useState('text');
    const [showToast, setShowToast] = useState(false);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // 실제 검색을 수행하는 함수
    const executeSearch = async (currentTab) => {
        try {
            setIsLoading(true);
            setResults([]);

            // 백엔드로 보낼 데이터 (필터 + 현재 탭 종류)
            const payload = {
                culture: filters.culture,
                method: filters.method,
                lifestyle: filters.lifestyle,
                type: currentTab // 'text' or 'youtube'
            };

            // [API 호출] POST 방식이 검색 조건 보내기 편함
            const response = await api.post('/recipes/search', payload);
            
            console.log("검색 결과:", response.data);
            setResults(response.data);

        } catch (error) {
            console.error("검색 실패:", error);
            // alert("검색 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    // 검색 버튼 클릭 시
    const handleSearchClick = () => {
        if (!filters.culture || !filters.method || !filters.lifestyle) {
            setShowToast(true);
            return;
        }
        setIsSearched(true);
        executeSearch(activeTab); 
    };

    // 탭 변경 시 (이미 검색된 상태라면 재검색)
    useEffect(() => {
        if (isSearched) {
            executeSearch(activeTab);
        }
    }, [activeTab]); 
    const handleItemClick = (item) => {
        if (activeTab === 'youtube' && item.link) {
            window.open(item.link, '_blank');
        } else if (activeTab === 'text') {
             navigate(`/recipe/detail/${item.RECIPE_ID}`);
        }
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
                <PageHeader title="레시피 검색" />
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

                <PrimaryButton onClick={handleSearchClick} style={{ padding: '14px', fontSize: '15px' }}>
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
                        {isLoading ? (
                            <div style={{textAlign: 'center', marginTop: '20px'}}>검색 중...</div>
                        ) : (
                            results.length === 0 ? (
                                <div style={{textAlign: 'center', marginTop: '20px', color: '#888'}}>검색 결과가 없습니다.</div>
                            ) : (
                                results.map((item, index) => (
                                    <RecipeItem key={item.RECIPE_ID || index}>
                                        <ItemLeft onClick={() => handleItemClick(item)}>
                                            <Thumbnail>
                                                {activeTab === 'youtube' ? (
                                                    <img 
                                                        src={item.thumbnail} 
                                                        alt="thumb" 
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                                                    />
                                                ) : (
                                                    "이미지" 
                                                )}
                                            </Thumbnail>
                                            
                                            <InfoBox>
                                                <ItemTitle>
                                                    {activeTab === 'text' ? item.RECIPE_NM_KO : item.title}
                                                </ItemTitle>
                                                <ItemLink>
                                                    {activeTab === 'text' 
                                                        ? item.SUMRY 
                                                        : <span style={{ color: 'blue' }}>영상 보러가기</span>
                                                    }
                                                </ItemLink>
                                            </InfoBox>
                                        </ItemLeft>
                                    </RecipeItem>
                                ))
                            )
                        )}
                    </ScrollArea>
                </ResultContainer>
            )}

            {showToast && <ToastMessage>형식을 모두 선택 해주세요</ToastMessage>}
        </PageWrapper>
    );
};

export default RecipeSearch;