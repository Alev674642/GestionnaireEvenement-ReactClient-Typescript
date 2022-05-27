
export default function SimpleMap({ lieu }:{lieu:string}) {
  return (
    <div className='mt-5'>
      <iframe
        width='100%'
        height='450'
        style={{ border: "0" }}
        loading='lazy'
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?q=${
          lieu ? lieu : "Paris"
        }&key=AIzaSyA6CfnfpHRrZutTt-EaGEcEmNsOhNGxbbo`}></iframe>
    </div>
  );
}
