import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    if (!formData.username.trim() || !formData.password.trim()) return;

    setIsLoading(true);

    setTimeout(() => {
      console.log("로그인 시도:", formData);
      setIsLoading(false);
      navigate("/register/nickname", {
        state: {
          username: formData.username,
          password: formData.password,
        },
      });
    }, 1500);
  };

  const isFormValid = formData.username.trim() && formData.password.trim();

  return (
    <div className="h-full w-full bg-[#f9f9f9] relative overflow-hidden font-suit text-black-500">
      <div className="absolute top-[113px] left-1/2 transform -translate-x-2/3">
        <h1 className="text-2xl font-bold tracking-tight leading-[1.4] whitespace-nowrap">
          기본 정보를 입력해주세요
        </h1>
      </div>

      <div className="absolute top-[180px] left-1/2 transform -translate-x-1/2 w-[319px] space-y-3">
        <div className="bg-[rgba(58,59,73,0.1)] rounded-md px-[18px] pt-3 pb-4">
          <div className="w-[283px]">
            <label className="block text-[13px] font-semibold text-[rgba(58,59,73,0.4)] tracking-tight leading-[1.4] mb-2">
              아이디
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full text-[16px] font-semibold tracking-tight leading-[1.4] bg-transparent border-none outline-none placeholder:text-[rgba(58,59,73,0.3)]"
              placeholder="아이디를 입력하세요"
            />
          </div>
        </div>

        <div className="bg-[rgba(84,86,106,0.1)] rounded-md px-[18px] pt-3 pb-4 relative">
          <div className="w-[283px]">
            <label className="block text-[13px] font-semibold text-[rgba(58,59,73,0.4)] tracking-tight leading-[1.4] mb-2">
              비밀번호
            </label>
            <div className="relative">
              <input
                type="password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full text-[16px] font-semibold text-[#3a3b49] tracking-tight leading-[1.4] bg-transparent border-none outline-none placeholder:text-[rgba(58,59,73,0.3)] pr-10"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 버튼 */}
      <div className="absolute top-[607px] left-1/2 transform -translate-x-1/2 w-[319px]">
        <button
          onClick={handleLogin}
          disabled={!isFormValid || isLoading}
          className={`w-full py-3.5 rounded-md font-bold text-[14px] tracking-tight transition-colors duration-300 ${
            isFormValid && !isLoading
              ? "bg-black-500 text-[#f9f9f9] hover:bg-[#2a2b39] cursor-pointer"
              : "bg-[rgba(58,59,73,0.3)] text-[rgba(249,249,249,0.6)] cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>회원가입 중...</span>
            </div>
          ) : (
            "다음"
          )}
        </button>
      </div>
    </div>
  );
};

export default Register;
