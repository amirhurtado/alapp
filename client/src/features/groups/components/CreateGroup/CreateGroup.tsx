"use client"
import { useRef, useState } from "react";
import BasicInfoGroup from "./BasicInfo";
import ImageGroup from "./ImageGroup";
import { SubmitButton } from "@/components/ui/SubmitButton";
import CancelButton from "@/components/ui/CancelButton";
import { createGroupAction } from "@/actions/group/createGroup";
import { useRouter } from "next/navigation";


interface CreateGroupProps {
    currentUserId: string
}


const CreateGroup = ({currentUserId} : CreateGroupProps ) => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<null | File>(null)
  const mediaRef = useRef<HTMLInputElement | null>(null)

  const router = useRouter();

  return (
    <form className="flex flex-col gap-6 w-full"  action={async (formData) => {
      await createGroupAction(formData)
      router.back()
    }}>
      <p className="text-xs text-primary-color  ">
        Aqui podras crear un grupo y organizar eventos
      </p>

      <input className="hidden" value={currentUserId} name="currentUserId"  readOnly/>
      <BasicInfoGroup name={name} setName={setName} description={description} setDescription={setDescription} />
      <ImageGroup media={media} setMedia={setMedia} mediaRef={mediaRef}/>
      <div className="flex w-full md:w-[22rem] justify-end gap-3">
      <CancelButton />
      <SubmitButton disabled={name === "" || description === "" || !media  } text="Crear" />
      </div>
    </form>
  );
};

export default CreateGroup;
