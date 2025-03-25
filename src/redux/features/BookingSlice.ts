import { createSlice ,PayloadAction} from "@reduxjs/toolkit";
import { ReservationItem } from "../../../interfaces";

type BookingState = {
    bookItems: ReservationItem[]
}

const initialState:BookingState = {bookItems:[]}

export const bookingSlice = createSlice({
    name : "booking",
    initialState,
    reducers: {
        addReservation: (state, action:PayloadAction<ReservationItem>)=>{
            state.bookItems.push(action.payload)
        },
        removeReservation: (state, action:PayloadAction<ReservationItem>)=> {
            const remainItems = state.bookItems.filter( obj =>{
                return ((obj.campgroundId !== action.payload.campgroundId)
            ||(obj.campingDate !== action.payload.campingDate)
            ||(obj.nights !== action.payload.nights))
            })
            state.bookItems = remainItems

        }
    }
})

export const {addReservation,removeReservation} = bookingSlice.actions
export default bookingSlice.reducer
