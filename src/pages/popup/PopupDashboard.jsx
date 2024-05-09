import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";

const PopupDashboard = (props) => {
  const { show, hide } = props;

  return (
    <Modal show={show} onHide={hide} size="xl" centered>
      <Modal.Header closeButton style={{ background: "#fff" }}>
        <Modal.Title>
          <Row>
            <Col>
              <h2 style={{ color: "#2F3337" }}>ตารางสอบ</h2>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center gap-4">
              <h5 style={{ fontSize: "16px", color: "#03A96B" }}>
                21 เมษายน 2567 - 29 เมษายน 2567
              </h5>
              <h5
                style={{
                  fontSize: "15px",
                  color: "#fff",
                  background: "#03A96B",
                  padding: ".4rem .8rem",
                  borderRadius: "20px",
                }}
              >
                กลางภาค
              </h5>
            </Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Row>
          <Col className="d-flex align-items-center gap-2">
            <p>สาขา</p>
            <p
              style={{
                background: "#f0906d",
                padding: ".2rem .8rem",
                borderRadius: "20px",
                color: "white",
              }}
            >
              S09
            </p>
          </Col>
          <Col className="d-flex justify-content-end gap-2">
            <p>ทั้งหมด</p>
            <p style={{ color: "#5ec1d4" }}>6</p>
            <p>วิชา</p>
          </Col>
        </Row>
        <Row className="p-3">
          <Card>
            <Card.Body className="p-0">
              <Row>
                <Col sm={2} className="p-0">
                  <Card style={{ background: "#03A96B" }}>
                    <Card.Body style={{ fontSize: "22px", color: "white" }}>
                      <p>29/04/24</p>
                      <p style={{ fontSize: "16px" }}>09:00 - 12:00</p>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm={10}>
                  <Row className="pt-4">
                    <Col>
                      <p>02739498-59</p>
                      <p>หมู่ 830</p>
                    </Col>
                    <Col>
                      <p>Special Problems</p>
                      <p>ปัญหาพิเศษ</p>
                    </Col>
                    <Col>
                      <p>ห้อง 17201A</p>
                      <p>อาคาร 17 (50 ที่นั่ง)</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDashboard;
