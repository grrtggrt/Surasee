import React, { useRef, useState } from "react";
import { FaCloudArrowUp, FaX, FaRegFileLines, FaCheck } from "react-icons/fa6";
import axios from "axios";
import "./ImportData.scss";

const ImportData = () => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = "";
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus("select");
  };

  const handleUpload = async () => {
    if (uploadStatus === "done") {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus("uploading");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("http://localhost:5173/", formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      });

      setUploadStatus("done");
    } catch (error) {
      setUploadStatus("select");
    }
  };

  return (
    <div className="main-content-center">
      <div className="uploadFileContent">
        <input
          ref={inputRef}
          type="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        {!selectedFile && (
          <button className="file-btn" onClick={onChooseFile}>
            <span>
              <FaCloudArrowUp />
            </span>
            Upload File
          </button>
        )}

        {selectedFile && (
          <>
            <div className="file-card">
              <span>
                <FaRegFileLines />
              </span>
              <div className="file-info">
                <div style={{ flex: 1 }}>
                  <h6>{selectedFile.name}</h6>
                  <div className="progress-bg">
                    <div
                      className="progress"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                {uploadStatus === "select" ? (
                  <button onClick={clearFileInput}>
                    <span>
                      <FaX />
                    </span>
                  </button>
                ) : (
                  <div className="check-circle">
                    {uploadStatus === "uploading" ? (
                      `${progress}%`
                    ) : uploadStatus === "done" ? (
                      <span>
                        <FaCheck />
                      </span>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
            <button className="upload-btn" onClick={handleUpload}>
              {uploadStatus === "select" || uploadStatus === "uploading"
                ? "Upload"
                : "Done"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ImportData;
