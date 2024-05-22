import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form, CloseButton } from "react-bootstrap";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import Swal from "sweetalert2";

import "../../styles/Modal.scss";

const PopupResetPassword = (props) => {
  const { show, hide } = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [submittedData, setSubmittedData] = useState(null);
  const [messageError, setMessageError] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");

  useEffect(() => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setSubmittedData(null);
    setMessageError("");
  }, []);

  const handleInputCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleInputnewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleInputConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const handleSubmit = () => {
    setSubmittedData({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
  };

  const handleHide = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    hide();
  };

  useEffect(() => {
    if (messageError !== "") {
      setStatusHolder("showMessage");
      setTimeout(() => {
        setStatusHolder("message");
        setMessageError("");
      }, 4000);
    }
  }, [messageError]);

  const handleCheckErrorMessage = () => {
    if (newPassword !== confirmNewPassword) {
      setMessageError("รหัสผ่านใหม่และยืนยันรหัสผ่านใหม่ไม่ถูกต้อง");
    } else if (currentPassword !== "12345678") {
      setMessageError("รหัสผ่านไม่ถูกต้อง");
    } else if (newPassword.length < 8) {
      setMessageError("ตั้งรหัสใหม่ 8-16 ตัวอักษร ");
    } else {
      setMessageError("กรุณากรอกข้อมูลให้ครบ");
    }
  };

  //Alert Confirm
  const handleSaveConfirm = () => {
    if (
      newPassword !== confirmNewPassword ||
      currentPassword !== "12345678" ||
      newPassword.length < 8 ||
      confirmNewPassword.length < 8
    ) {
      handleCheckErrorMessage();
      return;
    }
    if (messageError) {
      return;
    }
    Swal.fire({
      title: "ต้องการบันทึกข้อมูลใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleSubmit();
        Swal.fire({
          title: "บันทึกเสร็จสิ้น!",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        handleHide();
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
        <Form onSubmit={handleSubmit}>
          <Row className="d-flex justify-content-center gap-2 ">
            <Row>
              <Col>
                <span className={statusHolder}>{messageError}</span>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>รหัสผ่านปัจจุบัน :</p>
                <Form.Control
                  className="custom-input"
                  type="password"
                  value={currentPassword}
                  onChange={handleInputCurrentPassword}
                  maxLength={16}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>รหัสผ่านใหม่ :</p>
                <Form.Control
                  className="custom-input"
                  type="password"
                  value={newPassword}
                  onChange={handleInputnewPassword}
                  maxLength={16}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p>ยืนยันรหัสผ่านใหม่ :</p>
                <Form.Control
                  className="custom-input"
                  type="password"
                  value={confirmNewPassword}
                  onChange={handleInputConfirmNewPassword}
                  maxLength={16}
                />
              </Col>
            </Row>
          </Row>
        </Form>
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
