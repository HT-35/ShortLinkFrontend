"use client";
import React, { useState } from "react";
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

const InputLink = () => {
  const [link, setLink] = useState<string>("");
  console.log("🚀 ~ InputLink ~ setLink:", link);

  checkSafeBrowsing("https://192.168.1.1/").then((isDangerous) => {
    if (isDangerous) {
      console.log("🚨 URL nguy hiểm! Không cho phép tạo short link.");
    } else {
      console.log("✅ URL an toàn, có thể tạo short link.");
    }
  });

  const handleGetUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLink(e.target.value);
  };

  return (
    <>
      <div className="input max-w-[660px] w-full relative">
        <Input
          type="text"
          placeholder="Enter the link here"
          className="py-7 rounded-full px-10 border-4  border-[#353C4A] text-white"
          onChange={handleGetUrl}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-3">
          <FontAwesomeIcon icon={faLink} className="w-5 h-5  text-white" />
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-[8px] ">
          <Button className="bg-secondary rounded-full py-6">
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
            <TableHead className="text-[#C9CED6] font-bold">Click</TableHead>
            <TableHead className="text-[#C9CED6] font-bold">Status</TableHead>
            <TableHead className="text-right text-[#C9CED6] font-bold">
              Expire Date
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {links.map((item, index) => {
            const OriginLink =
              item.OriginalLink.length > 50
                ? item.OriginalLink.slice(0, 35).concat("...")
                : item.ShortLink;

            return (
              <TableRow key={index} className="border-0">
                <TableCell className="font-thin">
                  <LinkHandler data={item.ShortLink}></LinkHandler>
                </TableCell>
                <TableCell className="font-thin">
                  <LinkHandler
                    data={OriginLink}
                    OriginalLink={item.OriginalLink}
                  ></LinkHandler>
                </TableCell>
                <TableCell className="font-thin">{item.Click}</TableCell>
                <TableCell className="font-thin">{item.Status}</TableCell>
                <TableCell className="text-right font-thin">
                  {item.Date}
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
