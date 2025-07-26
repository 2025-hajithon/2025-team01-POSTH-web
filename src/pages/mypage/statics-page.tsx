import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeft from "@/assets/chevron-left.svg?react";
import Sparkles from "@/assets/string.svg?react";
import instance from "@/lib/axios";

// 타입 정의
interface UserStats {
  questionCount: number;
  replyCount: number;
  receivedLikeCount: number;
  reactionCountInfo: Record<string, number>;
}

interface Reaction {
  id: string;
  text: string;
  count: number;
  variant: "primary" | "secondary" | "tertiary";
}

interface StatsApiResponse {
  questionCount: number;
  replyCount: number;
  receivedLikeCount: number;
  reactionCountInfo: Record<string, number>;
}

// 반응 텍스트 매핑
const REACTION_TEXT_MAP: Record<string, string> = {
  "0": "현실적인 조언이 좋았어요",
  "1": "마음의 위로가 되었어요",
  "2": "비슷한 상황에 도움이 되었어요",
  "3": "생각이 정리됐어요",
  "4": "새로운 용기가 생겼어요",
  "5": "새로운 시야를 갖게 되었어요",
  "6": "뜻밖의 통찰을 얻었어요",
  "7": "가야 할 방향이 생겼어요",
  "8": "성의가 없었어요",
  "9": "고민과 맞지 않는 답변이었어요",
};

// variant 매핑
const getReactionVariant = (
  index: number
): "primary" | "secondary" | "tertiary" => {
  if (index === 0) return "primary";
  if (index <= 2) return "secondary";
  return "tertiary";
};

// API 호출 함수 (instance 사용)
const getUserStats = async (): Promise<StatsApiResponse> => {
  const { data } = await instance.get<StatsApiResponse>(
    "/member/my/statistics"
  );
  return data;
};

// reactionCountInfo를 Reaction[]으로 변환
const processReactionData = (
  reactionCountInfo: Record<string, number>
): Reaction[] => {
  return Object.entries(reactionCountInfo)
    .filter(([_, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([id, count], index) => ({
      id,
      text: REACTION_TEXT_MAP[id] || `반응 ${id}`,
      count,
      variant: getReactionVariant(index),
    }));
};

// UI 컴포넌트
const StatCard: React.FC<{
  label: string;
  value: number;
  isLoading: boolean;
}> = ({ label, value, isLoading }) =>
  isLoading ? (
    <div className="bg-[#54566a] rounded-lg px-6 py-4 flex flex-col items-center flex-1 animate-pulse">
      <div className="h-4 bg-gray-600 rounded w-12 mb-2"></div>
      <div className="h-10 bg-gray-600 rounded w-10"></div>
    </div>
  ) : (
    <div className="bg-[#54566a] rounded-lg px-6 py-4 flex flex-col items-center flex-1">
      <span className="text-[13px] font-semibold text-[rgba(249,249,249,0.6)] mb-1">
        {label}
      </span>
      <span className="text-[38px] font-extrabold text-[#8dc5ff]">{value}</span>
    </div>
  );

const ReactionBadge: React.FC<Reaction> = ({ text, variant, count }) => {
  const color =
    variant === "primary"
      ? "bg-[#62afff]"
      : variant === "secondary"
      ? "bg-[#8dc5ff]"
      : "bg-[#cde5ff]";

  return (
    <div
      className={`${color} px-4 py-3 rounded-lg flex items-center justify-center w-fit mx-auto`}
    >
      <span className="text-[13px] font-semibold text-[#3a3b49] whitespace-nowrap">
        {text}
        {count && count > 1 && (
          <span className="ml-2 text-[11px] font-bold bg-black/20 px-1.5 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </span>
    </div>
  );
};

const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div className="flex items-center px-5 py-2.5 mt-14">
    <button
      onClick={onBack}
      className="p-1 hover:bg-white/10 rounded-full focus:outline-none"
    >
      <ChevronLeft className="text-[#f9f9f9] w-7 h-7" />
    </button>
  </div>
);

const SparkleIcon: React.FC = () => (
  <div className="inline-flex items-center ml-1">
    <Sparkles className="text-[#8dc5ff] w-5 h-5" />
  </div>
);

const StatsPage: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadStatsData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await getUserStats();
      setStats(data);
      setReactions(processReactionData(data.reactionCountInfo));
    } catch {
      setError("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadStatsData();
  }, []);

  return (
    <div className="h-full w-full bg-[#3a3b49] text-white flex flex-col">
      <Header onBack={() => navigate(-1)} />

      <div className="flex-1 px-7 flex flex-col">
        <div className="mb-6 text-center">
          <h1 className="text-[20px] font-bold text-[#f9f9f9] inline-flex items-center">
            나의 <span className="text-[#8dc5ff] mx-1">활동</span> 통계
            <SparkleIcon />
          </h1>
        </div>

        {error && !isLoading && (
          <div className="text-center py-8">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={loadStatsData}
              className="bg-[#54566a] hover:bg-[#5a5c70] px-4 py-2 rounded-lg text-[#fffffb]"
            >
              다시 시도
            </button>
          </div>
        )}

        <div className="flex gap-2.5 mb-16">
          <StatCard
            label="질문 수"
            value={stats?.questionCount ?? 0}
            isLoading={isLoading}
          />
          <StatCard
            label="답변 수"
            value={stats?.replyCount ?? 0}
            isLoading={isLoading}
          />
          <StatCard
            label="좋아요 수"
            value={stats?.receivedLikeCount ?? 0}
            isLoading={isLoading}
          />
        </div>

        <div className="mb-auto">
          <div className="text-center mb-6">
            <h2 className="text-[20px] font-bold text-[#f9f9f9] inline-flex items-center justify-center">
              내가 받은 <span className="text-[#8dc5ff] mx-1">반응 리포트</span>
              <SparkleIcon />
            </h2>
            <p className="text-[13px] text-[rgba(255,255,251,0.4)] mt-2">
              이러한 이야기들을 받으셨네요!
            </p>
          </div>

          <div className="bg-[#54566a] rounded-[10px] px-12 py-[18px]">
            <div className="flex flex-col gap-2 items-center">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-[#8dc5ff] px-4 py-3 rounded-lg w-32 h-6 animate-pulse"
                  ></div>
                ))
              ) : reactions.length > 0 ? (
                reactions.map((r) => <ReactionBadge key={r.id} {...r} />)
              ) : (
                <p className="text-[rgba(255,255,251,0.4)] text-[14px]">
                  아직 받은 반응이 없어요
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
