import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeft from "@/assets/chevron-left.svg?react";
import Bin from "@/assets/bin.svg?react";

// ✅ 타입 정의
interface QuestionDetail {
  questionId: number;
  category: string;
  content: string;
  authorNickname: string;
  createdAt?: string;
}

interface ReplyDetail {
  content: string;
  createdAt: string;
  senderNickname: string;
}

interface Letter {
  id: string;
  myQuestion: QuestionDetail;
  reply?: ReplyDetail; // 답변이 없을 수도 있음
}

// ✅ 날짜 포맷팅 함수
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();

  const period = hours >= 12 ? "오후" : "오전";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;
  return `${year}년 ${month}월 ${day}일 ${period} ${displayHours}시`;
};

// ✅ 헤더
const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div className="flex items-center px-5 py-2.5 mt-14">
    <button
      onClick={onBack}
      className="p-1 rounded-full bg-transparent hover:bg-transparent focus:outline-none focus:ring-0 border-none"
    >
      <ChevronLeft className="text-[#f9f9f9] w-7 h-7 " />
    </button>
  </div>
);

// ✅ 내가 보낸 고민 카드
const MyQuestionCard: React.FC<{ question: QuestionDetail }> = ({
  question,
}) => (
  <div className="bg-[#b1d7ff] rounded-lg px-5 py-6 w-full">
    <div className="flex flex-col gap-1.5 items-center">
      <div className="flex flex-col gap-4 items-start w-full">
        <div className="flex items-center gap-3">
          <h3 className="text-[12px] font-semibold text-[#4a8dd2]">
            내가 보낸 고민
          </h3>
        </div>
        <p className="text-[13px] font-medium text-[#3a3b49] whitespace-pre-line">
          {question.content}
        </p>
      </div>
      <div className="w-full text-right">
        <span className="text-[10px] font-semibold text-[#4a8dd2]">
          {question.createdAt
            ? formatDate(question.createdAt)
            : `작성자: ${question.authorNickname}`}
        </span>
      </div>
    </div>
  </div>
);

// ✅ 받은 답변 카드
const ReplyCard: React.FC<{ reply: ReplyDetail }> = ({ reply }) => (
  <div className="bg-[#fffffb] rounded-lg px-5 py-6 w-full">
    <h3 className="text-[12px] font-semibold text-[#dcdccf] mb-2">
      나에게 도착한 편지
    </h3>
    <p className="text-[13px] font-medium text-[#3a3b49] whitespace-pre-line">
      {reply.content}
    </p>
    <div className="w-full text-right mt-3">
      <span className="text-[10px] font-semibold text-[#dcdccf]">
        {formatDate(reply.createdAt)}
      </span>
      <br />
      <span className="text-[10px] font-semibold text-[#dcdccf]">
        from. {reply.senderNickname}
      </span>
    </div>
  </div>
);

// ✅ 답변이 없을 때 카드
const NoReplyCard: React.FC = () => (
  <div className="bg-[#fffffb] rounded-lg px-5 py-6 w-full flex justify-center">
    <p className="text-[14px] font-medium text-[#dcdccf]">
      아직 답변이 달리지 않았어요!
    </p>
  </div>
);

// ✅ 삭제 버튼
const DeleteButton: React.FC<{ onDelete: () => void }> = ({ onDelete }) => (
  <button
    onClick={onDelete}
    className="bg-[#fffffb] rounded-[19px] p-2 hover:bg-gray-100 transition-colors"
  >
    <Bin className="text-black w-6 h-6" />
  </button>
);

// ✅ 로딩 스켈레톤
const LoadingSkeleton: React.FC = () => (
  <div className="flex flex-col gap-8 animate-pulse">
    <div className="bg-[#b1d7ff] rounded-lg px-5 py-6 w-full h-32"></div>
    <div className="bg-[#fffffb] rounded-lg px-5 py-6 w-full h-32"></div>
    <div className="flex justify-center">
      <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
    </div>
  </div>
);

const LetterDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { letterId } = useParams<{ letterId: string }>();

  const [letter, setLetter] = useState<Letter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  // ✅ 더미 데이터 로드
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const dummyLetter: Letter = {
        id: letterId || "1",
        myQuestion: {
          questionId: 1,
          category: "자기자신",
          content:
            "회사에서 일이 몰려도 부탁보다는 내가 하는게 마음 편해서 결국 다 제가 하게 돼요...",
          authorNickname: "홍길동",
          createdAt: "2025-07-11T21:00:00Z",
        },
        reply: {
          content:
            "저도 예전에 비슷한 상황이 있었어요. 거절은 관계를 망치는 게 아니라 솔직하게 만드는 거예요!",
          createdAt: "2025-07-14T21:00:00Z",
          senderNickname: "김지톤",
        },
      };
      setLetter(dummyLetter);
      setIsLoading(false);
    }, 800); // 로딩 시뮬레이션
  }, [letterId]);

  const handleBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    if (!letter || isDeleting) return;
    if (!window.confirm("정말로 이 편지를 삭제하시겠습니까?")) return;
    setIsDeleting(true);
    setTimeout(() => {
      alert("더미 데이터: 편지 삭제 완료");
      navigate(-1);
    }, 500);
  };

  return (
    <div className="h-full w-full bg-[#3a3b49] text-white flex flex-col">
      <Header onBack={handleBack} />

      <div className="flex-1 px-7 flex flex-col">
        {isLoading && <LoadingSkeleton />}

        {!isLoading && letter && (
          <div className="flex flex-col gap-8 mb-auto">
            <MyQuestionCard question={letter.myQuestion} />
            {letter.reply ? (
              <ReplyCard reply={letter.reply} />
            ) : (
              <NoReplyCard />
            )}
            <div className="flex justify-center pb-8">
              <DeleteButton onDelete={handleDelete} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LetterDetailPage;
