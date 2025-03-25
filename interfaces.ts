export interface ReservationItem {
    campgroundId:string
    campingDate:string
    nights:number
}

export interface CampgroundItem{
    _id: string
    name: string
    address:string
    region:string
    avgRating:number
    picture:string
    tel:string
}

export interface CampgroundJson {
    count : number
    data : CampgroundItem[]
}
