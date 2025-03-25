export default async function booking(token:string,campgroundId:string,checkin:string,nights:number){
    const response = await fetch(`https://campground-backend-red.vercel.app/api/v1/campgrounds/${campgroundId}/bookings/`,{
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            authorization : `Bearer ${token}`,
        },
        body: JSON.stringify({
            campingDate : checkin,
            nights : nights
        })
    })
    if(!response.ok){   
        throw new Error("Failed to log-in")
    }

    return await response.json()
}