import { useState, useEffect } from "react";
import SadFace from "@/assets/face/sad-face.svg?react";
import NeutralFace from "@/assets/face/neutral-face.svg?react";
import HappyFace from "@/assets/face/happy-face.svg?react";
import ColorSadFace from "@/assets/face/color-sad-face.svg?react";
import ColorNeutralFace from "@/assets/face/color-neutral-face.svg?react";
import ColorHappyFace from "@/assets/face/color-happy-face.svg?react";
import Close from "@/assets/close.svg?react";
import instance from "@/lib/axios";
import { useNavigate, useSearchParams } from "react-router-dom";

// 반응 타입 상수
const REACTION_TYPES = {
  SAD: "BAD",
  NEUTRAL: "SOSO",
  HAPPY: "GOOD",
} as const;

type ReactionType = (typeof REACTION_TYPES)[keyof typeof REACTION_TYPES];

// goodTypes 매핑
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

// API 요청 함수
const fetchReplyReaction = async (replyId: string | null) => {
  const { data } = await instance.get(`/member/my/archive/reply/${replyId}`);
  return data;
};

const ReplyDetailReactionPage = () => {
  const [selectedReaction, setSelectedReaction] = useState<ReactionType>(
    REACTION_TYPES.HAPPY
  );
  const [feedbackTags, setFeedbackTags] = useState<string[]>([]);
  const [thankMessage, setThankMessage] = useState("");
  const [searchParams] = useSearchParams();
  const replyId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const onClose = () => {
    navigate(-1); // 뒤로 가기
  };
  // 데이터 로드
  useEffect(() => {
    const loadReaction = async () => {
      try {
        setIsLoading(true);
        const data = await fetchReplyReaction(replyId);

        // 서버 데이터 설정
        setSelectedReaction(data.reactionType as ReactionType);
        setFeedbackTags(
          (data.goodTypes || []).map(
            (id: number) => REACTION_TEXT_MAP[id.toString()]
          )
        );
        setThankMessage(data.thankMessage || "");
      } catch (err) {
        console.error("반응 데이터 불러오기 실패:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadReaction();
  }, [replyId]);

  // 반응 아이콘 데이터
  const reactions = [
    {
      type: REACTION_TYPES.SAD,
      label: "별로였어요",
      icon: SadFace,
      colorIcon: ColorSadFace,
    },
    {
      type: REACTION_TYPES.NEUTRAL,
      label: "괜찮았어요",
      icon: NeutralFace,
      colorIcon: ColorNeutralFace,
    },
    {
      type: REACTION_TYPES.HAPPY,
      label: "좋았어요!",
      icon: HappyFace,
      colorIcon: ColorHappyFace,
    },
  ];

  if (isLoading) {
    return (
      <div className="bg-[#54566a] rounded-[10px] w-full max-w-[319px] mx-auto font-['SUIT',sans-serif] p-4">
        <div className="flex justify-center items-center h-[200px]">
          <p className="text-center text-sm text-[rgba(255,255,251,0.7)]">
            불러오는 중...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#54566a] rounded-[10px] w-full max-w-[319px] mx-auto font-['SUIT',sans-serif]">
      <div className="flex flex-col gap-[18px] items-end justify-start p-4 w-full">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="bg-transparent transition-opacity border-none"
          aria-label="닫기"
        >
          <Close className="w-[15px] h-auto" />
        </button>

        <div className="flex flex-col gap-8 items-center justify-start w-full">
          {/* 제목 */}
          <div className="font-bold text-[#f9f9f9] text-[22px] text-center tracking-[-0.22px] leading-[1.4] w-full">
            <span>이런 </span>
            <span className="text-[#b1d7ff]">반응</span>
            <span>을 남겨주셨어요</span>
          </div>

          <div className="flex flex-col gap-9 items-center justify-start w-full">
            {/* 반응 아이콘들 */}
            <div className="flex flex-row gap-7 items-center justify-start">
              {reactions.map((reaction) => {
                const isSelected = selectedReaction === reaction.type;
                const IconComponent = isSelected
                  ? reaction.colorIcon
                  : reaction.icon;

                return (
                  <div
                    key={reaction.type}
                    className="flex flex-col gap-2 items-center justify-start w-[68px]"
                  >
                    <div
                      className={`font-semibold text-[13px] text-center tracking-[-0.13px] leading-[1.7] whitespace-nowrap ${
                        isSelected
                          ? "text-[#b1d7ff]"
                          : "text-[rgba(255,255,251,0.2)]"
                      }`}
                    >
                      {reaction.label}
                    </div>
                    <div
                      className={`flex items-center justify-center p-[5px] rounded-[37px] w-[60px] h-[60px] ${
                        isSelected
                          ? "bg-[#b1d7ff]"
                          : "bg-[rgba(255,255,251,0.2)]"
                      }`}
                    >
                      <div className="w-14 h-14">
                        <IconComponent className="w-full h-full" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 피드백 태그들 */}
            {feedbackTags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-start justify-center w-full">
                {feedbackTags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="bg-[#b1d7ff] px-4 py-2.5 rounded-md"
                  >
                    <div className="font-semibold text-[#3a3b49] text-[12px] tracking-[-0.12px] leading-[1.7] whitespace-nowrap">
                      {tag}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 감사 메시지 */}
            {thankMessage && (
              <div className="bg-[#f9f9f9] px-4 py-6 rounded-md w-full">
                <div className="font-semibold text-[#3a3b49] text-[12px] text-center tracking-[-0.12px] leading-[1.7] w-full">
                  <div className="whitespace-pre-line">{thankMessage}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReplyDetailReactionPage;
