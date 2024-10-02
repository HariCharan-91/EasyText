import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './Pdfupload.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function PDFup({ onChange }) {
    const [numPages, setNumPages] = useState(null); // Initialize to null
    const [pdfselect, setSelectedFile] = useState(null); // Holds the selected file

    // Triggered when PDF loads successfully
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    // Handle file input change
    function handlechange(e) {
        const file = e.target.files[0];
        setSelectedFile(file); // Set the selected file
        onChange(file); // Call parent component's onChange
    }

    return (
        <div className='upload-container'>
            <input type='file' id='file-input' onChange={handlechange} className='inputidclass' accept="application/pdf" />

            <div className='pages-container'>
                {/* Only show the Document if a file is selected */}
                {pdfselect && (
                    <Document
                        file={pdfselect}
                        onLoadSuccess={onDocumentLoadSuccess}
                        className="pdfcontainer"
                    >
                        {
                            Array.from({ length: numPages }, (_, index) => (
                                <div key={index}>
                                    <p>Page {index + 1} of {numPages}</p>
                                    <Page
                                        pageNumber={index + 1}
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        scale={0.5}
                                    />
                                </div>
                            ))
                        }
                    </Document>
                )}
            </div>
        </div>
    );
}

export default PDFup;
