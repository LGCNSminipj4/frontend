import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeaderWrapper, BackButton, HeaderTitle } from './CommonStyles';

const PageHeader = ({ title, onBackClick }) => {
  const navigate = useNavigate();

  // onBackClick이 없으면 기본적으로 뒤로가기(-1) 실행
  const handleBack = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <HeaderWrapper>
      <BackButton onClick={handleBack}>&lt;</BackButton>
      <HeaderTitle>{title}</HeaderTitle>
    </HeaderWrapper>
  );
};

export default PageHeader;