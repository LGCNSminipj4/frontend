import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import api from '../../../api/axios';

import PageHeader from '../../../components/common/PageHeader'; 
import {
  Container,
  ContentArea,
  ListItem,
  ItemInfo,
  ItemName,
  COLORS
} from '../../../components/common/CommonStyles'; 

const SummaryText = styled.div`
  text-align: center;
  padding: 40px 0 20px 0;
  font-size: 14px;
  color: ${COLORS.textMain};
`;

const ConsumedDate = styled.div`
  font-size: 14px;
  color: ${COLORS.error}; 
  margin-top: 6px;
  font-weight: 500;
`;

const EmptyMessage = styled.div`
  text-align: center;
  color: #888;
  margin-top: 50px;
  font-size: 14px;
`;

const ConsumptionIndex = () => {
  const [consumedList, setConsumedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchConsumedList = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token'); // 토큰 가져오기
        
        // 1. 헤더에 토큰 추가하여 요청
        const response = await api.get('/ingredients/consumed', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        console.log("소비 완료 데이터 원본:", response.data);
        setConsumedList(response.data);

      } catch (error) {
        console.error("소비 목록 로드 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConsumedList();
  }, []);

  const totalCount = consumedList.length;

  if (isLoading) {
    return (
      <Container>
        <PageHeader title="소비 완료" />
        <ContentArea style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>기록을 불러오는 중...</div>
        </ContentArea>
      </Container>
    );
  }

  return (
    <Container>
      <PageHeader title="소비 완료" />

      <ContentArea>
        <SummaryText>
          총 {totalCount}가지의 재료가 소비되었습니다
        </SummaryText>

        {totalCount === 0 ? (
            <EmptyMessage>아직 소비한 내역이 없습니다.</EmptyMessage>
        ) : (
            <div style={{ padding: '0 10px' }}>
            {consumedList.map((item) => (
                // 2. 스웨거 키 이름으로 수정 (ingredientsId, ingredientsName)
                <ListItem key={item.ingredientsId}>
                <ItemInfo>
                    <ItemName>{item.ingredientsName}</ItemName>
                    <ConsumedDate>
                        {/* 소비일 또는 수정일 등을 백엔드 필드명에 맞춰 출력 */}
                        {item.consumedDate || item.expirationDate || "날짜 정보 없음"}
                    </ConsumedDate>
                </ItemInfo>
                </ListItem>
            ))}
            </div>
        )}
      </ContentArea>
    </Container>
  );
};

export default ConsumptionIndex;