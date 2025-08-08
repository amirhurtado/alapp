"use client";

import { User as UserType } from "@/generated/prisma";
import EditImageProfile from "./EditImageProfile";
import EditInfoUser from "./EditInfoUser";
import { updateInfoUserAction } from "@/actions/user";
import {  useState } from "react";
import EditBasicInfoUser from "./EditBasicInfoUser";
import { InfoProfile } from "@/types";

interface FormEditProfileProps {
  userCurrent: UserType 
  infoProfile: InfoProfile | null
}

const FormEditProfile = ({ userCurrent, infoProfile  }: FormEditProfileProps) => {
  const [media, setMedia] = useState<null | File>(null);
  const [newDisplayName, setNewDisplayName] = useState(
    userCurrent.displayName
  );
  const [newBio, setNewBio] = useState(infoProfile?.bio ?? "")

  const disabledSubmit = 
    (newDisplayName === userCurrent.displayName || newDisplayName.trim() === "") && (newBio === (infoProfile?.bio ?? "")) && !media;

  return (
    <form
      className="flex flex-col p-4 gap-8 "
      action={async (formData) => {
        await updateInfoUserAction(formData, userCurrent.id);
      }}
    >
      <EditImageProfile
        imageUrl={userCurrent.imageUrl}
        media={media}
        setMedia={setMedia}
      />

      <EditInfoUser
        basicInfoUserCurrent={{
          name: userCurrent.name,
          displayName: userCurrent.displayName,
          email: userCurrent.email,
        }}
        newDisplayName={newDisplayName}
        setNewDisplayName={setNewDisplayName}
      />

      <EditBasicInfoUser newBio={newBio} setNewBio={setNewBio} />

      <button type="submit" disabled={disabledSubmit} className={`mt-5 cursor-pointer text-start bg-icon-green py-1 px-3 max-w-max rounded-lg ${disabledSubmit && 'opacity-50'}`}>
        <p className="text-black">Guardar</p>
      </button>
    </form>
  );
};

export default FormEditProfile;
