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

import PopupDashboard from "./popup/PopupDashboard";

const Dashboard = () => {
  const subjects = [
    {
      id: "01361101-64",
      name_en: "Introductory Thai Usage",
      name_th: "การใช้ภาษไทยเบื้องต้น",
      majorId: ["R07", "R03", "R17"],
      sec: [800, 850],
      type: "เสรี",
      active: false,
    },
    {
      id: "01101372-65",
      name_en: "Econometrics I",
      name_th: "เศรษฐมิติ I",
      majorId: ["G01"],
      sec: [800, 801, 900],
      type: "บังคับ",
      active: false,
    },
    {
      id: "01417111-65",
      name_en: "Calculus I",
      name_th: "แคลคูลัส I",
      majorId: ["S09" , "S18" , "M04" , "M02"],
      sec: [800 , 807],
      type: "วิชาเลือก",
      active: false,
    },
  ];

  const branch = [
    {
      id: 1,
      faculty: "วิทยาศาสตร์",
      majorId: "S09",
      majorName: "เทคโนโลยีสารสนเทศ",
      grade: "1",
    },
    {
      id: 2,
      faculty: "วิทยาศาสตร์",
      majorId: "S10",
      majorName: "เทคโนโลยีสารสนเทศ(ภาคพิเศษ)",
      grade: "1",
    },
    {
      id: 3,
      faculty: "พาณิชยนาวีนานาชาติ",
      majorId: "M09",
      majorName: "วิศวกรรมเครื่องกลเรือ",
      grade: "1",
    },
    {
      id: 4,
      faculty: "พาณิชยนาวีนานาชาติ",
      majorId: "M04",
      majorName: "การขนส่งทางทะเล",
      grade: "1",
    },
    {
      id: 5,
      faculty: "วิทยาการจัดการ",
      majorId: "R01",
      majorName: "การเงิน",
      grade: "1",
    },
    {
      id: 6,
      faculty: "วิทยาการจัดการ",
      majorId: "R02",
      majorName: "การจัดการ",
      grade: "1",
    },
    {
      id: 7,
      faculty: "วิศวกรรมศาสตร์",
      majorId: "T02",
      majorName: "วิศวกรรมคอมพิวเตอร์",
      grade: "1",
    },
    {
      id: 8,
      faculty: "วิศวกรรมศาสตร์",
      majorId: "T03",
      majorName: "วิศวกรรมเครื่องกล",
      grade: "1",
    },
    {
      id: 9,
      faculty: "วิศวกรรมศาสตร์",
      majorId: "T04",
      majorName: "วิศวกรรมไฟฟ้า",
      grade: "1",
    },
    {
      id: 10,
      faculty: "วิศวกรรมศาสตร์",
      majorId: "T05",
      majorName: "วิศวกรรมโยธา",
      grade: "1",
    },
    {
      id: 11,
      faculty: "วิศวกรรมศาสตร์",
      majorId: "T07",
      majorName: "วิศวกรรมอุสาหการ",
      grade: "1",
    },
  ];

  // Search

  const [input, setInput] = useState("");
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");
  const [fetchData, setFetchData] = useState(branch);

  // const fetchData = branch.filter((item) => {
  //   return (
  //     (selectedFaculty === "" ||
  //       selectedFaculty === "คณะ" ||
  //       item.faculty.toLowerCase().includes(selectedFaculty.toLowerCase())) &&
  //     (selectedGrade === "" ||
  //       selectedGrade === "ชั้นปี" ||
  //       item.grade.toLowerCase().includes(selectedGrade.toLowerCase())) &&
  //     (item.faculty.toLowerCase().includes(input.toLowerCase()) ||
  //       item.majorId.toLowerCase().includes(input.toLowerCase()) ||
  //       item.majorName.toLowerCase().includes(input.toLowerCase()) ||
  //       item.grade.toLowerCase().includes(input.toLowerCase()))
  //   );
  // });

  const handleClickSearch = () => {
    // คำนวณข้อมูลที่ต้องการแสดงตามเงื่อนไขที่กำหนด
    const filteredData = branch.filter((item) => {
      return (
        (selectedFaculty === "" ||
          selectedFaculty === "คณะ" ||
          item.faculty.toLowerCase().includes(selectedFaculty.toLowerCase())) &&
        (selectedGrade === "" ||
          selectedGrade === "ชั้นปี" ||
          item.grade.toLowerCase().includes(selectedGrade.toLowerCase())) &&
        (input === "" ||
          item.faculty.toLowerCase().includes(input.toLowerCase()) ||
          item.majorId.toLowerCase().includes(input.toLowerCase()) ||
          item.majorName.toLowerCase().includes(input.toLowerCase()) ||
          item.grade.toLowerCase().includes(input.toLowerCase()))
      );
    });

    setFetchData(filteredData);
    setInput("");
    setCurrentPage(1);
  };

  const handleClickReset = () => {
    setFetchData(branch);
    setInput("");
    setSelectedFaculty("");
    setSelectedGrade("");
  };

  useEffect(() => {
    setSelectedFaculty("");
    setSelectedGrade("");
  }, [input]);

  // นับ CurrentItems ที่แสดงใน Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(currentPage * itemsPerPage, branch.length);

  const currentItems = fetchData.slice(indexOfFirstItem, indexOfLastItem);

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
                {subjects.filter((subject) => !subject.active).length}
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
                {subjects.filter((subject) => subject.active).length}
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
                {subjects.length}
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
                {branch.length}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-4">
        <Col>
          <Card bg="light">
            <Card.Body>
              <Row>
                <Col className="d-flex justify-content-end gap-3">
                  <Form.Select
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
                  </Form.Select>
                  <Form.Select
                    aria-label="Default select example"
                    style={{
                      maxWidth: "150px",
                      minWidth: "none",
                      fontSize: "16px",
                    }}
                    value={selectedGrade}
                    onChange={(e) => setSelectedGrade(e.target.value)}
                  >
                    <option>ชั้นปี</option>
                    {[...new Set(branch.map((item) => item.grade))].map(
                      (grade, index) => (
                        <option key={index}>{grade}</option>
                      )
                    )}
                  </Form.Select>
                  <Form className="d-flex ">
                    <Form.Control
                      style={{ fontSize: "16px" }}
                      type="search"
                      placeholder="ค้นหา"
                      aria-label="Search"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                  </Form>
                  <Button
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "16px", color: "white" }}
                    variant="info"
                    onClick={() => handleClickSearch()}
                  >
                    <FaMagnifyingGlass />
                    ค้นหา
                  </Button>
                  <Button
                    className="d-flex align-items-center gap-2"
                    style={{
                      fontSize: "16px",
                      color: "white",
                      background: "#BD4636",
                      border: "none",
                    }}
                    onClick={() => handleClickReset()}
                  >
                    <FaArrowsRotate />
                    รีเซ็ต
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
                      {currentItems.map((item) => (
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
                      {currentItems.length < itemsPerPage && (
                        <>
                          {[...Array(itemsPerPage - currentItems.length)].map(
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
