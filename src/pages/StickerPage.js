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
    <div className="flex gap-2 justify-center">
      <div className="w-1/4 border p-4 h-fit">
        <p className="font-bold text-center mb-5">KOD</p>
        <CreateStickerCodeForm />
      </div>
      <div className="border p-4 w-full">
        <p className="font-bold text-center mb-[3.2rem]">STİKER MƏLUMATLARI</p>

        <div className="p-3 mb-6 border dark:text-slate-200 bg-white border-slate-200 rounded-lg min-w-[10rem] w-fit h-7 flex justify-center items-center">
          <Spin spinning={loading}>
            <span className="font-bold">{createdCode}</span>
          </Spin>
        </div>
        <Spin size="default" spinning={loading}>
          <StickerForm />
        </Spin>
      </div>
    </div>
  );
}

export default memo(StickerPage);
