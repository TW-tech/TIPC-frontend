// 合作夥伴
"use client";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Image from "next/image";
import { PartnerCardProps } from "@/types";


export default function PartnerCard({ id, link, picture, description, name }: PartnerCardProps) {
  return (
    <Card key={id} className="mt-6 w-full max-w-xs mx-auto">
      <CardBody className="flex flex-col items-center">
        <a href={link} className="flex justify-center">
          <Image 
            src={picture} 
            alt={name} 
            width={208}
            height={208}
            className="rounded-full w-52 h-52 aspect-square object-cover mb-4 border-2 border-gray-200 shadow-sm"
          />
        </a>
        <Typography variant="h5" color="blue-gray" className="mb-2 text-center">
          {name}
        </Typography>
        <Typography className="text-center">
          {description}
        </Typography>
      </CardBody>
    </Card>
  );
}