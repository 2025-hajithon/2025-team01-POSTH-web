import Airplane from "@/assets/airplane2.svg?react";
import { useNavigate } from "react-router-dom";

const ResponseSubmitPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-gray-50 flex flex-col items-center justify-between font-suit p-5 gap-8">
      <div className="w-full flex flex-col items-center justify-center gap-8 mt-36">
        {/* 상단 메시지 */}
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <div className="w-full text-center text-2xl font-bold text-gray-700 leading-snug ">
            편지가 성공적으로 <br />
            닿을 예정이예요{" "}
          </div>

          <div className="text-center text-m font-medium text-black-300 leading-relaxed">
            오늘 누군가에게 길이 되어주셨어요!{" "}
          </div>
        </div>
        {/* 비행기 아이콘 */}
        <div className="flex justify-center items-center mt-6">
          <Airplane className="w-50 h-50" />
        </div>
      </div>

      {/* 홈으로 돌아가기 버튼 (선택사항) */}
      <button
        className="w-full max-w-[240px] py-3 bg-black-500 text-white-100 rounded-lg hover:bg-main-300 hover:text-black-500  hover:border-none transition-colors"
        onClick={() => navigate("/")}
      >
        홈으로
      </button>
    </div>
  );
};

export default ResponseSubmitPage;
