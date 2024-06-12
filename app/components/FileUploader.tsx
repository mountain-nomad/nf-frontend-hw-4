import React, { useState } from 'react';
import {axiosUploadInstance} from '../lib/axiosUploadInstance';
import './FileUploader.css';

function FileUploader({ setImageURL }: { setImageURL: (url: string) => void }) {
    const [file, setFile] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [status, setStatus] = useState('');
  const [loadedBytes, setLoadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setFile(file ? URL.createObjectURL(file) : '');
      const formData = new FormData();
      formData.append("file", file);

      axiosUploadInstance.post("files/upload", formData, {
          onUploadProgress: (progressEvent) => {
            const loaded = progressEvent.loaded;
            const total = progressEvent.total || 0;
            setLoadedBytes(loaded);
            setTotalBytes(total);
            const percent = total > 0 ? (loaded / total) * 100 : 0;
            setUploadProgress(Math.round(percent));
            setStatus(Math.round(percent) + "% uploaded...");
          },
        })
        .then((response) => {
          setStatus("Upload successful!");
          setUploadProgress(100);
          setImageURL(response.data.url);
          console.log(response.data);
        })
        .catch((error) => {
          setStatus("Upload failed!");
          setImageURL("https://api.escuelajs.co/api/v1/files");
          console.error(error);
        });
    }
  };

  return (
    <div className="file-uploader-container">
      <input type="file" name="file" onChange={uploadFile} />
      <label>
        File progress: <progress value={uploadProgress} max="100" />
      </label>
      <p>{status}</p>
      <p>uploaded {loadedBytes} bytes of {totalBytes}</p>
      {file && <img src={file} alt="Preview" style={{ width: "300px", height: "100px" }} />}
    </div>
  );
}

export default FileUploader;