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

// --- 페이지 전용 스타일 ---

const PageWrapper = styled(Container)`
    padding: 0; /* 전체 패딩 제거 후 내부에서 조정 */
    height: 100vh;
    min-height: unset;
    overflow: hidden; /* 전체 스크롤 방지 */
`;

// 필터 영역 (상단 고정)
const FilterContainer = styled.div`
    padding: 0 16px 20px 16px;
    flex-shrink: 0;
    border-bottom: 1px solid #f0f0f0;
`;

const FilterRow = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
`;

const FilterGroup = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ResultContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden; /* 내부 스크롤을 위해 넘침 숨김 */
`;

const TabContainer = styled.div`
    display: flex;
    width: 100%;
    border-bottom: 1px solid #ddd;
    flex-shrink: 0;
    margin-top: 10px;
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

// 리스트 스크롤 영역
const ScrollArea = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 20px 16px;

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
    color: ${(props) => (props.$isFavorite ? "#FFD700" : "#ccc")};
    padding: 4px;
`;

// 토스트 팝업
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translate(-50%, 20px); }
  10% { opacity: 1; transform: translate(-50%, 0); }
  90% { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, 20px); }
`;

const ToastMessage = styled.div`
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 12px 24px;
    border-radius: 20px;
    font-size: 14px;
    z-index: 1000;
    white-space: nowrap;
    animation: ${fadeInOut} 2s ease-in-out forwards;
`;

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

    // 검색 완료 여부 & 탭 상태
    const [isSearched, setIsSearched] = useState(false);
    const [activeTab, setActiveTab] = useState('text');
    const [showToast, setShowToast] = useState(false);

    // 결과 데이터 (검색 후 보여질 10개)
    const [results, setResults] = useState([]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        // 유효성 검사: 하나라도 비어있으면 경고
        if (!filters.culture || !filters.method || !filters.lifestyle) {
            setShowToast(true);
            return;
        }

        setIsSearched(true);
        setResults(Array.from({ length: 10 }, (_, i) => ({
            id: i,
            title: `검색된 레시피 ${i + 1} (${filters.culture})`,
            link: '상세보기',
            isFavorite: false
        })));
    };

    const handleToggleFavorite = (id) => {
        setResults(prev => prev.map(item => 
            item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
        ));
    };

    // 토스트 타이머
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

                {/* 공통 버튼 사용 */}
                <PrimaryButton onClick={handleSearch} style={{ padding: '14px', fontSize: '15px' }}>
                    검색
                </PrimaryButton>
            </FilterContainer>

            {/* 검색된 경우에만 탭과 리스트 표시 */}
            {isSearched && (
                <ResultContainer>
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

                    <ScrollArea>
                        {results.map((item) => (
                            <RecipeItem key={item.id}>
                                <ItemLeft>
                                    <Thumbnail>썸네일<br/>/ 아이콘</Thumbnail>
                                    <InfoBox>
                                        <ItemTitle>{activeTab === 'text' ? `[텍스트] ${item.title}` : `[영상] ${item.title}`}</ItemTitle>
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
                    </ScrollArea>
                </ResultContainer>
            )}

            {showToast && <ToastMessage>형식을 모두 선택 해주세요</ToastMessage>}
        </PageWrapper>
    );
};

export default RecipeSearch;