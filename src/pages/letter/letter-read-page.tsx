import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Arrow from "@/assets/icons/chevron-up.svg?react";
import { useNavigate } from "react-router-dom";
import axios from "@/lib/axios";
import type { List } from "@/types/question";

interface Reply {
  replyId: number;
  questionContent: string;
  questionerNickname: string;
  questionAt: string;
  replyContent: string;
  replierNickname: string;
  replyAt: string;
  reactionType: string;
  goodTypes: string;
  thankMessage: string;
}

const LetterReadPage = () => {
  const [isOpen, setIsOpen] = useState(true);
  // localStorage에서 가져온 값을 JSON 파싱하여 초기값으로 사용, 없으면 null로 처리
  const [replyInfo] = useState<List | null>(() => {
    const stored = localStorage.getItem("replyInfo");
    return stored ? JSON.parse(stored) : null;
  });
  const [reply, setReply] = useState<Reply | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReply = async () => {
      try {
        const response = await axios.get(`/reply/${replyInfo?.replyId}`);
        console.log(response.data);
        setReply(response.data);
        localStorage.setItem("letterInfo", JSON.stringify(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchReply();
  }, []);

  return (
    <div className="w-full h-screen bg-[#54566A] flex flex-col items-center justify-between font-suit px-6 py-10">
      {/* 고민 카드 */}
      <div className="w-full flex flex-col items-center justify-center gap-8">
        <div className="w-full px-5 pt-6 pb-3 bg-black-500 rounded-md flex flex-col gap-3 text-white-100">
          {/* 제목 */}
          <div className="text-stone-300 text-sm font-semibold">
            내가 보낸 고민
          </div>

          {/* 내용 (애니메이션 포함) */}
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden text-sm font-medium leading-snug whitespace-pre-line"
              >
                {reply?.questionContent}
              </motion.div>
            )}
          </AnimatePresence>

          {/* 날짜 */}
          <div className="w-full text-right text-stone-300 text-sm font-semibold leading-3">
            {reply?.questionAt
              ? `${new Date(reply.questionAt).getFullYear()}년 ${
                  new Date(reply.questionAt).getMonth() + 1
                }월 ${new Date(reply.questionAt).getDate()}일 ${new Date(
                  reply.questionAt
                ).getHours()}시 ${new Date(reply.questionAt).getMinutes()}분`
              : ""}
          </div>

          {/* 화살표 버튼 */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-6 h-6 mx-auto flex items-center justify-center transition-transform bg-transparent outline-none border-none ring-0 focus:outline-none focus:ring-0"
          >
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-10 h-10"
            >
              <Arrow className="w-10 h-10 rotate-180" />
            </motion.div>
          </button>
        </div>

        {/* 답장 카드 */}
        <div className="w-full px-5 pt-6 pb-5 bg-white-100 rounded-md flex flex-col gap-4 font-suit">
          <div className="text-stone-400 text-sm font-semibold">
            나에게 도착한 편지
          </div>
          <div className="text-gray-main text-sm font-medium leading-snug whitespace-pre-line">
            {reply?.replyContent}
          </div>
          <div className="text-right text-stone-400 text-sm font-semibold leading-5">
            <div>
              {reply?.replyAt
                ? `${new Date(reply.replyAt).getFullYear()}년 ${
                    new Date(reply.replyAt).getMonth() + 1
                  }월 ${new Date(reply.replyAt).getDate()}일 ${new Date(
                    reply.replyAt
                  ).getHours()}시 ${new Date(reply.replyAt).getMinutes()}분`
                : ""}
            </div>
            <div>from. {reply?.replierNickname}</div>
          </div>
        </div>
      </div>

      <button
        onClick={() => navigate("/letter/response")}
        className="w-1/2 py-3 bg-white-100 text-black-500 rounded-lg hover:bg-main-400 transition-colors"
      >
        반응 남기기
      </button>
    </div>
  );
};

export default LetterReadPage;
