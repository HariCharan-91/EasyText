import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import maattack from './pdf1.pdf'
import './Pdfupload.css'

function PDFup({ onChange }) {
    const [numPages, setNumPages] = useState();
    const [pdfselect, setSelectedFile] = useState(null);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    function handlechange(e) {
        const file = e.target.files[0];
        setSelectedFile(file);

        onChange(file)
    }

    return (
        <div className='upload-container'>
            <input type='file' id='file-input' onChange={handlechange} className='inputidclass' />

           <div className='pages-container'>
           <Document file={pdfselect} onLoadSuccess={onDocumentLoadSuccess} className="pdfcontainer">
                {
                    Array.apply(null, Array(numPages)).map((x, i) => i + 1).map((page) => {
                        return <div>
                            <p>
                                Page {page} of {numPages}
                            </p>
                            <Page pageNumber={page} renderTextLayer={false} renderAnnotationLayer={false} scale={0.5} />
                        </div>
                    })
                }

            </Document>
           </div>


        </div>
    );
}

export default PDFup;