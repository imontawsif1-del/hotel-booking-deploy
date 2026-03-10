export default function HotelGallery({image}:{image:string}){

return(

<div style={{marginTop:20}}>

<img
src={image}
style={{
width:"100%",
height:"300px",
objectFit:"cover",
borderRadius:"10px"
}}
/>

</div>

)

}
