import { getAllPropertiesIds } from "@/actions/properties/getAllPropertiesIds"
import { getCloudFlareProperty } from "@/actions/properties/getCloudFlareProperty"
import { getPropertyDetails } from "@/actions/properties/getPropertyDetails"
import PropertyCard from "@/app/_components/properties/PropertyCard"



export async function generateStaticParams(){
    const propertiesIds:{_id:string}[] = await getAllPropertiesIds()
    return [{_id:"ace4c25c-3c32-41a1-b8a4-a86dacfd6827"}]
}

export default async function PropertyRoutePage({params}:{params:{_id:string}}) {
  const property = await getPropertyDetails(params._id)
  const cloudFlareProperty = await getCloudFlareProperty(property[0].name)
  return (
    <div>
        <PropertyCard cloudFlareProperty={cloudFlareProperty} property={property} />
    </div>
  )
}
