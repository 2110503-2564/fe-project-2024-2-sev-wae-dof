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
    name: string
    address:string
    region:string
    avgRating:number
    tel:string
}

export interface CampgroundJson {
    count : number
    data : CampgroundItem[]
}