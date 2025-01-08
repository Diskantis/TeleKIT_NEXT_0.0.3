import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="w-full h-full">
      <Spin fullscreen />
    </div>
  );
};

export default Loading;
