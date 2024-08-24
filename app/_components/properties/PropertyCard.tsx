"use client"
import { Properties } from "@/utils/types/sanity.types";
import {Button, Card,CardBody, Chip} from "@nextui-org/react";
import Image from "next/image";
import { urlForImage } from "@/utils/image";
import CustomCarousel from "../carousel/Carousel";
import PropertyRooms from "../rooms/PropertyRooms";
import { Check, MapPinCheckInside } from 'lucide-react'
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getLocalStorageToken } from "@/actions/utils/getLocalStorageToken";
import { useHandleError } from "@/actions/error/useHandleError";
import { addToWishlist } from "@/actions/wishlist/addToWishlist";


interface Props{
    property:Properties[]
}
interface DistanceObj {
  distance: string;
  collegeName: string;
}
export default function PropertyCard(props:Props) {
  const [distanceObj, setDistanceObj] = useState<DistanceObj>({ distance: "", collegeName: "" });
  const {handleError} = useHandleError()
  useEffect(() => {
    const storedDistanceObj = localStorage.getItem('distance');
    if (storedDistanceObj) {
      setDistanceObj(JSON.parse(storedDistanceObj) as DistanceObj);
    }
  }, []);
  const addToWishListMutation = useMutation({
    mutationFn:async ()=> {
      const res = await addToWishlist({
        propertyName:props.property[0].name??'',
        propertyType:JSON.stringify(props.property[0].propertyType),
        isRoom:false,
        propertyId:props.property[0]._id,
        propertyImages:JSON.stringify(props.property[0].rooms?.[0].images?.map((image)=>urlForImage(image))),
        token:getLocalStorageToken()
      })
      return res
    },
    onMutate:()=>{
      toast.dismiss()
      toast.loading('Adding to wishlist')
    },
    onError:(err)=>{
      toast.dismiss()
      handleError(err)
    },
    onSuccess:()=>{
      toast.dismiss()
      toast.success('Added to wishlist')
    }
  })
  const handleAddToWishList =async ()=>{
    addToWishListMutation.mutate()

  }
  return (
    <div className="flex p-4 flex-col gap-8">
       <Card className=" max-h-[50rem]" shadow="sm">
         <CardBody className="flex flex-row gap-6">
            <CustomCarousel carouselStyle={{width:"100%",maxWidth:"30rem"}}>
            {(props.property.length > 0 && Array.isArray(props.property[0].rooms?.[0]?.images) ? props.property[0].rooms[0].images : []).map((image, i) =>
            image!==undefined && <Image key={i} className="max-h-[30rem] max-w-full" alt="img" src={urlForImage(image)} width={1000} height={1000}/>
            )}
            </CustomCarousel>
            <div className="grid grid-cols-2 gap-4">
              {props.property?.[0].rooms?.[0].images?.slice(0,4).map((image,i)=>
               <Image key={i} className="w-[10.8rem]" alt="small-property-image" src={urlForImage(image)} height={500} width={500} />
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl">{props.property?.[0].name}</h1>
              <div className="flex gap-2 items-center bg-background  p-2 rounded-lg">
                <MapPinCheckInside/>
                 Within {distanceObj.distance} of {distanceObj.collegeName} college
              </div>
              <div className="flex gap-2 overflow-x-scroll bg-gray-100 mt-4 p-3 rounded-lg ">
            {
              props.property?.[0]?.amenities?.map((amenity, index) => {
                return (
                  <Chip startContent={<Check size={14} />} key={index} className="bg-white border-primary border text-sm rounded-lg" >{amenity.amenityName}</Chip>
                )
              })
            }
          </div>
        <div className="flex flex-col gap-4 mt-auto w-full mb-6">
        <Button onClick={handleAddToWishList} radius="sm" size="lg"  color="secondary">
             Add to WishList
           </Button>
           <Button radius="sm" size="lg"  color="primary">
             View All Rooms
           </Button>
        </div>
         
          </div>
        </CardBody> 
    </Card>
    <PropertyRooms propertyName={props.property[0].name??''} rooms={props.property?.[0]?.rooms} />
    </div>
   
  )
}

