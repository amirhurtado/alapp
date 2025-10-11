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
import { useQueryClient } from "@tanstack/react-query";

interface FormEditProfileProps {
  infoUser: FullUserType;
}

const FormEditProfile = ({ infoUser }: FormEditProfileProps) => {
  const [media, setMedia] = useState<null | File>(null);
  const [newDisplayName, setNewDisplayName] = useState(infoUser.displayName);
  const [newBio, setNewBio] = useState(infoUser.profile?.bio ?? "");
  const [selectedCountry, setSelectedCountry] = useState(
    infoUser.profile?.location ?? ""
  );
  const [selectedBg, setSelectedBg] = useState(infoUser.profile?.bg ?? "");

  const inputImageRef = useRef<null | HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();
  const queryKey = ["postsFeed", infoUser.id, { placement: "profile" }];


  const originalBio = infoUser.profile?.bio ?? "";
  const originalLocation = infoUser.profile?.location ?? "";
  const originalBg = infoUser.profile?.bg ?? "";
  const defaultBg = "blue-purple"; 

  const displayNameIsUnchanged =
    newDisplayName === infoUser.displayName || newDisplayName.trim() === "";
  const bioIsUnchanged = newBio === originalBio;
  const locationIsUnchanged = selectedCountry === originalLocation;
  const imageIsUnchanged = !media;

  const bgIsUnchanged =
    selectedBg === originalBg || (originalBg === "" && selectedBg === defaultBg);

  const disabledSubmit =
    displayNameIsUnchanged &&
    bioIsUnchanged &&
    locationIsUnchanged &&
    imageIsUnchanged &&
    bgIsUnchanged;


  return (
    <form
      className="flex flex-col p-4 gap-8 max-h-[100dvh] overflow-y-auto "
      action={async (formData) => {
        await updateInfoUserAction(formData, infoUser.id);
        queryClient.invalidateQueries({ queryKey });
        router.push(`/${infoUser.name}`);
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

      <EditBasicInfoUser
        newBio={newBio}
        setNewBio={setNewBio}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedBg={selectedBg}
        setSelectedBg={setSelectedBg}
      />

      <div className="flex w-full md:w-[22rem] justify-end gap-3">
        <CancelButton />
        <SubmitButton disabled={disabledSubmit} text="Guardar" />
      </div>
    </form>
  );
};

export default FormEditProfile;