import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './TrashIndex.css'; // CSS 파일 임포트

const TrashIndex = () => {
  const navigate = useNavigate();

  // 로딩 및 데이터 상태 관리
  const [isLoading, setIsLoading] = useState(true);
  const [trashList, setTrashList] = useState([]);

  // 더미 데이터
  const dummyData = [
    { ingredients_id: 1, ingredients_name: '두부', d_day: 'D+4' },
    { ingredients_id: 2, ingredients_name: '우유', d_day: 'D+1' },
    { ingredients_id: 3, ingredients_name: '잼', d_day: 'D+11' },
  ];

  // 데이터 불러오기
  useEffect(() => {
    const fetchTrashList = async () => {
      try {
        // API 호출 시뮬레이션
        setTimeout(() => {
          setTrashList(dummyData);
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setIsLoading(false);
      }
    };
    fetchTrashList();
  }, []);

  // 뒤로가기 핸들러 (PageHeader 기능)
  const handleBackClick = () => {
    navigate(-1);
  };

  // 1. 복구 핸들러
  const handleRestore = (id, name) => {
    if (window.confirm(`[${name}] 재료를 냉장고로 복구할까요?`)) {
      setTrashList((prev) => prev.filter(item => item.ingredients_id !== id));
    }
  };

  // 2. 개별 삭제 핸들러
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까? 복구할 수 없습니다.")) {
      setTrashList((prev) => prev.filter(item => item.ingredients_id !== id));
    }
  };

  // 3. 전체 삭제 핸들러
  const handleDeleteAll = () => {
    if (trashList.length === 0) return;
    if (window.confirm("휴지통을 싹 비우시겠습니까?")) {
      setTrashList([]);
    }
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="content-area" style={{ justifyContent: 'center', alignItems: 'center' }}>
          로딩중...
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* 헤더 영역 (PageHeader 통합) */}
      <header className="header-wrapper">
        <div className="back-button" onClick={handleBackClick}>
          &lt; {/* 뒤로가기 아이콘 대신 텍스트 사용, 아이콘이 있다면 <img> 등으로 대체 */}
        </div>
        <h1 className="header-title">쓰레기통</h1>
      </header>

      {/* 콘텐츠 영역 */}
      <div className="content-area">
        <div className="summary-text">
          이번 달에 총 {trashList.length}가지의 재료가 버려졌습니다 😢
        </div>

        {trashList.length === 0 ? (
          <div className="empty-message">
            쓰레기통이 비었습니다.
          </div>
        ) : (
          <div className="trash-list">
            {trashList.map((item) => (
              <div key={item.ingredients_id} className="trash-list-item">
                <div className="item-info">
                  <span className="item-name">{item.ingredients_name}</span>
                  <span className="item-dday">{item.d_day}</span>
                </div>

                <div className="action-btn-group">
                  <button 
                    className="btn-base btn-restore" 
                    onClick={() => handleRestore(item.ingredients_id, item.ingredients_name)}
                  >
                    복구
                  </button>
                  <button 
                    className="btn-base btn-delete" 
                    onClick={() => handleDelete(item.ingredients_id)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 하단 전체 삭제 버튼 (리스트가 있을 때만 표시) */}
      {trashList.length > 0 && (
        <div className="footer">
          <button className="btn-base btn-delete-all" onClick={handleDeleteAll}>
            전체 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default TrashIndex;