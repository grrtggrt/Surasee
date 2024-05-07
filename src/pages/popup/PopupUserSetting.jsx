import React, { useState } from "react";
import { Modal, Row, Col, Button, Form, CloseButton } from "react-bootstrap";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import Swal from "sweetalert2";

// assets
import Profile from "../../assets/profile.png";
// styles
import "../../styles/Modal.scss";
import PopupResetPassword from "./PopupResetPassword";

const PopupUserSetting = (props) => {
  const { show, hide } = props;
  const [selectedImage, setSelectedImage] = useState(null);

  const [showResetPassword, setShowResetPassword] = useState(false);

  const handleShow = () => setShowResetPassword(true);

  const handleHide = () => setShowResetPassword(false);

  const handleProfileImageChange = (event) => {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
  };

  // const handleSaveConfirm = () => {
  //   Swal.fire({
  //     title: "ต้องการบันทึกข้อมูลใช่หรือไม่",
  //     icon: "question",
  //     showCancelButton: true,
  //     cancelButtonText: "ยกเลิก",
  //     confirmButtonText: "บันทึก",
  //     confirmButtonColor: "#03A96B",
  //     cancelButtonColor: "#BD4636",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "บันทึกเสร็จสิ้น!",
  //         icon: "success",
  //         confirmButtonColor: "#03A96B",
  //         confirmButtonText: "ตกลง",
  //       });
  //       hide();
  //     }
  //   });
  // };

  const handleDeleteConfirm = () => {
    Swal.fire({
      title: "ต้องการลบรูปภาพใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#BD4636",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ลบเสร็จสิ้น!",
          icon: "success",
          confirmButtonColor: "#03A96B",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "shadow-none",
          },
        });
        handleImageDelete();
      }
    });
  };

  return (
    <Mgodal show={show} hide={hide} centered>
      <Modal.Header className="modal-header">
        <Modal.Title>ตั้งค่า</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Row>
          <Col>
            <h3>ข้อมูลส่วนตัว</h3>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="d-flex justify-content-center align-items-center">
            <img src={selectedImage ? selectedImage : Profile} alt="Profile" style={{ width: "100px", borderRadius:"50%"}} />
          </Col>
          <Col md={8} className="d-flex flex-column align-self-center">
            <Row>
              <Col className="d-flex gap-3 pb-2">
                <label htmlFor="profileImageInput">
                  <Button
                    style={{
                      background: "#03A96B",
                      border: "none",
                      fontSize: "16px",
                    }}
                    as="span"
                  >
                    เลือกรูปโปรไฟล์
                  </Button>
                </label>
                <Button
                  style={{
                    background: "none",
                    border: "1px solid #3F3F3F",
                    color: "#3F3F3F",
                    fontSize: "16px",
                  }}
                  onClick={() => handleDeleteConfirm()}
                >
                  ลบรูปโปรไฟล์
                </Button>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/"
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#525252" }}>
                  ขนาดรูป 132 x 132px PNG หรือ JPG file.
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center gap-2 ">
          <Row>
            <Col>
              <p>ชื่อ :</p>
              <Form>
                <Form.Control className="custom-input" type="text" />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>นามสกุล :</p>
              <Form>
                <Form.Control className="custom-input" type="text" />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>ตำแหน่ง :</p>
              <Form>
                <Form.Control
                  className="custom-input"
                  type="text"
                  readOnly
                  disabled
                />
              </Form>
            </Col>
          </Row>
        </Row>
        <Row className="pb-2">
          <Col className="d-flex justify-content-end pe-4">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="info"
              onClick={() => handleShow()}
            >
              <FaFloppyDisk /> เปลี่ยนรหัสผ่าน
            </Button>
          </Col>
        </Row>
      </Modal.Body>
      <PopupResetPassword show={showResetPassword} hide={handleHide}/>
    </Mgodal>
  );
};

export default PopupUserSetting;
