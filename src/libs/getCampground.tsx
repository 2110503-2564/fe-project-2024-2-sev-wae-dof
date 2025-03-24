export default async function getCampground(id:string){
    const response = await fetch(`https://campground-backend-red.vercel.app/api/v1/campgrounds/${id}`)
    if(!response.ok){
        throw new Error("Failed to fetch campground")
    }

    return await response.json()

}