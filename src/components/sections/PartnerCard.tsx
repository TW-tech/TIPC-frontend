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
        <a href={link} target="_blank" rel="noopener noreferrer" className="flex justify-center items-center mb-2">
          <Image 
            src={picture} 
            alt={name} 
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto max-w-full cursor-pointer hover:opacity-80 transition-opacity"
            style={{ height: '150px', objectFit: 'contain' }}
          />
        </a>
      </CardBody>
    </Card>
  );
}