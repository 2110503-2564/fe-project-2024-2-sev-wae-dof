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

export interface Rating {
    user: string;
    rating: number;
    comment: string;
    _id: string;
    id: string;
  };
  
export interface CampgroundItemAdmin {
    id: string;
    name: string;
    address: string;
    tel: string;
    avgRating: number;
    ratings: Rating[];
    picture: string;
    createdAt: string;
  };