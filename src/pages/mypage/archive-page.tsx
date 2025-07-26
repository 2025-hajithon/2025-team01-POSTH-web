import React, { useState } from "react";
import ChevronRight from "@/assets/chevron-right.svg?react";
import ChevronLeft from "@/assets/chevron-left.svg?react";

// 타입 정의
interface WorryItem {
  id: string;
  category: string;
  categoryColor: string;
  content: string;
  isExpanded?: boolean;
}

interface AnswerItem {
  id: string;
  category: string;
  categoryColor: string;
  content: string;
  isExpanded?: boolean;
}

interface CategoryCardProps {
  item: WorryItem;
  onClick?: () => void;
  onToggle?: () => void;
}

interface AnswerCardProps {
  item: AnswerItem;
  onClick?: () => void;
  onToggle?: () => void;
}

// 카테고리 색상 매핑
const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    자기자신: "#fffffb",
    직장: "#8dc5ff",
    연애: "#fdb7ff",
    진로: "#fffbbc",
  };
  return colorMap[category] || "#fffffb";
};

// 고민 카드 컴포넌트
const WorryCard: React.FC<CategoryCardProps> = ({
  item,
  onClick,
  onToggle,
}) => (
  <div
    className="bg-[#54566a] rounded-lg p-4 cursor-pointer hover:bg-[#5a5c70] transition-colors"
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-2.5">
      <div
        className="px-2.5 py-2 rounded text-[11px] font-semibold text-[#3a3b49] tracking-[-0.11px] leading-[1.4]"
        style={{ backgroundColor: getCategoryColor(item.category) }}
      >
        {item.category}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
        className="flex items-center justify-center p-1 hover:bg-white/10 rounded-full transition-colors"
      >
        <ChevronRight className="text-[#fffffb] w-7 h-7" />
      </button>
    </div>
    <p className="text-[13px] font-medium text-[rgba(255,255,251,0.7)] tracking-[-0.13px] leading-[1.7]">
      {item.content}
    </p>
  </div>
);

// 답변 카드 컴포넌트 (절반 너비)
const AnswerCard: React.FC<AnswerCardProps> = ({ item, onClick, onToggle }) => (
  <div
    className="bg-[#3a3b49] rounded-lg p-4 cursor-pointer hover:bg-[#454659] transition-colors flex-1"
    onClick={onClick}
  >
    <div className="flex items-start justify-between mb-2.5">
      <div
        className="px-2.5 py-2 rounded text-[11px] font-semibold text-[#3a3b49] tracking-[-0.11px] leading-[1.4]"
        style={{ backgroundColor: getCategoryColor(item.category) }}
      >
        {item.category}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle?.();
        }}
        className="flex items-center justify-center p-1 hover:bg-white/10 rounded-full transition-colors"
      >
        {/* <ChevronRight size={24} className="text-[#fffffb] rotate-180" /> */}
      </button>
    </div>
    <p className="text-[13px] font-medium text-[rgba(255,255,251,0.7)] tracking-[-0.13px] leading-[1.7]">
      {item.content}
    </p>
  </div>
);

// 헤더 컴포넌트
const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div className="flex items-center px-5 py-2.5 mt-14">
    <button
      onClick={onBack}
      className="p-1 hover:bg-white/10 rounded-full transition-colors"
    >
      <ChevronLeft className="text-[#f9f9f9] w-7 h-7" />
    </button>
  </div>
);

// 빈 상태 컴포넌트
const EmptyState: React.FC<{ message: string; textColor: string }> = ({
  message,
  textColor,
}) => (
  <div className="flex items-center justify-center py-20">
    <p
      className={`text-[13px] font-medium tracking-[-0.13px] leading-[1.7] ${textColor}`}
    >
      {message}
    </p>
  </div>
);

