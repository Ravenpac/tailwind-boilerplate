import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Loading = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center text-inherit">
      <AiOutlineLoading3Quarters className="animate-spin text-inherit" />
    </div>
  );
};

export default Loading;
