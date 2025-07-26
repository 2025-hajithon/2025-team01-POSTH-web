import React, { useEffect, useState } from "react";
import ChevronLeft from "@/assets/chevron-left.svg?react";
import Sticker from "@/assets/Sticker.svg?react";
import Poll from "@/assets/poll.svg?react";
import { useNavigate } from "react-router-dom";
import instance from "@/lib/axios";

// 메뉴 카드 컴포넌트
interface MenuCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const MenuCard: React.FC<MenuCardProps> = ({
  title,
  description,
  icon,
  onClick,
}) => (
  <button
    onClick={onClick}
    className="w-full bg-[#54566a] rounded-2xl p-6 flex flex-col justify-between hover:bg-[#5a5c70] transition-colors h-[220px] relative overflow-hidden"
  >
    <div className="z-10 text-left">
      <h3 className="text-[22px] font-bold text-[#fffffb] tracking-tight leading-[1.3] mb-2">
        {title}
      </h3>
      <p className="text-[14px] font-medium text-[rgba(255,255,251,0.5)] tracking-tight leading-[1.5] whitespace-pre-line">
        {description}
      </p>
    </div>
    <div className="absolute bottom-2 right-2">{icon}</div>
  </button>
);

// 액션 버튼
interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "default" | "danger";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  variant = "default",
}) => (
  <button
    onClick={onClick}
    className={`px-5 py-2.5 rounded-lg transition-colors ${
      variant === "danger"
        ? "bg-[rgba(255,80,80,0.15)] hover:bg-[rgba(255,80,80,0.25)]"
        : "bg-[#54566a] hover:bg-[#5a5c70]"
    }`}
  >
    <span className="text-[14px] font-semibold text-[#fffffb] tracking-tight leading-[1.6]">
      {label}
    </span>
  </button>
);

// 헤더
const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
  <div className="flex items-center px-6 pt-10 pb-4">
    <button
      onClick={onBack}
      className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
    >
      <ChevronLeft className="text-[#f9f9f9] w-7 h-7" />
    </button>
  </div>
);

// 아이콘들
const ArchiveIcon: React.FC = () => (
  <div className="w-20 h-20 relative">
    <Sticker className="w-28 h-28 absolute right-5 bottom-3" />
  </div>
);

const StatsIcon: React.FC = () => (
  <div className="w-30 h-30 ">
    <Poll className="w-28 h-28 absolute right-5 bottom-3 w-" />
  </div>
);

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");

  const handleBack = () => navigate(-1);

  // ✅ /member/my API 호출
  const fetchUserInfo = async () => {
    try {
      const { data } = await instance.get<{ nickname: string }>("/member/my");
      setNickname(data.nickname);
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="h-full w-full bg-[#3a3b49] text-white flex flex-col">
      {/* 헤더 */}
      <Header onBack={handleBack} />

      {/* 메인 콘텐츠 */}
      <div className="flex-1 px-7 flex flex-col">
        {/* 사용자 인사말 */}
        <div className="mb-10">
          <h1 className="text-[26px] leading-[1.5]">
            <span className="font-extrabold">{nickname || "..."}</span>
            <span className="font-medium"> 님의</span>
          </h1>
          <h2 className="text-[24px] font-semibold leading-[1.3] mt-1">
            마이페이지
          </h2>
        </div>

        {/* 메뉴 카드 */}
        <div className="space-y-5 mb-auto">
          <MenuCard
            title="아카이빙"
            description={"내가 남긴 고민과\n답변들이 모여있어요"}
            icon={<ArchiveIcon />}
            onClick={() => navigate("/mypage/archive")}
          />

          <MenuCard
            title="내 활동 통계"
            description={"내가 받은 반응과\n활동 내역을 볼 수 있어요"}
            icon={<StatsIcon />}
            onClick={() => navigate("/mypage/statics")}
          />
        </div>
      </div>

      {/* 하단 액션 버튼 */}
      <div className="flex justify-center gap-3 pb-10">
        <ActionButton
          label="로그아웃"
          onClick={() => console.log("로그아웃")}
        />
        <ActionButton
          label="회원 탈퇴"
          onClick={() => console.log("탈퇴")}
          variant="danger"
        />
      </div>
    </div>
  );
};

export default MyPage;
