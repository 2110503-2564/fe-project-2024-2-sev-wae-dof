import Link from "next/link";
import ProductCard from "./ProductCard";
import { CarItem, CarJson } from "../../interfaces";

export default async function CarCatalog({carJson}:{carJson:CarJson}) {
    const carJsonReady = await carJson
    return(
        <>
        Explore {carJsonReady.count} models in our catalog
        <div style={{margin:"20px" ,display:"flex",flexDirection:"row",
                  flexWrap:"wrap", justifyContent:"space-around", alignContent:"space-around"
                }}>
                    {   
                        carJsonReady.data.map((carItem:CarItem)=>(
                            <Link href={`/campground/${carItem.id}`} className='w-1/5'>
                            <ProductCard carName={carItem.model} imgSrc= {carItem.picture}
                            />
                            </Link>
                        ))
                    }
                    </div>
        </>
    )
}