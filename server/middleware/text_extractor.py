import fitz
from scipy.spatial import KDTree
from webcolors import hex_to_rgb
import json
import os

# RGB colors to color name
def convert_rgb_to_names(rgb_tuple):
    # a dictionary of all the hex and their respective names in css3
    css3_db = {
        "#EB4949": "red",
        "#7CF066": "green",
        "#8EDDF9": "blue",
        "#FFF066": "yellow",
        "#F699D1": "pink",
    }
    names = []
    rgb_values = []
    for color_hex, color_name in css3_db.items():
        names.append(color_name)
        rgb_values.append(hex_to_rgb(color_hex))
    kdt_db = KDTree(rgb_values)
    distance, index = kdt_db.query(rgb_tuple)
    return names[index]


def highlight_color(annot):
    # Getting the stroke vlaues ( R G B)
    # print(annot.colors["stroke"])
    # Converting the RGB values
    rgb_value = [int(val * 255) for val in annot.colors["stroke"]]
    # print(f"rgb_value: {rgb_value}")
    closest_name = convert_rgb_to_names((rgb_value))
    # print(f"color name: { closest_name}")
    return closest_name

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
 
    # python_script_path = os.path.abspath("./uploads/text.pdf")
    # Getting the text from the page
    Highlight_dic = {"Red": [], "Green": [], "Blue": [], "Pink": [], "Yellow": []}
    doc = fitz.open(latestfile_path())
    for page in doc:
        # words = page.get_text()
        # print(words)
        annotations = page.annots()
        for annot in annotations:
            # Check if annotation is a highlight
            if annot.type[0] == 8:  # Type 8 corresponds to a highlight annotation
                # Get the rectangle of the highlight
                rect = annot.rect
                # Get the color of the Highlighted.
                Color = highlight_color(annot)
                # print(f"rect :{rect} ")
                # Extract text from the highlighted area and append them in the boxes
                for color, list_high in Highlight_dic.items():
                    if color.lower() == Color:
                        list_high.append(page.get_text("text", clip=rect))
    # print(Highlight_dic)
    json_data = json.dumps(Highlight_dic)
    print(json_data)
   
    # return json_data

if __name__ == "__main__":
    main()