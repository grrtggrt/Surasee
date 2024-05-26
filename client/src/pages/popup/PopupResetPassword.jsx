import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form, CloseButton } from "react-bootstrap";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../../../services/authorize";

import "../../styles/Modal.scss";

const PopupResetPassword = (props) => {
  const { show, hide } = props;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [statusHolder, setStatusHolder] = useState("message");

  useEffect(() => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setMessageError("");
  }, [show]);

  const handleInputCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleInputNewPassword = (e) => {
    setNewPassword(e.target.value);
  };

  const handleInputConfirmNewPassword = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const changePassword = async () => {
    try {
      const token = getToken();
      await axios.post(
        "http://localhost:5500/api/change-password",
        { currentPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Swal.fire({
        title: "เปลี่ยนรหัสผ่านเสร็จสิ้น!",
        icon: "success",
        confirmButtonColor: "#03A96B",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "shadow-none",
        },
      });
      hide();
    } catch (error) {
      setMessageError("รหัสผ่านไม่ถูกต้อง");
    }
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
    if (
      currentPassword.trim() === "" ||
      newPassword.trim() === "" ||
      confirmNewPassword.trim() === ""
    ) {
      setMessageError("กรุณากรอกข้อมูลให้ครบ");
    } else if (newPassword !== confirmNewPassword) {
      setMessageError("รหัสผ่านใหม่และยืนยันรหัสผ่านใหม่ไม่ถูกต้อง");
    } else if (newPassword.length < 8) {
      setMessageError("ตั้งรหัสใหม่ 8-16 ตัวอักษร ");
    } else {
      setMessageError("");
      return true;
    }
  };

  //Alert Confirm
  const handleSaveConfirm = () => {
    if (handleCheckErrorMessage()) {
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
          changePassword();
        }
      });
    }
  };

  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header>
        <Modal.Title>ตั้งค่ารหัสผ่าน</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Row>
          <Col>
            <h3>รหัสผ่าน</h3>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center gap-2">
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
                onChange={handleInputNewPassword}
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
        <Row className="pb-2">
          <Col className="d-flex justify-content-end">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="success"
              onClick={handleSaveConfirm}
            >
              <FaFloppyDisk /> บันทึก
            </Button>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="danger"
              onClick={hide}
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
