import React, { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import NavBar from '../components/NavBar';
import PdfCard from '../components/pdfCard';
import './pagesCss/HomePage.css';

const HomePage = () => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [existingPdfs, setExistingPdfs] = useState([]);

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/pdf', {
          headers: {
            'x-auth-token': localStorage.getItem('token')
          }
        });
        setExistingPdfs(data);
      } catch (err) {
        console.error('Error fetching PDFs: ' + (err.response?.data || err.message));
      }
    };
    fetchPdfs();
  }, []);

  const onDrop = (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setError('Only PDF files are allowed.');
        setFile(null);
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB in bytes
        setError('File size exceeds the maximum limit of 5MB.');
        setFile(null);
        return;
      }

      const duplicateFile = existingPdfs.find(
        (pdf) => pdf.fileName === selectedFile.fileName && pdf.size === selectedFile.size
      );
      if (duplicateFile) {
        setError('This file has already been uploaded.');
        setFile(null);
        return;
      }

      setError('');
      setFile(selectedFile);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('pdf', file);
    try {
      await axios.post('http://localhost:4000/api/pdf/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-auth-token': localStorage.getItem('token')
        }
      });
      alert('File uploaded successfully');
      window.location.reload();
    } catch (err) {
      alert('Error uploading file: ' + (err.response?.data || err.message));
    }
  };

  return (
    <div>
      <NavBar />
      <div className="upload-page">
        <div className="upload-section">
          <h1>Upload PDF</h1>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag 'n' drop a PDF file here, or click to select a file <br></br>
              Maximum PDF size is 5MB</p>
            )}
          </div>
          {file && <p>Selected file: {file.name}</p>}
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleUpload} className="upload-form">
            <button type="submit" className="upload-button" disabled={!file || !!error}>
              Upload
            </button>
          </form>
        </div>
        <div>
          <PdfCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
