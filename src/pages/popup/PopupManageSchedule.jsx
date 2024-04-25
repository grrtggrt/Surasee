import React from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { FaRegSave } from "react-icons/fa";
import { FaBan } from "react-icons/fa6";

const PopupManageSchedule = (props) => {
  const { show, hide } = props;

  return (
    <div className="main-content-center">
      <Modal show={show} onHide={hide} centered>
        <Modal.Header
          closeButton
          style={{ background: "#03A96B", fontSize: "16px", color: "white" }}
        >
          <Modal.Title>จัดวันสอบ</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <Row>
            <Col className="d-flex flex-column align-items-center gap-3">
              <Form.Select
                className="w-75"
                aria-label="Default select example"
                style={{
                  fontSize: "16px",
                }}
              >
                <option>ปีการศึกษา</option>
                <option>1</option>
              </Form.Select>
              <Form.Select
                className="w-75"
                aria-label="Default select example"
                style={{
                  fontSize: "16px",
                }}
              >
                <option>ภาคเรียน</option>
                <option>1</option>
              </Form.Select>
              <Form.Select
                className="w-75"
                aria-label="Default select example"
                style={{
                  fontSize: "16px",
                }}
              >
                <option>วิชา</option>
                <option>1</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
              <Form.Select
                aria-label="Default select example"
                style={{
                  fontSize: "16px",
                  width: "74%",
                }}
              >
                <option>เทอม</option>
                <option>1</option>
              </Form.Select>
            </Col>
            <Col className="d-flex justify-content-start">
              <Form.Select
                aria-label="Default select example"
                style={{
                  fontSize: "16px",
                  width: "74%",
                }}
              >
                <option>วิชา</option>
                <option>1</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end">
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
            <Col className="d-flex justify-content-start">
              <Button
                className="d-flex align-items-center justify-content-center gap-2"
                style={{
                  backgroundColor: "#BD4636",
                  border: "none",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                <FaBan /> ยกเลิก
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupManageSchedule;
