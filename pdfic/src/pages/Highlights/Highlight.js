import React, { useState, useEffect } from "react";
import "./Highlight.css";
// import blue from "./textdata/Blue_highlight";
// import green from "./textdata/Green_highlight";
// import pink from "./textdata/Pink_highlight";
// import yellow from "./textdata/Yellow_highlight";
// import red from "./textdata/Red_highlight";

export default function Highlight() {
  // let data = [blue, green, pink, yellow, red];
  const [colortext, setcolortext] = useState("");
  const [capi, setcapi] = useState();
  const [HighlightText, sethighlight] = useState({});

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handlecolor(color) {
    setcolortext(capitalizeFirstLetter(color));
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("uploadedPdf");
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          // console.log(typeof(parsedData))
          sethighlight(parsedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error, e.g., show an error message to the user
      }
    };

    fetchData();
  }, []);

  // console.log(HighlightText.highlight);
  // console.log()

  return (
    <div className="toppadding">
      <header className="images-header">
        Highlighted<span className="header-highlight">text</span>
      </header>

      <div className="Highlightdiv">
        <div className="buttonsdiv">
          <button
            className={
              colortext === "Red"
                ? "upload-button upload-button-selected"
                : "upload-button"
            }
            onClick={() => {
              handlecolor("Red");
            }}
          >
            <span>Red Highlight</span>
          </button>
          <button
            className={
              colortext === "Green"
                ? "upload-button upload-button-selected"
                : "upload-button "
            }
            onClick={() => {
              handlecolor("Green");
            }}
          >
            <span>green Highlight</span>
          </button>
          <button
            className={
              colortext === "Blue"
                ? "upload-button upload-button-selected"
                : "upload-button "
            }
            onClick={() => {
              handlecolor("Blue");
            }}
          >
            <span>blue Highlight</span>
          </button>
          <button
            className={
              colortext === "Pink"
                ? "upload-button upload-button-selected gridspan2 "
                : "upload-button  gridspan2"
            }
            onClick={() => {
              handlecolor("Pink");
            }}
          >
            <span>pink Highlight</span>
          </button>
          <button
            className={
              colortext === "Yellow"
                ? "upload-button upload-button-selected gridspan3"
                : "upload-button gridspan3"
            }
            onClick={() => {
              handlecolor("Yellow");
            }}
          >
            <span>yellow Highlight</span>
          </button>
        </div>

        <div className="pointsdiv">
          {colortext && colortext.length > 0 ? (
            HighlightText.highlight.map((colorObject, index) => {
              const keys = Object.keys(colorObject); // Get the color key
              const ind = keys.indexOf(colortext);
              const color = keys[ind];
              const texts = colorObject[color]; // Get the array of texts for the color
              return (
                <div key={index}>
                  {colortext === color && texts.length > 0 ? (
                    texts.map((text, textIndex) => (
                      <div className="highlighttext" key={textIndex}>
                        <ul>
                          <li className="hitext">{text}</li>
                        </ul>
                      </div>
                    )) 
                  ) : (
                    <div className="hitext">{`No ${colortext} highlighted text available`}</div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="nothing">
              Please select the button corresponding to the text you wish to
              display. Upon pressing each button, the respective related text
              will be displayed.{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

