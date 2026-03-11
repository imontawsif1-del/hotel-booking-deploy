import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function HotelPage({params}:{params:{id:string}}){

const hotel = await prisma.hotel.findUnique({
 where:{id:params.id},
 include:{rooms:true,reviews:true}
})

if(!hotel) return <div>Hotel not found</div>

return(

<div style={{padding:40}}>

<h1>{hotel.name}</h1>

<img
src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
style={{width:"100%",height:300,objectFit:"cover"}}
/>

<p>{hotel.location}</p>

<h2>Rooms</h2>

{hotel.rooms.map(room=>(

<div key={room.id} style={{marginBottom:20}}>

<h3>{room.name}</h3>

<p>${room.price}/night</p>

<Link href={`/book/${room.id}`}>Book now</Link>

</div>

))}

<h2>Reviews</h2>

{hotel.reviews.map(r=>(

<div key={r.id}>

⭐ {r.rating}

<p>{r.comment}</p>

</div>

))}

</div>

)
}
