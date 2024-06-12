# PDF Uploader

This is a simple web application for uploading, listing, and viewing PDF files. It allows users to upload PDF files, view a list of uploaded PDFs, and view individual PDF files.

## Features

- **Upload PDF**: Users can upload PDF files using a drag drop method or by selecting the file.
- **List PDFs**: Users can see a list of all uploaded PDF files with their names.
- **View PDF**: Users can click on a PDF file name to view the PDF in the browser.

## Technologies Used

- **Frontend**: React.js, react-pdf for PDF rendering
- **Backend**: Node.js, Express.js
- **Database**: MongoDB 
- **Authentication**: JSON Web Tokens (JWT) 
- **Styling**: CSS, Bootstrap
- **File Upload**: Multer (for handling file uploads)

## Setup
1. Clone the repository: 
git clone https://github.com/Kavinsha-Chamod/PDF-Uploader.git

2. Server side and the Client side both are in this file. So first you can install dependencies:
2. i. cd server
      npm install
2. ii. cd client
       npm install

3. Start the Server side: 
nodemon server

4. Start the Client side:
npm start

## Usage
1. Visit http://localhost:3000 in your browser to access the PDF uploader application.
2. Signup / Logging to the application
3. Upload a PDF file using the upload form.
4. View the list of uploaded PDF files.
5. Click on a PDF file name to view the PDF in the browser.


