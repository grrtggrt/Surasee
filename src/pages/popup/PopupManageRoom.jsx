import React, { useState } from "react";
import { Modal, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaCirclePlus , FaFloppyDisk  } from "react-icons/fa6";
import Select from "react-select";
import customStyles from "./CustomSelect.jsx"

const PopupManageRoom = (props) => {
  const { show, hide } = props;

  const [selectedOption, setSelectedOption] = useState("");
  const options = [
    { value: "none", label: "Empty" },
    { value: "left", label: "Open Left" },
    { value: "right", label: "Open Right" },
  ];
  const handleTypeSelect = e => {
    setSelectedOption(e.value);
  };

 
  return (
    <Modal show={show} onHide={hide} centered size="md" >
      <Modal.Header
        closeButton
        style={{ background: "#03A96B", fontSize: "16px", color: "white" }}
      >
        <Modal.Title>จัดห้องสอบ</Modal.Title>
      </Modal.Header>
      <Modal.Body >
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
                โปรดระบุเวลาสอบ :
              </Card.Body>
            </Card>
            <Row>
              <Col>
                <Select
                  id="timeStart"
                  name="timeStart"
                  label="timeStart"
                  options={options}
                  onChange={handleTypeSelect}
                  isSearchable={false}
                  placeholder="กรุณาเลือก"
                  styles={customStyles}

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
                  label="timeEnd"
                  options={options}
                  onChange={handleTypeSelect}
                  isSearchable={false}
                  placeholder="กรุณาเลือก"
                  styles={customStyles}
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
            <Row className="gx-2">
              <Col md={3}>
                <Form.Label>อาคาร</Form.Label>
                <Select
                  id="timeEnd"
                  name="timeEnd"
                  label="timeEnd"
                  options={options}
                  onChange={handleTypeSelect}
                  isSearchable={false}
                  placeholder="กรุณาเลือก"
                  // styles={customStyles}
                />
              </Col>
              <Col md={3}>
                <Form.Label>ห้อง</Form.Label>
                <Select
                  id="timeEnd"
                  name="timeEnd"
                  label="timeEnd"
                  options={options}
                  onChange={handleTypeSelect}
                  isSearchable={false}
                  placeholder="กรุณาเลือก"
                  styles={customStyles}
                />
              </Col>
              <Col md={3}>
                <Form.Label>ที่นั่ง</Form.Label>
                <Select
                  id="timeEnd"
                  name="timeEnd"
                  label="timeEnd"
                  options={options}
                  onChange={handleTypeSelect}
                  isSearchable={false}
                  placeholder="กรุณาเลือก"
                  styles={customStyles}
                />
              </Col>
              <Col md={2}>
                <Form.Label>จำนวน</Form.Label>
                <Form.Control
                  style={{ fontSize: "16px" }}
                  type="input"
                  placeholder="กรุณากรอก"
                  aria-label="total"
                />
              </Col>
              <Col
                md="auto"
                className="d-flex justify-content-center align-items-end pb-2"
              >
                <Button
                  style={{
                    background: "none",
                    border: "none",
                    outline: "none",
                    boxShadow: "none",
                    padding: "0",
                  }}
                >
                  <FaCirclePlus
                    style={{ fontSize: "large", color: "#28C3D7" }}
                  />
                </Button>
              </Col>
            </Row>
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
