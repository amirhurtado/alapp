"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignUp from "@clerk/elements/sign-up";
import { GoogleIcon } from "@/constants";
import { Mail, User, Lock, LoaderCircle } from "lucide-react";
import Link from "next/link";
import SeparatorForm from "@/components/Form/SeparatorForm";
import LogoForm from "@/components/Form/LogoForm";

const SignUpPage = () => {
  return (
    <div className="h-screen  flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:justify-between p-4 overflow-y-auto overflow-x-hidden  ">
      <LogoForm />

      <div className="w-full flex flex-col gap-8 md:gap-13 justify-center items-center md:items-start">
        <SignUp.Root>
          <div className="flex flex-col gap-5 w-full  ">
            <SignUp.Step
              name="start"
              className="flex flex-col gap-5 items-center md:items-start"
            >
              <Clerk.Connection
                name="google"
                className="w-full flex items-center justify-center md:justify-start"
              >
                <div className="w-full md:max-w-max cursor-pointer flex items-center justify-center gap-5 py-3 md:py-3 px-3 md:px-13 rounded-xl border-1 border-white  hover:bg-white hover:text-black transition-all duration-300 ease-in">
                  <GoogleIcon />
                  <p className="font-semibold text-sm md:text-lg">
                    Registrate con google
                  </p>
                </div>
              </Clerk.Connection>

              <SeparatorForm />

              <div className="flex flex-col gap-6  md:gap-7 w-full  md:w-[21rem]">
                <Clerk.Field
                  name="emailAddress"
                  className="w-full md:w-[21rem] md:p-0 "
                >
                  <div className="relative w-full">
                    <Mail
                      strokeWidth={1}
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-green "
                    />
                    <Clerk.Input
                      className="border-1 border-border py-2 md:py-3 pl-12 rounded-xl bg-input w-full placeholder:font-poppins placeholder:text-sm "
                      placeholder="Email "
                    />
                  </div>

                  <Clerk.FieldError className="text-red-500 text-xs mt-1" />
                </Clerk.Field>

                <Clerk.Field
                  name="username"
                  className=" w-full md:w-[21rem] md:p-0 "
                >
                  <div className="relative w-full">
                    <User
                      strokeWidth={1}
                      size={20}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-icon-green "
                    />
                    <Clerk.Input
                      className="border-1 border-border py-2 md:py-3 pl-12 rounded-xl bg-input w-full placeholder:font-poppins placeholder:text-sm "
                      placeholder="Nombre de usuario "
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
                  <Clerk.FieldError  className="text-red-500 text-xs mt-1" />
                </Clerk.Field>
              </div>

              <SignUp.Captcha />

              <SignUp.Action
                className="  cursor-pointer  w-full md:w-[21rem] mt-4 rounded-xl    bg-icon-blue font-bold py-2  md:py-4  hover:bg-icon-green transition-all duration-300 ease-in"
                submit
              >
                <Clerk.Loading>
                  {(isLoading) =>
                    isLoading ? (
                      <LoaderCircle className="animate-spin w-full" />
                    ) : (
                      "Regístrate"
                    )
                  }
                </Clerk.Loading>
              </SignUp.Action>
            </SignUp.Step>
          </div>
        </SignUp.Root>

        <p className="text-sm">
          ¿Ya tienes cuenta?{" "}
          <span className="underline text-icon-blue">
            <Link aria-label="ir a iniciar sesion" href={"/sign-in"}>Inicia sesión</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
