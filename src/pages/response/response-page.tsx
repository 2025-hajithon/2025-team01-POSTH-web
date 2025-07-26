<<<<<<< HEAD
=======
import axios from "@/lib/axios";
import type { QuestionContent } from "@/types/question";
>>>>>>> origin/main
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResponsePage = () => {
<<<<<<< HEAD
  const message =
    "대학 친구들은 다 취업하고, 자격증도 따고 바쁘게 사는 것 같은데 저는 아직도 평생 직업으로 뭘 가져야 할 지조차 모르겠어요. 뒤처진 기분이 들어서 너무 조급해요.";

  const textRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1); // 기본값

=======
  const textRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1); // 기본값

  const [questionContent, setQuestionContent] = useState<QuestionContent>(
    JSON.parse(localStorage.getItem("questionContent") || "{}")
  );

>>>>>>> origin/main
  const navigate = useNavigate();

  useEffect(() => {
    if (!textRef.current) return;
    const el = textRef.current;

    const updateLines = () => {
      const height = el.offsetHeight;
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight); // 예: 32px
      const lines = Math.round(height / lineHeight);
      setLineCount(lines);
    };

    updateLines(); // 초기
    const resizeObserver = new ResizeObserver(updateLines);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, []);

<<<<<<< HEAD
  return (
    <div className="w-full h-screen bg-[#45455A] flex flex-col items-center justify-between font-suit px-6 py-10">
      {/* 돌아가기 버튼 */}
      <div className="w-full flex justify-center">
        <div className="w-10 h-10 rounded-full bg-black bg-white-100 flex items-center justify-center">
          <span className="text-white text-xl">↻</span>
=======
  const reFetchQuestionContent = async () => {
    const category = localStorage.getItem("category");
    try {
      const response = await axios.get("/question", {
        params: {
          category: category,
        },
      });
      console.log(response.data);
      const questionContent: QuestionContent = response.data;
      localStorage.setItem("questionContent", JSON.stringify(questionContent));
      setQuestionContent(questionContent);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    reFetchQuestionContent();
  }, []);

  return (
    <div className="w-full h-full bg-[#45455A] flex flex-col items-center justify-between font-suit px-6 py-10">
      {/* 돌아가기 버튼 */}
      <div
        className="w-full flex justify-center"
        onClick={reFetchQuestionContent}
      >
        <div className="w-10 h-10 rounded-full bg-black-400 flex items-center justify-center">
          <span className="text-white-100 text-xl">↻</span>
>>>>>>> origin/main
        </div>
      </div>

      {/* 편지 카드 */}
      <div className="relative rotate-[-3deg] w-full max-w-xs bg-[#FFFEFB] p-5 rounded-md shadow-md">
        {/* 줄 배경 */}
        <div className="absolute inset-x-0 bottom-0 top-[56px] z-0 pointer-events-none flex flex-col justify-start px-2">
          {Array.from({ length: lineCount }).map((_, idx) => (
            <div
              key={idx}
              className="w-full border-b border-blue-200 opacity-50 h-8"
            />
          ))}
        </div>

        {/* 제목 */}
        <div className="w-full text-center text-sm font-bold mb-5 z-10 relative">
<<<<<<< HEAD
          <span className="text-blue-300">GDG</span>{" "}
=======
          <span className="text-blue-300">
            {questionContent.authorNickname}
          </span>{" "}
>>>>>>> origin/main
          <span className="text-zinc-700">님의 고민</span>
        </div>

        {/* 내용 */}
        <div
          ref={textRef}
          className="z-10 relative text-zinc-700 text-sm font-medium leading-8 whitespace-pre-wrap"
        >
<<<<<<< HEAD
          {message}
=======
          {questionContent.content}
>>>>>>> origin/main
        </div>
      </div>

      {/* 버튼 */}
      <button
        className="w-full max-w-[280px] py-3 bg-blue-300 text-zinc-700 rounded-md font-semibold text-sm"
        onClick={() => navigate("/response/write")}
      >
        이 고민에 답장 적기
      </button>
    </div>
  );
};

export default ResponsePage;
