"use client"

import { useState } from "react"

export default function GuestSelector(){

const [adults,setAdults] = useState(1)
const [children,setChildren] = useState(0)

return(

<div style={{marginTop:20}}>

<h3>Guests</h3>

<label>Adults</label>
<input
type="number"
value={adults}
min={1}
onChange={(e)=>setAdults(Number(e.target.value))}
/>

<label>Children</label>
<input
type="number"
value={children}
min={0}
onChange={(e)=>setChildren(Number(e.target.value))}
/>

</div>

)

}
