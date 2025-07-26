import Airplane from "@/assets/airplane2.svg?react";
import { useNavigate } from "react-router-dom";

const ResponseSubmitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-around font-suit p-5 gap-8">
      <div className="w-full flex flex-col items-center justify-center gap-8">
        {/* 상단 메시지 */}
        <div>
          <div className="w-full text-center text-2xl font-bold text-gray-700 leading-relaxed">
            편지가 성공적으로 <br />
            닿을 예정이예요{" "}
          </div>

          <div className="text-center text-m font-medium text-gray-500 leading-relaxed">
            오늘 누군가에게 길이 되어주셨어요!{" "}
          </div>
        </div>
        {/* 비행기 아이콘 */}
        <div className="flex justify-center items-center">
          <Airplane className="w-32" />
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

export default ResponseSubmitPage;
