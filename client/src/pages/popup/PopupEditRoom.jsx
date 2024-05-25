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
import { FaCircleMinus, FaCircleInfo } from "react-icons/fa6";
import Swal from "sweetalert2";
import axios from "axios";

// styles
import "../../styles/Modal.scss";
import "../../styles/Select.scss";
import "../../styles/Input.scss";

const PopupEditRoom = (props) => {
  const { show, hide, dataSubject, droppedRoom, selectedDate } = props;
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [fetchSubject, setFetchSubject] = useState([]);

  useEffect(() => {
    if (dataSubject && droppedRoom) {
      const filteredSubjects = dataSubject
        .map((subject) => {
          const filteredRooms = subject.room.filter((room) =>
            droppedRoom.some(
              (droppedRoomItem) => droppedRoomItem.room_id === room.room_id
            )
          );
          return { ...subject, room: filteredRooms };
        })
        .filter((subject) => subject.room.length > 0);
      setFetchSubject(filteredSubjects);
    }
  }, [dataSubject, droppedRoom]);

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
      selectedSeat && droppedRoom
        ? droppedRoom.map((item) => item.seat === selectedSeat)
        : selectedSeat === selectedSeat
    ) {
      const colorMap = {
        A: "#03A96B",
        B: "#D3E9E1",
        C: "#A4E5EE",
        D: "#A4B4EE",
        E: "#6685F4",
        F: "#415083",
        G: "#6D51A8",
        H: "#B25ABA",
        I: "#7B3D41",
        J: "#B66D4D",
      };
      return colorMap[selectedSeat];
    } else {
      return "#FFFFFF";
    }
  };

  const handleDeleteData = async (cs_id, major_id, room_id, seat) => {
    const confirmDelete = await Swal.fire({
      title: "ต้องการลบข้อมูลใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    });

    if (confirmDelete.isConfirmed) {
      try {
        const response = await axios.post(
          "http://localhost:5500/api/delete-room",
          {
            cs_id: cs_id,
            major_id: major_id,
            seat: seat,
            room_id: room_id,
          }
        );
        if (response.status === 200) {
          props.fetchSubjects();
          Swal.fire({
            icon: "success",
            title: "ลบข้อมูลสำเร็จแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });
          hide();
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถลบข้อมูลได้",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <Modal show={show} onHide={hide} centered size="lg">
      <Modal.Header>
        <Modal.Title>{`แก้ไขห้องสอบ ${selectedRoom} วันที่ ${
          selectedDate ? selectedDate.value : ""
        }`}</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        {fetchSubject.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "200px" }}
          >
            <FaCircleInfo className="fs-4 me-2 text-muted" />
            <p className="fs-5 text-muted">ไม่มีข้อมูลรายวิชาที่สอบ</p>
          </div>
        ) : (
          fetchSubject.map((subject, index) => (
            <Row key={index} className="ps-3 pe-3 mb-3">
              <Card className="p-0">
                <Card.Body
                  className="p-0"
                  style={{
                    background: customStyleBackground(selectedSeat?.value),
                  }}
                >
                  <Row>
                    <Col
                      md={1}
                      className="d-flex justify-content-end align-items-center"
                    >
                      <Button
                        className="btn-icon"
                        onClick={() =>
                          handleDeleteData(
                            subject.cs_id,
                            subject.major_id,
                            subject.room[0].room_id,
                            subject.room[0].seat
                          )
                        }
                      >
                        <FaCircleMinus className="text-danger fs-5" />
                      </Button>
                    </Col>
                    <Col>
                      <Card>
                        <Card.Body>
                          <Row className="gx-2">
                            <Col md={3}>
                              <Form.Label>รหัสวิชา</Form.Label>
                              <Form.Control
                                id="subjectId"
                                name="subjectId"
                                className="custom-input"
                                type="text"
                                readOnly
                                value={subject.cs_id}
                              />
                            </Col>
                            <Col>
                              <Form.Label>ชื่อวิชา</Form.Label>
                              <Form.Control
                                id="subjectName"
                                name="subjectName"
                                className="custom-input"
                                type="text"
                                readOnly
                                value={subject.cs_name_en}
                              />
                            </Col>
                            <Col md={2}>
                              <Form.Label>สาขา</Form.Label>
                              <Form.Control
                                id="majorName"
                                name="majorName"
                                className="custom-input"
                                type="text"
                                readOnly
                                value={subject.major_id}
                              />
                            </Col>
                          </Row>
                          <Row className="gx-2 mt-2">
                            <Col>
                              <Form.Label>ที่นั่ง</Form.Label>
                              <Form.Control
                                id="seat"
                                name="seat"
                                className="custom-input"
                                type="text"
                                value={subject.room
                                  .map((room) => room.seat)
                                  .join(", ")}
                                readOnly
                              />
                            </Col>
                            <Col>
                              <Form.Label>จำนวน</Form.Label>
                              <Form.Control
                                id="total"
                                name="total"
                                type="text"
                                className="custom-input"
                                value={subject.room
                                  .map((room) => room.amount)
                                  .join(", ")}
                                readOnly
                              />
                            </Col>
                            <Col>
                              <Form.Label>
                                <p>หมู่เรียน</p>
                              </Form.Label>
                              <Form.Control
                                id="secName"
                                name="secName"
                                type="text"
                                className="custom-input"
                                value={subject.room
                                  .map((room) => room.section)
                                  .join(", ")}
                                readOnly
                              />
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          ))
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PopupEditRoom;
