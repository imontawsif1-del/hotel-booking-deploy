import { prisma } from "@/lib/prisma"
import Link from "next/link"

export default async function Home({
 searchParams
}:{
 searchParams?:{ search?:string }
}) {

 const search = searchParams?.search || ""

 const hotels = await prisma.hotel.findMany({
 where: search
  ? {
     location:{
      contains:search,
      mode:"insensitive"
     }
    }
  : undefined,
 include:{ rooms:true }
 })

 return (

 <div style={{padding:40}}>

 <h1>Hotel Booking</h1>

 <form>

 <input
 name="search"
 placeholder="Search city (Berlin)"
 style={{padding:10,width:300}}
 />

 <button style={{marginLeft:10}}>Search</button>

 </form>

 <div style={{marginTop:40}}>

 {hotels.map((hotel)=>{

 const room = hotel.rooms[0]

 return (

 <div
 key={hotel.id}
 style={{
 border:"1px solid #ddd",
 padding:20,
 marginBottom:20,
 borderRadius:10
 }}
 >

 <img
 src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945"}
 style={{width:"100%",height:200,objectFit:"cover"}}
 />

 <h2>{hotel.name}</h2>

 <p>{hotel.location}</p>

 <p>⭐ {hotel.rating || 4.5}</p>

 <p>${room?.price} / night</p>

 <Link href={`/hotel/${hotel.id}`}>
 View hotel
 </Link>

 </div>

 )

 })}

 </div>

 </div>

 )
}
