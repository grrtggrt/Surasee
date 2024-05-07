import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Form,
  Button,
  CloseButton,
} from "react-bootstrap";
import { FaCirclePlus, FaFloppyDisk } from "react-icons/fa6";
import Select from "react-select";
import Swal from "sweetalert2";
// styles
import "../../styles/Modal.scss";
import "../../styles/Select.scss";
import "../../styles/Input.scss";
import "../../styles/Button.scss";

import { dataSeatOption } from "../../MockupData";

const PopupManageRoom = (props) => {
  const { show, hide } = props;

  const [selectedOption, setSelectedOption] = useState("");
  const [cardColor, setCardColor] = useState("");
  // const options = [
  //   { value: "none", label: "Empty" },
  //   { value: "left", label: "Open Left" },
  //   { value: "right", label: "Open Right" },
  // ];
  const handleTypeSelect = (e) => {
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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "บันทึกเสร็จสิ้น!",
          icon: "success",
          confirmButtonColor: "#03A96B",
          confirmButtonText: "ตกลง",
        });
        hide();
      }
    });
  };

  return (
    <Modal
      show={show}
      onHide={hide}
      centered
      dialogClassName="modal-dialog-width"
    >
      <Modal.Header className="model-header">
        <Modal.Title>จัดห้องสอบ</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex flex-column">
          <Col className="mb-2">
            <Card className="mb-2">
              <Card.Body
                className="p-1"
                style={{
                  background: "#212523",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                รายละเอียดวิชาสอบ :
              </Card.Body>
            </Card>
            <Row>
              <Col>
                <p>รหัสวิชา</p>
                <Form>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                  />
                </Form>
              </Col>
              <Col>
                <p>ชื่อวิชา</p>
                <Form>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                  />
                </Form>
              </Col>
              <Col>
                <p>จำนวนคน</p>
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
          </Col>
          <Col className="mb-2">
            <Card className="mb-2">
              <Card.Body
                className="p-1"
                style={{
                  background: "#212523",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                เวลาสอบ :
              </Card.Body>
            </Card>
            <Row>
              <Col>
                <Select
                  id="timeStart"
                  name="timeStart"
                  // options={options}
                  // onChange={handleTypeSelect}
                  placeholder="กรุณาเลือก"
                  isSearchable={false}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </Col>
              <Col
                xs="auto"
                className="d-flex justify-content-center align-items-center p-0"
              >
                <p className="mb-0">-</p>
              </Col>
              <Col>
                <Select
                  id="timeEnd"
                  name="timeEnd"
                  // options={options}
                  // onChange={handleTypeSelect}
                  placeholder="กรุณาเลือก"
                  isSearchable={false}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </Col>
            </Row>
          </Col>
          <Col className="mb-2">
            <Card className="mb-2">
              <Card.Body
                className="p-1"
                style={{
                  background: "#212523",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                โปรดระบุอาคารสอบ :
              </Card.Body>
            </Card>
            <Card>
              <Card.Body style={{background: cardColor}}>
                <Row className="gx-2">
                  <Col md={3}>
                    <Form.Label>อาคาร</Form.Label>
                    <Select
                      id="timeEnd"
                      name="timeEnd"
                      // options={options}
                      // onChange={handleTypeSelect}
                      placeholder="กรุณาเลือก"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>ห้อง</Form.Label>
                    <Select
                      id="timeEnd"
                      name="timeEnd"
                      // options={options}
                      // onChange={handleTypeSelect}
                      placeholder="กรุณาเลือก"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>ที่นั่ง</Form.Label>
                    <Select
                      id="timeEnd"
                      name="timeEnd"
                      options={dataSeatOption}
                      onChange={handleTypeSelect}
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
                    md={1}
                    className="d-flex justify-content-center align-items-end pb-2"
                  >
                    <Button className="btn-icon">
                      <FaCirclePlus className="text-info fs-5" />
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              style={{
                backgroundColor: "#03A96B",
                border: "none",
                boxShadow: "none",
                color: "white",
                fontSize: "16px",
              }}
              onClick={() => handleSaveConfirm()}
            >
              <FaFloppyDisk />
              <p className="mb-0">บันทึก</p>
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupManageRoom;
