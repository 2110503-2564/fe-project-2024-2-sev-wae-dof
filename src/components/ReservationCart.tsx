'use client'
import { removeReservation } from "@/redux/features/BookingSlice"
import { AppDispatch, useAppSelector } from "@/redux/store"
import { useDispatch } from "react-redux"
import deleteBooking from "@/libs/deleteBooking"
import { useSession } from "next-auth/react"

export default function ReservationCart() {
    const bookItems = useAppSelector((state) => state.bookingSlice.bookItems)
    const dispatch = useDispatch<AppDispatch>()
    const {data:session} = useSession()
    console.log(session?.user.token)

    return (
        <>
            {bookItems.length === 0 ? (
                <div className="text-center text-gray-500 text-lg py-5">
                    No booking found.
                </div>
            ) : (
                bookItems.map((reservationItem) => (
                    <div className='bg-slate-200 rounded px-5 mx-5 py-2 my-2'
                        key={reservationItem.campgroundId}>
                        <div className="text-sm">Check-in {reservationItem.campingDate}</div>
                        <div className="text-md">Duration: {reservationItem.nights} days</div>
                        <button className="block rounded-md bg-sky-600 hover:bg-indigo-600 px-3 py-2 
                        text-white shadow-sm" 
                        
                        onClick={() => {deleteBooking(session?.user.token ? session.user.token : "",reservationItem.campgroundId);  dispatch(removeReservation(reservationItem));}}>
                            Remove from Booking
                        </button>
                    </div>
                ))
            )}
        </>
    )
}
