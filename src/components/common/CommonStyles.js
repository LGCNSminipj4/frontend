import styled from "styled-components";

// --- 레이아웃 (Layout) ---
export const Container = styled.div`
  max-width: 375px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px; /* 기본 패딩 (페이지마다 다르면 덮어쓰기 가능) */
  position: relative;
`;

// --- 헤더 (Header) ---
export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin-bottom: 20px;
  position: relative;
  flex-shrink: 0;
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin: 0;
`;

export const BackButton = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 20px;
  color: #888;
  padding: 5px; /* 터치 영역 확보 */
`;

// --- 입력 필드 (Inputs) ---
export const InputGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid ${(props) => (props.$isError ? "#ff0000" : "#ddd")};
  border-radius: 6px;
  font-size: 14px;
  box-sizing: border-box;
  background-color: #fff;

  &:focus {
    outline: none;
    border-color: #333;
  }
  
  &::placeholder {
    color: #aaa;
  }
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  background-color: #fff;
  box-sizing: border-box;
  color: #333;
`;

// --- 버튼 (Buttons) ---
export const BaseButton = styled.button`
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

// 가장 많이 쓰이는 회색 꽉 찬 버튼 (저장, 완료 등)
export const PrimaryButton = styled(BaseButton)`
  width: 100%;
  padding: 16px;
  background-color: #d9d9d9; /* 또는 #f2f2f2 */
  color: #333;
  margin-top: auto; /* 하단 고정 시 유용 */
`;

// 작고 얇은 버튼 (삭제, 확인 등)
export const SmallButton = styled(BaseButton)`
  padding: 8px 16px;
  background-color: #e0e0e0;
  border-radius: 6px;
  font-size: 13px;
  color: #333;
`;

// 태그/칩 버튼
export const ChipButton = styled.button`
  padding: 8px 14px;
  border: 1px solid ${(props) => (props.$isActive ? "#333" : "#ddd")};
  border-radius: 4px;
  background-color: ${(props) => (props.$isActive ? "#333" : "#fff")};
  color: ${(props) => (props.$isActive ? "#fff" : "#333")};
  font-size: 13px;
  cursor: pointer;
  font-weight: ${(props) => (props.$isActive ? "bold" : "normal")};
`;

// --- 리스트 아이템 (List Items) ---
export const ListItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
`;