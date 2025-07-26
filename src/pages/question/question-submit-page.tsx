import Airplane from "@/assets/airplane.svg?react";
import { useNavigate } from "react-router-dom";

const QuestionSubmitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-around font-suit p-5 gap-8">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        {/* 상단 메시지 */}
        <div>
          <div className="w-full text-center text-2xl font-bold text-gray-700 leading-relaxed">
            나의 길을 찾아 줄 누군가에게
            <br />
            편지가 전달될 예정이에요!
          </div>

          <div className="text-center text-m font-medium text-gray-500 leading-relaxed">
            나에게 도착할 소중한 답장을 기다려보세요!
          </div>
        </div>
        {/* 비행기 아이콘 */}
        <div className="flex justify-center items-center">
          <Airplane className="w-32 h-24" />
        </div>
      </div>

      {/* 홈으로 돌아가기 버튼 (선택사항) */}
      <button
        className="w-full max-w-[240px] py-3 bg-black-500 text-white-100 rounded-lg hover:bg-blue-600 transition-colors"
        onClick={() => navigate("/")}
      >
        홈으로
      </button>
    </div>
  );
};

export default QuestionSubmitPage;
