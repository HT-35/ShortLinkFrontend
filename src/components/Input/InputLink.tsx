"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import LinkHandler from "../LinkHandler/LinkHandler";
import { sendRequest } from "@/utils/fetchApi";
import { listAPi } from "@/utils/ListApi/listAPI";

import { motion } from "framer-motion";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AnimationText from "../title/AnimationText";
import { Bounce, toast } from "react-toastify";

import Cookies from "js-cookie";

interface ITypeLink {
  shortLink: string;
  originalLink: string;
  click: number;
  status: string;
  expireDate: string;
}

const links = [
  {
    ShortLink: "https://boostech.com/startup",
    OriginalLink:
      "https://discord.com/channels/1247748058264113225/1247748184130850916",
    Click: "2000",
    Status: "Active",
    Date: "3/5/2002",
  },
  {
    ShortLink: "https://boostech.com/startup",
    OriginalLink:
      "https://discord.com/channels/1247748058264113225/1247748184130850916",
    Click: "2000",
    Status: "Active",
    Date: "3/5/2002",
  },
  {
    ShortLink: "https://boostech.com/startup",
    OriginalLink:
      "https://discord.com/channels/1247748058264113225/1247748184130850916",
    Click: "2000",
    Status: "Active",
    Date: "3/5/2002",
  },
  {
    ShortLink: "https://boostech.com/startup",
    OriginalLink:
      "https://discord.com/channels/1247748058264113225/1247748184130850916",
    Click: "2000",
    Status: "Active",
    Date: "3/5/2002",
  },
  {
    ShortLink: "https://boostech.com/startup",
    OriginalLink:
      "https://discord.com/channels/1247748058264113225/1247748184130850916",
    Click: "2000",
    Status: "Active",
    Date: "3/5/2002",
  },
  {
    ShortLink: "https://boostech.com/startup",
    OriginalLink:
      "https://discord.com/channels/1247748058264113225/1247748184130850916",
    Click: "2000",
    Status: "Active",
    Date: "3/5/2002",
  },
  {
    ShortLink: "https://boostech.com/startup",
    OriginalLink:
      "https://discord.com/channels/1247748058264113225/1247748184130850916",
    Click: "2000",
    Status: "Inactive",
    Date: "3/5/2002",
  },
];

