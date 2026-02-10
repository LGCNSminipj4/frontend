import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// 방금 만든 CommonStyles에서 필요한 것들 import
import { 
  Container, 
  ContentArea, 
  PrimaryButton, 
  SmallButton, 
  COLORS, 
  ListItem, 
  ItemInfo, 
  ItemName, 
  ItemDday 
} from '../../../components/common/CommonStyles';

import PageHeader from '../../../components/common/PageHeader';

// --- 페이지 전용 스타일 커스텀 ---

// 상단 요약 텍스트
const SummaryText = styled.div`
  text-align: center;
  padding: 30px 0;
  font-size: 15px;
  color: ${COLORS.textMain};
`;

// 리스트 아이템 레이아웃 재정의 (버튼 그룹과 배치 맞추기 위해)
const StyledListItem = styled(ListItem)`
  padding: 20px 0;
`;

// 버튼들을 담을 그룹
const ActionButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// '삭제'용 빨간 버튼 (SmallButton 스타일 상속받고 배경색만 변경)
const DeleteButton = styled(SmallButton)`
  background-color: ${COLORS.error}; /* #FF6B6B */
  color: ${COLORS.white};
  padding: 8px 16px; /* 이미지처럼 사이즈 조절 */
  font-weight: 500;
  
  &:hover {
    opacity: 0.8;
  }
`;

// '복구'용 민트 버튼 (SmallButton 스타일 상속, 기본이 민트색이라 패딩만 조절)
const RestoreButton = styled(SmallButton)`
  padding: 8px 16px;
  font-weight: 500;
`;

// 하단 '전체 삭제' 빨간 버튼 (PrimaryButton 스타일 상속)
const DeleteAllButton = styled(PrimaryButton)`
  background-color: ${COLORS.error};
  margin-top: 0; /* Footer 패딩이 처리하므로 */
`;

// 하단 버튼 영역
const Footer = styled.div`
  padding: 20px 0 40px 0;
  background-color: ${COLORS.background};
`;

// 하단 점 3개 장식
const DotsIndicator = styled.div`
  text-align: center;
  padding: 30px 0;
  font-size: 24px;
  color: #ddd;
  font-weight: bold;
  letter-spacing: 2px;
`;

const TrashIndex = () => {
    const navigate = useNavigate();

    // 데이터 예시 (이미지처럼 D-day 계산된 상태라고 가정하거나, 날짜로 계산)
    const [trashList, setTrashList] = useState([
        { ingredients_id: 1, ingredients_name: '두부', d_day: 'D+4' },
        { ingredients_id: 2, ingredients_name: '우유', d_day: 'D+1' },
        { ingredients_id: 3, ingredients_name: '잼', d_day: 'D+11' },
    ]);

    // 개별 삭제
    const handleDelete = (ingredients_id) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            setTrashList((prev) => prev.filter((item) => item.ingredients_id !== ingredients_id));
        }
    };

    // 전체 삭제
    const handleDeleteAll = () => {
        if (trashList.length === 0) return;
        if (window.confirm("휴지통을 비우시겠습니까? 복구할 수 없습니다.")) {
            setTrashList([]);
        }
    };

    // 복구 (기능 예시)
    const handleRestore = (name) => {
        alert(`[${name}] 재료가 냉장고로 복구되었습니다.`);
        // 실제 로직: API 호출 후 리스트에서 제거 등
    };

    return (
        <Container>
            {/* 1. 헤더 */}
            <PageHeader title="쓰레기통" />

            {/* 2. 스크롤 가능한 메인 영역 */}
            <ContentArea>
                <SummaryText>
                    이번 달에 총 {trashList.length}가지의 재료가 버려졌습니다 😢
                </SummaryText>

                {trashList.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#aaa', marginTop: '100px' }}>
                        쓰레기통이 비었습니다.
                    </div>
                ) : (
                    <>
                        {trashList.map((item) => (
                            <StyledListItem key={item.ingredients_id}>
                                <ItemInfo>
                                    <ItemName>{item.ingredients_name}</ItemName>
                                    {/* $isDanger props를 주어 빨간색 텍스트 적용 */}
                                    <ItemDday $isDanger={true}>{item.d_day}</ItemDday>
                                </ItemInfo>
                                
                                <ActionButtonGroup>
                                    <RestoreButton onClick={() => handleRestore(item.ingredients_name)}>
                                        복구
                                    </RestoreButton>
                                    <DeleteButton onClick={() => handleDelete(item.ingredients_id)}>
                                        삭제
                                    </DeleteButton>
                                </ActionButtonGroup>
                            </StyledListItem>
                        ))}
                        
                        
                    </>
                )}
            </ContentArea>

            {/* 3. 하단 고정 버튼 영역 */}
            <Footer>
                <DeleteAllButton onClick={handleDeleteAll}>
                    전체 삭제
                </DeleteAllButton>
            </Footer>
        </Container>
    );
};

export default TrashIndex;