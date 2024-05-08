import React, { useEffect, useState } from "react";
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
import { FaEye, FaArrowsRotate, FaMagnifyingGlass } from "react-icons/fa6";
import Select from "react-select";

//styles
import "../styles/Select.scss";

import PopupDashboard from "./popup/PopupDashboard";

import {
  dataFacultyOption,
  dataGradeOption,
  dataBranch,
  dataSubjects,
} from "../MockupData";

const Dashboard = () => {
  // Search
  const [input, setInput] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [fetchData, setFetchData] = useState(dataBranch);

  const handleSelectFaculty = (e) => {
    setSelectedFaculty(e.value);
  };

  const handleSelectGrade = (e) => {
    setSelectedGrade(e.value);
  };

  const handleClickSearch = () => {
    // คำนวณข้อมูลที่ต้องการแสดงตามเงื่อนไขที่กำหนด
    const filteredData = fetchData.filter((item) => {
      return (
        (!selectedFaculty ||
          item.faculty.toLowerCase().includes(selectedFaculty.toLowerCase())) &&
        (!selectedGrade ||
          item.grade.toLowerCase().includes(selectedGrade.toLowerCase())) &&
        (!input ||
          item.faculty.toLowerCase().includes(input.toLowerCase()) ||
          item.majorId.toLowerCase().includes(input.toLowerCase()) ||
          item.majorName.toLowerCase().includes(input.toLowerCase()) ||
          item.grade.toLowerCase().includes(input.toLowerCase()))
      );
    });
    setFetchData(filteredData);
    setCurrentPage(1);
  };

  const handleClickReset = () => {
    setFetchData(dataBranch);
    setInput("");
    setSelectedFaculty(null);
    setSelectedGrade(null);
  };

  useEffect(() => {
    setFetchData(dataBranch);
    if (!input) {
      return;
    } else {
      setSelectedFaculty(null);
      setSelectedGrade(null);
    }
  }, [input]);

  useEffect(() => {
    setFetchData(dataBranch);
    if (selectedFaculty !== null || selectedGrade !== null) {
      setInput("");
    }
  }, [selectedFaculty, selectedGrade]);

  // นับ CurrentItems ที่แสดงใน Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(
    currentPage * itemsPerPage,
    fetchData.length
  );

  const displayData = fetchData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(fetchData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // แสดง Modal
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);

  const handleHide = () => setShowModal(false);

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
                {dataSubjects.filter((subject) => !subject.active).length}
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
                {dataSubjects.filter((subject) => subject.active).length}
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
                {dataSubjects.length}
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
                {dataBranch.length}
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
                {/* <Form.Select
                    aria-label="Default select example"
                    style={{
                      maxWidth: "150px",
                      minWidth: "none",
                      fontSize: "16px",
                    }}
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                  >
                    <option>คณะ</option>
                    {[...new Set(branch.map((item) => item.faculty))].map(
                      (faculty, index) => (
                        <option key={index}>{faculty}</option>
                      )
                    )}
                  </Form.Select> */}
                <Col md={2}>
                  <Select
                    id="fieldName"
                    name="fieldName"
                    options={dataFacultyOption}
                    onChange={handleSelectFaculty}
                    placeholder="คณะ"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="fieldName"
                    name="fieldName"
                    options={dataGradeOption}
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
                      style={{ fontSize: "16px" }}
                      type="search"
                      placeholder="ค้นหา"
                      aria-label="Search"
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
                      {displayData.map((item) => (
                        <tr key={item.id} style={{ textAlign: "center" }}>
                          <td>{item.faculty}</td>
                          <td>{item.majorId}</td>
                          <td
                            style={{ textAlign: "start", paddingLeft: "1rem" }}
                          >
                            {item.majorName}
                          </td>
                          <td>{item.grade}</td>
                          <td>
                            <FaEye
                              onClick={() => {
                                handleShow();
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
                  <Pagination className="d-flex justify-content-end">
                    {pageNumbers.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <PopupDashboard show={showModal} hide={handleHide} />
    </div>
  );
};

export default Dashboard;
