import React, { useEffect, useState } from 'react'
import './Images.css'
export default function Images() {

  const [selected, setselected] = useState(-1)
  const [imagedata, setimageData] = useState({})


  function handelselected(getindex) {
    console.log(getindex);
    setselected(getindex);
  }

  function handleleave() {
    console.log('mouseleft')
    setselected(-1);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("uploadedPdf");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          setimageData(parsedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchData();
  }, [])


  // console.log(`this is the image data ${JSON.stringify(imagedata.image)}`)

  return (
    <div className='Imagescontainer'>
      {
        imagedata.image && (
          <>
            <header className="image-header">
              <span className='header-highlight'>Highlighted</span> text Images
            </header>
            <div className="Mansorygrid">

              {
                imagedata.image.map((ele, index) => {
                  index += index = 1
                  return <div className={selected === ele._id ? 'imagecard selected' : 'imagecard'} onMouseEnter={() => { handelselected(index) }} onMouseLeave={handleleave} key={ele._id}>
                    <img src={ele.image_url} alt="" className='imageitem' />
                  </div>

                })
              }
            </div>
          </>
        )
      }
    </div>
  )
}

