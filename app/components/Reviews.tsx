"use client"

import { useState } from "react"

export default function Reviews({hotelId}:{hotelId:string}){

const [rating,setRating]=useState(5)
const [comment,setComment]=useState("")

async function submit(){

await fetch("/api/reviews",{
method:"POST",
headers:{ "Content-Type":"application/json"},
body:JSON.stringify({hotelId,rating,comment})
})

alert("Review submitted")

}

return(

<div style={{marginTop:40}}>

<h3>Leave review</h3>

<input
type="number"
value={rating}
min={1}
max={5}
onChange={(e)=>setRating(Number(e.target.value))}
/>

<textarea
placeholder="Write review"
onChange={(e)=>setComment(e.target.value)}
/>

<button onClick={submit}>
Submit review
</button>

</div>

)

}
