import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, Form, CloseButton } from "react-bootstrap";
import { FaFloppyDisk, FaBan } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../../../services/authorize";

// assets
import Profile from "../../assets/profile.png";

// styles
import "../../styles/Modal.scss";

const PopupUserSetting = (props) => {
  const { show, hide, onSaveProfileImage, userData } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [name, setName] = useState(null);
  const [surname, setSurname] = useState(null);

  useEffect(() => {
    setPreviewImage(userData.profileImage ? userData.profileImage : Profile);
    setName(userData.name ? userData.name : "");
    setSurname(userData.surname ? userData.surname : "");
    setSelectedImage(null);
  }, [show]);

  const handleProfileImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result.split(",")[1]); // เก็บเฉพาะ base64 ส่วน
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageDelete = () => {
    setSelectedImage(null);
    setPreviewImage(Profile);
  };

  const handleSaveConfirm = () => {
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
        Swal.fire({
          title: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
        updateUserProfile();
      }
    });
  };

  const updateUserProfile = async () => {
    const token = getToken();
    const data = {
      name,
      surname,
      profileImage: selectedImage,
    };

    try {
      const response = await axios.post(
        "http://localhost:5500/api/update-user",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "บันทึกเสร็จสิ้น!",
        icon: "success",
        confirmButtonColor: "#03A96B",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "shadow-none",
        },
      });

      if (response.data.profileImage) {
        onSaveProfileImage(response.data.profileImage); // อัพเดทรูปภาพใน contentTop
      }

      hide();
    } catch (error) {
      Swal.fire({
        title: "เกิดข้อผิดพลาด",
        text: error.response.data.message,
        icon: "error",
        confirmButtonColor: "#03A96B",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "shadow-none",
        },
      });
    }
  };

  const handleDeleteConfirm = () => {
    Swal.fire({
      title: "ต้องการลบรูปภาพใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
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
    <Modal show={show} onHide={hide} centered>
      <Modal.Header>
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
          <Col
            md={4}
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={
                selectedImage
                  ? `data:image/jpeg;base64,${selectedImage}`
                  : previewImage
              }
              alt="Profile"
              style={{ width: "100px", height: "100px", borderRadius: "50%" }}
            />
          </Col>
          <Col md={8} className="d-flex flex-column align-self-center">
            <Row>
              <Col className="d-flex gap-3 pb-2">
                <label htmlFor="profileImageInput">
                  <Button variant="success" as="span">
                    เลือกรูปโปรไฟล์
                  </Button>
                </label>
                <Button
                  variant="outline-dark"
                  onClick={() => handleDeleteConfirm()}
                >
                  ลบรูปโปรไฟล์
                </Button>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleProfileImageChange}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <p style={{ color: "#525252" }}>
                  ขนาดรูป 100 x 100px PNG หรือ JPG file.
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
                <Form.Control
                  className="custom-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly
                  disabled
                />
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>นามสกุล :</p>
              <Form>
                <Form.Control
                  className="custom-input"
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  readOnly
                  disabled
                />
              </Form>
            </Col>
          </Row>
          <Row className="mt-2 mb-2">
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
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupUserSetting;
