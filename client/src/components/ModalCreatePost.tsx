import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Share from "@/components/Share";

const ModalCreatePost = () => {
  return (
    <Dialog >
      <DialogTrigger>
        <DialogTitle />
        <div className="bg-icon-green cursor-pointer text-black text-center rounded-full w-[2.3rem] h-[2.3rem] xxl:w-full  xxl:h-auto flex items-center justify-center xxl:justify-start gap-4 xxl:px-3 xxl:py-2 xxl:rounded-xl">
          <Plus size={19} />
          <p className="hidden xxl:block ">Publicar</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <Share modal={true}/>
      </DialogContent>
    </Dialog>
  );
};

export default ModalCreatePost;
