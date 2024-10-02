import random
import fitz
from PIL import Image
import os
import json

def latestfile_path():
    pdf_directory = os.path.abspath('./uploads/pdfFiles')
    
    # # Get a list of all files in the directory
    all_files = os.listdir(pdf_directory)

    # Filter out only the PDF files
    pdf_files = [file for file in all_files if file.lower().endswith('.pdf')]

    # Sort the PDF files by modification time (descending order)
    pdf_files.sort(key=lambda x: os.path.getmtime(os.path.join(pdf_directory, x)), reverse=True)

    # Get the path to the last modified PDF file
    last_pdf_file = os.path.join(pdf_directory, pdf_files[0])
    return last_pdf_file

def main():
    annotation_list = []
    
    doc = fitz.open(latestfile_path())
    output_folder = r"C:\Users\91939\Projects\highpdf\server\uploads\ImageStorage"
    for page_number, page in enumerate(doc, start=1):
            annotations = page.annots()
            for annot in annotations:
                    # Check if annotation is a highlight
                    if annot.type[0] == 15 or 8:  # Type 8 corresponds to a highlight annotation
                        # Get the rectangle of the highlight
                        rect = annot.rect
                    
                        x0, y0, x1, y1 = rect  # Unpack rectangle coordinates
                            
                        # Extract the corresponding portion of the page as an image
                        image = page.get_pixmap(matrix=fitz.Matrix(2, 2), clip=rect)
                        # print(image)
                        # Convert the image to PIL format
                        
                        pil_image = Image.frombytes("RGB", [image.width, image.height], image.samples)
                    
                        # print(pil_image)
                            # Save the image
                        image_name = f"page_{page_number}_annot_{random.randint(1, 100)}.png"
                        output_path = f"{output_folder}/{image_name}"
                        pil_image.save(output_path)
                        image_url = f"http://localhost:4000/api/image/{image_name}"
                        
                         # Create a dictionary with image path and annotation type
                        annotation_info = {
                            "image_url": image_url,
                            "annotation_type": annot.type[0],
                            "page_number":page_number
                        }
                        
                        # Append the dictionary to the list
                        annotation_list.append(annotation_info)
    
    json_output = json.dumps(annotation_list)

    # Print or return the JSON object
    print(json_output)


if __name__ == "__main__":
    main()
# Iam Getting INK values of 15 and able too get the images 

# Type:
# Annot : 15 INK
# Annot : 8 Highlight



