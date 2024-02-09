import { Spin } from "antd";
import { memo } from "react";
import CreateStickerCodeForm from "../components/form/sticker/CreateStickerCodeForm";
import StickerForm from "../components/form/sticker/StickerForm";
import { useGlobal } from "../context/GlobalContext";
import { useSticker } from "../context/StickerContext";

function StickerPage() {
  const { loading } = useGlobal();
  const { createdCode } = useSticker();

  return (
    <>
      <CreateStickerCodeForm />
      <div className="p-3 mb-6 border dark:text-slate-200 bg-white border-slate-200 dark:border-slate-600 dark:bg-gray-800 rounded-lg mx-auto w-[25rem] h-10 flex justify-center items-center">
        <Spin spinning={loading}>
          <span className="font-bold">{createdCode}</span>
        </Spin>
      </div>
      <Spin size="large" spinning={loading}>
        <StickerForm />
      </Spin>
    </>
  );
}

export default memo(StickerPage);
