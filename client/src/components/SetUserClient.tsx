"use client";
import { User as UserType } from "@/generated/prisma";
import { useUser } from "@/store/useUser";
import { useEffect } from "react";

const SetUserClient = ({ dbUser }: { dbUser: UserType | null }) => {
  const { setCurrentUser } = useUser();

  useEffect(() => {
    if (dbUser) {
      setCurrentUser(dbUser);
    } else {
      setCurrentUser(null);
    }
  }, [dbUser, setCurrentUser]);
  return <></>;
};

export default SetUserClient;
