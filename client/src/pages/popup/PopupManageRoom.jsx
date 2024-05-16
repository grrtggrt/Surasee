import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Form,
  Button,
  CloseButton,
} from "react-bootstrap";
import { FaCirclePlus, FaFloppyDisk, FaBan } from "react-icons/fa6";
import Select from "react-select";
import Swal from "sweetalert2";
import axios from "axios";

// styles
import "../../styles/Modal.scss";
import "../../styles/Select.scss";
import "../../styles/Input.scss";
import "../../styles/Button.scss";

import { dataTimeStart, dataTimeEnd } from "../../MockupData";

const PopupManageRoom = (props) => {
  const { show, hide, selectedSubject } = props;

  const [dataRoom, setDataRoom] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [selectedOptionEndTime, setSelectedOptionEndTime] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [inputAmount, setInputAmount] = useState(null);

  //ดึงข้อมูล
  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

  useEffect(() => {
    setSelectedBuilding(null);
    setSelectedRoom(null);
    setSelectedSeat(null);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
    setSelectedOptionEndTime(null);
    setInputAmount("");
  }, [hide]);

  //ค้นหา
  const handleSelectStartTime = (selectedStartTime) => {
    if (selectedStartTime) {
      const startTime = parseInt(selectedStartTime.id);
      const endTimeOptions = [];

      for (let i = 0; i < dataTimeEnd.length; i++) {
        const endTime = parseInt(dataTimeEnd[i].id);
        if (endTime >= startTime && endTime - startTime <= 2) {
          endTimeOptions.push(dataTimeEnd[i]);
        }
      }
      setSelectedStartTime(selectedStartTime);
      setSelectedOptionEndTime(endTimeOptions);
    }
  };
  
  const handleSelectEndTime = (e) => {
    setSelectedEndTime(e);
  };

  const handleSelectBuilding = (e) => {
    setSelectedBuilding(e.value);
  };

  const handleSelectRoom = (e) => {
    setSelectedRoom(e.value);
  };

  const handleSelectSeat = (e) => {
    setSelectedSeat(e.value);
  };

  const filterBuilding = [
    ...new Set(dataRoom.map((item) => item.build_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionBuilding = filterBuilding.map((buildingId) => {
    const building = dataRoom.find((item) => item.build_id === buildingId);
    return {
      label: building.build_name,
      value: buildingId,
    };
  });

  const filteredRoom = dataRoom.filter(
    (item) => item.build_id === selectedBuilding
  );

  const filterRoom = [
    ...new Set(filteredRoom.map((item) => item.room_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionRoom = filterRoom.map((room) => ({
    label: room,
    value: room,
  }));

  const filteredSeat = dataRoom.filter((item) => item.room_id === selectedRoom);

  const filterSeat = [...new Set(filteredSeat.map((item) => item.seat))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const optionSeat = filterSeat.map((seat) => ({
    label: seat,
    value: seat,
  }));

  const filterAmount = selectedSubject ? selectedSubject.amount : 0;

  useEffect(() => {
    setSelectedRoom(null);
    setSelectedSeat(null);
    setInputAmount("");
  }, [selectedBuilding]);

  useEffect(() => {
    setSelectedSeat(null);
    setInputAmount("");
  }, [selectedRoom]);

  useEffect(() => {
    setInputAmount(filterAmount);
  }, [selectedSeat]);

  //Color
  const customStyleBackground = (selectedSeat) => {
    if (selectedSeat && filterSeat.includes(selectedSeat)) {
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
    if (
      selectedStartTime === null ||
      selectedEndTime === null ||
      selectedBuilding === null ||
      selectedRoom === null ||
      selectedSeat === null ||
      inputAmount === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณาเลือกข้อมูลให้ครบ",
        confirmButtonColor: "#03A96B",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "shadow-none",
        },
      });
      return;
    }

    if (
      inputAmount >
      dataRoom
        .filter((item) => item.seat === selectedSeat)
        .map((item) => item.Maxamount)
    ) {
      Swal.fire({
        icon: "error",
        title: "จำนวนคนเกิน",
        confirmButtonColor: "#03A96B",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "shadow-none",
        },
      });
      return;
    }

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
              <Col md={3}>
                <p>รหัสวิชา</p>
                <Form>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                    value={selectedSubject ? selectedSubject.cs_id : ""}
                  />
                </Form>
              </Col>
              <Col md={6}>
                <p>ชื่อวิชา</p>
                <Form>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                    value={selectedSubject ? selectedSubject.cs_name_th : ""}
                  />
                </Form>
              </Col>
              <Col md={3}>
                <p>จำนวนคน</p>
                <Form>
                  <Form.Control
                    className="custom-input"
                    type="text"
                    readOnly
                    disabled
                    value={selectedSubject ? selectedSubject.amount : ""}
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
                  options={dataTimeStart}
                  onChange={handleSelectStartTime}
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
                  options={selectedOptionEndTime}
                  onChange={handleSelectEndTime}
                  placeholder="กรุณาเลือก"
                  isSearchable={false}
                  className="react-select-container"
                  classNamePrefix="react-select"
                  isDisabled={!selectedStartTime}
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
              <Card.Body
                style={{ background: customStyleBackground(selectedSeat) }}
              >
                <Row className="gx-2">
                  <Col md={3}>
                    <Form.Label>อาคาร</Form.Label>
                    <Select
                      id="buildName"
                      name="buildName"
                      options={optionBuilding}
                      onChange={handleSelectBuilding}
                      placeholder="กรุณาเลือก"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>ห้อง</Form.Label>
                    <Select
                      id="roomName"
                      name="roomName"
                      options={optionRoom}
                      onChange={handleSelectRoom}
                      placeholder="กรุณาเลือก"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Label>ที่นั่ง</Form.Label>
                    <Select
                      id="seatName"
                      name="seatName"
                      options={optionSeat}
                      onChange={handleSelectSeat}
                      placeholder="กรุณาเลือก"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col md={2}>
                    <Form.Label>จำนวน</Form.Label>
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="number"
                      className="custom-input"
                      placeholder="จำนวน"
                      value={inputAmount}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!isNaN(value)) {
                          setInputAmount(value);
                        }
                      }}
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
          <Col className="d-flex justify-content-center gap-3">
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

export default PopupManageRoom;
