"use client";
import Cookies from "js-cookie";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { sendRequest } from "@/utils/fetchApi";
import { listAPi } from "@/utils/ListApi/listAPI";
import { Bounce, toast } from "react-toastify";

export function FormAuthen({
  active = "login",
  setActive,
}: {
  active: "login" | "register" | "";
  setActive: (active: "login" | "register" | "") => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuthen = async (login: boolean) => {
    const data = {
      email,
      password,
    };

    const res = await sendRequest<IBackendRes<any>>({
      url: login ? listAPi.login() : listAPi.register(),
      method: "POST",
      body: { ...data },
      useCredentials: true,
    });

    if (res.statusCode === 200) {
      toast.success("Login Successful !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      Cookies.set("name", res.data.data.email, {
        expires: 30,
        path: "/",
        sameSite: "Lax",
      });
    } else {
      toast.error("Email or Password something wrong !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }

    console.log(res);
  };

  return (
    <div
      className={` max-w-[800px] w-full mx-auto h-[400px] rounded-xl  flex flex-col gap-14 justify-center items-center bg-white transition-all duration-300  relative`}
    >
      <div
        className="absolute top-0 right-0 w-5  h-5 flex justify-center items-center  p-4 rounded-2xl cursor-pointer"
        onClick={() => setActive("")}
      >
        <FontAwesomeIcon icon={faX} className="w-5 h-5 text-black" />
      </div>
      <Tabs defaultValue="login" className="w-[700px] ">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center mx-auto max-w-[200px]">
              <Button className="w-full" onClick={() => handleAuthen(true)}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input id="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-center mx-auto max-w-[200px]">
              <Button className="w-full" onClick={() => handleAuthen(false)}>
                Register
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
