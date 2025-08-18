"use client";

import EditImageProfile from "./EditImageProfile";
import EditInfoUser from "./EditInfoUser";
import { updateInfoUserAction } from "@/actions/user/uploadInfo";
import { useRef, useState } from "react";
import EditBasicInfoUser from "./EditBasicInfoUser";
import { FullUserType } from "@/types";
import { SubmitButton } from "@/components/ui/SubmitButton";
import CancelButton from "@/components/ui/CancelButton";
import { useRouter } from "next/navigation";
interface FormEditProfileProps {
  infoUser: FullUserType;
  
}

const FormEditProfile = ({infoUser
}: FormEditProfileProps) => {
  const [media, setMedia] = useState<null | File>(null);
  const [newDisplayName, setNewDisplayName] = useState(infoUser.displayName);
  const [newBio, setNewBio] = useState(infoUser.profile?.bio ?? "");
  const inputImageRef = useRef<null | HTMLInputElement>(null);

  const router = useRouter()

  const disabledSubmit =
    (newDisplayName === infoUser.displayName ||
      newDisplayName.trim() === "") &&
    newBio === (infoUser.profile?.bio ?? "") &&
    !media;

  return (
    <form
      className="flex flex-col p-4 gap-8 max-h-screen overflow-y-auto "
      action={async (formData) => {
        await updateInfoUserAction(formData, infoUser.id);
        router.back()

      }}
    >

      <EditImageProfile
        imageUrl={infoUser.imageUrl}
        media={media}
        setMedia={setMedia}
        inputImageRef={inputImageRef}
      />

      <EditInfoUser
        basicInfoUserCurrent={{
          name: infoUser.name,
          displayName: infoUser.displayName,
          email: infoUser.email,
        }}
        newDisplayName={newDisplayName}
        setNewDisplayName={setNewDisplayName}
      />

      <EditBasicInfoUser newBio={newBio} setNewBio={setNewBio} />

      <div className="flex w-full md:w-[22rem] justify-end gap-3">
        <CancelButton />
        <SubmitButton disabled={disabledSubmit} text="Guardar" />
      </div>
    </form>
  );
};

export default FormEditProfile;
