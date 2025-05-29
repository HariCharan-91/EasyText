from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app)

# Middleware for file upload
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() == 'pdf'

# Serve static files
@app.route('/api/image/<path:filename>')
def serve_image(filename):
    return send_from_directory('uploads/ImageStorage', filename)

@app.route('/api/pdf/<path:filename>')
def serve_pdf(filename):
    return send_from_directory('uploads/pdfFiles', filename)

# Example route
@app.route('/api/example', methods=['GET'])
def example_route():
    return jsonify({'message': 'Hello from Flask!'})

# Upload PDF route
@app.route('/api/upload', methods=['POST'])
def upload_pdf():
    if 'pdf' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    file = request.files['pdf']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        file.save(os.path.join('uploads/pdfFiles', filename))
        return jsonify({'message': 'File uploaded successfully'}), 200
    return jsonify({'error': 'File type not allowed'}), 400

# Get all PDFs route
@app.route('/api/getpdf', methods=['GET'])
def get_all_pdfs():
    pdfs = os.listdir('uploads/pdfFiles')
    return jsonify({'pdfs': pdfs}), 200

# Get specific PDF route
@app.route('/api/getpdf/<filename>', methods=['GET'])
def get_pdf(filename):
    return send_from_directory('uploads/pdfFiles', filename)

if __name__ == '__main__':
    app.run(debug=True, port=4000) 