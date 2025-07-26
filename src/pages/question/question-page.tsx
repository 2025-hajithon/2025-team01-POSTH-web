<<<<<<< HEAD
import { useState } from "react";
import icons from "@/components/common/icons/icons";
import colorIcons from "@/components/common/icons/color-icons";
=======
import { useEffect, useState } from "react";
>>>>>>> origin/main
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import { categories } from "@/types/question";

const QuestionPage = () => {
<<<<<<< HEAD
  const [category, setCategory] = useState("");
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const QuestionType = [
    {
      id: 1,
      name: "공부",
      icon: icons.Pencil,
      colorIcon: colorIcons.Pencil,
    },
    {
      id: 2,
      name: "취업",
      icon: icons.Picture,
      colorIcon: colorIcons.Picture,
    },
    {
      id: 3,
      name: "직장",
      icon: icons.Briefcase,
      colorIcon: colorIcons.Briefcase,
    },
    {
      id: 4,
      name: "진로",
      icon: icons.Watch,
      colorIcon: colorIcons.Watch,
    },
    {
      id: 5,
      name: "연애",
      icon: icons.Heart,
      colorIcon: colorIcons.Heart,
    },
    {
      id: 6,
      name: "결혼",
      icon: icons.Hearts,
      colorIcon: colorIcons.Hearts,
    },
    {
      id: 7,
      name: "가족",
      icon: icons.House,
      colorIcon: colorIcons.House,
    },
    {
      id: 8,
      name: "인간관계",
      icon: icons.Users,
      colorIcon: colorIcons.Users,
    },
    {
      id: 9,
      name: "자기자신",
      icon: icons.Profile,
      colorIcon: colorIcons.Profile,
    },
    {
      id: 10,
      name: "기타",
      icon: icons.More,
      colorIcon: colorIcons.More,
    },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
=======
  const [category, setCategory] = useState<number>(-1);
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log(category);
    console.log(value);
  }, [category, value]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
>>>>>>> origin/main
    e.preventDefault();
    try {
      const response = await axios.post("/question", {
        category: categories[category - 1].encodedName,
        content: value,
      });
      console.log(response);
      navigate("/question/submit");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full bg-gray-50 flex flex-col items-center font-suit p-5 justify-between overflow-hidden flex-1"
    >
      <div className="w-full flex flex-col items-center justify-center gap-5">
        {/* 고민 박스 */}
        <div className="grid grid-cols-5 gap-y-4 gap-x-2 place-items-center bg-white p-4 rounded-lg w-full">
<<<<<<< HEAD
          {QuestionType.map((item) => (
            <div
              onClick={() => setCategory(item.name)}
              key={item.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              {category === item.name ? (
=======
          {categories.map((item) => (
            <div
              onClick={() => setCategory(item.id)}
              key={item.id}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              {category === item.id ? (
>>>>>>> origin/main
                <item.colorIcon className={`w-10 h-10`} />
              ) : (
                <item.icon
                  className={`w-10 h-10 ${
<<<<<<< HEAD
                    category === item.name ? "text-main-100" : "text-gray-500"
=======
                    category === item.id ? "text-main-100" : "text-gray-500"
>>>>>>> origin/main
                  }`}
                />
              )}
              <span
                className={`text-sm ${
<<<<<<< HEAD
                  category === item.name
=======
                  category === item.id
>>>>>>> origin/main
                    ? "text-black-500 text-xs font-bold"
                    : "text-gray-500 text-xs font-medium"
                }`}
              >
                {item.name}
              </span>
            </div>
          ))}
        </div>
        <div className="bg-[#FFFEFB] rounded-lg p-[20px] w-full">
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
              onChange={(e) => setValue(e.target.value)}
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
<<<<<<< HEAD
        disabled={category.length === 0}
=======
        disabled={category === -1 || value.length === 0}
>>>>>>> origin/main
      >
        고민 편지 보내기
      </button>
    </form>
  );
};

export default QuestionPage;
