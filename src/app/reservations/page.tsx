"use client";
import DateReserve from "@/components/DateReserve";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";
import { MenuItem } from "@mui/material";
import Select from '@mui/material/Select';
import { CampgroundJson } from "../../../interfaces";
import getCampgrounds from "@/libs/getCampgrounds";
import { CampgroundItem } from "../../../interfaces";
import { Suspense } from "react";
import { LinearProgress } from "@mui/material";
import booking from "@/libs/createBooking";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function Reservations() {
    const [campgrounds, setCampgrounds] = useState<CampgroundJson | null>(null);
    const [loading, setLoading] = useState(true);
    const [reservationStatus, setReservationStatus] = useState<string | null>(null); // เพิ่ม state สำหรับข้อความแจ้ง

    const { data: session } = useSession();
    console.log(session?.user.token);

    useEffect(() => {
        async function fetchData() {
            const data = await getCampgrounds();
            setCampgrounds(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const makeReservation = async () => {
        if (session?.user.token && pickupCampgroung && checkInDate && checkOutDate) {
            try {
                // ส่งข้อมูลการจอง
                await booking(session.user.token, pickupCampgroung, dayjs(checkInDate).format('YYYY/MM/DD'), checkOutDate.diff(checkInDate, 'day'));
                setReservationStatus("Reservation successful!"); // แสดงข้อความแจ้ง
            } catch (error) {
                setReservationStatus("Error: Failed to make reservation."); // ถ้ามีข้อผิดพลาด
            }
        }
    }

    const searchParams = useSearchParams(); // ใช้เพื่อดึงพารามิเตอร์จาก URL
    const selectedCampground = searchParams.get('id');

    const [checkInDate, setCheckInDate] = useState<Dayjs | null>(null);
    const [pickupCampgroung, setPickupcampground] = useState<string | null>(selectedCampground || null);
    const [checkOutDate, setCheckOutDate] = useState<Dayjs | null>(null);

    return (
        <main className="w-[100%] flex flex-col items-center space-y-4">
            {loading ? (
                <p className="text-lg text-gray-600">Loading ... <LinearProgress /></p>
            ) : (
                <Suspense fallback={<p>Loading ... <LinearProgress /></p>}>
                    <div className="text-xl font-medium">New Booking</div>

                    <div className="w-fit space-y-2">
                        <div>
                            <div className="text-md text-left text-gray-600">Check-In Date</div>
                            <DateReserve onDateChange={(value: Dayjs) => { setCheckInDate(value) }} />
                        </div>

                        <div>
                            <div className="text-md text-left text-gray-600">Check-Out Date</div>
                            <DateReserve onDateChange={(value: Dayjs) => { setCheckOutDate(value) }} />
                        </div>

                        <div>
                            <div className="text-md text-left text-gray-600">Campground</div>
                            <Select
                                labelId="campground-select"
                                id="campground-select"
                                value={pickupCampgroung || ""}
                                label="Campground"
                                onChange={(event) => { setPickupcampground(event.target.value); }}
                            >
                                {
                                    campgrounds?.data.map((campgroundItem: CampgroundItem) => (
                                        <MenuItem key={campgroundItem._id} value={campgroundItem._id}>{campgroundItem.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </div>
                    </div>

                    <button
                        className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 text-white shadow-sm"
                        onClick={makeReservation}
                    >
                        Booking Campground
                    </button>

                    {/* แสดงข้อความแจ้ง */}
                    {reservationStatus && <p className="text-lg text-green-500 mt-4">{reservationStatus}</p>}
                </Suspense>
            )}
        </main>
    );
}
