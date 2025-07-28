import React, { useEffect, useState } from "react";
import ChevronLeft from "@/assets/chevron-left.svg?react";
import ChevronRight from "@/assets/chevron-right.svg?react";
import { useNavigate } from "react-router-dom";
import instance from "@/lib/axios";

interface QuestionItem {
  id: string; // questionId
  category: string;
  questionContent: string;
  questionAt: string;
}

interface AnswerItem {
  replyId: string;
  questionContent: string;
  questionAt: string;
  replyContent: string;
  replierNickname: string;
  replyAt: string;
}

interface QuestionListResponse {
  content: QuestionItem[];
  last: boolean;
}

const getCategoryColor = (category: string): string => {
  const colorMap: Record<string, string> = {
    자기자신: "#fffffb",
    직장: "#8dc5ff",
    연애: "#fdb7ff",
    진로: "#fffbbc",
  };
  return colorMap[category] || "#d1d5db";
};

const WorryCard: React.FC<{ item: QuestionItem; onClick: () => void }> = ({
  item,
  onClick,
}) => (
  <div
    className="bg-[#3a3b49] rounded-lg p-4 hover:bg-[#5a5c70] transition-colors cursor-pointer flex flex-col"
    onClick={onClick}
  >
    <div className="flex items-center justify-between mb-2">
      <span
        className="text-[11px] font-semibold px-2 py-1 rounded-md text-[#3a3b49]"
        style={{ backgroundColor: getCategoryColor(item.category) }}
      >
        {item.category || "자유"}
      </span>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </div>
    <p className="text-[13px] font-medium text-[rgba(255,255,255,0.8)] leading-[1.7] line-clamp-2">
      {item.questionContent}
    </p>
  </div>
);

const AnswerCard: React.FC<{ item: AnswerItem; onClick: () => void }> = ({
  item,
  onClick,
}) => (
  <div
    className="bg-[#3a3b49] rounded-lg p-4 hover:bg-[#454659] transition-colors cursor-pointer"
    onClick={onClick}
  >
    <p className="text-[13px] font-semibold text-[#8dc5ff] leading-[1.6]">
      {item.questionContent}
    </p>
    <p className="text-[13px] text-white mt-2 leading-[1.7]">
      {item.replyContent}
    </p>
    <span className="text-[11px] text-gray-400 mt-2 block">
      {new Date(item.replyAt).toLocaleString()} · {item.replierNickname}
    </span>
  </div>
);

const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div className="flex items-center px-5 py-2.5 mt-14">
    <button
      onClick={onBack}
      className="p-1 rounded-full bg-transparent focus:outline-none"
    >
      <ChevronLeft className="text-[#f9f9f9] w-7 h-7" />
    </button>
  </div>
);

const ArchivePage: React.FC = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuestionItem[]>([]);
  const [answers, setAnswers] = useState<AnswerItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/member/my/archive/question/list`);
      console.log(data);
    } catch (err) {
      console.error("질문 목록 불러오기 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  //   const fetchAnswers = async () => {
  //     try {
  //       const { data } = await instance.get<AnswerItem[]>(
  //         `/member/my/archive/reply/list`
  //       );
  //       setAnswers(data);
  //     } catch (err) {
  //       console.error("답변 목록 불러오기 실패:", err);
  //     }
  //   };

  useEffect(() => {
    fetchQuestions();
    // fetchAnswers();
  }, []);

  return (
    <div className="h-full w-full bg-[#3a3b49] text-white flex flex-col overflow-y-auto overflow-x-hidden">
      <Header onBack={() => navigate(-1)} />

      <div className="flex-1 px-7 flex flex-col">
        {/* 나의 고민 모음 */}
        <div className="mb-6 flex-1">
          <h1 className="text-[20px] font-bold text-[#f9f9f9] mb-3">
            나의 고민 모음
          </h1>

          {questions.length === 0 && !loading ? (
            <div className="flex justify-center items-center h-[200px]">
              <p className="text-center text-sm text-gray-400">
                아직 남긴 글이 없어요!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {questions.map((q) => (
                <WorryCard
                  key={q.id}
                  item={q}
                  onClick={() => navigate(`/question/${q.id}`)}
                />
              ))}
              {loading && (
                <p className="text-center text-sm text-gray-400">
                  불러오는 중...
                </p>
              )}
            </div>
          )}
        </div>

        {/* 나의 답변 모음 */}
        <div className="bg-[#f9f9f9] -mx-7 px-7 pt-6 pb-8 flex-1">
          <h2 className="text-[20px] font-bold text-[#3a3b49] mb-3">
            나의 답변 모음
          </h2>

          {answers.length === 0 && !loading ? (
            <div className="flex justify-center items-center h-[200px]">
              <p className="text-center text-sm text-gray-500">
                아직 남긴 글이 없어요!
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {answers.map((a) => (
                <AnswerCard
                  key={a.replyId}
                  item={a}
                  onClick={() => navigate(`/mypage/reply/${a.replyId}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArchivePage;
