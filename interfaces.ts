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
<<<<<<< HEAD
    model: string
    name: string
    avgRating:number
    picture:string
=======
    name: string
    address:string
    region:string
    avgRating:number
    tel:string
>>>>>>> b174ace6e8194d18f2dde7b91551b8afde3e4b89
}

export interface CampgroundJson {
    count : number
    data : CampgroundItem[]
<<<<<<< HEAD
}

=======
}
>>>>>>> b174ace6e8194d18f2dde7b91551b8afde3e4b89
