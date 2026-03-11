"use client"

import { useState } from "react"

export default function Book({params}:{params:{roomId:string}}){

const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [checkIn,setCheckIn]=useState("")
const [checkOut,setCheckOut]=useState("")

async function book(){

await fetch("/api/book",{
 method:"POST",
 headers:{'Content-Type':'application/json'},
 body:JSON.stringify({
  roomId:params.roomId,
  name,
  email,
  checkIn,
  checkOut
 })
})

alert("Booking confirmed")

}

return(

<div style={{padding:40}}>

<h1>Book room</h1>

<input placeholder="Name" onChange={e=>setName(e.target.value)} />

<input placeholder="Email" onChange={e=>setEmail(e.target.value)} />

<input type="date" onChange={e=>setCheckIn(e.target.value)} />

<input type="date" onChange={e=>setCheckOut(e.target.value)} />

<button onClick={book}>Confirm booking</button>

</div>

)
}
