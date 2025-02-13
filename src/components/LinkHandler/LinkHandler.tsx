"use client";
import { toast } from "@/hooks/use-toast";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import React from "react";

const LinkHandler = ({
  data,
  OriginalLink,
}: {
  data: string;
  OriginalLink?: string;
}) => {
  const CopyClipBoard = () => {
    toast({
      title: "Copy Successfull !",
      description: data,
    });
    return navigator.clipboard.writeText(data);
  };

  return (
    <div className="flex items-center gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger> {data}</TooltipTrigger>
          <TooltipContent className="bg-white text-black text-sm px-4 py-1 rounded-full font-normal">
            <p> {OriginalLink ?? data}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <FontAwesomeIcon
        icon={faCopy}
        className="w-3 cursor-pointer"
        onClick={() => CopyClipBoard()}
      />
    </div>
  );
};

export default LinkHandler;
