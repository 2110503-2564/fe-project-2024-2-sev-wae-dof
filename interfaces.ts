export interface ReservationItem {
    carId:string
    carModel : string
    numOfDays : number
    pickupDate : string
    pickupLocation:string
    returnDate : string
    returnLocation:string
}

export interface CampgroundItem{
    _id: string
    model: string
    name: string
    avgRating:number
    picture:string
}

export interface CampgroundJson {
    count : number
    data : CampgroundItem[]
}

