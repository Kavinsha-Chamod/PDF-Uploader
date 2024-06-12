import React from 'react'
import NavBar from '../components/NavBar';
import './pagesCss/LandingPage.css';

const LandingPage =() => {
  return (
    <div>
      <div>
        <NavBar/>
      </div>
      <div className='page'>
      <div className='landingPage'>
        <h1 className='heading'>Welcome to PDF Uploader</h1>
        <p>Upload your PDFs and view them in the browser.</p>
      </div>
      <div className='upload'>
        <h4>Upload a PDF</h4>
      <div className='uploadPdf'>
        <p className='paragraph'>Our PDF Safe application provides a secure and convenient way to upload and store your PDF documents.With end-to-end encryption and robust security measures, your PDFs are kept safe and private.Safeguard your important documents with our PDF Safe application, ensuring peace of mind for your sensitive information.</p>
        <img src='https://cdn.discordapp.com/attachments/939781014430056451/1250400277861761084/pngwing.com.png?ex=666acd81&is=66697c01&hm=d104b4ae81c9e092526215d8c8e0cab328ccd3542ed9a2d05628d0597ed2989b&' alt='img' className='pdfImage'/>
      </div>
      </div>
    </div>
    </div>
  )
}

export default LandingPage;