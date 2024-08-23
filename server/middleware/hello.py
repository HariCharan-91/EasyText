import os




pdf_directory = '../uploads'

    # List all files in the directory
files = os.listdir(pdf_directory)


    # Filter PDF files
pdf_files = [file for file in files if file.endswith('.pdf')]


    # Sort PDF files by modification time (descending order)
pdf_files.sort(key=lambda x: os.path.getmtime(os.path.join(pdf_directory, x)), reverse=True)

    # Get the path to the last modified PDF file
last_pdf_file = os.path.join(pdf_directory, pdf_files[0])

print(last_pdf_file)