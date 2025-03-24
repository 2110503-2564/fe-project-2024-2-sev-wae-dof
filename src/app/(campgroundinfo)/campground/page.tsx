import CarPanel from "@/components/CarPanel";
import getCampgrounds from "@/libs/getCampgrounds";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import { CampgroundJson } from "../../../../interfaces";

export default async function Car(){
    const campgrounds:CampgroundJson = await getCampgrounds()

    return(
        <main className="text-center p-5">
            <h1 className="text-2xl font-medium">Campground List</h1>
            <Suspense fallback={<p>Loading ... <LinearProgress/></p>}>
                <CampgroundCatalog CampgroundJson={campgrounds}/>
            </Suspense>

        
            {/* <hr className="my-10"/>
            <h1 className='text-xl font-medium'>TRY Client-side Car Panel</h1>
            <CarPanel/> */}
        </main>
    );
}