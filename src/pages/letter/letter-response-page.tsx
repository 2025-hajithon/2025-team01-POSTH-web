import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SadFace from "@/assets/face/sad-face.svg?react";
import ColoredSadFace from "@/assets/face/color-sad-face.svg?react";
import HappyFace from "@/assets/face/happy-face.svg?react";
import NeutralFace from "@/assets/face/neutral-face.svg?react";
import ColoredNeutralFace from "@/assets/face/color-neutral-face.svg?react";
import ColoredHappyFace from "@/assets/face/color-happy-face.svg?react";
<<<<<<< HEAD
=======
import axios from "@/lib/axios";
import type { List, Reply } from "@/types/question";
>>>>>>> origin/main

const LetterResponsePage = () => {
  const navigate = useNavigate();
  const [selectedFace, setSelectedFace] = useState<string>("");
  const [selectedKeywordIds, setSelectedKeywordIds] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");

<<<<<<< HEAD
=======
  const [replyInfo] = useState<List | null>(() => {
    const stored = localStorage.getItem("replyInfo");
    return stored ? JSON.parse(stored) : null;
  });
  const [letterInfo] = useState<Reply | null>(() => {
    const stored = localStorage.getItem("letterInfo");
    return stored ? JSON.parse(stored) : null;
  });

>>>>>>> origin/main
  const keywords = [
    { id: 1, text: "현실적인 조언이 좋았어요" },
    { id: 2, text: "마음의 위로가 되었어요" },
    { id: 3, text: "비슷한 상황에 도움이 되었어요" },
    { id: 4, text: "생각이 정리됐어요" },
    { id: 5, text: "새로운 용기가 생겼어요" },
    { id: 6, text: "새로운 시야를 갖게 되었어요" },
    { id: 7, text: "뜻밖의 통찰을 얻었어요" },
    { id: 8, text: "가야 할 방향이 생겼어요" },
    { id: 9, text: "성의가 없었어요" },
    { id: 10, text: "고민과 맞지 않는 답변이었어요" },
  ];

  const toggleKeyword = (id: number) => {
    setSelectedKeywordIds((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );
  };

<<<<<<< HEAD
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
=======
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
>>>>>>> origin/main
    e.preventDefault();
    // 여기에 저장/전송 로직 추가
    console.log({
      selectedFace,
      selectedKeywordIds,
      message,
    });
<<<<<<< HEAD
    navigate("/letter/store");
=======
    try {
      const response = await axios.post(
        `/reply/${replyInfo?.replyId}/reaction`,
        {
          reactionType: selectedFace,
          goodThings: selectedKeywordIds,
          thankMessage: message,
        }
      );
      console.log(response);
      navigate("/letter/store");
    } catch (error) {
      console.error(error);
    }
>>>>>>> origin/main
  };

  return (
    <form
      onSubmit={handleSubmit}
<<<<<<< HEAD
      className="w-full h-full bg-gray-50 flex flex-col items-center font-suit p-5 justify-between overflow-hidden"
    >
      <div className="w-full flex flex-col items-center justify-center h-full gap-10">
        <h2 className="text-black-500 text-2xl font-bold text-center leading-snug">
          하이픈 님이 보낸 <br />
=======
      className="w-full h-full bg-gray-50 flex flex-col justify-between font-suit p-5 overflow-hidden"
    >
      <div className="w-full flex flex-col items-center justify-center h-full gap-8 mb-10">
        <h2 className="text-black-500 text-2xl font-bold text-center leading-snug">
          {letterInfo?.replierNickname}님이 보낸 <br />
>>>>>>> origin/main
          편지는 어땠나요?
        </h2>

        {/* 얼굴 선택 */}
        <div className="w-full flex items-center justify-center gap-6">
          {[
            {
<<<<<<< HEAD
              type: "sad",
=======
              type: "BAD",
>>>>>>> origin/main
              label: "별로에요",
              icon: SadFace,
              colored: ColoredSadFace,
            },
            {
<<<<<<< HEAD
              type: "neutral",
=======
              type: "SOSO",
>>>>>>> origin/main
              label: "괜찮았어요",
              icon: NeutralFace,
              colored: ColoredNeutralFace,
            },
            {
<<<<<<< HEAD
              type: "happy",
=======
              type: "GOOD",
>>>>>>> origin/main
              label: "좋았어요",
              icon: HappyFace,
              colored: ColoredHappyFace,
            },
          ].map(({ type, label, icon: Icon, colored: ColoredIcon }) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedFace(type)}
              className="flex flex-col items-center justify-center gap-2 focus:outline-none hover:border-none border-none"
            >
<<<<<<< HEAD
              <span>{label}</span>
=======
              <span className="text-black-500">{label}</span>
>>>>>>> origin/main
              {selectedFace === type ? (
                <ColoredIcon className="w-14 h-14" />
              ) : (
                <Icon className="w-14 h-14" />
              )}
            </button>
          ))}
        </div>

        {/* 키워드 다중 선택 */}
        <div className="flex flex-wrap gap-2 w-full justify-center">
          {keywords.map(({ id, text }) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleKeyword(id)}
              className={`px-4 py-2 rounded-xl text-sm transition-colors font-medium ${
                selectedKeywordIds.includes(id)
                  ? "bg-main-100 text-black-500"
                  : "bg-black-500 text-white-100"
              }`}
            >
              {text}
            </button>
          ))}
        </div>

        {/* 메시지 입력 */}
        <div className="w-full max-w-md text-center">
          <label className="block mb-2 text-m font-semibold text-black-500 text-left">
            고마움의 메시지를 전해보세요!
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={150}
<<<<<<< HEAD
            className="w-full min-h-28 p-3 bg-gray-100 rounded-lg resize-none focus:outline-none"
=======
            className="w-full min-h-28 p-3 bg-gray-100 rounded-lg resize-none focus:outline-none text-black-500"
>>>>>>> origin/main
            placeholder="(선택) 150자 이내로 작성해주세요"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-black-500 text-white-100 rounded-lg hover:bg-main-400 transition-colors"
<<<<<<< HEAD
=======
        disabled={!selectedFace}
>>>>>>> origin/main
      >
        저장하기
      </button>
    </form>
  );
};

export default LetterResponsePage;
