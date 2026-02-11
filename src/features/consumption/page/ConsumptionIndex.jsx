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
  // 상태 관리 (목록, 로딩)
  const [consumedList, setConsumedList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // [API 연동] 화면 켜질 때 소비 기록 불러오기
  useEffect(() => {
    const fetchConsumedList = async () => {
      try {
        setIsLoading(true);
        // GET 백엔드 주소가 '/ingredients/consumed'라고 가정
        const response = await api.get('/ingredients/consumed');
        
        console.log("소비 완료 목록:", response.data);
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
        <ContentArea style={{ justifyContent: 'center', alignItems: 'center' }}>
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
          이번 달에 총 {totalCount}가지의 재료를 소비하였습니다
        </SummaryText>

        {totalCount === 0 ? (
            <EmptyMessage>아직 소비한 내역이 없습니다.</EmptyMessage>
        ) : (
            <div style={{ padding: '0 10px' }}>
            {consumedList.map((item) => (
                <ListItem key={item.ingredients_id}>
                <ItemInfo>
                    <ItemName>{item.ingredients_name}</ItemName>
                    {/* 백엔드에서 주는 날짜 필드명이 'expiration_date'인지, 
                        'consumed_date'(소비일)인지 확인 필요합니다.
                        일단 기존 코드대로 expiration_date로 둡니다.
                    */}
                    <ConsumedDate>
                        {item.consumed_date || item.expiration_date}
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