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
            <option>1</option>
          </Form.Select>
          <Form.Select
            aria-label="Default select example"
            style={{
              fontSize: "16px",
            }}
          >
            <option>สาขา</option>
            <option>1</option>
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
            <option>1</option>
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
            style={{ fontSize: "16px", color: "white" }}
            variant="dark"
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
                    <FaPlus/>
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
                    <option>1</option>
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
