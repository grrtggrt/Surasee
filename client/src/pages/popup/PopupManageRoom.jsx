import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Form,
  Button,
  CloseButton,
  Badge,
} from "react-bootstrap";
import {
  FaCirclePlus,
  FaFloppyDisk,
  FaBan,
  FaCircleMinus,
} from "react-icons/fa6";
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
  const { show, hide, updatedDroppedItems, droppedRoom } = props;

  const [dataRoom, setDataRoom] = useState([]);
  const [dataSubject, setDataSubject] = useState([]);
  const [selectedStartTime, setSelectedStartTime] = useState(null);
  const [selectedEndTime, setSelectedEndTime] = useState(null);
  const [selectedOptionEndTime, setSelectedOptionEndTime] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [inputAmount, setInputAmount] = useState(0);
  const [inputSec, setInputSec] = useState(0);
  const [cards, setCards] = useState([]);
  const [amountSubject, setAmountSubject] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  //ดึงข้อมูล
  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  const fetchSubjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subjects");
      const subjects = response.data[0].subject;
      setDataSubject(subjects);
    } catch (error) {
      console.error("Error fetching subjects from schedule:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoom();
    fetchSubjects();
  }, [fetchRoom, fetchSubjects, show]);

  useEffect(() => {
    setSelectedBuilding(null);
    setSelectedRoom(null);
    setSelectedSeat(null);
    setSelectedStartTime(null);
    setSelectedEndTime(null);
    setSelectedOptionEndTime(null);
    setInputAmount("");
    setCards([]);
    setAmountSubject(
      updatedDroppedItems && Array.isArray(updatedDroppedItems)
        ? updatedDroppedItems.map((item) => item.amount).join(", ")
        : ""
    );
  }, [show]);


  useEffect(() => {
    if (droppedRoom && droppedRoom.length > 0) {
      const building = droppedRoom[0];
      setSelectedBuilding({
        label: building.build_name,
        value: building.build_id,
      });

      const room = droppedRoom[0];
      setSelectedRoom({
        label: room.room_id,
        value: room.room_id,
      });

      const seat = droppedRoom[0];
      setSelectedSeat({
        label: seat.seat,
        value: seat.seat,
      });
    }
  }, [droppedRoom]);

  //isDisabled
  useEffect(() => {
    if (droppedRoom && droppedRoom.length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [droppedRoom]);

  const filteredDataTimeStart = dataTimeStart.filter((option) => {
    const time = option.value.split(":");
    const hour = parseInt(time[0], 10);
    const minute = parseInt(time[1], 10);

    const isMorningTimezone =
      updatedDroppedItems &&
      updatedDroppedItems.some((item) => item.timezone === "เช้า");
    const isAfternoonTimezone =
      updatedDroppedItems &&
      updatedDroppedItems.some((item) => item.timezone === "กลางวัน");
    const isEveningTimezone =
      updatedDroppedItems &&
      updatedDroppedItems.some((item) => item.timezone === "เย็น");

    if (isMorningTimezone) {
      return (hour >= 7 && hour < 10) || (hour === 10 && minute === 0);
    } else if (isAfternoonTimezone) {
      return (hour >= 11 && hour <= 14) || (hour === 14 && minute === 0);
    } else if (isEveningTimezone) {
      return (hour >= 15 && hour <= 18) || (hour === 18 && minute === 0);
    }
    return true;
  });

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
    setSelectedBuilding(e);
  };

  const handleSelectRoom = (e) => {
    setSelectedRoom(e);
  };

  const handleSelectSeat = (e) => {
    setSelectedSeat(e);
  };

  const handleAddCard = () => {
    if (
      inputAmount > filterAmoutSubject ||
      inputAmount > filterAmount ||
      selectedSeat === null ||
      filterAmoutSubject <= 0 ||
      inputAmount === 0 ||
      isNaN(inputAmount) ||
      isNaN(inputSec) ||
      inputSec === 0
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      const newCard = {
        selectedBuilding,
        selectedRoom,
        selectedSeat,
        inputAmount,
        inputSec,
        filterAmount,
        droppableId: dataRoom
          .filter((room) => room.room_id === selectedRoom?.value)
          .map((room) => `droppable-${room._id}`)
          .join(", "),
      };
      setCards([...cards, newCard]);
      setAmountSubject(amountSubject - inputAmount);
      setSelectedBuilding(null);
      setSelectedRoom(null);
      setSelectedSeat(null);
      setInputSec(0);
      setInputAmount(0);
      setIsDisabled(false);
    }
  };

  const handleRemoveCard = (index) => {
    Swal.fire({
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
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: "success",
          title: "ลบข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 2000,
        });
        const cardToRemove = cards[index];
        const updatedCards = cards.filter((_, i) => i !== index);
        setCards(updatedCards);
        setAmountSubject(amountSubject + parseInt(cardToRemove.inputAmount));
      }
    });
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

  const filteredRoom = selectedBuilding
    ? dataRoom.filter((item) => {
        // คำนวณ totalAmount สำหรับแต่ละห้อง
        const totalAmount = dataSubject
          .filter((subject) =>
            updatedDroppedItems.some(
              (droppedItem) => droppedItem.date === subject.date
            )
          )
          .filter((subject) =>
            updatedDroppedItems.some(
              (time) => time.timezone === subject.timezone
            )
          )
          .filter((subject) =>
            subject.room.some(
              (r) => r.room_id === item.room_id && r.seat.includes(item.seat[0])
            )
          )
          .reduce(
            (sum, subject) =>
              sum + subject.room.find((r) => r.room_id === item.room_id).amount,
            item.amount
          );

        const hasDataSubject = dataSubject.some((subject) =>
          subject.room.some((room) => room.room_id === item.room_id)
        );

        // ตรวจสอบว่า amount ของห้องไม่เกิน Maxamount และห้องนั้นไม่ได้ถูกเลือกใน cards
        return (
          item.build_id === selectedBuilding.value &&
          !cards.some((card) => card.selectedRoom.value === item.room_id) &&
          totalAmount < item.Maxamount &&
          !hasDataSubject
        );
      })
    : [];

  const filterRoom = [
    ...new Set(filteredRoom.map((item) => item.room_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionRoom = filterRoom.map((room) => ({
    label: room,
    value: room,
  }));

  const filteredSeat = selectedRoom
    ? dataRoom.filter((item) => item.room_id === selectedRoom.value)
    : [];

  const filterSeat = [...new Set(filteredSeat.map((item) => item.seat))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const optionSeat = filterSeat.map((seat) => ({
    label: seat,
    value: seat,
  }));

  //จำนวนคนในวิชา
  const filterAmoutSubject = selectedSeat ? amountSubject : 0;

  const filterAmount =
    selectedSeat &&
    ((droppedRoom &&
      droppedRoom.length > 0 &&
      droppedRoom
        .filter((item) => item.seat === selectedSeat.value)
        .map((item) => item.Maxamount)[0]) ||
      (selectedSeat &&
        dataRoom &&
        dataRoom
          .filter((item) => item.seat === selectedSeat.value)
          .map((item) => {
            const totalAmount = dataSubject
              .filter((subject) =>
                updatedDroppedItems.some(
                  (droppedItem) => droppedItem.date === subject.date
                )
              )
              .filter((subject) =>
                subject.room.some(
                  (r) =>
                    r.room_id === item.room_id && r.seat.includes(item.seat[0])
                )
              )
              .reduce(
                (sum, subject) =>
                  sum +
                  subject.room.find((r) => r.room_id === item.room_id).amount,
                item.amount
              );
            return item.Maxamount - totalAmount;
          })));

  useEffect(() => {
    setSelectedEndTime(null);
  }, [selectedStartTime]);

  useEffect(() => {
    if (droppedRoom && !cards.length) {
      return;
    } else {
      setSelectedRoom(null);
      setSelectedSeat(null);
      setInputAmount(0);
    }
  }, [selectedBuilding]);

  useEffect(() => {
    if (droppedRoom && !cards.length) {
      return;
    } else {
      setSelectedSeat(null);
      setInputAmount(0);
    }
  }, [selectedRoom]);

  useEffect(() => {
    setInputAmount(filterAmoutSubject);
  }, [selectedSeat]);

  //Color
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

  //Alert Confirm
  const handleSaveConfirm = () => {
    if (
      selectedStartTime === null ||
      selectedEndTime === null ||
      !cards.length ||
      amountSubject !== 0
    ) {
      Swal.fire({
        icon: "error",
        title: "กรุณากรอกข้อมูลให้ถูกต้อง",
        showConfirmButton: false,
        timer: 1500,
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
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleSave();
        hide();
      }
    });
  };

  const handleSave = async () => {
    const dataToSave = updatedDroppedItems
      .map((item) => {
        return cards.map((filteredCard) => ({
          build_name: filteredCard.selectedBuilding.label,
          room_id: filteredCard.selectedRoom.value,
          seat: filteredCard.selectedSeat.value,
          timeStart: selectedStartTime.label,
          timeEnd: selectedEndTime.label,
          amount: filteredCard.inputAmount,
          section: filteredCard.inputSec,
          droppableIdRoom: filteredCard.droppableId,
          timezone: item.timezone,
          major_id: item.major_id,
          cs_id: item.cs_id,
        }));
      })
      .flat();

    try {
      const response = await axios.post(
        "http://localhost:5500/api/update-subjects-room",
        dataToSave
      );
      if (response.status === 200) {
        props.fetchSubjects();
        Swal.fire({
          icon: "success",
          title: "บันทึกข้อมูลสำเร็จ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      console.error("Error saving data:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
        showConfirmButton: false,
        timer: 1500,
      });
    }
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
                    value={
                      updatedDroppedItems && Array.isArray(updatedDroppedItems)
                        ? updatedDroppedItems
                            .map((item) => item.cs_id)
                            .join(", ")
                        : ""
                    }
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
                    value={
                      updatedDroppedItems && Array.isArray(updatedDroppedItems)
                        ? updatedDroppedItems
                            .map((item) => item.cs_name_en)
                            .join(", ")
                        : ""
                    }
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
                    value={amountSubject}
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
                  options={filteredDataTimeStart}
                  onChange={handleSelectStartTime}
                  value={selectedStartTime}
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
                  value={selectedEndTime}
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
            {amountSubject !== 0 ? (
              <Card>
                <Card.Body
                  style={{
                    background: customStyleBackground(selectedSeat?.value),
                  }}
                >
                  <Row className="gx-2">
                    <Col>
                      <Form.Label>อาคาร</Form.Label>
                      <Select
                        id="buildName"
                        name="buildName"
                        options={optionBuilding}
                        onChange={handleSelectBuilding}
                        value={selectedBuilding}
                        isDisabled={isDisabled}
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col>
                      <Form.Label>ห้อง</Form.Label>
                      <Select
                        id="roomName"
                        name="roomName"
                        options={optionRoom}
                        onChange={handleSelectRoom}
                        value={selectedRoom}
                        isDisabled={isDisabled}
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col>
                      <Form.Label>ที่นั่ง</Form.Label>
                      <Select
                        id="seatName"
                        name="seatName"
                        options={optionSeat}
                        onChange={handleSelectSeat}
                        value={selectedSeat}
                        isDisabled={isDisabled}
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col>
                      <Form.Label>
                        <Row>
                          <Col className="d-flex flex-row gap-2">
                            <p>จำนวน</p>
                            {selectedSeat ? (
                              <Badge
                                bg="primary"
                                className="d-flex align-items-center"
                              >{`${selectedSeat.value} : ${filterAmount} คน`}</Badge>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </Form.Label>
                      <Form.Control
                        id="amountName"
                        name="amountName"
                        type="number"
                        className={`custom-input ${
                          inputAmount > filterAmoutSubject ||
                          inputAmount > filterAmount
                            ? "text-danger"
                            : ""
                        }`}
                        placeholder="จำนวน"
                        value={inputAmount}
                        min="0"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(value)) {
                            setInputAmount(parseInt(value));
                          }
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Label>
                        <p>หมู่เรียน</p>
                      </Form.Label>
                      <Form.Control
                        id="secName"
                        name="secName"
                        type="number"
                        placeholder="จำนวน"
                        value={inputSec}
                        min="0"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (!isNaN(value)) {
                            setInputSec(parseInt(value));
                          }
                        }}
                      />
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-end pb-2"
                    >
                      <Button
                        className="btn-icon"
                        onClick={() => handleAddCard()}
                      >
                        <FaCirclePlus className="text-info fs-5" />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ) : (
              ""
            )}
          </Col>
          {cards.map((card, index) => (
            <Col key={index} className="mb-2">
              <Card className="mb-2">
                <Card.Body
                  style={{
                    background: customStyleBackground(card.selectedSeat.value),
                  }}
                >
                  <Row className="gx-2">
                    <Col>
                      <Form.Label>อาคาร</Form.Label>
                      <Select
                        id={`buildName-${index}`}
                        name={`buildName-${index}`}
                        options={optionBuilding}
                        onChange={handleSelectBuilding}
                        value={card.selectedBuilding}
                        isDisabled
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col>
                      <Form.Label>ห้อง</Form.Label>
                      <Select
                        id={`roomName-${index}`}
                        name={`roomName-${index}`}
                        options={optionRoom}
                        onChange={handleSelectRoom}
                        value={card.selectedRoom}
                        isDisabled
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col>
                      <Form.Label>ที่นั่ง</Form.Label>
                      <Select
                        id={`seatName-${index}`}
                        name={`seatName-${index}`}
                        options={optionSeat}
                        onChange={handleSelectSeat}
                        value={card.selectedSeat}
                        isDisabled
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col>
                      <Form.Label>
                        <Row>
                          <Col className="d-flex flex-row gap-2">
                            <p>จำนวน</p>
                            {card.selectedSeat ? (
                              <Badge
                                bg="primary"
                                className="d-flex align-items-center"
                              >{`${card.selectedSeat.value} : ${card.filterAmount} คน`}</Badge>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </Form.Label>
                      <Form.Control
                        id={`amountName-${index}`}
                        name={`amountName-${index}`}
                        type="number"
                        className={`custom-input ${
                          card.inputAmount > card.filterAmoutSubject
                            ? "text-danger"
                            : ""
                        }`}
                        placeholder="จำนวน"
                        value={card.inputAmount}
                        readOnly
                      />
                    </Col>
                    <Col>
                      <Form.Label>
                        <p>หมู่เรียน</p>
                      </Form.Label>
                      <Form.Control
                        id={`secName-${index}`}
                        name={`secName-${index}`}
                        type="text"
                        placeholder="หมู่เรียน"
                        value={card.inputSec}
                        readOnly
                      />
                    </Col>
                    <Col
                      md={1}
                      className="d-flex justify-content-center align-items-end pb-2"
                    >
                      <Button
                        className="btn-icon"
                        onClick={() => handleRemoveCard(index)}
                      >
                        <FaCircleMinus className="text-danger fs-5" />
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
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
