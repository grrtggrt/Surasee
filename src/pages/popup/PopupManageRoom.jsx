import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";

const PopupManageRoom = (props) => {
  const { show, hide } = props;

  return (
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
                <Card.Body
                  className="p-1"
                  style={{
                    background: "#212523",
                    color: "white",
                    fontSize: "16px",
                  }}
                >
                  โปรดระบุเวลาสอบ :
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
  );
};

export default PopupManageRoom;
