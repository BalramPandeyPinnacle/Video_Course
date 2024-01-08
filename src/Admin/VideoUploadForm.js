// import React, { useState } from 'react';

// const VideoUploadForm = () => {

//   const [file, setFile] = useState(null);
//   const[loading,setLoading]=useState();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('video', file);

//       const response = await fetch('http://localhost:3001/api/upload-video', {
//         method: 'POST',
//         body: formData,
        
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log('Video uploaded successfully:', data.s3Key);
//       } else {
//         console.error('Failed to upload video');
//       }
//     } catch (error) {
//       console.error('Error uploading video:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" accept="video/*" onChange={handleFileChange} />
//       <button onClick={handleUpload}>Upload Video</button>
//     </div>
//   );
// };

// export default VideoUploadForm;


// test02


import React, { useState } from 'react';

const VideoUploadForm = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploaded(false); // Reset uploaded state when a new file is selected
  };

  const handleUpload = async () => {
    try {
      setLoading(true); // Set loading to true while uploading

      const formData = new FormData();
      formData.append('video', file);

      const response = await fetch('http://localhost:3001/api/upload-video',{
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Video uploaded successfully:', data.s3Key);
        setUploaded(true); // Set uploaded to true when upload is successful
      } else {
        console.error('Failed to upload video');
      }
    } catch (error) {
      console.error('Error uploading video:', error);
    } finally {
      setLoading(false); // Set loading back to false, regardless of success or failure
    }
  };

  return (
    <div>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        Upload Video
      </button>
      {loading && <div>Uploading...</div>}
      {uploaded && <div>Video uploaded successfully! </div>}
    </div>
  );
};

export default VideoUploadForm;
