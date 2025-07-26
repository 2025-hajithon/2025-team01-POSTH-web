const ResponseModal = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  return (
    <div
      className="w-full h-full bg-black-500 bg-opacity-50 fixed top-0 left-0 z-50 flex items-center justify-center"
      onClick={() => setIsModalOpen(false)}
    >
      <div className="w-72 px-5 py-6 bg-black-400 rounded-md inline-flex flex-col">
        <div className="text-center justify-center text-white-100 text-s font-semibold ">
          최소 100자를 채워주세요
          <br />
          타인을 향한 비방과 욕설이 담긴
          <br />
          답변은 삭제처리 됩니다
        </div>
      </div>
    </div>
  );
};

export default ResponseModal;
