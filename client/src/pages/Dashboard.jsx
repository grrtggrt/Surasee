import React, { useEffect, useState, useCallback } from "react";
import "./Dashboard.scss";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";
import {
  FaEye,
  FaArrowsRotate,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa6";
import Select from "react-select";
import axios from "axios";

//styles
import "../styles/Select.scss";

// Popup
import PopupDashboard from "./popup/PopupDashboard";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [fetchData, setFetchData] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [dataSubject, setDataSubject] = useState([]);
  const [viewDetail, setViewDetail] = useState(null);

  //ดึงข้อมูล
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
      setFetchData(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  useEffect(() => {
    fetchSubjects();
    fetchMajor();
  }, [fetchSubjects, fetchMajor]);

  //ค้นหา

  const handleSelectFaculty = (selectedOption) => {
    console.log('handleSelectFaculty', selectedOption);
    setSelectedFaculty(e.value);
    console.log('selectedFaculty', selectedFaculty);
  };

  const handleSelectGrade = (e) => {
    setSelectedGrade(e.value);
  };

  //คณะ
  const filterFaculty = [...new Set(dataMajor.map((item) => item.fac_name))];
  const optionFaculty = filterFaculty.map((faculty) => ({
    label: faculty,
    value: faculty,
  }));

  //ชั้นปี
  const filterGrade = [...new Set(dataMajor.map((item) => item.major_grade))];
  const optionsGrade = filterGrade.map((grade) => ({
    label: grade.toString(),
    value: grade.toString(),
  }));

  const handleClickSearch = () => {
    const filteredData = fetchData.filter((item) => {
      return (
        (!selectedFaculty || item.fac_name.toLowerCase().includes(selectedFaculty))
      );
    });
    // const filteredData = fetchData.filter((item) => {
    //   return (
    //     (!selectedFaculty ||
    //       item.fac_name
    //         .toLowerCase()
    //         .includes(selectedFaculty.toLowerCase())) &&
    //     (!selectedGrade ||
    //       item.major_grade
    //         .toString()
    //         .toLowerCase()
    //         .includes(selectedGrade.toLowerCase())) &&
    //     (!input ||
    //       item.fac_name.toLowerCase().includes(input.toLowerCase()) ||
    //       item.major_id.toLowerCase().includes(input.toLowerCase()) ||
    //       item.major_name_th.toLowerCase().includes(input.toLowerCase()) ||
    //       item.major_grade
    //         .toString()
    //         .toLowerCase()
    //         .includes(input.toLowerCase()))
    //   );
    // });
    setFetchData(filteredData);
    setCurrentPage(1);
  };

  const handleClickReset = () => {
    setFetchData(dataMajor);
    setInput("");
    setSelectedFaculty(null);
    setSelectedGrade(null);
    console.log("")
  };

  useEffect(() => {
    setFetchData(dataMajor);
    if (!input) {
      return;
    } else {
      setSelectedFaculty(null);
      setSelectedGrade(null);
    }
  }, [input]);

  useEffect(() => {
    setSelectedFaculty(null);
    setFetchData(dataMajor);
    if (selectedFaculty !== null || selectedGrade !== null) {
      setInput("");
    }
  }, [selectedFaculty, selectedGrade]);

  // นับ CurrentItems ที่แสดงใน Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const sortedData = fetchData
    .filter((item) => item.major_grade >= 1 && item.major_grade <= 4)
    .sort((a, b) => a.major_grade - b.major_grade);

  const displayData = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  const maxPageButtons = 5;

  let startPage = 1;
  let endPage = Math.min(
    startPage + maxPageButtons - 1,
    Math.ceil(fetchData.length / itemsPerPage)
  );

  if (currentPage > Math.floor(maxPageButtons / 2)) {
    startPage = currentPage - Math.floor(maxPageButtons / 2);
    endPage = Math.min(
      startPage + maxPageButtons - 1,
      Math.ceil(fetchData.length / itemsPerPage)
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // แสดง Modal
  const [showModal, setShowModal] = useState(false);

  const handleShow = (faculty) => {
    setViewDetail(faculty);
    setShowModal(true);
  };

  const handleHide = () => {
    setViewDetail(null);
    setShowModal(false);
  };

  return (
    <div className="main-content-center">
      <Row>
        <Col>
          <Card bg="light">
            <Card.Header
              style={{
                background: "#03a96b",
                color: "white",
                fontSize: "18px",
              }}
              className="d-flex justify-content-center p-2"
            >
              วิชาที่ยังไม่ได้จัด
            </Card.Header>
            <Card.Body>
              <Card.Text
                className="d-flex justify-content-center"
                style={{ fontSize: "60px" }}
              >
                {dataSubject.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="light">
            <Card.Header
              style={{
                background: "#03a96b",
                color: "white",
                fontSize: "18px",
              }}
              className="d-flex justify-content-center p-2"
            >
              วิชาที่จัดแล้ว
            </Card.Header>
            <Card.Body>
              <Card.Text
                className="d-flex justify-content-center"
                style={{ fontSize: "60px" }}
              >
                {dataSubject.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="light">
            <Card.Header
              style={{
                background: "#03a96b",
                color: "white",
                fontSize: "18px",
              }}
              className="d-flex justify-content-center p-2"
            >
              วิชาทั้งหมด
            </Card.Header>
            <Card.Body>
              <Card.Text
                className="d-flex justify-content-center"
                style={{ fontSize: "60px" }}
              >
                {dataSubject.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card bg="light">
            <Card.Header
              style={{
                background: "#03a96b",
                color: "white",
                fontSize: "18px",
              }}
              className="d-flex justify-content-center p-2"
            >
              จำนวนสาขา
            </Card.Header>
            <Card.Body>
              <Card.Text
                className="d-flex justify-content-center"
                style={{ fontSize: "60px" }}
              >
                {dataMajor.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col>
          <Card bg="light">
            <Card.Body>
              <Row className="d-flex justify-content-end gx-2">
                <Col md={2}>
                  <Select
                    id="facultyName"
                    name="facultyName"
                    options={optionFaculty}
                    onChange={handleSelectFaculty}
                    value={selectedFaculty}
                    placeholder="คณะ"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="gradeName"
                    name="gradeName"
                    options={optionsGrade}
                    onChange={handleSelectGrade}
                    placeholder="ชั้นปี"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={2}>
                  <Form className="d-flex ">
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="search"
                      placeholder="ค้นหา"
                      className="custom-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </Form>
                </Col>
                <Col md="auto" className="d-flex gap-2">
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="info"
                    onClick={() => handleClickSearch()}
                  >
                    <FaMagnifyingGlass />
                    <p className="mb-0">ค้นหา</p>
                  </Button>
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="danger"
                    onClick={() => handleClickReset()}
                  >
                    <FaArrowsRotate />
                    <p className="mb-0">รีเซ็ต</p>
                  </Button>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col>
                  <Table
                    responsive
                    striped
                    hover
                    bordered
                    style={{ fontSize: "16px" }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#03a96b",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <th style={{ width: "15%" }}>คณะ</th>
                        <th style={{ width: "10%" }}>รหัสสาขา</th>
                        <th style={{ width: "65%" }}>ชื่อสาขา</th>
                        <th style={{ width: "5%" }}>ชั้นปี</th>
                        <th style={{ width: "5%" }}>ดู</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayData.map((item, id) => (
                        <tr key={id} style={{ textAlign: "center" }}>
                          <td>{item.fac_name}</td>
                          <td>{item.major_id}</td>
                          <td
                            style={{
                              textAlign: "start",
                              paddingLeft: "1rem",
                            }}
                          >
                            {item.major_name_th}
                          </td>
                          <td>{item.major_grade}</td>
                          <td>
                            <FaEye
                              onClick={() => {
                                handleShow(item);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </td>
                        </tr>
                      ))}
                      {displayData.length < itemsPerPage && (
                        <>
                          {[...Array(itemsPerPage - displayData.length)].map(
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
                              </tr>
                            )
                          )}
                        </>
                      )}
                    </tbody>
                  </Table>
                  <Pagination className="d-flex justify-content-end align-items-center gap-3">
                    <p style={{ color: "#4a4f55" }}>
                      Page {currentPage} of{" "}
                      {Math.ceil(fetchData.length / itemsPerPage)}
                    </p>
                    {currentPage > 1 && (
                      <Button
                        variant="success"
                        onClick={() => paginate(currentPage - 1)}
                      >
                        <FaChevronLeft />
                      </Button>
                    )}
                    {pageNumbers.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                    {currentPage <
                      Math.ceil(fetchData.length / itemsPerPage) && (
                      <Button
                        variant="success"
                        onClick={() => paginate(currentPage + 1)}
                      >
                        <FaChevronRight />
                      </Button>
                    )}
                  </Pagination>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <PopupDashboard
        show={showModal}
        hide={handleHide}
        viewDetail={viewDetail}
        dataSubject={dataSubject}
      />
    </div>
  );
};

export default Dashboard;
