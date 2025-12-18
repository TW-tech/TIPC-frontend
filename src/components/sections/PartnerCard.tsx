// 友善夥伴
"use client";
import {
  Card,
  CardBody,
} from "@material-tailwind/react";
import Image from "next/image";
import { PartnerCardProps } from "@/types";


export default function PartnerCard({ id, link, picture, name }: PartnerCardProps) {
  return (
    <Card key={id} className="mt-2 w-full max-w-xs mx-auto shadow-none bg-transparent">
      <CardBody className="flex flex-col items-center p-2">
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex justify-center mb-2">
          <Image 
            src={picture} 
            alt={name} 
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-auto max-w-full cursor-pointer hover:opacity-80 transition-opacity"
          />
        </a>
        {/* <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
          {name}
        </Typography> */}
      </CardBody>
    </Card>
  );
}