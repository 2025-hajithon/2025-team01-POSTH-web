// import React from "react";

// // 타입 정의
// interface MenuCardProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   onClick?: () => void;
// }

// interface ActionButtonProps {
//   label: string;
//   onClick?: () => void;
//   variant?: "default" | "danger";
// }

// // 메뉴 카드 컴포넌트
// const MenuCard: React.FC<MenuCardProps> = ({
//   title,
//   description,
//   icon,
//   onClick,
// }) => (
//   <button
//     onClick={onClick}
//     className="w-full bg-[#54566a] p-5 rounded-lg flex items-start justify-between hover:bg-[#5a5c70] transition-colors"
//   >
//     <div className="flex flex-col items-start text-left">
//       <h3 className="text-[18px] font-bold text-[#fffffb] tracking-[-0.18px] leading-[1.4] mb-1.5">
//         {title}
//       </h3>
//       <p className="text-[12px] font-medium text-[rgba(255,255,251,0.4)] tracking-[-0.12px] leading-[1.4] whitespace-pre-line">
//         {description}
//       </p>
//     </div>
//     <div className="flex-shrink-0 ml-4 text-[#8DC5FF]">{icon}</div>
//   </button>
// );

// // 액션 버튼 컴포넌트
// const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => (
//   <button
//     onClick={onClick}
//     className="bg-[#54566a] px-4 py-2 rounded hover:bg-[#5a5c70] transition-colors"
//   >
//     <span className="text-[13px] font-medium text-[#fffffb] tracking-[-0.13px] leading-[1.7]">
//       {label}
//     </span>
//   </button>
// );

// // 헤더 컴포넌트
// const Header: React.FC<{ onBack?: () => void }> = ({ onBack }) => (
//   <div className="flex items-center px-5 py-2.5 mt-14">
//     <button
//       onClick={onBack}
//       className="p-1 hover:bg-white/10 rounded-full transition-colors"
//     >
//       {/* <ChevronLeft size={28} className="text-[#f9f9f9]" /> */}
//     </button>
//   </div>
// );

// // 메인 마이페이지 컴포넌트
// const MyPage: React.FC = () => {
//   const handleArchive = () => {
//     console.log("아카이빙 페이지로 이동");
//     // 여기에 네비게이션 로직 추가
//   };

//   const handleStats = () => {
//     console.log("활동 통계 페이지로 이동");
//     // 여기에 네비게이션 로직 추가
//   };

//   const handleLogout = () => {
//     if (window.confirm("로그아웃 하시겠습니까?")) {
//       console.log("로그아웃 처리");
//       // 여기에 로그아웃 로직 추가
//     }
//   };

//   const handleDeleteAccount = () => {
//     if (window.confirm("정말로 회원 탈퇴하시겠습니까?")) {
//       console.log("회원 탈퇴 처리");
//       // 여기에 회원 탈퇴 로직 추가
//     }
//   };

//   const handleBack = () => {
//     console.log("뒤로가기");
//     // 여기에 뒤로가기 로직 추가
//   };

//   return (
//     <div className="h-full w-full bg-[#3a3b49] text-white flex flex-col">
//       {/* 헤더 */}
//       <Header onBack={handleBack} />

//       {/* 메인 콘텐츠 */}
//       <div className="flex-1 px-7">
//         {/* 사용자 인사말 */}
//         <div className="mb-12">
//           <h1 className="text-[24px] leading-[1.7]">
//             <span className="font-extrabold">김지톤</span>
//             <span className="font-semibold tracking-[-0.23px]"> 님의</span>
//           </h1>
//           <h2 className="text-[23px] font-semibold tracking-[-0.23px] leading-[1.4]">
//             마이페이지
//           </h2>
//         </div>

//         {/* 메뉴 카드들 */}
//         <div className="space-y-4 mb-auto">
//           <MenuCard
//             title="아카이빙"
//             description="나의 질문과 고민을\n모아볼 수 있어요"
//             // icon={<Archive size={40} />}
//             onClick={handleArchive}
//           />

//           <MenuCard
//             title="내 활동 통계"
//             description="활동 내역을 볼 수 있어요"
//             // icon={<BarChart3 size={40} />}
//             onClick={handleStats}
//           />
//         </div>
//       </div>

//       {/* 하단 액션 버튼들 */}
//       <div className="flex justify-center gap-2 pb-8">
//         <ActionButton label="로그아웃" onClick={handleLogout} />
//         <ActionButton
//           label="회원 탈퇴"
//           onClick={handleDeleteAccount}
//           variant="danger"
//         />
//       </div>
//     </div>
//   );
// };

// export default MyPage;
