import React from "react";
import { Modal, Row, Col } from "react-bootstrap";

const PopupDashboard = (props) => {
  const { show, hide } = props;

  return (
      <Modal show={show} onHide={hide} size="xl" centered>
        <Modal.Header closeButton>
          <Modal.Title>ตารางสอบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>สาขา</Col>
            <Col className="d-flex justify-content-end">ทั้งหมด วิชา</Col>
          </Row>
        </Modal.Body>
      </Modal>
  );
};

export default PopupDashboard;
