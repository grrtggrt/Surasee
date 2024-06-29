import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  Row,
  Col,
  Button,
  CloseButton,
  Table,
  Card,
  Pagination,
} from "react-bootstrap";
import {
  FaX,
  FaCheck,
  FaCloudArrowUp,
  FaRegFileLines,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";

// styles
import "../../styles/Modal.scss";

const PopupImportData = (props) => {
  const { show, hide } = props;
  const [selectedFileSubject, setSelectedFileSubject] = useState(null);
  const [selectedFileMajor, setSelectedFileMajor] = useState(null);
  const [selectedFileBuilding, setSelectedFileBuilding] = useState(null);
  const [progressSubject, setProgressSubject] = useState(0);
  const [progressMajor, setProgressMajor] = useState(0);
  const [progressBuilding, setProgressBuilding] = useState(0);
  const [uploadStatusSubject, setUploadStatusSubject] = useState("select");
  const [uploadStatusMajor, setUploadStatusMajor] = useState("select");
  const [uploadStatusBuilding, setUploadStatusBuilding] = useState("select");
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const inputRefSubject = useRef();
  const inputRefMajor = useRef();
  const inputRefBuilding = useRef();

  const handleFileChangeSubject = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileSubject(event.target.files[0]); // เปลี่ยนจาก setselectedFileSubject เป็น setSelectedFileSubject
    }
  };

  const handleFileChangeMajor = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileMajor(event.target.files[0]);
    }
  };

  const handleFileChangeBuilding = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileBuilding(event.target.files[0]);
    }
  };

  const onChooseFileSubject = () => {
    inputRefSubject.current.click();
  };

  const onChooseFileMajor = () => {
    inputRefMajor.current.click();
  };

  const onChooseFileBuilding = () => {
    inputRefBuilding.current.click();
  };

  const clearFileInputSubject = () => {
    if (inputRefSubject.current) inputRefSubject.current.value = "";
    setSelectedFileSubject(null);
    setProgressSubject(0);
    setUploadStatusSubject("select");
  };

  const clearFileInputMajor = () => {
    if (inputRefMajor.current) inputRefMajor.current.value = "";
    setSelectedFileMajor(null);
    setProgressMajor(0);
    setUploadStatusMajor("select");
  };

  const clearFileInputBuilding = () => {
    if (inputRefBuilding.current) inputRefBuilding.current.value = "";
    setSelectedFileBuilding(null);
    setProgressBuilding(0);
    setUploadStatusBuilding("select");
  };

  const resetForm = () => {
    clearFileInputSubject();
    clearFileInputMajor();
    clearFileInputBuilding();
    setProgressSubject(0);
    setProgressMajor(0);
    setProgressBuilding(0);
    setUploadStatusSubject("select");
    setUploadStatusMajor("select");
    setUploadStatusBuilding("select");
  };

  const handleUploadSubject = async () => {
    if (uploadStatusSubject === "done") {
      clearFileInputSubject();
      return;
    }

    try {
      setUploadStatusSubject("uploading");

      const formData = new FormData();
      formData.append("file", selectedFileSubject);

      const response = await axios.post(
        "http://localhost:5500/api/uploadSubject",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompletedSubject = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressSubject(percentCompletedSubject);
          },
        }
      );

      if (response.status === 200) {
        setUploadStatusSubject("done");

        const now = new Date();
        const fileData = {
          name: selectedFileSubject.name,
          time: now.toLocaleString(),
          table: "Subject",
        };
        await axios.post(
          "http://localhost:5500/api/uploadFileStatus",
          fileData
        );

        setUploadedFiles((prevFiles) => [...prevFiles, fileData]);

        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setUploadStatusSubject("select");
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล",
        showConfirmButton: false,
        timer: 1500,
      });
      clearFileInputSubject();
    }
  };

  const handleUploadMajor = async () => {
    if (uploadStatusMajor === "done") {
      clearFileInputMajor();
      return;
    }

    try {
      setUploadStatusMajor("uploading");

      const formData = new FormData();
      formData.append("file", selectedFileMajor);

      const response = await axios.post(
        "http://localhost:5500/api/uploadMajor",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompletedMajor = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressMajor(percentCompletedMajor);
          },
        }
      );

      if (response.status === 200) {
        setUploadStatusMajor("done");

        const now = new Date();
        const fileData = {
          name: selectedFileMajor.name,
          time: now.toLocaleString(),
          table: "Major",
        };
        await axios.post(
          "http://localhost:5500/api/uploadFileStatus",
          fileData
        );

        setUploadedFiles((prevFiles) => [...prevFiles, fileData]);

        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setUploadStatusMajor("select");
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล",
        showConfirmButton: false,
        timer: 1500,
      });
      clearFileInputMajor();
    }
  };

  const handleUploadBuilding = async () => {
    if (uploadStatusBuilding === "done") {
      clearFileInputBuilding();
      return;
    }

    try {
      setUploadStatusBuilding("uploading");

      const formData = new FormData();
      formData.append("file", selectedFileBuilding);

      const response = await axios.post(
        "http://localhost:5500/api/uploadBuilding",
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percentCompletedBuilding = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgressBuilding(percentCompletedBuilding);
          },
        }
      );

      if (response.status === 200) {
        setUploadStatusBuilding("done");

        const now = new Date();
        const fileData = {
          name: selectedFileBuilding.name,
          time: now.toLocaleString(),
          table: "Building",
        };
        await axios.post(
          "http://localhost:5500/api/uploadFileStatus",
          fileData
        );

        setUploadedFiles((prevFiles) => [...prevFiles, fileData]);

        Swal.fire({
          icon: "success",
          title: "เพิ่มข้อมูลเสร็จสิ้น",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      setUploadStatusBuilding("select");
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเพิ่มข้อมูล",
        showConfirmButton: false,
        timer: 1500,
      });
      clearFileInputBuilding();
    }
  };

  useEffect(() => {
    fetchUploadedFiles();
  }, []);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/FileStatus");
      const formattedData = response.data.map((file) => ({
        ...file,
        time: new Date(file.time).toLocaleString(),
      }));
      setUploadedFiles(formattedData);
    } catch (error) {
      console.error("Error fetching uploaded files", error);
    }
  };

  const itemsPerPage = 13;
  const maxPageButtons = 5;

  const [currentPageUpload, setCurrentPageUpload] = useState(1);
  const indexOfLastItemUpload = currentPageUpload * itemsPerPage;
  const indexOfFirstItemUpload = indexOfLastItemUpload - itemsPerPage;

  const sortedDataUpload = uploadedFiles.sort(
    (a, b) => new Date(b.time) - new Date(a.time)
  );

  const displayDataUpload = sortedDataUpload.slice(
    indexOfFirstItemUpload,
    indexOfLastItemUpload
  );

  const pageNumbersUpload = [];
  let startPageUpload = 1;
  let endPageUpload = Math.min(
    startPageUpload + maxPageButtons - 1,
    Math.ceil(uploadedFiles.length / itemsPerPage)
  );
  if (currentPageUpload > Math.floor(maxPageButtons / 2)) {
    startPageUpload = currentPageUpload - Math.floor(maxPageButtons / 2);
    endPageUpload = Math.min(
      startPageUpload + maxPageButtons - 1,
      Math.ceil(uploadedFiles.length / itemsPerPage)
    );
  }
  for (let i = startPageUpload; i <= endPageUpload; i++) {
    pageNumbersUpload.push(i);
  }
  const paginateUpload = (pageNumber) => setCurrentPageUpload(pageNumber);

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        hide();
      }}
      size="xl"
      centered
    >
      <Modal.Header>
        <Modal.Title>เพิ่มข้อมูล</Modal.Title>
        <CloseButton
          variant="white"
          onClick={() => {
            resetForm();
            hide();
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4} className="d-flex flex-column gap-4">
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  position: "relative",
                  fontSize: "18px",
                }}
              >
                <p>วิชา</p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="d-flex flex-column justify-content-center align-items-center p-5">
                    <input
                      ref={inputRefSubject}
                      type="file"
                      onChange={handleFileChangeSubject}
                      style={{ display: "none" }}
                    />
                    {!selectedFileSubject && (
                      <Button
                        variant="success"
                        onClick={() => onChooseFileSubject()}
                        className="d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaCloudArrowUp />
                        <span>Upload File</span>
                      </Button>
                    )}

                    {selectedFileSubject && (
                      <>
                        <Card className="d-flex flex-row align-items-center gap-3 p-2">
                          <FaRegFileLines className="text-success fs-3" />
                          <div className="d-flex flex-column gap-1">
                            <p>{selectedFileSubject.name}</p>
                            <div
                              className="w-100 rounded-pill"
                              style={{
                                height: "5px",
                                backgroundColor: "#DEE2E6",
                              }}
                            >
                              <div
                                className="rounded-pill bg-success"
                                style={{
                                  width: `${progressSubject}%`,
                                  height: "5px",
                                  transition: "width 0.5s ease",
                                  backgroundColor: "#03a96b",
                                }}
                              />
                            </div>
                          </div>

                          {uploadStatusSubject === "select" ? (
                            <Button
                              variant="btn-icon"
                              className="p-1"
                              onClick={() => clearFileInputSubject()}
                            >
                              <FaX className="text-danger fs-5" />
                            </Button>
                          ) : (
                            <div>
                              {uploadStatusSubject === "uploading" ? (
                                <p className="text-success mb-0">
                                  {progressSubject}%
                                </p>
                              ) : uploadStatusSubject === "done" ? (
                                <FaCheck className="text-success fs-4" />
                              ) : null}
                            </div>
                          )}
                        </Card>
                        <Button
                          variant="success"
                          onClick={() => handleUploadSubject()}
                          className="mt-2"
                        >
                          {uploadStatusSubject === "select" ||
                          uploadStatusSubject === "uploading" ? (
                            <p>Upload</p>
                          ) : (
                            <p>Done</p>
                          )}
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  position: "relative",
                  fontSize: "18px",
                }}
              >
                <p>สาขา</p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="d-flex flex-column justify-content-center align-items-center p-5">
                    <input
                      ref={inputRefMajor}
                      type="file"
                      onChange={handleFileChangeMajor}
                      style={{ display: "none" }}
                    />
                    {!selectedFileMajor && (
                      <Button
                        variant="success"
                        onClick={onChooseFileMajor}
                        className="d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaCloudArrowUp />
                        <span>Upload File</span>
                      </Button>
                    )}

                    {selectedFileMajor && (
                      <>
                        <Card className="d-flex flex-row align-items-center gap-3 p-2">
                          <FaRegFileLines className="text-success fs-3" />
                          <div className="d-flex flex-column gap-1">
                            <p>{selectedFileMajor.name}</p>
                            <div
                              className="w-100 rounded-pill"
                              style={{
                                height: "5px",
                                backgroundColor: "#DEE2E6",
                              }}
                            >
                              <div
                                className="rounded-pill bg-success"
                                style={{
                                  width: `${progressMajor}%`,
                                  height: "5px",
                                  transition: "width 0.5s ease",
                                  backgroundColor: "#03a96b",
                                }}
                              />
                            </div>
                          </div>

                          {uploadStatusMajor === "select" ? (
                            <Button
                              variant="btn-icon"
                              className="p-1"
                              onClick={() => clearFileInputMajor()}
                            >
                              <FaX className="text-danger fs-5" />
                            </Button>
                          ) : (
                            <div>
                              {uploadStatusMajor === "uploading" ? (
                                <p className="text-success mb-0">
                                  {progressMajor}%
                                </p>
                              ) : uploadStatusMajor === "done" ? (
                                <FaCheck className="text-success fs-4" />
                              ) : null}
                            </div>
                          )}
                        </Card>
                        <Button
                          variant="success"
                          onClick={handleUploadMajor}
                          className="mt-2"
                        >
                          {uploadStatusMajor === "select" ||
                          uploadStatusMajor === "uploading" ? (
                            <p>Upload</p>
                          ) : (
                            <p>Done</p>
                          )}
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  position: "relative",
                  fontSize: "18px",
                }}
              >
                <p>อาคาร</p>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col className="d-flex flex-column justify-content-center align-items-center p-5">
                    <input
                      ref={inputRefBuilding}
                      type="file"
                      onChange={handleFileChangeBuilding}
                      style={{ display: "none" }}
                    />
                    {!selectedFileBuilding && (
                      <Button
                        variant="success"
                        onClick={onChooseFileBuilding}
                        className="d-flex align-items-center justify-content-center gap-2"
                      >
                        <FaCloudArrowUp />
                        <span>Upload File</span>
                      </Button>
                    )}

                    {selectedFileBuilding && (
                      <>
                        <Card className="d-flex flex-row align-items-center gap-3 p-2">
                          <FaRegFileLines className="text-success fs-3" />
                          <div className="d-flex flex-column gap-1">
                            <p>{selectedFileBuilding.name}</p>
                            <div
                              className="w-100 rounded-pill"
                              style={{
                                height: "5px",
                                backgroundColor: "#DEE2E6",
                              }}
                            >
                              <div
                                className="rounded-pill bg-success"
                                style={{
                                  width: `${progressBuilding}%`,
                                  height: "5px",
                                  transition: "width 0.5s ease",
                                  backgroundColor: "#03a96b",
                                }}
                              />
                            </div>
                          </div>

                          {uploadStatusBuilding === "select" ? (
                            <Button
                              variant="btn-icon"
                              className="p-1"
                              onClick={() => clearFileInputBuilding()}
                            >
                              <FaX className="text-danger fs-5" />
                            </Button>
                          ) : (
                            <div>
                              {uploadStatusBuilding === "uploading" ? (
                                <p className="text-success mb-0">
                                  {progressBuilding}%
                                </p>
                              ) : uploadStatusBuilding === "done" ? (
                                <FaCheck className="text-success fs-4" />
                              ) : null}
                            </div>
                          )}
                        </Card>
                        <Button
                          variant="success"
                          onClick={handleUploadBuilding}
                          className="mt-2"
                        >
                          {uploadStatusBuilding === "select" ||
                          uploadStatusBuilding === "uploading" ? (
                            <p>Upload</p>
                          ) : (
                            <p>Done</p>
                          )}
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8}>
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  position: "relative",
                  fontSize: "18px",
                }}
              >
                สถานะอัปโหลด
              </Card.Header>
              <Card.Body className="p-0">
                <Row>
                  <Table
                    responsive
                    striped
                    hover
                    bordered
                    className="m-0"
                    style={{
                      tableLayout: "fixed",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#03a96b",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <th className="fw-normal" style={{ width: "30%" }}>
                          File Name
                        </th>
                        <th className="fw-normal" style={{ width: "20%" }}>
                          Table
                        </th>
                        <th className="fw-normal" style={{ width: "50%" }}>
                          DateTime
                        </th>
                      </tr>
                    </thead>
                    <tbody className="custom-table-body">
                      {displayDataUpload.map((item, index) => (
                        <tr key={index}>
                          <td style={{ textAlign: "center" }}>{item.name}</td>
                          <td style={{ textAlign: "center" }}>{item.table}</td>
                          <td style={{ textAlign: "center" }}>
                            {new Date(item.time).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                      {displayDataUpload.length < itemsPerPage && (
                        <>
                          {[
                            ...Array(itemsPerPage - displayDataUpload.length),
                          ].map((_, index) => (
                            <tr key={index}>
                              <td>
                                <br />
                              </td>
                              <td>
                                <br />
                              </td>
                              <td>
                                <br />
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </Table>
                  <Pagination className="d-flex justify-content-end align-items-center gap-3 pt-3 pe-3">
                    <p style={{ color: "#4a4f55" }}>
                      Page {currentPageUpload} of{" "}
                      {Math.ceil(uploadedFiles.length / itemsPerPage)}
                    </p>
                    {currentPageUpload > 1 && (
                      <Button
                        variant="success"
                        onClick={() => paginateUpload(currentPageUpload - 1)}
                      >
                        <FaChevronLeft />
                      </Button>
                    )}
                    {pageNumbersUpload.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPageUpload}
                        onClick={() => paginateUpload(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                    {currentPageUpload <
                      Math.ceil(uploadedFiles.length / itemsPerPage) && (
                      <Button
                        variant="success"
                        onClick={() => paginateUpload(currentPageUpload + 1)}
                      >
                        <FaChevronRight />
                      </Button>
                    )}
                  </Pagination>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupImportData;
