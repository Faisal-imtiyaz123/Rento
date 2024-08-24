"use client"
import { Properties } from "@/utils/types/sanity.types"
import { icons, PersonStanding } from "lucide-react"
import { memo } from 'react';
import { Button, Card, CardBody } from "@nextui-org/react";
import CustomCarousel from "../carousel/Carousel";
import Image from "next/image";
import { urlForImage } from "@/utils/image";
import { LandPlot } from 'lucide-react';
import styled from "styled-components";
import {Chip} from "@nextui-org/react";
import { Check } from 'lucide-react';
import { distance } from "framer-motion";
import { useRouter } from "next/navigation";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const PropertyName = styled.span`
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;
const InfoText = styled.span`
`;
const AreaContainer = styled.div`
  display: flex;
  max-width: 10rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.5rem;
  padding: 0.25rem 0.5rem;
`;

interface Props{
  property:Properties
  collegeName?:string
  distance?:string
}
function CollegeProperty(props:Props) {
  const router = useRouter()
  const handleClick = async () => {
    localStorage.setItem('distance', JSON.stringify({
      distance: props.distance,
      collegeName: props.collegeName
    }));

    router.push(`/property/${props.property._id}`);
  };
const iconSize = 24
  return (
    <Card className="max-w-full ">
    <CardBody className="flex flex-row gap-4">
      <CustomCarousel carouselStyle={{maxWidth:"15rem"}}>
        {
          props.property?.rooms?.[0]?.images?.map((image,index)=>{
            return (
              <Image alt="property-grid-image" width={1000} height={1000} src={urlForImage(image)} key={index} />
            )
          })
        }
      </CustomCarousel>
      <Container>
          <PropertyName className="text-lg lg:text-xl" >{props.property.name}</PropertyName>
          <InfoContainer className="bg-background">
            <PersonStanding className="text-primary" size={iconSize} />
            <InfoText className="text-[0.7rem]" >Within {props.distance} of {props.collegeName}</InfoText>
          </InfoContainer>
          <AreaContainer className="bg-background text-xs">
            <LandPlot className="text-primary" size={iconSize} />
            <InfoText>{props.property?.area?.areaName as string}</InfoText>
          </AreaContainer>
          <div className="flex gap-2 overflow-x-scroll">
            {
              props.property?.amenities?.map((amenity, index) => {
                return (
                  <Chip startContent={<Check size={14} />} key={index} className="bg-white border-primary border  text-xs rounded-lg" >{amenity.amenityName}</Chip>
                )
              })
            }

          </div>
        <div className="mt-auto mb-4 flex flex-col gap-2">
        <Button  radius="sm" size="lg" className="text-md bg-secondary text-white"> 
            Rooms From &#8377;{props.property.minPrice}
          </Button>
        <div  className="b-4 flex w-full justify-center">
            <Button onClick={handleClick} radius="sm" className="w-full text-md" size="lg" color="primary">
               View Details
            </Button>
        </div>
        </div>
        </Container>
    </CardBody>
    </Card>
  )
}
export default memo(CollegeProperty)