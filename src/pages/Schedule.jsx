import React, { useState } from "react";
import { Card, Row, Col, Form, Button, CardBody } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaSyncAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaRegSave } from "react-icons/fa";

import PopupManageRoom from "./popup/PopupManageRoom";
import PopupManageSchedule from "./popup/PopupManageSchedule";

const Schedule = () => {
  const [showManageRoom, setShowManageRoom] = useState(false);

  const handleShowManageRoom = () => setShowManageRoom(true);

  const handleHideManageRoom = () => setShowManageRoom(false);

  const [showSchedule, setShowSchedule] = useState(false);

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
            <FaSearch />
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
            <FaSyncAlt />
            รีเซ็ต
          </Button>
        </Col>
      </Row>
      <Row className="pt-3">
        <Col md={9}>
          <Card>
            <CardBody>
              <Row>
                <Col className="d-flex align-items-center justify-content-center gap-3">
                  <Card style={{ width: "80%" }}>
                    <CardBody
                      style={{
                        background: "#212529",
                        color: "white",
                        padding: "5.4px 10.8px",
                        fontSize: "16px",
                        borderRadius: "0.25rem",
                        textAlign: "center",
                      }}
                    >
                      ตารางสอบกลางภาค เทอม 1 วันที่ 1 สิงหาคม - 10 สิงหาคม 2567
                    </CardBody>
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
                    onClick={() => handleShowSchedule()}
                  >
                    <FaPlus />
                    จัดวันสอบ
                  </Button>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col>
                  <Card>
                    <CardBody></CardBody>
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
                    <FaRegSave /> บันทึก
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col>
          <Card style={{ background: "#4A4F55" }}>
            <CardBody>
              <Row>
                <Col className="d-flex align-items-center justify-content-center gap-3">
                  <Form>
                    <Form.Control
                      style={{ fontSize: "16px" }}
                      type="search"
                      placeholder="ค้นหา"
                      aria-label="Search"
                    />
                  </Form>
                  <Form.Select
                    className="w-25"
                    aria-label="Default select example"
                    style={{
                      fontSize: "16px",
                    }}
                  >
                    <option>วิชา</option>
                    {[...new Set(subjects.map((item) => item.type))].map(
                      (type, index) => (
                        <option key={index}>{type}</option>
                      )
                    )}
                  </Form.Select>
                  <Button
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: "16px", color: "white" }}
                    variant="info"
                  >
                    <FaSearch />
                    ค้นหา
                  </Button>
                </Col>
              </Row>
              <Row className="pt-3">
                <Col>
                  <Card>
                    <CardBody></CardBody>
                  </Card>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <PopupManageRoom show={showManageRoom} hide={handleHideManageRoom} />
      <PopupManageSchedule show={showSchedule} hide={handleHideSchedule} />
    </div>
  );
};

export default Schedule;