async function checkSafeBrowsing(url: string) {
  const apiKey = process.env.googleAPIKey;
  const apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

  const body = {
    client: {
      clientId: "your-client-id",
      clientVersion: "1.0",
    },
    threatInfo: {
      threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
      platformTypes: ["ANY_PLATFORM"],
      threatEntryTypes: ["URL"],
      threatEntries: [{ url }],
    },
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data.matches ? true : false;
}
const box = {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundImage: "url('/img/logo_boostech.png')",
  backgroundPosition: "center",
  backgroundSize: "cover",
};
const InputLink = () => {
  const [link, setLink] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const [listLink, setListLink] = useState<ITypeLink[]>([]);

  // const [token, setToken] = useState<string | undefined>(undefined);
  // console.log("🚀 ~ InputLink ~ token:", token);

  // useEffect(() => {}, []);

  useEffect(() => {
    if (typeof window === undefined) return;
    const getToken = Cookies.get("accessToken");

    const getListLink = async () => {
      let response;

      if (!getToken) {
        response = await sendRequest<IBackendRes<ICreateLink[]>>({
          method: "GET",
          url: listAPi.getAllLinkQuickByUUID(),
          useCredentials: true,
        });
        console.log(response);
      } else {
        response = await sendRequest<IBackendRes<ICreateLink[]>>({
          method: "GET",
          url: listAPi.getAllByEmail(),
          headers: { Authorization: `Bearer ${getToken}` },
        });
        console.log(response);
      }
      if (response.statusCode == 200 && response.data?.length! > 0) {
        const list: ITypeLink[] = (response.data ?? []).map((item: any) => {
          const iosString = item.expireDate;
          const date = new Date(iosString!);
          const formatDate = date.toLocaleDateString("vi-VN");
          return {
            status: "active",
            click: 0,
            shortLink: item.shortLink || "",
            originalLink: item.originalLink || "",
            expireDate: formatDate || "",
          };
        });

        setListLink(list);
      }
    };
    getListLink();
  }, []);

  checkSafeBrowsing(link).then((isDangerous) => {
    if (isDangerous) {
      // console.log("🚨 URL nguy hiểm! Không cho phép tạo short link.");
    } else {
      // console.log("✅ URL an toàn, có thể tạo short link.");
    }
  });

  const handleGetUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  const handleCreateShortLink = async () => {
    setLoading(true);

    const bodyReq = {
      numberCharacer: 5,
      link: link,
    };

    const createData = await sendRequest<IBackendRes<ICreateLink>>({
      method: "POST",
      url: listAPi.createShortLinkQuick(),
      body: { ...bodyReq },
      useCredentials: true,
    });
    setLink("");
    // const item = await createData;

    if (createData.statusCode == 201) {
      const iosString = createData.data?.expireDate;

      const date = new Date(iosString!);
      const formatDate = date.toLocaleDateString("vi-VN");

      const newLink: ITypeLink = {
        status: "active",
        click: 0,
        shortLink: createData.data?.shortLink || "",
        originalLink: createData.data?.originalLink || "",
        expireDate: formatDate || "",
      };
      setListLink((item) => [...item, newLink]);

      toast.success("Create Short Link Successful !", {
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
    } else {
      toast.error(createData.message, {
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

    console.log("🚀 ~ handleCreateShortLink ~ data:", createData);

    setLoading(false);
  };

  return (
    <>
      {/* Overlay đen */}
      <div
        className={`fixed inset-0 z-10 transition-all duration-300 pointer-events-none  ${
          loading ? "  bg-black opacity-50" : "opacity-0"
        }`}
      ></div>

      {/* Loading Box */}
      <div
        className={`fixed max-w-[1000px] w-full mx-auto h-[500px] rounded-xl z-50 flex flex-col gap-14 justify-center items-center bg-white transition-all duration-300  pointer-events-none ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <motion.div
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={box}
        />
        <AnimationText title="Loading...." className="text-[30px] text-black" />
      </div>

      {/* Nội dung chính */}
      <div className="input max-w-[660px] w-full relative">
        <Input
          type="text"
          placeholder="Enter the link here"
          className="py-7 rounded-full px-10 border-4 border-[#353C4A] text-white"
          value={link}
          onChange={handleGetUrl}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-3">
          <FontAwesomeIcon icon={faLink} className="w-5 h-5 text-white" />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-[8px]">
          <Button
            className="bg-secondary rounded-full py-6"
            onClick={handleCreateShortLink}
          >
            Shorten Now!
          </Button>
        </div>
      </div>

      <Table className="text-[#C9CED6]">
        <TableHeader className="bg-[#181E29]">
          <TableRow>
            <TableHead className="min-w-[200px] font-bold text-[#C9CED6]">
              Short Links
            </TableHead>
            <TableHead className="min-w-[200px] font-bold text-[#C9CED6]">
              Original Link
            </TableHead>
            <TableHead className="text-[#C9CED6] font-bold text-center">
              Click
            </TableHead>
            <TableHead className="text-[#C9CED6] font-bold text-center">
              Status
            </TableHead>
            <TableHead className="text-right text-[#C9CED6] font-bold">
              Expire Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {listLink.map((item, index) => {
            const OriginLink =
              item.originalLink.length > 50
                ? item.originalLink.slice(0, 35).concat("...")
                : item.originalLink;

            return (
              <TableRow key={index} className="border-0">
                <TableCell className="font-thin">
                  <LinkHandler data={item.shortLink} />
                </TableCell>
                <TableCell className="font-thin">
                  <LinkHandler
                    data={OriginLink}
                    OriginalLink={item.originalLink}
                  />
                </TableCell>
                <TableCell className="font-thin text-center">
                  {item.click}
                </TableCell>
                <TableCell className="font-thin text-center">
                  {item.status}
                </TableCell>
                <TableCell className="text-right font-thin ">
                  {item.expireDate}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default InputLink;
