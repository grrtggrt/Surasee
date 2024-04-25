import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";

const PopupManageRoom = (props) => {
  const { show, hide } = props;

  return (
    <div className="main-content-center">
      <Modal show={show} onHide={hide} centered>
        <Modal.Header
          closeButton
          style={{ background: "#03A96B", fontSize: "16px", color: "white" }}
        >
          <Modal.Title>จัดห้องสอบ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  โปรดระบุเวลาสอบ :
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PopupManageRoom;
