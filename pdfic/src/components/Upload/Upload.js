import React, { useEffect, useState } from 'react'
import './Upload.css'
import { Link } from "react-router-dom";
import { pdfjs } from 'react-pdf';
import PDFUpload from '../Pdfupload/Pdfupload';
import axios from 'axios';



pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();


const Upload = React.forwardRef(({ handler }, ref) => {
  const [file, setfile] = useState("")
  // const [pdfdata, setpdfdata] = useState("")
  const formData = new FormData()
  const handlepdfchange = (selectedfile) => {
    setfile(selectedfile)
  }


  const handleformData = async (e) => {

    try {
      formData.append("pdf", file)
      const response = await axios.post(
        "https://easytext.onrender.com/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      console.log("PDF uploaded successfully", response.data.newUpload);
      // setpdfdata(response.data.newUpload)
      localStorage.setItem("uploadedPdf", JSON.stringify(response.data.newUpload))
      window.alert("PDF uploaded successfully!");
      // Optionally, you can reset the file state after successful upload
    } catch (error) {
      console.error("Error uploading PDF", error);
      // Handle error, e.g., show an error message to the user
    }

  }





  return (
    <div className='uploaddiv' ref={ref}>
      <div className="uplaodheader">
        <span className='uplaodspan'>Upload</span> your PDF
      </div>
      <div className="uploadbox">
        <PDFUpload onChange={handlepdfchange} />
      </div>
      <div className="buttonsdiv">
        <button className='upload-button' onClick={() => { handleformData() }} >
          <span>Upload pdf</span>
        </button>
        <Link to="/Highlights" className='imagelinks' ><button className='upload-button'>
          <span>Highlights</span>
        </button></Link>

        <Link to="/Images" className='imagelinks'><button className='upload-button' ><span>Images</span> </button></Link>
      </div>
    </div>
  )
})


export default Upload