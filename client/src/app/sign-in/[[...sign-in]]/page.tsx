"use client";

import Image from "next/image";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { GoogleIcon } from "@/constants";
import { AtSign, Lock } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="h-screen  flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:justify-between p-4 overflow-y-auto overflow-x-hidden  ">
      <div className="w-full flex justify-center">
        <div className="flex justify-center items-center relative  w-[4rem] h-[4rem] md:w-[20rem] md:h-[20rem]">
          <Image src="/logo.svg" alt="Logo" fill className="" />
        </div>
      </div>

      <div className="w-full flex flex-col gap-8 md:gap-13 justify-center items-center md:items-start">
        <div className="flex flex-col gap-3 md:gap-5 items-center md:items-start ">
          <p className="font-poppins text-md md:text-3xl font-bold">
            Desarrollado por Amir Hurtado.
          </p>
          <p className="text-sm md:text-xl font-semibold">
            Únete a la experiencia{" "}
            <span className="text-icon-green font-bold ">ALAPP.</span>
          </p>
        </div>

        <SignIn.Root>
          <div className="flex flex-col gap-5 w-full ">
            <SignIn.Step
              name="start"
              className="flex flex-col gap-5 items-center md:items-start"
            >
              <Clerk.Connection
                name="google"
                className="md:w-full flex items-center justify-center md:justify-start"
              >
                <div className="max-w-min overflow-hidden md:max-w-max cursor-pointer flex items-center gap-5 py-3 md:py-3 px-3 md:px-11 rounded-xl border-1 border-white  hover:bg-white hover:text-black transition-all duration-300 ease-in">
                  <GoogleIcon />
                  <p className="hidden md:block font-semibold text-sm md:text-lg">
                    Inicia sesion con google
                  </p>
                </div>
              </Clerk.Connection>

              <div className="flex items-center gap-4">
                <div className="border-1 border-border w-[9.1rem]"></div>
                <p className="text-xs md:text-md">O</p>
                <div className="border-1 border-border w-[9.1rem]"></div>
              </div>

              <div className="flex flex-col gap-6  md:gap-7 w-full  md:w-[21rem]">
                <Clerk.Field
                  name="identifier"
                  className="relative w-full md:w-[21rem] md:p-0 "
                >
                  <AtSign
                    strokeWidth={1}
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-green "
                  />
                  <Clerk.Input
                    className="border-1 border-border py-2 md:py-3 pl-12 rounded-xl bg-input w-full placeholder:font-poppins placeholder:text-sm "
                    placeholder="Email "
                  />
                  <Clerk.FieldError />
                </Clerk.Field>

                <div>
                  <Clerk.Field
                    name="password"
                    className="relative w-full md:w-[21rem]  md:p-0 "
                  >
                    <Lock
                      strokeWidth={1}
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-green"
                    />
                    <Clerk.Input
                      className="border-1 border-border py-2 md:py-3 pl-12 rounded-xl bg-input w-full placeholder:font-poppins placeholder:text-sm "
                      placeholder="Contraseña "
                    />
                    <Clerk.FieldError />
                  </Clerk.Field>
                </div>
              </div>

              <div className=" w-full md:w-[21rem] mt-4 rounded-xl   bg-icon-green font-bold py-2  md:py-4  hover:bg-icon-blue transition-all duration-300 ease-in">
              <SignIn.Action className=" w-full  cursor-pointer" submit>Iniciar sesión</SignIn.Action>

              </div>
            </SignIn.Step>
          </div>
        </SignIn.Root>

       
        <p className="text-sm">¿Primera vez? <span className="underline text-icon-blue"><Link href={'/sign-up'}>Crea una cuenta</Link></span></p>
      </div>
    </div>
  );
};

export default SignInPage;
