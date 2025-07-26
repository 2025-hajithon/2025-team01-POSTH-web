import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ResponseModal from "@/components/modal/response-modal";

const ResponseWritePage = () => {
  const [value, setValue] = useState("");
  const [lineCount, setLineCount] = useState(1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);

  const lineHeight = 32; // px, tailwind 기준 leading-8

  const handleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // 동적 줄 수 계산 및 높이 자동 조절
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto"; // 초기화
      textarea.style.height = `${textarea.scrollHeight}px`; // 내용 기반 높이
      const lines = Math.floor(textarea.scrollHeight / lineHeight);
      setLineCount(Math.max(1, lines));
    }
  }, [value]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/response/submit");
  };

  return (
    <>
      {isModalOpen && <ResponseModal setIsModalOpen={setIsModalOpen} />}
      <form
        onSubmit={handleSubmit}
        className="w-full h-full bg-gray-50 flex flex-col items-center font-suit p-5 justify-between overflow-hidden"
      >
        <div className="w-full flex flex-col items-center">
          <div className="text-black-500 text-xl font-bold my-10">
            나의 경험을 나눠주세요!
          </div>
          <div className="w-full max-w-md flex flex-col gap-4">
            {/* 질문 박스 */}
            <div className="bg-[#2F2F3E] text-white rounded-lg p-5">
              <div className="text-sm font-bold mb-3">
                <span className="text-blue-300">GDG</span>{" "}
                <span className="text-white-100">님의 고민</span>
              </div>
              <p className="text-sm font-medium leading-6 text-white-100">
                대학 친구들은 다 취업하고, 자격증도 따고 바쁘게 사는 것 같은데
                저는 아직도 평생 직업으로 뭘 가져야 할 지조차 모르겠어요. 뒤처진
                기분이 들어서 너무 조급해요.
              </p>
            </div>

            {/* 답변 입력 */}
            <div className="bg-[#FFFEFB] rounded-lg p-5">
              <div className="text-sm font-semibold text-black-500 mb-4">
                <span className="text-blue-300">홍익</span> 님의 생각을
                적어주세요!
              </div>

              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={value}
                  onChange={handleValue}
                  className="w-full bg-transparent text-sm text-black-500 outline-none resize-none leading-8 relative z-10 py-1"
                  rows={1} // 기본값 (auto height 사용)
                  style={{ lineHeight: `${lineHeight}px`, overflow: "hidden" }}
                />

                {/* 줄 배경 */}
                <div className="absolute inset-0 z-0 pointer-events-none flex flex-col justify-start">
                  {Array.from({ length: lineCount }).map((_, i) => (
                    <div
                      key={i}
                      className="w-full border-b border-blue-200 opacity-70 h-8 py-4"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 전송 버튼 */}
        <button
          type="submit"
          disabled={value.length === 0}
          className="w-full max-w-md mt-4 py-3 bg-main-100 text-black-500 rounded-lg text-sm font-semibold disabled:bg-gray-200 disabled:text-white-100"
        >
          답장 편지 보내기
        </button>
      </form>
    </>
  );
};

export default ResponseWritePage;
