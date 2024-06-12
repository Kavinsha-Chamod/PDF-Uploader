import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import './pagesCss/PdfViewerPage.css';

pdfjs.GlobalWorkerOptions.workerSrc = `${process.env.PUBLIC_URL}/pdf.worker.mjs`;

const PDFViewerPage = () => {
  const { id } = useParams();
  const [pdfUrl, setPdfUrl] = useState('');
  const [numPages, setNumPages] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPdf = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/pdf/${id}`, {
          responseType: 'blob',
          headers: { 'x-auth-token': localStorage.getItem('token') }
        });
        const url = URL.createObjectURL(response.data);
        setPdfUrl(url);
      } catch (error) {
        console.error('Error fetching PDF:', error);
        setError(error);
      }
    };

    fetchPdf();
  }, [id]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  if (error) {
    return <div>Error fetching PDF: {error.message}</div>;
  }

  return (
    <div className="pdf-viewer-container">
      {pdfUrl ? (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={error => console.error('Error loading document:', error)}
          className="pdf-document"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              className="pdf-page"
            />
          ))}
        </Document>
      ) : (
        <p className="loading-message">Loading PDF...</p>
      )}
    </div>
  );
};

export default PDFViewerPage;
