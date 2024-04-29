import React, { useState } from "react";
import { Card, Row, Col, Form, Button, Collapse, Badge } from "react-bootstrap";

import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPlus,
  FaFloppyDisk,
  FaAngleDown,
} from "react-icons/fa6";

import PopupManageRoom from "./popup/PopupManageRoom";
import PopupManageSchedule from "./popup/PopupManageSchedule";

const Schedule = () => {
  const [showManageRoom, setShowManageRoom] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handleShowManageRoom = () => setShowManageRoom(true);

  const handleHideManageRoom = () => setShowManageRoom(false);

  const handleShowSchedule = () => setShowSchedule(true);

  const handleHideSchedule = () => setShowSchedule(false);

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
      majorId: ["S09", "S18", "M04", "M02"],
      sec: [800, 807],
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

  return (
    <div className="main-content-center">
      <Row>
        <Col md={9} className="d-flex gap-3">
          <Form.Select
            aria-label="Default select example"
            style={{
              fontSize: "16px",
            }}
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
              fontSize: "16px",
            }}
          >
            <option>สาขา</option>
            {branch.map((item) => (
              <option key={item.id}>{item.majorName}</option>
            ))}
          </Form.Select>
        </Col>
        <Col className="d-flex justify-content-end gap-3">
          <Form.Select
            aria-label="Default select example"
            style={{
              fontSize: "16px",
            }}
          >
            <option>ชั้นปี</option>
            {[...new Set(branch.map((item) => item.grade))].map(
              (grade, index) => (
                <option key={index}>{grade}</option>
              )
            )}
          </Form.Select>
          <Button
            className="d-flex align-items-center gap-2"
            style={{ fontSize: "16px", color: "white" }}
            variant="info"
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
          >
            <FaArrowsRotate />
            รีเซ็ต
          </Button>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col md={9}>
          <Card>
            <Card.Body>
              <Row>
                <Col className="d-flex align-items-center justify-content-center gap-3">
                  <Card style={{ width: "80%" }}>
                    <Card.Body
                      style={{
                        background: "#212529",
                        color: "white",
                        padding: "5.4px 10.8px",
                        fontSize: "16px",
                        borderRadius: "0.25rem",
                        textAlign: "center",
                      }}
                    >
                      <p className="mb-0">
                        ตารางสอบกลางภาค เทอม 1 วันที่ 1 สิงหาคม - 10 สิงหาคม
                        2567
                      </p>
                    </Card.Body>
                  </Card>
                  <Button
                    className="d-flex align-items-center justify-content-center gap-2"
                    style={{
                      backgroundColor: "#03A96B",
                      color: "white",
                      fontSize: "16px",
                      border: "none",
                      width: "20%",
                    }}
                    onClick={() => handleShowManageRoom()}
                  >
                    <FaPlus />
                    <p className="mb-0">จัดวันสอบ</p>
                  </Button>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col>
                  <Card>
                    <Card.Body></Card.Body>
                  </Card>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-end pt-3">
                  <Button
                    className="d-flex align-items-center justify-content-center gap-2"
                    style={{
                      backgroundColor: "#03A96B",
                      border: "none",
                      color: "white",
                      fontSize: "16px",
                    }}
                  >
                    <FaFloppyDisk />
                    <p className="mb-0">บันทึก</p>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ background: "#4A4F55" }}>
            <Card.Body>
              {/* <Accordion>
                <Accordion.Item
                  eventKey="0"
                  style={{ border: "none", outline: "none", boxShadow: "none" }}
                >
                  <Accordion.Button style={{ padding: "10px" }}>
                    <FaMagnifyingGlass className="me-2" />
                    <p className="mb-0">ค้นหาข้อมูล</p>
                  </Accordion.Button>
                  <Accordion.Body className="p-3">
                    <Row>
                      <Col className="d-flex flex-column gap-2">
                        <Form.Select
                          className="w-100"
                          aria-label="Default select example"
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          <option>คณะ</option>
                          {[...new Set(subjects.map((item) => item.type))].map(
                            (type, index) => (
                              <option key={index}>{type}</option>
                            )
                          )}
                        </Form.Select>
                        <Form.Select
                          className="w-100"
                          aria-label="Default select example"
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          <option>สาขา</option>
                          {[...new Set(subjects.map((item) => item.type))].map(
                            (type, index) => (
                              <option key={index}>{type}</option>
                            )
                          )}
                        </Form.Select>
                        <Form.Select
                          className=""
                          aria-label="Default select example"
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          <option>ชั้นปี</option>
                          {[...new Set(subjects.map((item) => item.type))].map(
                            (type, index) => (
                              <option key={index}>{type}</option>
                            )
                          )}
                        </Form.Select>
                        <Form.Control
                          style={{ fontSize: "16px" }}
                          type="search"
                          placeholder="ค้นหารหัสวิชา/ชื่อวิชา"
                          aria-label="Search"
                        />
                        <Form.Select
                          className=""
                          aria-label="Default select example"
                          style={{
                            fontSize: "16px",
                          }}
                        >
                          <option>ประเภทวิชา</option>
                          {[...new Set(subjects.map((item) => item.type))].map(
                            (type, index) => (
                              <option key={index}>{type}</option>
                            )
                          )}
                        </Form.Select>
                        <div className="d-flex justify-content-center gap-2">
                          <Button
                            className="d-flex align-items-center gap-2"
                            style={{ fontSize: "16px", color: "white" }}
                            variant="info"
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
                          >
                            <FaArrowsRotate />
                            รีเซ็ต
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion> */}

              <Row className="gy-2">
                <Col md={12}>
                  <Button
                    className="d-flex"
                    style={{
                      width: "100%",
                      fontSize: "16px",
                      color: "black",
                      background: "white",
                      border: "none",
                    }}
                    onClick={toggleCollapse}
                  >
                    <Col className="d-flex">ค้นหาข้อมูลเพิ่มเติม</Col>
                    <Col className="d-flex justify-content-end align-self-center">
                      <FaAngleDown />
                    </Col>
                  </Button>
                </Col>
                <div className="mt-2">
                  <Collapse in={isOpen}>
                    <Card className="p-3">
                      <Row>
                        <Col className="d-flex flex-column gap-2">
                          <Form.Select
                            aria-label="Default select example"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            <option>คณะ</option>
                            {[
                              ...new Set(subjects.map((item) => item.type)),
                            ].map((type, index) => (
                              <option key={index}>{type}</option>
                            ))}
                          </Form.Select>
                          <Form.Select
                            aria-label="Default select example"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            <option>สาขา</option>
                            {[
                              ...new Set(subjects.map((item) => item.type)),
                            ].map((type, index) => (
                              <option key={index}>{type}</option>
                            ))}
                          </Form.Select>
                          <Form.Select
                            aria-label="Default select example"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            <option>ชั้นปี</option>
                            {[
                              ...new Set(subjects.map((item) => item.type)),
                            ].map((type, index) => (
                              <option key={index}>{type}</option>
                            ))}
                          </Form.Select>
                          <Form.Control
                            style={{ fontSize: "16px" }}
                            type="search"
                            placeholder="ค้นหารหัสวิชา/ชื่อวิชา"
                            aria-label="Search"
                          />
                          <Form.Select
                            className=""
                            aria-label="Default select example"
                            style={{
                              fontSize: "16px",
                            }}
                          >
                            <option>ประเภทวิชา</option>
                            {[
                              ...new Set(subjects.map((item) => item.type)),
                            ].map((type, index) => (
                              <option key={index}>{type}</option>
                            ))}
                          </Form.Select>
                          <div className="d-flex justify-content-center gap-2">
                            <Button
                              className="d-flex align-items-center gap-2"
                              style={{ fontSize: "16px", color: "white" }}
                              variant="info"
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
                            >
                              <FaArrowsRotate />
                              รีเซ็ต
                            </Button>
                          </div>
                        </Col>
                      </Row>
                    </Card>
                  </Collapse>
                </div>

                <Col md={12}>
                  <Badge
                    pill
                    bg="info"
                    style={{ fontSize: "12px", padding: "8px" }}
                  >
                    คณะวิทยาศาสตร์
                  </Badge>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col>
                  <Card>
                    <Card.Body>ตัวอย่างการ์ดวิชา</Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <PopupManageRoom show={showManageRoom} hide={handleHideManageRoom} />
      <PopupManageSchedule show={showSchedule} hide={handleHideSchedule} />
    </div>
  );
};

export default Schedule;
