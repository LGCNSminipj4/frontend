import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { Container, PrimaryButton } from '../../../components/common/CommonStyles';
import PageHeader from '../../../components/common/PageHeader';

// --- 페이지 전용 스타일 ---

const PageWrapper = styled(Container)`
    padding: 0;
    height: 100vh;
    min-height: unset;
    overflow: hidden;
`;

// 상단 요약 텍스트
const SummaryText = styled.div`
    text-align: center;
    padding: 30px 0;
    font-size: 15px;
    color: #333;
`;

// 스크롤 가능한 리스트 영역
const ListContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 24px;
    
    &::-webkit-scrollbar {
        display: none;
    }
`;

const TrashItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
        border-bottom: none;
    }
`;

const ItemInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const ItemName = styled.span`
    font-size: 16px;
    color: #333;
    font-weight: 500;
`;

const ItemDDay = styled.span`
    font-size: 14px;
    color: #ff4d4f; /* 붉은색 텍스트 */
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
`;

// 로컬 작은 버튼 (복구/삭제)
const SmallActionButton = styled.button`
    padding: 8px 16px;
    background-color: #e0e0e0; /* 회색 버튼 배경 */
    border: none;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
    cursor: pointer;

    &:hover {
        background-color: #d0d0d0;
    }
`;

// 하단 버튼 영역 고정
const Footer = styled.div`
    padding: 20px 24px 40px 24px;
    flex-shrink: 0;
    background-color: #fff; /* 배경색 지정으로 리스트와 겹침 방지 */
`;

const TrashIndex = () => {
    const navigate = useNavigate();

    const [trashList, setTrashList] = useState([
        { ingredients_id: 1, ingredients_name: '두부', expiration_date: '2026-02-05', status: 'DISCARDED' },
        { ingredients_id: 2, ingredients_name: '우유', expiration_date: '2026-02-08', status: 'DISCARDED' },
        { ingredients_id: 3, ingredients_name: '잼', expiration_date: '2025-12-30', status: 'DISCARDED' },
    ]);

    const handleDelete = (ingredients_id) => {
        setTrashList((prev) => prev.filter((item) => item.ingredients_id !== ingredients_id));
    };

    const handleDeleteAll = () => {
        if (window.confirm("정말로 비우시겠습니까?")) {
            setTrashList([]);
        }
    };

    const handleRestore = () => {
        alert("복구 기능은 추후 구현될 예정입니다.");
    };

    return (
        <PageWrapper>
            <div style={{ padding: '0 20px' }}> 
                <PageHeader title="쓰레기통" />
            </div>

            <SummaryText>
                이번 달에 총 {trashList.length}가지의 재료가 버려졌습니다 😢
            </SummaryText>

            <ListContainer>
                {trashList.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#aaa', marginTop: '50px' }}>
                        쓰레기통이 비었습니다.
                    </div>
                ) : (
                    trashList.map((item) => (
                        <TrashItem key={item.ingredients_id}>
                            <ItemInfo>
                                <ItemName>{item.ingredients_name}</ItemName>
                                {/* 날짜 데이터 표시 */}
                                <ItemDDay>{item.expiration_date} (만료)</ItemDDay>
                            </ItemInfo>
                            <ButtonGroup>
                                <SmallActionButton onClick={handleRestore}>복구</SmallActionButton>
                                <SmallActionButton onClick={() => handleDelete(item.ingredients_id)}>삭제</SmallActionButton>
                            </ButtonGroup>
                        </TrashItem>
                    ))
                )}
                {trashList.length > 0 && (
                     <div style={{ textAlign: 'center', padding: '20px', fontSize: '20px', color: '#aaa' }}>⋮</div>
                )}
            </ListContainer>

            <Footer>
                {/* 공통 PrimaryButton 사용 (색상 통일) */}
                <PrimaryButton onClick={handleDeleteAll}>
                    전체 삭제
                </PrimaryButton>
            </Footer>
        </PageWrapper>
    );
};

export default TrashIndex;