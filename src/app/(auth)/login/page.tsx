import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="my-8 text-center">
        <h1 className="text-6xl font-black">Horizon</h1>
        <p className="">Welcome back!</p>
      </div>
      <form action="">
        <div className="">
          <Label htmlFor="email">Email</Label>
          <Input name="email" type="email" id="email" />
        </div>
        <div className="my-4">
          <Label htmlFor="password">Password</Label>
          <Input name="password" type="password" id="password" />
        </div>
        <Button className="w-full mt-4 mb-8">Log in</Button>
        <p className="">
          Don&#39;t have an account?{" "}
          <span className="text-blue-500">Create an account</span>
        </p>
      </form>
    </div>
  );
}
