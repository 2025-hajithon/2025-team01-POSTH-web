import { useNavigate } from "react-router-dom";
import Letter from "@/assets/letter.svg?react";

const ResponseSubmitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-around font-suit p-5 gap-8">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        {/* 상단 메시지 */}
        <div>
          <div className="w-full text-center text-2xl font-bold text-gray-700 leading-relaxed">
            편지는 아카이브에 <br />
            자동으로 저장되었어요!{" "}
          </div>

          <div className="text-center text-m font-medium text-gray-500 leading-relaxed">
            원한다면 아카이브에서 삭제할 수 있어요{" "}
          </div>
        </div>
        {/* 비행기 아이콘 */}
        <div className="flex justify-center items-center">
          <Letter className="w-50" />
        </div>
      </div>

      <div className="w-full flex items-center justify-center gap-3">
        <button className="w-full py-3 bg-black-400 text-white-100 rounded-lg hover:bg-blue-600 transition-colors">
          아카이브 바로가기
        </button>
        <button
          className="py-3 bg-black-500 text-white-100 rounded-lg hover:bg-blue-600 transition-colors w-1/2"
          onClick={() => navigate("/")}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default ResponseSubmitPage;
