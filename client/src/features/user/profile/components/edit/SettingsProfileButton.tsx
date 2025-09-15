import { Settings } from "lucide-react";
import Link from "next/link";
import React from "react";


const SettingsProfileButton = () => {
  return (
    <Link href={"/settings"} >
      <Settings size={24} className="text-text-gray hover:text-white transition-colors ease-in duration-200" />
    </Link>
  );
};

export default SettingsProfileButton;
