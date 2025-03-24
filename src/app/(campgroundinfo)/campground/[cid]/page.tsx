import Image from "next/image";
import getCampground from "@/libs/getCampground";
import Link from "next/link";

export default async function CarDetailPage({params}:{params:{cid:string}}){

    console.log(params.cid);
    const campgroundDetail = await getCampground(params.cid)


    /**
     *  Mock Data for Demonstration Only
     */

    // const mockCarRepo = new Map();
    // mockCarRepo.set("001",{name:"Honda Civic" ,image:"/img/civic.jpg"})
    // mockCarRepo.set("002",{name:"Honda Accord",image:"/img/accord.jpg"})
    // mockCarRepo.set("003",{name:"Toyota Fortuner",image:"/img/fortuner.jpg"})
    // mockCarRepo.set("004",{name:"Tesla Model 3",image:"/img/tesla.jpg"})


    return(
        <main className="text-center p-5">
            <h1 className="text-lg font-medium">{campgroundDetail.data.name}</h1>
            <div className="flex flex-row my-5">
                <Image src={campgroundDetail.data.picture} 
                alt='Car Image'
                width={0} height={0} sizes="100vw" className='rounded-lg w-[30%]'/>
                <div className='text-md mx-5'>
                <div className='text-md mx-5'>Address: {campgroundDetail.data.address}</div>
                <div className='text-md mx-5'>Tel: {campgroundDetail.data.tel}</div>
                
                <Link href={`/booking?id=${params.cid}&model=${campgroundDetail.data.model}`}>
                <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
            text-white shadow-sm">Make Reservation</button>
                </Link>

                </div>
                
            </div>
        </main>
    );
}
