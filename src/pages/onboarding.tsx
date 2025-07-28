import { useNavigate } from "react-router-dom";

const OnBoarding = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="bg-[#F9F9F9]">
      <div>
        편지를 통한 우연의 연결로,
        <br />
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleLogin}
          className="w-80 h-12 px-14 py-3 bg-[#FFFFFB] text-gray-500"
        >
          로그인 하기
        </button>
        <button
          onClick={handleRegister}
          className="w-80 h-12 px-14 py-3 bg-[#FFFFFB] text-gray-500"
        >
          회원가입 하기
        </button>
      </div>
    </div>
  );
};

export default OnBoarding;
