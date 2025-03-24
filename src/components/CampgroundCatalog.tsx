import Link from "next/link";
import ProductCard from "./ProductCard";
import { CampgroundItem, CampgroundJson } from "../../interfaces";

export default async function CampgroundCatalog({CampgroundJson}:{CampgroundJson:CampgroundJson}) {
    const campgroundJsonReady = await CampgroundJson
    return(
        <>
        Explore {campgroundJsonReady.count} models in our catalog
        <div style={{margin:"20px" ,display:"flex",flexDirection:"row",
                  flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"
                }}>
                    {   
                        campgroundJsonReady.data.map((campgroundItem:CampgroundItem)=>(
                            <Link href={`/campground/${campgroundItem._id}`} className='w-1/5 m-5'>
                            <ProductCard campgroundName={campgroundItem.name}  rating={campgroundItem.avgRating}
                            />
                            </Link>
                        ))
                    }
                    </div>
        </>
    )
}