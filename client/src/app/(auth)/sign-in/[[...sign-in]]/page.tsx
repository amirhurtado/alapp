"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { GoogleIcon } from "@/constants";
import { AtSign, LoaderCircle, Lock } from "lucide-react";
import Link from "next/link";
import Separator from "@/components/ui/Separator";
import LogoForm from "@/components/Log/LogoForm";

const SignInPage = () => {
  return (
    <div className="h-screen  flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:justify-between p-4 overflow-y-auto overflow-x-hidden  ">
      <LogoForm />

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
                <div className="max-w-min md:max-w-max cursor-pointer flex items-center gap-5 py-3 md:py-3 px-3 md:px-11 rounded-xl border-1 border-white  hover:bg-white hover:text-black transition-all duration-300 ease-in">
                  <GoogleIcon />
                  <p className="hidden md:block font-semibold text-sm md:text-lg">
                    Inicia sesion con google
                  </p>
                </div>
              </Clerk.Connection>

              <Separator />

              <div className="flex flex-col gap-6  md:gap-7 w-full  md:w-[21rem]">
                <Clerk.Field
                  name="identifier"
                  className="w-full md:w-[21rem] md:p-0 "
                >


                  <div className="relative w-full">
                    <AtSign
                    strokeWidth={1}
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-green "
                  />
                  <Clerk.Input
                    className="border-1 border-border py-2 md:py-3 pl-12 rounded-xl bg-input w-full placeholder:font-poppins placeholder:text-sm "
                    placeholder="Email o nombre de usuario"
                  />

                  </div>
                  
                  <Clerk.FieldError  className="text-red-500 text-xs mt-1" />
                </Clerk.Field>


                <Clerk.Field
                  name="password"
                  className=" w-full md:w-[21rem]  md:p-0 "
                >

                  <div className="relative w-full">
                    <Lock
                    strokeWidth={1}
                    size={20}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-green"
                  />
                  <Clerk.Input
                    className="border-1 border-border py-2 md:py-3 pl-12 rounded-xl bg-input w-full placeholder:font-poppins placeholder:text-sm "
                    placeholder="Contraseña "
                  />

                  </div>
                  
                  <Clerk.FieldError className="text-red-500 text-xs mt-1" />
                </Clerk.Field>
              </div>

              <SignIn.Action
                className=" w-full  cursor-pointer md:w-[21rem] mt-4 rounded-xl   bg-icon-green font-bold py-2  md:py-4  hover:bg-icon-blue transition-all duration-300 ease-in"
                submit
              >
                <Clerk.Loading>
                  {(isLoading) =>
                    isLoading ? (
                      <LoaderCircle className="animate-spin w-full" />
                    ) : (
                      "Inicia sesión"
                    )
                  }
                </Clerk.Loading>
              </SignIn.Action>
            </SignIn.Step>
          </div>
        </SignIn.Root>

        <p className="text-sm">
          ¿Primera vez?{" "}
          <span className="underline text-icon-blue">
            <Link aria-label="ir a crear cuenta" href={"/sign-up"}>Crea una cuenta</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
