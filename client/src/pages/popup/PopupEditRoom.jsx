import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Form, Button, CloseButton } from "react-bootstrap";
import { FaTrashCan, FaCircleInfo } from "react-icons/fa6";
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

  const handleDeleteData = async (subjects) => {
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
        const rooms = subjects.map((subject) => {
          const { cs_id, major_id, grade, room } = subject;
          const { room_id, seat } = room[0];
          return { cs_id, major_id, grade, seat, room_id };
        });

        const response = await axios.post(
          "http://localhost:5500/api/delete-room",
          {
            rooms: rooms,
          }
        );

        if (response.status === 200) {
          await props.fetchSubjects();
          Swal.fire({
            icon: "success",
            title: "ลบข้อมูลสำเร็จแล้ว",
            showConfirmButton: false,
            timer: 1500,
          });
          hide();
        } else {
          console.error(`Failed to delete rooms.`);
        }
      } catch (error) {
        console.error("Error deleting items:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการลบข้อมูล",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  const colors = {
    1: "#FD8A8A",
    2: "#F1F7B5",
    3: "#A8D1D1",
    4: "#9EA1D4",
  };

  return (
    <Modal show={show} onHide={hide} centered size="lg">
      <Modal.Header>
        <Modal.Title>
          <p>{`แก้ไขห้องสอบ ${selectedRoom}${selectedSeat?.value} วันที่ ${
            selectedDate ? selectedDate.value : ""
          }`}</p>
        </Modal.Title>
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
              <Row className="gx-0 border border-1 ">
                <Col
                  md={1}
                  className="rounded-start"
                  style={{
                    background: colors[subject.grade],
                    minHeight: "30px",
                  }}
                ></Col>
                <Col className="pe-0">
                  <Row className="gx-2 ps-3 pe-3 pt-2 pb-3">
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
                  </Row>
                  <Row className="gx-2 ps-3 pe-3 pb-2">
                    <Col>
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
                    <Col>
                      <Form.Label>ปี</Form.Label>
                      <Form.Control
                        id="gradeName"
                        name="gradeName"
                        className="custom-input"
                        type="text"
                        readOnly
                        value={subject.grade}
                      />
                    </Col>
                    <Col>
                      <Form.Label>ที่นั่ง</Form.Label>
                      <Form.Control
                        id="seat"
                        name="seat"
                        className="custom-input"
                        type="text"
                        value={subject.room.map((room) => room.seat).join(", ")}
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
                </Col>
              </Row>
            </Row>
          ))
        )}
        {dataSubject && dataSubject.length !== 0 && (
          <Row>
            <Col className="d-flex justify-content-end">
              <Button
                className="d-flex align-items-center gap-2"
                variant="danger"
                onClick={() => handleDeleteData(fetchSubject)}
              >
                <FaTrashCan />
                <p className="mb-0">ลบข้อมูลทั้งหมด</p>
              </Button>
            </Col>
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PopupEditRoom;
