import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  FaCloudArrowUp,
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaTrashCan,
} from "react-icons/fa6";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Pagination,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
//styles
import "./ImportData.scss";
import "../styles/Loader.scss";

import PopupImportData from "../pages/popup/PopupImportData";

const ImportData = () => {
  const inputRef = useRef();
  const [showPopupImportData, setShowPopupImportData] = useState(false);
  const [dataSubject, setDataSubject] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [selectedMajorSubject, setSelectedMajorSubject] = useState(null);
  const [selectedGradeSubject, setSelectedGradeSubject] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [inputSubject, setInputSubject] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputRoom, setInputRoom] = useState(0);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const fetchSubjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subject");
      setDataSubject(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  const fetchMajor = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/major");
      setDataMajor(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRoom(), fetchSubjects(), fetchMajor()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchRoom, fetchSubjects, fetchMajor]);

  //Popup
  const handleShowPopupImportData = () => setShowPopupImportData(true);
  const handleHidePopupImportData = () => setShowPopupImportData(false);

  const handleResetDataSubject = () => {
    setSelectedMajorSubject(null);
    setSelectedGradeSubject(null);
    setInputSubject("");
  };

  const handleResetDataMajor = () => {
    setSelectedFaculty(null);
    setSelectedMajor(null);
    setSelectedGrade(null);
    setInputMajor("");
  };

  const handleResetDataRoom = () => {
    setSelectedBuilding(null);
    setSelectedFloor(null);
    setInputRoom(0);
  };

  const handleSelectMajorSubject = (e) => {
    setSelectedMajorSubject(e);
  };

  const handleSelectGradeSubject = (e) => {
    setSelectedGradeSubject(e);
  };

  const handleSelectFaculty = (e) => {
    setSelectedFaculty(e);
  };

  const handleSelectMajor = (e) => {
    setSelectedMajor(e);
  };

  const handleSelectGrade = (e) => {
    setSelectedGrade(e);
  };

  const handleSelectBuilding = (e) => {
    setSelectedBuilding(e);
  };

  const handleSelectFloor = (e) => {
    setSelectedFloor(e);
  };

  useEffect(() => {
    setSelectedMajorSubject(null);
    setSelectedGradeSubject(null);
  }, [inputSubject]);

  useEffect(() => {
    setSelectedFaculty(null);
    setSelectedMajor(null);
    setSelectedGrade(null);
  }, [inputMajor]);

  const filterMajorSubject = [
    ...new Set(dataSubject.map((item) => item.major_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionMajorSubject = filterMajorSubject.map((major) => {
    return {
      label: major,
      value: major,
    };
  });

  const filterGradeSubject = [
    ...new Set(dataSubject.map((item) => item.grade)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionGradeSubject = filterGradeSubject.map((grade) => {
    return {
      label: grade,
      value: grade,
    };
  });

  const filterFaculty = [
    ...new Set(dataMajor.map((item) => item.fac_name)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionFaculty = filterFaculty.map((faculty) => {
    return {
      label: faculty,
      value: faculty,
    };
  });

  const filterMajor = [...new Set(dataMajor.map((item) => item.major_id))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const optionMajor = filterMajor.map((major) => {
    return {
      label: major,
      value: major,
    };
  });

  const filterGrade = [
    ...new Set(dataMajor.map((item) => item.major_grade)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionGrade = filterGrade.map((grade) => {
    return {
      label: grade,
      value: grade,
    };
  });

  const filterBuilding = [
    ...new Set(dataRoom.map((item) => item.build_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionBuilding = filterBuilding.map((buildingId) => {
    const building = dataRoom.find((item) => item.build_id === buildingId);
    return {
      label: building.build_name,
      value: buildingId,
    };
  });

  const filterfloor = [...new Set(dataRoom.map((item) => item.floor))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const optionfloor = filterfloor.map((floor) => ({
    label: floor,
    value: floor,
  }));

  // นับ CurrentItems ที่แสดงใน Table
  const itemsPerPage = 6;
  const maxPageButtons = 5;

  const [currentPageSubject, setCurrentPageSubject] = useState(1);
  const indexOfLastItemSubject = currentPageSubject * itemsPerPage;
  const indexOfFirstItemSubject = indexOfLastItemSubject - itemsPerPage;

  const sortedDataSubject = dataSubject.sort((a, b) => b.amount - a.amount);

  const displayDataSubject = sortedDataSubject.slice(
    indexOfFirstItemSubject,
    indexOfLastItemSubject
  );
  const pageNumbersSubject = [];
  let startPageSubject = 1;
  let endPageSubject = Math.min(
    startPageSubject + maxPageButtons - 1,
    Math.ceil(dataSubject.length / itemsPerPage)
  );
  if (currentPageSubject > Math.floor(maxPageButtons / 2)) {
    startPageSubject = currentPageSubject - Math.floor(maxPageButtons / 2);
    endPageSubject = Math.min(
      startPageSubject + maxPageButtons - 1,
      Math.ceil(dataSubject.length / itemsPerPage)
    );
  }
  for (let i = startPageSubject; i <= endPageSubject; i++) {
    pageNumbersSubject.push(i);
  }
  const paginateSubject = (pageNumber) => setCurrentPageSubject(pageNumber);

  const [currentPageRoom, setCurrentPageRoom] = useState(1);
  const indexOfLastItemRoom = currentPageRoom * itemsPerPage;
  const indexOfFirstItemRoom = indexOfLastItemRoom - itemsPerPage;

  const sortedDataRoom = dataRoom.sort((a, b) => a.build_id - b.build_id);

  const displayDataRoom = sortedDataRoom.slice(
    indexOfFirstItemRoom,
    indexOfLastItemRoom
  );
  const pageNumbersRoom = [];
  let startPageRoom = 1;
  let endPageRoom = Math.min(
    startPageRoom + maxPageButtons - 1,
    Math.ceil(dataRoom.length / itemsPerPage)
  );
  if (currentPageRoom > Math.floor(maxPageButtons / 2)) {
    startPageRoom = currentPageRoom - Math.floor(maxPageButtons / 2);
    endPageRoom = Math.min(
      startPageRoom + maxPageButtons - 1,
      Math.ceil(dataRoom.length / itemsPerPage)
    );
  }
  for (let i = startPageRoom; i <= endPageRoom; i++) {
    pageNumbersRoom.push(i);
  }
  const paginateRoom = (pageNumber) => setCurrentPageRoom(pageNumber);

  const [currentPageMajor, setCurrentPageMajor] = useState(1);
  const indexOfLastItemMajor = currentPageMajor * itemsPerPage;
  const indexOfFirstItemMajor = indexOfLastItemMajor - itemsPerPage;

  const sortedDataMajor = dataMajor
    .filter((item) => item.major_grade >= 1 && item.major_grade <= 4)
    .sort((a, b) => a.major_grade - b.major_grade);

  const displayDataMajor = sortedDataMajor.slice(
    indexOfFirstItemMajor,
    indexOfLastItemMajor
  );
  const pageNumbersMajor = [];
  let startPageMajor = 1;
  let endPageMajor = Math.min(
    startPageMajor + maxPageButtons - 1,
    Math.ceil(dataMajor.length / itemsPerPage)
  );
  if (currentPageMajor > Math.floor(maxPageButtons / 2)) {
    startPageMajor = currentPageMajor - Math.floor(maxPageButtons / 2);
    endPageMajor = Math.min(
      startPageMajor + maxPageButtons - 1,
      Math.ceil(dataMajor.length / itemsPerPage)
    );
  }
  for (let i = startPageMajor; i <= endPageMajor; i++) {
    pageNumbersMajor.push(i);
  }
  const paginateMajor = (pageNumber) => setCurrentPageMajor(pageNumber);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 800);
  }, []);

  return (
    <>
      {initialLoading && (
        <div className="overlay">
          <div className="loader" />
        </div>
      )}
      {loading && !initialLoading && <div className="loader" />}
      <div className="main-content-center">
        <Row>
          <Col className="d-flex justify-content-end">
            <Button
              className="d-flex align-items-center gap-2"
              variant="success"
              onClick={handleShowPopupImportData}
            >
              <FaCloudArrowUp />
              <p className="mb-0">Upload</p>
            </Button>
          </Col>
        </Row>
        <Row className="pt-3">
          {/* <Col className="d-flex flex-column justify-content-center align-items-center">
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
          </Col> */}
          <Col>
            <Card>
              <Card.Header style={{ background: "#4A4F55" }}>
                <Row className="d-flex align-items-center justify-content-end gx-2">
                  <Col
                    className="d-flex align-items-center justify-content-start gap-2"
                    md={7}
                  >
                    <h4 className="m-0" style={{ color: "white" }}>
                      วิชา
                    </h4>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="success"
                      onClick={() => {}}
                    >
                      <FaPlus />
                      <p className="mb-0">เพิ่มรายการ</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{ color: "#dc3545", border: "1px solid" }}
                      onClick={() => {}}
                    >
                      <FaTrashCan />
                      <p className="mb-0">ลบรายการ</p>
                    </Button>
                  </Col>
                  <Col>
                    <Select
                      id="majorName"
                      name="majorName"
                      options={optionMajorSubject}
                      onChange={handleSelectMajorSubject}
                      value={selectedMajorSubject}
                      placeholder="สาขา"
                      isSearchable={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Select
                      id="gradeName"
                      name="gradeName"
                      options={optionGradeSubject}
                      onChange={handleSelectGradeSubject}
                      value={selectedGradeSubject}
                      placeholder="ชั้นปี"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="search"
                      placeholder="ค้นหา"
                      className="custom-input"
                      value={inputSubject}
                      onChange={(e) => setInputSubject(e.target.value)}
                    />
                  </Col>
                  <Col className="d-flex justify-content-center gap-2">
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="info"
                      onClick={() => {}}
                    >
                      <FaMagnifyingGlass />
                      <p className="mb-0">ค้นหา</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="danger"
                      onClick={() => handleResetDataSubject()}
                    >
                      <FaArrowsRotate />
                      <p className="mb-0">รีเซ็ต</p>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
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
                      <th className="fw-normal" style={{ width: "5%" }}>
                        major_id
                      </th>
                      <th className="fw-normal" style={{ width: "10%" }}>
                        cs_id
                      </th>
                      <th className="fw-normal" style={{ width: "25%" }}>
                        cs_name_th
                      </th>
                      <th className="fw-normal" style={{ width: "35%" }}>
                        cs_name_en
                      </th>
                      <th className="fw-normal" style={{ width: "10%" }}>
                        lc_sec
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        lb_sec
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        grade
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDataSubject.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        <td>{item.major_id}</td>
                        <td>{item.cs_id}</td>
                        <td style={{ textAlign: "start" }}>
                          {item.cs_name_th}
                        </td>
                        <td style={{ textAlign: "start" }}>
                          {item.cs_name_en}
                        </td>
                        <td>{`${item.lc_sec}`}</td>
                        <td>{`${item.lb_sec}`}</td>
                        <td>{item.grade}</td>
                        <td>{item.amount}</td>
                      </tr>
                    ))}
                    {displayDataSubject.length < itemsPerPage && (
                      <>
                        {[
                          ...Array(itemsPerPage - displayDataSubject.length),
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
                            <td>
                              <br />
                            </td>
                            <td>
                              <br />
                            </td>
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
                    Page {currentPageSubject} of{" "}
                    {Math.ceil(dataSubject.length / itemsPerPage)}
                  </p>
                  {currentPageSubject > 1 && (
                    <Button
                      variant="success"
                      onClick={() => paginateSubject(currentPageSubject - 1)}
                    >
                      <FaChevronLeft />
                    </Button>
                  )}
                  {pageNumbersSubject.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPageSubject}
                      onClick={() => paginateSubject(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  {currentPageSubject <
                    Math.ceil(dataSubject.length / itemsPerPage) && (
                    <Button
                      variant="success"
                      onClick={() => paginateSubject(currentPageSubject + 1)}
                    >
                      <FaChevronRight />
                    </Button>
                  )}
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <Card>
              <Card.Header style={{ background: "#4A4F55" }}>
                <Row className="d-flex align-items-center justify-content-end gx-2">
                  <Col
                    className="d-flex align-items-center justify-content-start gap-2"
                    md={6}
                  >
                    <h4 className="m-0" style={{ color: "white" }}>
                      สาขา
                    </h4>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="success"
                      onClick={() => {}}
                    >
                      <FaPlus />
                      <p className="mb-0">เพิ่มรายการ</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{
                        color: "#dc3545",
                        border: "1px solid #dc3545",
                      }}
                      onClick={() => {}}
                    >
                      <FaTrashCan />
                      <p className="mb-0">ลบรายการ</p>
                    </Button>
                  </Col>
                  <Col>
                    <Select
                      id="facultyName"
                      name="facultyName"
                      options={optionFaculty}
                      onChange={handleSelectFaculty}
                      value={selectedFaculty}
                      placeholder="คณะ"
                      isSearchable={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Select
                      id="majorName"
                      name="majorName"
                      options={optionMajor}
                      onChange={handleSelectMajor}
                      value={selectedMajor}
                      placeholder="สาขา"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Select
                      id="gradeName"
                      name="gradeName"
                      options={optionGrade}
                      onChange={handleSelectGrade}
                      value={selectedGrade}
                      placeholder="ชั้นปี"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="search"
                      placeholder="ค้นหา"
                      className="custom-input"
                      value={inputMajor}
                      onChange={(e) => setInputMajor(e.target.value)}
                    />
                  </Col>
                  <Col className="d-flex justify-content-center gap-2">
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="info"
                      onClick={() => {}}
                    >
                      <FaMagnifyingGlass />
                      <p className="mb-0">ค้นหา</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="danger"
                      onClick={() => handleResetDataMajor()}
                    >
                      <FaArrowsRotate />
                      <p className="mb-0">รีเซ็ต</p>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive striped hover bordered className="m-0">
                  <thead style={{ overflowY: "auto" }}>
                    <tr
                      style={{
                        background: "#03a96b",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <th className="fw-normal" style={{ width: "5%" }}>
                        major_id
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        fac_id
                      </th>
                      <th className="fw-normal" style={{ width: "25%" }}>
                        major_name_th
                      </th>
                      <th className="fw-normal" style={{ width: "35%" }}>
                        major_name_en
                      </th>
                      <th className="fw-normal" style={{ width: "15%" }}>
                        fac_name
                      </th>
                      <th className="fw-normal" style={{ width: "10%" }}>
                        major_status
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        major_grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDataMajor.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        <td>{item.major_id}</td>
                        <td>{item.fac_id}</td>
                        <td style={{ textAlign: "start" }}>
                          {item.major_name_th}
                        </td>
                        <td style={{ textAlign: "start" }}>
                          {item.major_name_en}
                        </td>
                        <td>{item.fac_name}</td>
                        <td>{item.major_status}</td>
                        <td>{item.major_grade}</td>
                      </tr>
                    ))}
                    {displayDataMajor.length < itemsPerPage && (
                      <>
                        {[...Array(itemsPerPage - displayDataMajor.length)].map(
                          (_, index) => (
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
                              <td>
                                <br />
                              </td>
                              <td>
                                <br />
                              </td>
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
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </Table>
                <Pagination className="d-flex justify-content-end align-items-center gap-3 pt-3 pe-3">
                  <p style={{ color: "#4a4f55" }}>
                    Page {currentPageMajor} of{" "}
                    {Math.ceil(dataMajor.length / itemsPerPage)}
                  </p>
                  {currentPageMajor > 1 && (
                    <Button
                      variant="success"
                      onClick={() => paginateMajor(currentPageMajor - 1)}
                    >
                      <FaChevronLeft />
                    </Button>
                  )}
                  {pageNumbersMajor.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPageMajor}
                      onClick={() => paginateMajor(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  {currentPageMajor <
                    Math.ceil(dataMajor.length / itemsPerPage) && (
                    <Button
                      variant="success"
                      onClick={() => paginateMajor(currentPageMajor + 1)}
                    >
                      <FaChevronRight />
                    </Button>
                  )}
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="pt-3 pb-5">
          <Col>
            <Card>
              <Card.Header style={{ background: "#4A4F55" }}>
                <Row className="d-flex align-items-center justify-content-end gx-2">
                  <Col
                    className="d-flex align-items-center justify-content-start gap-2"
                    md={7}
                  >
                    <h4 className="m-0" style={{ color: "white" }}>
                      ห้องสอบ
                    </h4>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="success"
                      onClick={() => {}}
                    >
                      <FaPlus />
                      <p className="mb-0">เพิ่มรายการ</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{
                        color: "#dc3545",
                        border: "1px solid #dc3545",
                      }}
                      onClick={() => {}}
                    >
                      <FaTrashCan />
                      <p className="mb-0">ลบรายการ</p>
                    </Button>
                  </Col>
                  <Col>
                    <Select
                      id="buildName"
                      name="buildName"
                      options={optionBuilding}
                      onChange={handleSelectBuilding}
                      value={selectedBuilding}
                      placeholder="อาคาร"
                      isSearchable={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Select
                      id="floorName"
                      name="floorName"
                      options={optionfloor}
                      onChange={handleSelectFloor}
                      value={selectedFloor}
                      placeholder="ชั้น"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="number"
                      placeholder="จำนวน"
                      className="custom-input"
                      min="0"
                      value={inputRoom}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!isNaN(value)) {
                          setInputRoom(parseInt(value));
                        }
                      }}
                    />
                  </Col>
                  <Col className="d-flex justify-content-center gap-2">
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="info"
                      onClick={() => {}}
                    >
                      <FaMagnifyingGlass />
                      <p className="mb-0">ค้นหา</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="danger"
                      onClick={() => handleResetDataRoom()}
                    >
                      <FaArrowsRotate />
                      <p className="mb-0">รีเซ็ต</p>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive striped hover bordered className="m-0">
                  <thead>
                    <tr
                      style={{
                        background: "#03a96b",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <th className="fw-normal" style={{ width: "5%" }}>
                        build_id
                      </th>
                      <th className="fw-normal">build_name</th>
                      <th className="fw-normal">room_id</th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        floor
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        seat
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        Maxamount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDataRoom.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        <td>{item.build_id}</td>
                        <td>{item.build_name}</td>
                        <td>{item.room_id}</td>
                        <td>{item.floor}</td>
                        <td>{item.seat}</td>
                        <td>{item.Maxamount}</td>
                      </tr>
                    ))}
                    {displayDataRoom.length < itemsPerPage && (
                      <>
                        {[...Array(itemsPerPage - displayDataRoom.length)].map(
                          (_, index) => (
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
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </Table>
                <Pagination className="d-flex justify-content-end align-items-center gap-3 pt-3 pe-3">
                  <p style={{ color: "#4a4f55" }}>
                    Page {currentPageRoom} of{" "}
                    {Math.ceil(dataRoom.length / itemsPerPage)}
                  </p>
                  {currentPageRoom > 1 && (
                    <Button
                      variant="success"
                      onClick={() => paginateRoom(currentPageRoom - 1)}
                    >
                      <FaChevronLeft />
                    </Button>
                  )}
                  {pageNumbersRoom.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPageRoom}
                      onClick={() => paginateRoom(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  {currentPageRoom <
                    Math.ceil(dataRoom.length / itemsPerPage) && (
                    <Button
                      variant="success"
                      onClick={() => paginateRoom(currentPageRoom + 1)}
                    >
                      <FaChevronRight />
                    </Button>
                  )}
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>

      <PopupImportData
        show={showPopupImportData}
        hide={handleHidePopupImportData}
      />
    </>
  );
};

export default ImportData;
