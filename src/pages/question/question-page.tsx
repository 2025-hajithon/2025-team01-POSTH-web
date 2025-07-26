import { useState } from "react";
import icons from "@/components/common/icons/icons";
import { useNavigate } from "react-router-dom";

const QuestionPage = () => {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const QuestionType = [
    {
      id: 1,
      name: "공부",
      icon: icons.File,
    },
    {
      id: 2,
      name: "취업",
      icon: icons.File,
    },
    {
      id: 3,
      name: "직장",
      icon: icons.Bag,
    },
    {
      id: 4,
      name: "진로",
      icon: icons.Bag,
    },
    {
      id: 5,
      name: "연애",
      icon: icons.Heart,
    },
    {
      id: 6,
      name: "결혼",
      icon: icons.Heart,
    },
    {
      id: 7,
      name: "가족",
      icon: icons.Heart,
    },
    {
      id: 8,
      name: "인간관계",
      icon: icons.Human,
    },
    {
      id: 9,
      name: "자기자신",
      icon: icons.Human,
    },
    {
      id: 10,
      name: "기타",
      icon: icons.Human,
    },
  ];

  const handleValue = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/question/submit");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full bg-gray-50 flex flex-col items-center font-suit p-5 justify-between overflow-hidden"
    >
      <div>
        {/* 고민 박스 */}
        <div className="grid grid-cols-5 gap-y-4 gap-x-2 place-items-center bg-white p-4 rounded-lg">
          {QuestionType.map((item) => (
            <div
              onClick={() => setValue(item.name)}
              key={item.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              <item.icon
                className={`w-10 h-10 ${
                  value === item.name ? "text-main-100" : "text-gray-500"
                }`}
              />
              <span
                className={`text-sm ${
                  value === item.name
                    ? "text-black-500 text-xs font-bold"
                    : "text-gray-500 text-xs font-medium"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-[#FFFEFB] rounded-lg p-[20px]">
          {/* 노트 타이틀 */}
          <div className="text-black-500 text-sm font-semibold mb-4">
            지금 나의 고민은 무엇인가요?{" "}
            <span className="font-medium">(200자 미만)</span>
          </div>

          {/* 노트 느낌 textarea */}
          <div className="relative">
            <textarea
              rows={9}
              maxLength={200}
              className="font-medium w-full resize-none bg-transparent text-sm text-black-500 outline-none leading-9 tracking-wide z-10 relative "
              placeholder=""
              onChange={handleValue}
              value={value}
            />
            {/* 밑줄 배경 */}
            <div className="absolute inset-0 pointer-events-none flex flex-col justify-between z-0">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="w-full border-b border-blue-200 py-4" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 전송 버튼 */}
      <button
        className=" w-full py-3 bg-main-100 rounded-lg text-sm font-semibold disabled:bg-gray-200 text-black-500 disabled:text-white-100"
        disabled={value.length === 0}
      >
        고민 편지 보내기
      </button>
    </form>
  );
};

export default QuestionPage;