// 메인 아카이빙 컴포넌트
const ArchivePage: React.FC = () => {
  // 고민 데이터 (빈 배열로 초기화하여 테스트)
  const [worries, setWorries] = useState<WorryItem[]>([
    {
      id: "1",
      category: "자기자신",
      categoryColor: "#fffffb",
      content:
        "회사에서 일이 몰려도, 부탁보다는 내가 하는게 마음 편해서 결국 다 제가 하게 되고, 친구 사이에서도 제가 항상 다...",
    },
    {
      id: "2",
      category: "직장",
      categoryColor: "#8dc5ff",
      content:
        "회사에서 일이 몰려도, 부탁보다는 내가 하는게 마음 편해서 결국 다 제가 하게 되고, 친구 사이에서도 제가 항상 다...",
    },
    {
      id: "3",
      category: "연애",
      categoryColor: "#fdb7ff",
      content:
        "회사에서 일이 몰려도, 부탁보다는 내가 하는게 마음 편해서 결국 다 제가 하게 되고, 친구 사이에서도 제가 항상 다...",
    },
  ]);

  // 답변 데이터 (빈 배열로 초기화하여 테스트)
  const [answers, setAnswers] = useState<AnswerItem[]>([
    {
      id: "1",
      category: "자기자신",
      categoryColor: "#fffffb",
      content:
        "저는 24살까지 디자인 전공하다가 막상 취업하려고 하니 저랑 안맞는 것 같아서 간호학과로 재입학 했어요. 그때...",
    },
    {
      id: "2",
      category: "진로",
      categoryColor: "#fffbbc",
      content:
        "저는 24살까지 디자인 전공하다가 막상 취업하려고 하니 저랑 안맞는 것 같아서 간호학과로 재입학 했어요. 그때...",
    },
  ]);

  const handleBack = () => {
    console.log("뒤로가기");
    // 여기에 뒤로가기 로직 추가
  };

  const handleWorryClick = (worryId: string) => {
    console.log("고민 상세보기:", worryId);
    // 여기에 고민 상세보기 로직 추가
  };

  const handleAnswerClick = (answerId: string) => {
    console.log("답변 상세보기:", answerId);
    // 여기에 답변 상세보기 로직 추가
  };

  const handleWorryToggle = (worryId: string) => {
    console.log("고민 토글:", worryId);
    // 여기에 고민 확장/축소 로직 추가
  };

  const handleAnswerToggle = (answerId: string) => {
    console.log("답변 토글:", answerId);
    // 여기에 답변 확장/축소 로직 추가
  };

  return (
    <div className="h-full w-full bg-[#3a3b49] text-white flex flex-col">
      {/* 헤더 */}
      <Header onBack={handleBack} />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-7 flex flex-col">
        {/* 나의 고민 모음 섹션 */}
        <div className="mb-6">
          <h1 className="text-[20px] font-bold text-[#f9f9f9] tracking-[-0.2px] leading-[1.4] mb-3">
            나의 고민 모음
          </h1>
          {worries.length > 0 ? (
            <div className="space-y-3">
              {worries.map((worry) => (
                <WorryCard
                  key={worry.id}
                  item={worry}
                  onClick={() => handleWorryClick(worry.id)}
                  onToggle={() => handleWorryToggle(worry.id)}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              message="아직 남긴 글이 없어요!"
              textColor="text-[rgba(255,255,251,0.7)]"
            />
          )}
        </div>

        {/* 구분선 역할의 배경색 변경 영역 */}
        <div className="flex-1 bg-[#f9f9f9] -mx-7 px-7 pt-6">
          {/* 나의 답변 모음 섹션 */}
          <div>
            <h2 className="text-[20px] font-bold text-[#3a3b49] tracking-[-0.2px] leading-[1.4] mb-3">
              나의 답변 모음
            </h2>
            {answers.length > 0 ? (
              <div className="flex gap-3">
                {answers.map((answer) => (
                  <AnswerCard
                    key={answer.id}
                    item={answer}
                    onClick={() => handleAnswerClick(answer.id)}
                    onToggle={() => handleAnswerToggle(answer.id)}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                message="아직 남긴 글이 없어요!"
                textColor="text-[#54566a]"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
