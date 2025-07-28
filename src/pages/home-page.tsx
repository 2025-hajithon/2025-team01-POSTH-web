import { useNavigate } from "react-router-dom";
import MailBox2 from "@asset/mailbox.svg?react";
import Mail from "@/assets/msg.svg?react";
import Pencil from "@/assets/pencil.svg?react";

import MailBox from "@/assets/mailbos.svg?react";
import { useState, useEffect } from "react";
import axios from "@/lib/axios";
const HomePage = () => {
  const [isMessage, setIsMessage] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/onboarding");
      return;
    }

    const fetchList = async () => {
      try {
        const response = await axios.get("/reply/list");
        if (response.data.length > 0) {
          setIsMessage(true);
        }
        // 응답 데이터 처리
      } catch (error) {
        console.error("편지 목록을 가져오는 중 오류 발생:", error);
        navigate("/login");
        localStorage.removeItem("accessToken");
      }
    };

    fetchList();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex flex-col items-center justify-start px-4 py-6 bg-white font-suit ">
      {/* 헤더 */}
      <div className="w-full max-w-md flex justify-between items-center mb-6">
        <h1 className="text-3xl font-black text-gray-800">POSTH</h1>
        <button
          onClick={() => navigate("/mypage")}
          className="px-3 py-1 rounded-md bg-gray-800 text-white-100 text-sm font-semibold"
        >
          MY
        </button>
      </div>

      {/* 편지 없음 메시지 */}
      <div className="relative w-full max-w-md h-96 bg-[#E3EFFB] rounded-xl flex flex-col items-center justify-center overflow-hidden px-4 mb-10">
        {
          <div className="relative inline-block">
            {/* 본체 사각형 */}
            <div className="text-sm text-gray-700 font-medium bg-black-500 text-white-100 rounded-lg px-3 py-2">
              {isMessage
                ? "답장편지가 도착했어요!"
                : "아직 도착한 편지가 없어요."}
            </div>

            {/* 말풍선 꼬리 */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 
                  border-l-8 border-r-8 border-t-8 
                  border-l-transparent border-r-transparent border-t-black-500"
            />
          </div>
        }
        {isMessage ? (
          <MailBox2
            className="w-78 translate-y-10 cursor-pointer"
            onClick={() => navigate("/letter")}
          />
        ) : (
          <MailBox
            className="w-78 translate-y-10 cursor-pointer"
            onClick={() => navigate("/letter")}
          />
        )}
      </div>

      {/* 카드 두 개 */}
      <div className="w-full max-w-md grid grid-cols-2 gap-4">
        {/* 답장 보내기 */}
        <div
          onClick={() => navigate("/response/select")}
          className="bg-black-400 text-white rounded-xl p-4 flex flex-col items-start justify-between h-full cursor-pointer"
        >
          <div>
            <h2 className="text-lg font-bold text-white-100">답장 보내기</h2>
            <p className="text-sm text-gray-300 mt-1">
              누군가의 고민 해결사가
              <br />
              되어주세요!
            </p>
          </div>
          <Mail className="w-36 bg-white rounded mt-4" />
        </div>

        {/* 질문하기 */}
        <div
          onClick={() => navigate("/question")}
          className="bg-black-400 text-white rounded-xl p-4 flex flex-col items-start justify-between h-full cursor-pointer"
        >
          <div>
            <h2 className="text-lg font-bold text-white-100">질문하기</h2>
            <p className="text-sm text-gray-300 mt-1">
              털어놓고 싶은 <br />
              고민이 있으신가요?
            </p>
          </div>
          <Pencil className="w-36 bg-white rounded mt-4" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
