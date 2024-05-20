import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Form,
  Button,
  CloseButton,
  Card,
} from "react-bootstrap";
import { FaBan, FaFloppyDisk, FaCircleMinus } from "react-icons/fa6";
import Swal from "sweetalert2";
import Select from "react-select";

// styles
import "../../styles/Modal.scss";
import "../../styles/Select.scss";
import "../../styles/Input.scss";

const PopupEditRoom = (props) => {
  const { show, hide, droppedItems, droppedRoom } = props;
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (droppedRoom && droppedRoom.length > 0) {
      const seat = droppedRoom[0];
      setSelectedSeat({
        label: seat.seat,
        value: seat.seat,
      });

      const roomId = droppedRoom.map((item) => item.room_id);
      setSelectedRoom(roomId);
    }
  }, [droppedRoom]);

  const customStyleBackground = (selectedSeat) => {
    if (
      selectedSeat &&
      droppedRoom.some((item) => item.seat === selectedSeat)
    ) {
      const colorMap = {
        A: "#03A96B",
        B: "#D3E9E1",
        C: "#A4E5EE",
      };
      return colorMap[selectedSeat];
    } else {
      return "#FFFFFF";
    }
  };

  //Alert Confirm
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
        <Modal.Title>{`แก้ไขห้องสอบ ${selectedRoom}`}</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        <Row className="ps-3 pe-3 mb-3">
          <Card className="p-0">
            <Card.Body
              style={{ background: customStyleBackground(selectedSeat?.value) }}
            >
              <Row className="gx-2">
                <Col>
                  <Form.Label>รหัสวิชา</Form.Label>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                    value={
                      droppedItems && Array.isArray(droppedItems)
                        ? droppedItems.map((item) => item.cs_id).join(", ")
                        : ""
                    }
                  />
                </Col>
                <Col md={3}>
                  <Form.Label>ชื่อวิชา</Form.Label>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                    value={
                      droppedItems && Array.isArray(droppedItems)
                        ? droppedItems.map((item) => item.cs_name_en).join(", ")
                        : ""
                    }
                  />
                </Col>
                <Col>
                  <Form.Label>สาขา</Form.Label>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                    value={
                      droppedItems && Array.isArray(droppedItems)
                        ? droppedItems.map((item) => item.major_id).join(", ")
                        : ""
                    }
                  />
                </Col>
                <Col>
                  <Form.Label>ที่นั่ง</Form.Label>
                  <Select
                    id="seat"
                    name="seat"
                    value={selectedSeat}
                    isDisabled
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
                    value={
                      droppedItems && Array.isArray(droppedItems)
                        ? droppedItems.map((item) => item.amount).join(", ")
                        : ""
                    }
                    disabled
                  />
                </Col>
                <Col
                  md="auto"
                  className="d-flex justify-content-center align-items-end pb-2"
                >
                  <Button className="btn-icon">
                    <FaCircleMinus className="text-danger fs-5" />
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
