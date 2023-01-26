import React, { useState } from 'react';

const FilerUploader = () => {
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    setIsUploading(true);
    setUploadProgress(0);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: data,
      });
      res.body.on('data', (data) => {
        const progress = parseInt(data.toString().split(': ')[1].split('%')[0], 10);
        setUploadProgress(progress);
      });
      const result = await res.json();
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    setIsUploading(false);
  };

  return (
    <div className="p-12 bg-cyan-100 flex-col">
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload} disabled={isUploading}>
        {isUploading ? 'Uploading...' : 'Upload'}
      </button>
      {isUploading && <p>Upload Progress: {uploadProgress}%</p>}
    </div>
  );
};

export default FilerUploader;
