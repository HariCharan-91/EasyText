import React, { useRef, useState } from "react";
import "./Hero.css";
import heroimage from "../../Images/Deadline-rafiki.png";
import Upload from "../../components/Upload/Upload";

export default function Hero() {


  const [data, setData] = useState("")

  const handledata =(datar)=>
  {
     setData(datar)
  }

  const sectionref = useRef(null)

  const handleClick = () =>
  {
    console.log(sectionref.current)
    if(sectionref.current)
    {
      sectionref.current.scrollIntoView({behavior: 'smooth'})
    }
  }

  console.log(`data hero :${data}`)


  return (
    <div className="herodiv">
      <div className="hero-dashboard">
        <div className="indicator-circle">
          <div className="circle"></div>
          <div className="circleline"></div>
        </div>
        <div className="headerimage">
          <div className="hero-info">
            <header className="hero-header">
              AnnoCaptor: <span className="headerspan">Image</span> &{" "}
              <span className="headerspan">Text Extractor</span>
            </header>
            <p>
              Our platform offers a streamlined solution for extracting text
              from annotated PDF pages, catering to professionals across various
              fields. With our advanced technology, users can effortlessly
              upload PDF files, identify annotated pages, and extract valuable
              insights with precision and efficiency. Whether you're a
              researcher, analyst, or industry expert, our platform empowers you
              to elevate your document management practices and enhance
              productivity.
            </p>
            <button className="button margione">
              <div class="text" onClick={()=>
              {handleClick()}}>Start</div>
            </button>
          </div>
          <img src={heroimage} alt="" className="heroimage" />
        </div>
      </div>
      <Upload ref = {sectionref} handler = {handledata}/>
    </div>
  );
}
