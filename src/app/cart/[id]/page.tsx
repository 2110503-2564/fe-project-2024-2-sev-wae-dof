"use client"
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import getOneBooking from "@/libs/getOneBooking";
import { useState , useEffect} from "react";
import { BookingJson } from "../../../../interfaces";
import { LinearProgress } from "@mui/material";
import { Suspense } from "react";
import editBooking from "@/libs/editBooking";
import dayjs, { Dayjs } from "dayjs";
import DateReserve from "@/components/DateReserve";
import { useRouter } from "next/navigation";

export default function EditPage() {
    const params = useParams();
    const { id } = params as { id?: string };
    const {data:session} = useSession()
    console.log(session?.user.token)
    const [booking, setBooking] = useState<BookingJson | null>(null);
    const [editDate, setEditDate] = useState<Dayjs | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const data = await getOneBooking(session?.user.token ? session?.user.token : "", id ? id : '');
            setBooking(data);
            setLoading(false);
        }
        fetchData();
    }, []);
    const updateBooking = () => {
            if(session?.user.token  && id && editDate){
                editBooking(session?.user.token , id ,dayjs(editDate).format('YYYY/MM/DD'));
            }
    
    }


    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
             {loading ? (
                        <p className="text-lg text-gray-600">Loading ... <LinearProgress /></p>
                    ) : (
                        <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
                            <div>
                                <div className="text-md text-left text-gray-600">Edit Check-In Date</div>
                                <DateReserve onDateChange={(value:Dayjs)=>{setEditDate(value)}}/>
                            </div>

                            <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                            text-white shadow-sm" onClick={()=>{updateBooking; router.push("/cart"); }}>Edit Booking</button>

                </Suspense>
            )}
        </main>

        
    );
}