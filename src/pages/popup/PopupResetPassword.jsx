import React from "react";
import { Modal, Row, Col, Button, Form, CloseButton } from "react-bootstrap";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import Swal from "sweetalert2";

import "../../styles/Modal.scss";

const PopupResetPassword = (props) => {
  const { show, hide } = props;

  const handleSaveConfirm = () => {
    Swal.fire({
      title: "ต้องการบันทึกข้อมูลใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#BD4636",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "บันทึกเสร็จสิ้น!",
          icon: "success",
          confirmButtonColor: "#03A96B",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "shadow-none",
          },
        });
        hide();
      }
    });
  };
  
  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header>
        <Modal.Title>ตั้งค่า</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Row>
          <Col>
            <h3>รหัสผ่าน</h3>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center gap-2 ">
          <Row>
            <Col>
              <p>รหัสผ่านปัจจุบัน :</p>
              <Form>
                <Form.Control className="custom-input" type="password" />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>รหัสผ่านใหม่ :</p>
              <Form>
                <Form.Control className="custom-input" type="password" />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>ยืนยันรหัสผ่านใหม่ :</p>
              <Form>
                <Form.Control className="custom-input" type="password" />
              </Form>
            </Col>
          </Row>
        </Row>
        <Row className="pb-2">
          <Col className="d-flex justify-content-end">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="success"
              onClick={() => handleSaveConfirm()}
            >
              <FaFloppyDisk /> บันทึก
            </Button>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="danger"
              onClick={() => hide()}
            >
              <FaBan /> ยกเลิก
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupResetPassword;
