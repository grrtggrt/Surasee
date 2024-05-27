import React, { useState, useEffect, useRef  } from "react";
import { Modal, Row, Col, Button, Form, CloseButton } from "react-bootstrap";
import { FaX, FaCheck, FaCloudArrowUp, FaRegFileLines, } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";

// styles
import "../../styles/Modal.scss";

const PopupImportData = (props) => {
  const { show, hide, } = props;
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("select");

  const inputRef = useRef();

  useEffect(() => {
 
  }, []);

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

  const handleSaveConfirm = () => {
    Swal.fire({
      title: "ต้องการบันทึกข้อมูลใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        updateUserProfile();
      }
    });
  };

  
  return (
    <Modal show={show} onHide={hide} size="md" centered>
      <Modal.Header>
        <Modal.Title>Upload Data</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Row className="m-1 border border-1 border-success rounded-3" style={{ height: '220px'}}>
          <Col className="d-flex flex-column justify-content-center align-items-center">
            <input
              ref={inputRef}
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            {!selectedFile && (
              <Button variant="success" onClick={onChooseFile} className="ps-4 pe-4">
                  <FaCloudArrowUp className="me-2" />
                  <span>Upload File</span>
              </Button>
            )}

            {selectedFile && (
              <>
                <div className="d-flex justify-content-center align-items-center gap-3 p-2 border border-1 rounded-3 w-75">
                  <FaRegFileLines className="text-success fs-3" />
                  <div className="d-flex align-items-center gap-3" style={{ flex: 1 }}>
                    <div style={{ flex: 1 }}>
                      <p className="fs-6">{selectedFile.name}</p>
                      <div className="w-100 rounded-pill" style={{ height: '5px', backgroundColor: '#DEE2E6' }}>
                        <div
                          className="rounded-pill bg-success"
                          style={{ width: `${progress}%`, height: '5px', transition: 'width 0.5s ease', backgroundColor: '#03a96b' }}
                        />
                        </div>
                    </div>

                    {uploadStatus === "select" ? (
                      <Button variant="btn-circle" onClick={clearFileInput}>
                          <FaX className="text-danger"/>
                      </Button>
                    ) : (
                      <div >
                        {uploadStatus === "uploading" ? (
                          <p className="text-success mb-0">{progress}%</p>
                        ) : uploadStatus === "done" ? (
                            <FaCheck className="text-success fs-4"/>
                        ) : null}
                      </div>
                    )}
                  </div>
                </div>
                <Button variant="success" className="w-25 mt-3" onClick={handleUpload}>
                {uploadStatus === "select" || uploadStatus === "uploading"
                    ? <p>Upload</p>
                    : <p>Done</p>}
              </Button>
              </>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupImportData;
