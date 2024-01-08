// import React, { useState } from 'react';

// const PdfUploadForm = ({ onUploadPdf }) => {
//   const [pdfFile, setPdfFile] = useState(null);

//   const handleFileChange = (e) => {
//     setPdfFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (pdfFile) {
//       try {
//         const formData = new FormData();
//         formData.append('pdf', pdfFile); // Use 'pdf' as the key

//         const response = await fetch('http://localhost:3001/api/upload-pdf', {
//           method: 'POST',
//           body: formData,
//         });

//         if (response.ok) {
//           const data = await response.json();
//           console.log('PDF uploaded successfully!', data.s3Key);
//           // You can handle additional logic after a successful upload, if needed
//         //   onUploadPdf();
//         } else {
//           console.error('Failed to upload PDF');
//         }
//       } catch (error) {
//         console.error('Error uploading PDF:', error);
//       }
    
//       // Clear the form after upload
//       setPdfFile(null);
//     } else {
//       console.error('Please select a PDF file.');
//     }
//   };

//   return (
//     <div>
//       <h4>Upload PDF</h4>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload PDF</button>
//     </div>
//   );
// };

// export default PdfUploadForm;


// test 02

import React, { useState } from 'react';

const PdfUploadForm = ({ onUploadPdf }) => {
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('idle'); // States: 'idle', 'uploading', 'success', 'error'

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (pdfFile) {
      setUploadStatus('uploading');
      try {
        const formData = new FormData();
        formData.append('pdf', pdfFile); // Use 'pdf' as the key

        const response = await fetch('http://localhost:3001/api/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          console.log('PDF uploaded successfully!', data.s3Key);
          setUploadStatus('success');
          // You can handle additional logic after a successful upload, if needed
          // onUploadPdf();
        } else {
          console.error('Failed to upload PDF');
          setUploadStatus('error');
        }
      } catch (error) {
        console.error('Error uploading PDF:', error);
        setUploadStatus('error');
      }

      // Clear the form after upload
      setPdfFile(null);
    } else {
      console.error('Please select a PDF file.');
      setUploadStatus('error');
    }
  };

  return (
    <div>
      <h4>Upload PDF</h4>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload PDF</button>

      {uploadStatus === 'uploading' && <div>Uploading...</div>}
      {uploadStatus === 'success' && <div>PDF uploaded successfully!</div>}
      {uploadStatus === 'error' && <div>Error uploading PDF. Please try again.</div>}
    </div>
  );
};

export default PdfUploadForm;
