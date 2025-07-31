import React from "react";
import Road from "@/assets/road.svg?react";
import Airplane from "@/assets/airplane0.svg?react";
import LOGO from "@/assets/POSTH.svg?react";
import { useNavigate } from "react-router-dom";

const OnBoarding: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#F9F9F9] text-black-500 min-h-[100dvh] w-full flex flex-col relative overflow-hidden max-w-md mx-auto">
      <div className="absolute top-[5%] left-[8%] z-10 w-[90%]">
        <h1 className="text-[#525252] text-[18px] font-semibold leading-[27px]">
          편지를 통한 우연한 연결로,
          <br />
          너의 새로운 가능성을 발견하는
        </h1>

        <div className="mt-5 w-[220px]">
          <LOGO className="w-full h-auto" />
        </div>
      </div>

      <div className="absolute inset-0 w-full h-full">
        <div className="absolute top-[24%] left-[5%] w-[45%] h-[40%]">
          <Airplane className="w-full h-full  object-contain" />
        </div>

        <div className="absolute -bottom-4 left-5 lg:-left-5 w-full h-[70%] scale-110 ">
          <Road className="w-full h-full object-cover object-bottom" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 w-full px-5 pb-8 z-10">
        <div className="space-y-3">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="w-full bg-white py-4 rounded-xl bg-[#FFFFFB] active:bg-gray-100 transition-colors"
          >
            <span className="font-bold  text-base tracking-[-0.16px]">
              로그인 하기
            </span>
          </button>
          <button
            onClick={() => {
              navigate("/register");
            }}
            className="w-full bg-white py-4 rounded-xl bg-[#FFFFFB] active:bg-gray-100 transition-colors"
          >
            <span className="font-bold text-base tracking-[-0.16px]">
              회원가입 하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnBoarding;
