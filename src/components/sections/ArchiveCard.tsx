// 典藏索引方格
"use client";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ArchiveCardProps } from "@/types";

function getclassColor(tag: string) {
  switch (tag.toLowerCase()) {
    case "照片":
      return "bg-[#422816] text-white";
    case "影音":
      return "bg-[#843416] text-white";
    case "地圖":
      return "bg-[#CC6915] text-white";
  }
}

export default function ArchiveCard({id, webName, tag, orgName, orgWebLink }: ArchiveCardProps) {
  return (
    <Card key={id} className="mt-6 w-full h-[200px] relative flex flex-col">
        {/* tag 標籤 */}
        <div  className={`absolute bottom-4 right-4 rounded px-4 py-1.5 text-sm font-bold shadow-md ${getclassColor(tag)}`}>
            {tag}
        </div>

      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {webName}
        </Typography>
        <Typography>
          {orgName}
        </Typography>
        
      </CardBody>
      <CardFooter className="absolute bottom-1 center rounded px-4 py-1.5 text-sm font-bold">
        <a href={orgWebLink} className="inline-block">
          <Button
            size="sm"
            variant="text"
            className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 hover:text-[#CC6915]"
          >
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
}