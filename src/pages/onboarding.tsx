import React from "react";
import Road from "@/assets/road.svg?react";
import Airplane from "@/assets/main-airplane.svg?react";
import String from "@/assets/string.svg?react";
import LOGO from "@/assets/posth.svg?react";
import { useNavigate } from "react-router-dom";

const OnBoarding: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[#F9F9F9] h-full flex flex-col relative overflow-hidden">
      {/* 상단: 텍스트 및 로고 */}
      <div className="pt-20 pl-8 z-10">
        <h1 className="text-[#525252] text-[18px] font-semibold leading-[27px]">
          편지를 통한 우연한 연결로,
          <br />
          너의 새로운 가능성을 발견하는
        </h1>

        <div className="mt-5 w-[220px]">
          {" "}
          <LOGO className="w-full h-auto" />{" "}
          {/* LOGO가 이 div의 너비를 채우도록 설정 */}
        </div>
      </div>

      {/* 중앙: 일러스트레이션 영역 */}
      {/* 각 요소를 absolute를 이용해 이미지와 같이 배치합니다. */}
      <div className="absolute inset-0 w-full h-full">
        {/* 종이비행기: 부드럽게 떠다니는 애니메이션 적용 */}
        {/* 비행기 크기 증가 및 위치 조정 */}
        <Airplane className="absolute top-[34%] left-[8%] w-[180px] h-auto animate-float" />

        {/* 비행기 경로 (점선) */}
        {/* 점선 크기 증가 및 위치 조정 */}
        <String className="absolute top-[27%] left-[45%] w-[50px] h-[50px] -rotate-[60deg]" />

        {/* 도로 */}
        <Road className="absolute bottom-0 left-0 w-full" />
      </div>

      {/* 하단: 로그인/회원가입 버튼 */}
      {/* z-10을 추가하여 도로 일러스트 위에 버튼이 오도록 함 */}
      <div className="w-full px-5 pb-8 mt-auto z-10">
        <div className="space-y-3">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="w-full bg-white py-4 rounded-xl bg-[#FFFFFB] active:bg-gray-100 transition-colors"
          >
            <span className="font-bold text-[#3A3B49] text-base tracking-[-0.16px]">
              로그인 하기
            </span>
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="w-full bg-white py-4 rounded-xl bg-[#FFFFFB] active:bg-gray-100 transition-colors"
          >
            <span className="font-bold text-[#3A3B49] text-base tracking-[-0.16px]">
              회원가입 하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
