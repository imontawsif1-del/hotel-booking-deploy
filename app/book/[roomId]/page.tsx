"use client"

import { useState } from "react"

export default function BookPage({ params }: any) {

 const roomId = params.roomId

 const [name,setName] = useState("")
 const [email,setEmail] = useState("")
 const [phone,setPhone] = useState("")
 const [address,setAddress] = useState("")
 const [checkIn,setCheckIn] = useState("")
 const [checkOut,setCheckOut] = useState("")

 async function book(){

  await fetch("/api/book",{
   method:"POST",
   headers:{
    "Content-Type":"application/json"
   },
   body:JSON.stringify({
    roomId,
    name,
    email,
    phone,
    address,
    checkIn,
    checkOut
   })
  })

  alert("Booking confirmed")

 }

 return(

  <div style={{padding:40}}>

   <h1>Book Room</h1>

   <input
   placeholder="Name"
   onChange={(e)=>setName(e.target.value)}
   />

   <br/><br/>

   <input
   placeholder="Email"
   onChange={(e)=>setEmail(e.target.value)}
   />

   <br/><br/>

   <input
   placeholder="Phone"
   onChange={(e)=>setPhone(e.target.value)}
   />

   <br/><br/>

   <input
   placeholder="Address"
   onChange={(e)=>setAddress(e.target.value)}
   />

   <br/><br/>

   <label>Check-in</label>

   <input
   type="date"
   onChange={(e)=>setCheckIn(e.target.value)}
   />

   <br/><br/>

   <label>Check-out</label>

   <input
   type="date"
   onChange={(e)=>setCheckOut(e.target.value)}
   />

   <br/><br/>

   <button onClick={book}>
   Confirm Booking
   </button>

  </div>

 )

}
