"use client";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export type PartnerCardProps = {
  id: number;
  link: string;
  picture: string;
  description: string;
  name: string;
};
export default function PartnerCard({ id, link, picture, description, name }: PartnerCardProps) {
  return (
    <Card key={id} className="mt-6 w-full max-w-xs mx-auto">
      <CardBody className="flex flex-col items-center">
        <a href={link} className="flex justify-center">
          <img 
            src={picture} 
            alt={name} 
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