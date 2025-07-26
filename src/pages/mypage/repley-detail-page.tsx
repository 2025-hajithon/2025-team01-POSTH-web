import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeft from "@/assets/chevron-left.svg?react";
import Bin from "@/assets/bin.svg?react";
import instance from "@/lib/axios";
import { DeleteModal } from "@/components/modal/delete-modal";

// ✅ 타입 정의
interface ReplyDetail {
  replyId: number;
  questionContent: string;
  questionerNickname: string;
  questionAt: string;
  replyContent: string;
  replierNickname: string;
  replyAt: string;
}

// ✅ 날짜 포맷팅
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const period = hours >= 12 ? "오후" : "오전";
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours;

  return `${year}년 ${month}월 ${day}일 ${period} ${displayHours}시 ${minutes}분`;
};

// ✅ 헤더
const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div className="flex items-center px-5 py-2.5 mt-14">
    <button
      onClick={onBack}
      className="p-1 hover:bg-white/10 rounded-full transition-colors"
    >
      <ChevronLeft className="text-[#f9f9f9] h-7 w-7" />
    </button>
  </div>
);

// ✅ 원본 질문 카드
const OriginalQuestionCard: React.FC<{
  question: string;
  questionerNickname: string;
  questionAt: string;
}> = ({ question, questionerNickname, questionAt }) => (
  <div className="bg-[#fffffb] rounded-lg px-5 py-6 w-full">
    <h3 className="text-[12px] font-semibold text-[#dcdccf] mb-2">
      {questionerNickname} 님의 고민
    </h3>
    <p className="text-[13px] font-medium text-[#3a3b49] whitespace-pre-line">
      {question}
    </p>
    <div className="w-full text-right mt-3">
      <span className="text-[10px] font-semibold text-[#dcdccf]">
        {formatDate(questionAt)}
      </span>
    </div>
  </div>
);

// ✅ 내 답변 카드
const MyReplyCard: React.FC<{
  reply: string;
  replyAt: string;
}> = ({ reply, replyAt }) => (
  <div className="bg-[#b1d7ff] rounded-lg px-5 py-6 w-full">
    <h3 className="text-[12px] font-semibold text-[#4a8dd2] mb-2">
      내가 보낸 답변
    </h3>
    <p className="text-[13px] font-medium text-[#3a3b49] whitespace-pre-line">
      {reply}
    </p>
    <div className="w-full text-right mt-3">
      <span className="text-[10px] font-semibold text-[#4a8dd2]">
        {formatDate(replyAt)}
      </span>
    </div>
  </div>
);

// ✅ 반응 보기 버튼
const ViewReactionButton: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#8dc5ff] rounded-lg px-[60px] py-3.5 w-full hover:bg-[#7ab8f0] transition-colors"
  >
    <span className="text-[14px] font-bold text-[#3a3b49]">
      내가 받은 반응 보기
    </span>
  </button>
);

// ✅ 삭제 버튼
const DeleteButton: React.FC<{ onDelete: () => void; isDeleting: boolean }> = ({
  onDelete,
  isDeleting,
}) => (
  <button
    onClick={onDelete}
    disabled={isDeleting}
    className="bg-[#fffffb] rounded-[19px] p-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
  >
    <Bin className="text-black w-6 h-6" />
  </button>
);

// ✅ API 호출
const getReplyDetail = async (replyId: string): Promise<ReplyDetail> => {
  const { data } = await instance.get<ReplyDetail>(
    `/member/my/archive/reply/${replyId}`
  );
  return data;
};

const removeReply = async (replyId: string): Promise<void> => {
  await instance.delete(`/member/my/archive/reply/${replyId}`);
};

// ✅ 메인 컴포넌트
const ReplyDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [replyData, setReplyData] = useState<ReplyDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const loadReplyDetail = async () => {
    if (!id) return;
    try {
      setLoading(true);
      const data = await getReplyDetail(id);
      setReplyData(data);
    } catch (err) {
      console.error(err);
      setError("답변을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!id || isDeleting) return;
    if (!window.confirm("정말로 이 답변을 삭제하시겠습니까?")) return;

    try {
      setIsDeleting(true);
      await removeReply(id);
      navigate(-1); // 삭제 후 이전 페이지로 이동
    } catch (err) {
      console.error(err);
      alert("답변 삭제에 실패했습니다.");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    loadReplyDetail();
  }, [id]);

  return (
    <div className="h-full w-full bg-[#3a3b49] text-white flex flex-col">
      <Header onBack={() => navigate(-1)} />

      <div className="flex-1 px-7 flex flex-col">
        {loading && <p className="text-center text-gray-400">불러오는 중...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {!loading && replyData && (
          <div className="flex flex-col gap-8 mb-auto">
            <OriginalQuestionCard
              question={replyData.questionContent}
              questionerNickname={replyData.questionerNickname}
              questionAt={replyData.questionAt}
            />
            <MyReplyCard
              reply={replyData.replyContent}
              replyAt={replyData.replyAt}
            />

            <ViewReactionButton
              onClick={() => navigate(`/reply/${id}/reactions`)}
            />

            <div className="flex justify-center pb-8">
              <DeleteButton onDelete={handleDelete} isDeleting={isDeleting} />
            </div>
          </div>
        )}
      </div>
      {showDeleteModal && (
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteModal(false)}
          isDeleting={isDeleting}
        />
      )}
    </div>
  );
};

export default ReplyDetailPage;
