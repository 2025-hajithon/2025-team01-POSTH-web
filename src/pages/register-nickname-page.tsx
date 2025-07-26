import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import instance from "@/lib/axios";

interface SignupPayload {
  loginId: string;
  password: string;
  nickname: string;
}

const register = async (data: SignupPayload) => {
  const res = await instance.post("/member/signup", data);
  return res.data; // 백엔드가 반환하는 데이터 구조에 따라 수정 가능
};

const Nickname: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const { username, password } = location.state || {};

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!nickname.trim()) return;

    setIsLoading(true);
    try {
      const res = register({
        loginId: username,
        password: password,
        nickname: nickname,
      });
      console.log("회원 가입 정보: ", res);
      alert("회원가입 성공!");
      navigate("/");
    } catch (err) {
      console.error("회원가입 에러: ", err);
      alert(`회원가입 실패!: ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = nickname.trim().length > 0;

  return (
    <div className="h-full w-full bg-[#f9f9f9] relative overflow-hidden font-suit text-black-500">
      <div className="absolute top-[282px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="text-[23px] font-bold  tracking-tight leading-[1.4]">
          어떻게 불러드릴까요?
        </h1>
      </div>

      <div className="absolute top-[337.5px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            if (e.target.value.length <= 12) {
              setNickname(e.target.value);
            }
          }}
          className="text-[22px] font-medium text-[#000000] tracking-tight leading-[1.4] bg-transparent border-none outline-none text-center placeholder:text-[rgba(0,0,0,0.3)]"
          placeholder="닉네임 입력"
          style={{ fontFamily: "Pretendard, sans-serif" }}
        />
      </div>

      <div className="absolute top-[361px] left-1/2 transform -translate-x-1/2 w-14">
        <div className="w-full h-px bg-[#000000]"></div>
      </div>

      <div className="absolute top-[607px] left-1/2 transform -translate-x-1/2 w-[319px]">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || isLoading}
          className={`w-full py-3.5 rounded-md font-bold text-[14px] tracking-tight transition-colors duration-300 ${
            isFormValid && !isLoading
              ? "bg-black-500 text-[#f9f9f9] hover:bg-[#2a2b39] cursor-pointer"
              : "bg-black-300 text-[rgba(249,249,249,0.6)] cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>처리 중...</span>
            </div>
          ) : (
            "회원가입 완료!"
          )}
        </button>
      </div>

      {nickname.length > 0 && (
        <div className="absolute top-[380px] left-1/2 transform -translate-x-1/2 text-center">
          <span className="text-[12px] text-[rgba(58,59,73,0.4)]">
            {nickname.length}/12
          </span>
        </div>
      )}
    </div>
  );
};

export default Nickname;
