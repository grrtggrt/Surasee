import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Button, CloseButton, Card } from "react-bootstrap";
import { FaBan, FaFloppyDisk, FaCircleMinus  } from "react-icons/fa6";
import Swal from "sweetalert2";
import Select from "react-select";

// styles
import "../../styles/Modal.scss";
import "../../styles/Select.scss";
import "../../styles/Input.scss";

const PopupEditRoom = (props) => {
  const { show, hide } = props;
  const [cardColor, setCardColor] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const options = [
    { value: "A", label: "A" },
    { value: "B", label: "B" },
    { value: "C", label: "C" },
  ];

  const handleOptionChange = (e) => {
    setSelectedOption(e.value);
  };

  const customStyleBackground = (selectedOption) => {
    if (selectedOption === "A") {
      setCardColor("#03A96B");
    } else if (selectedOption === "B") {
      setCardColor("#D3E9E1");
    } else if (selectedOption === "C") {
      setCardColor("#A4E5EE");
    }
  };

  useEffect(() => {
    customStyleBackground(selectedOption);
  }, [selectedOption]);

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
    <Modal show={show} onHide={hide} centered size="lg">
      <Modal.Header>
        <Modal.Title>แก้ไขห้องสอบ</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        <Row className="ps-3 pe-3 mb-3">
          <Card className="mb-2 " style={{ backgroundColor: cardColor}}>
            <Card.Body className="p-2">
              <Row className="gx-2">
                <Col md={2}>
                  <Form.Label>รหัสวิชา</Form.Label>
                  <Form.Control
                    id="subjectID"
                    name="subjectID"
                    type="input"
                    value="0141711-65"
                    disabled
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>ชื่อวิชา</Form.Label>
                  <Form.Control
                    id="subjectName"
                    name="subjectName"
                    type="input"
                    value="Econometrics I "
                    disabled
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>สาขา</Form.Label>
                  <Form.Control
                    id="subjectBrach"
                    name="subjectBrach"
                    type="input"
                    value="S09" //
                    disabled
                  />
                </Col>
                <Col>
                  <Form.Label>ที่นั่ง</Form.Label>
                  <Select
                    id="seat"
                    name="seat"
                    options={options}
                    onChange={handleOptionChange}
                    // value={selectedOption}
                    placeholder="กรุณาเลือก"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={2}>
                  <Form.Label>จำนวน</Form.Label>
                  <Form.Control
                    id="total"
                    name="total"
                    type="number"
                    className="custom-input"
                    placeholder="กรุณากรอก"
                  />
                </Col>
                <Col
                  md="auto"
                  className="d-flex justify-content-center align-items-end pb-2"
                >
                  <Button className="btn-icon">
                    <FaCircleMinus  className="text-danger fs-5"/>
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col md={2} className="d-flex justify-content-center gap-3">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="success"
              onClick={() => handleSaveConfirm()}
            >
              <FaFloppyDisk />
              <p className="mb-0">บันทึก</p>
            </Button>
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="danger"
              onClick={() => hide()}
            >
              <FaBan />
              <p className="mb-0">ยกเลิก</p>
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupEditRoom;
