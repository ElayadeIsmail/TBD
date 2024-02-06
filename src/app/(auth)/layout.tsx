import Image from "next/image";
import { PropsWithChildren } from "react";
import loginImage from "@/assets/images/login-img.webp";

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <main className="w-full h-screen grid grid-cols-1 md:grid-cols-2">
      <section className="hidden md:flex relative h-screen bg-white flex-col justify-center gap-4 items-center text-slate-800">
        <figure className="max-w-[80%] relative ">
          <Image src={loginImage} alt="" className="relative z-10" />
        </figure>
        <div className="text-center absolute bottom-10 space-y-2 text-slate-600 font-medium">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam,
            repellat?
          </p>
          <p className="text-sm">
            All rights reserved {new Date().getFullYear()}
          </p>
        </div>
      </section>
      <section className="h-screen">{children}</section>
    </main>
  );
}
