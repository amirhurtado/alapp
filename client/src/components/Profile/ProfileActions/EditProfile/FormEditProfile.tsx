"use client";

import { User as UserType } from "@/generated/prisma";
import EditImageProfile from "./EditImageProfile";
import EditInfoUser from "./EditInfoUser";
import { updateInfoUserAction } from "@/actions/user";
import { useEffect, useState } from "react";

interface FormEditProfile {
  userCurrentLog: UserType;
}

const FormEditProfile = ({ userCurrentLog }: FormEditProfile) => {
  const [media, setMedia] = useState<null | File>(null);
  const [newDisplayName, setNewDisplayName] = useState(
    userCurrentLog.displayName
  );
  const [disabledSubmit, setDisabledSubmit] = useState(false);

  useEffect(() => {
    if (
      (newDisplayName === userCurrentLog.displayName ||
        newDisplayName === "") &&
      !media
    ) {
      setDisabledSubmit(true);
    } else {
      setDisabledSubmit(false);
    }
  }, [newDisplayName, media, userCurrentLog.displayName]);

  return (
    <form
      className="flex flex-col p-4 gap-8 "
      action={async (formData) => {
        await updateInfoUserAction(formData);
      }}
    >
      <EditImageProfile
        imageUrl={userCurrentLog.imageUrl}
        media={media}
        setMedia={setMedia}
      />

      <EditInfoUser
        basicInfoUserCurrent={{
          name: userCurrentLog.name,
          displayName: userCurrentLog.displayName,
          email: userCurrentLog.email,
        }}
        newDisplayName={newDisplayName}
        setNewDisplayName={setNewDisplayName}
      />
      <button type="submit" disabled={disabledSubmit} className={`mt-5 cursor-pointer text-start bg-icon-green py-1 px-3 max-w-max rounded-lg ${disabledSubmit && 'opacity-50'}`}>
        <p className="text-black">Guardar</p>
      </button>
    </form>
  );
};

export default FormEditProfile;
