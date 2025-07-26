import React, { useState } from "react";
import Cancel from "@/assets/cancel2.svg?react";
import { useNavigate } from "react-router-dom";
import instance from "@/lib/axios";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "password";
}

interface LoginPayload {
  loginId: string;
  password: string;
}

// 입력 필드 컴포넌트
const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = "",
  type = "text",
}) => {
  const handleClear = () => onChange("");

  return (
    <div className="w-full flex flex-col gap-3 ">
      <label className="text-[13px] font-semibold text-gray-400 tracking-[-0.13px] leading-[1.7]">
        {label}
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 text-[16px] font-bold bg-transparent outline-none tracking-[-0.16px] leading-[1.4]"
          />
          {value && (
            <div
              onClick={handleClear}
              className="bg-transparent p-1 rounded-full hover:cursor-pointer"
            >
              <Cancel className="w-10 h-10" />
            </div>
          )}
        </div>
        <div className="h-px bg-gray-200"></div>
      </div>
    </div>
  );
};

const login = async (data: LoginPayload) => {
  const res = await instance.post("/auth/login", data);
  return res.data;
};

const LogIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert("아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await login({ loginId: username, password: password });
      console.log("로그인 성공", res);
      localStorage.setItem("accessToken", res.accessToken);
      alert("로그인 되었습니다!");
      navigate("/");
    } catch (err) {
      console.log("로그인 실패");
      alert(`로그인 실패! : ${err}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full w-full bg-[#f9f9f9] text-black-500 flex flex-col">
      <div className="flex-1 px-7 flex flex-col">
        <div className="pt-16 pb-10">
          <h1 className="text-[26px] font-bold  tracking-[-0.26px] leading-[1.4]">
            로그인
          </h1>
        </div>

        <div className="flex flex-col gap-7 mb-auto">
          <InputField
            label="아이디"
            value={username}
            onChange={setUsername}
            placeholder="아이디를 입력하세요"
          />

          <InputField
            label="비밀번호"
            value={password}
            onChange={setPassword}
            placeholder="비밀번호를 입력하세요"
            type="password"
          />
        </div>

        <div className="pb-24">
          <button
            onClick={handleLogin}
            disabled={isLoading || !username || !password}
            className="w-full bg-black-500 text-[#f9f9f9] py-4 rounded-lg font-bold text-[14px] tracking-[-0.14px] leading-[1.4] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#2a2b35] active:scale-[0.98]"
          >
            {isLoading ? "로그인 중..." : "로그인 하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
