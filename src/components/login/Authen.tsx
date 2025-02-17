"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { FormAuthen } from "./FormAuthen";

import Cookies from "js-cookie";

const Authen = () => {
  const [active, setActive] = useState<"login" | "register" | "">("");

  const [name, setName] = useState<string | undefined>(undefined);

  useEffect(() => {
    const getName = Cookies.get("name");
    setName(getName);
  }, []);

  return (
    <div>
      {name === undefined ? (
        <div className="flex justify-between gap-5 items-center">
          <Button
            className="px-4 py-2 rounded-full  border-[1px] border-[#353C4A] bg-slate-2"
            onClick={() => setActive("login")}
          >
            Login
          </Button>
          <Button
            className="px-5 py-2 rounded-full bg-secondary "
            onClick={() => setActive("register")}
          >
            Register Now
          </Button>
        </div>
      ) : (
        <p>{name}</p>
      )}

      <div
        className={`fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-[60] select-none
         transition-all duration-300
        ${active === "" ? " opacity-0 pointer-events-none" : " opacity-100 "}
        `}
      >
        <FormAuthen active={active} setActive={setActive}></FormAuthen>
      </div>
    </div>
  );
};

export default Authen;
