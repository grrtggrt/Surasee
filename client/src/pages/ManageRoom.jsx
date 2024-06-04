import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPenToSquare,
  FaUserGroup,
} from "react-icons/fa6";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";

// styles
import "../styles/Select.scss";
import "../styles/Input.scss";
import "../styles/Button.scss";
import "../styles/Loader.scss";
import "./ManageRoom.scss";

import PopupEditRoom from "./popup/PopupEditRoom";
import PopupManageRoom from "./popup/PopupManageRoom";

const ManageRoom = () => {
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [showManageRoom, setShowManageRoom] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectDropped, setSelectDropped] = useState(null);
  const [selectRoom, setSelectRoom] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [inputSubject, setInputSubject] = useState("");
  const [fetchDataRoom, setFetchDataRoom] = useState([]);
  const [fetchDataSubject, setFetchDataSubject] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dataSubject, setDataSubject] = useState([]);
  const [dataRoomSubject, setDataRoomSubject] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  //ดึงข้อมูล
  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setFetchDataRoom(response.data);
      setDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  const fetchSubjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subjects");
      const data = response.data;
      const subjects = data.flatMap((item) => item.subject || []);

      const combinedSubjects = subjects.reduce((acc, subject) => {
        const existingSubjectIndex = acc.findIndex(
          (s) => s.cs_id === subject.cs_id
        );
        if (existingSubjectIndex !== -1) {
          acc[existingSubjectIndex].amount += subject.amount;

          acc[existingSubjectIndex].major_id.push({
            amount: subject.amount,
            grade: subject.grade,
            major_id: subject.major_id,
          });

          subject.room.forEach((newRoom) => {
            const existingRoomIndex = acc[existingSubjectIndex].room.findIndex(
              (r) => r.room_id === newRoom.room_id
            );
            if (existingRoomIndex !== -1) {
            } else {
              acc[existingSubjectIndex].room.push(newRoom);
            }
          });
        } else {
          acc.push({
            cs_id: subject.cs_id,
            cs_name_en: subject.cs_name_en,
            cs_name_th: subject.cs_name_th,
            amount: subject.amount,
            date: subject.date,
            droppableIdSchedule: subject.droppableIdSchedule,
            major_id: [
              {
                amount: subject.amount,
                grade: subject.grade,
                major_id: subject.major_id,
              },
            ],
            room: subject.room.map((room) => ({
              ...room,
              amount: room.amount,
            })),
            timezone: subject.timezone,
            _id: subject._id,
          });
        }
        return acc;
      }, []);

      setDataSubject(combinedSubjects);
      setDataRoomSubject(subjects);
    } catch (error) {
      console.error("Error fetching subjects from schedule:", error);
    }
  }, []);

  const fetchMajor = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/major");
      setDataMajor(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRoom(), fetchSubjects(), fetchMajor()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchRoom, fetchSubjects, fetchMajor]);

  useEffect(() => {
    const filteredSubjects = dataSubject
      .filter((amount) => !amount || amount.amount !== 0)
      .filter((date) => date.date === selectedDate?.value)
      .filter((time) => time.timezone === selectedTime?.value);

    setFetchDataSubject(filteredSubjects);
  }, [dataSubject, selectedDate, selectedTime]);

  //Drop
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceIndex = source.index;
      const draggedItem = fetchDataSubject[sourceIndex];

      const newSubjects = fetchDataSubject.filter(
        (_, index) => index !== sourceIndex
      );

      setFetchDataSubject(newSubjects);

      const newDroppedItems = [
        ...droppedItems,
        { ...draggedItem, droppableId: destination.droppableId },
      ];

      setDroppedItems(newDroppedItems);

      const updatedDroppedItems = newDroppedItems.filter(
        (item) => item.droppableId === destination.droppableId
      );

      const droppedRoom = fetchDataRoom
        .filter((room) => `droppable-${room._id}` === destination.droppableId)
        .map((room) => {
          const relatedSubjects = dataRoomSubject
            .filter((date) => date.date === selectedDate?.value)
            .filter((time) => time.timezone === selectedTime?.value)
            .filter((subject) =>
              subject.room.some(
                (r) =>
                  r.room_id === room.room_id &&
                  r.seat.some((seat) => room.seat.includes(seat))
              )
            );

          const totalSubjectAmount = relatedSubjects.reduce(
            (total, subject) =>
              total +
              subject.room.reduce(
                (sum, r) =>
                  r.room_id === room.room_id &&
                  r.seat.some((seat) => room.seat.includes(seat))
                    ? sum + r.amount
                    : sum,
                0
              ),
            0
          );

          const updatedMaxAmount = room.Maxamount - totalSubjectAmount;

          return { ...room, Maxamount: updatedMaxAmount };
        });

      handleShowManageRoom(updatedDroppedItems, droppedRoom);
    }
  };

  const droppableId = [];

  for (let i = 0; i < fetchDataRoom.length; i++) {
    droppableId.push(`droppable-${fetchDataRoom[i]._id}`);
  }

  //Modal
  const handleEditClick = () => {
    if (!selectedDate || !selectedTime) {
      Swal.fire({
        title: "กรุณากรอกวันที่เพื่อแก้ไข",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setIsEditing(!isEditing);
    }
  };

  const handleShowEditRoom = (dataSubject, droppedRoom) => {
    setSelectDropped(dataSubject);
    setSelectRoom(droppedRoom);
    setShowEditRoom(true);
    // ทำสิ่งที่ต้องการกับ items ที่ถูกส่งเข้ามา
  };

  const handleHideEditRoom = async () => {
    setShowEditRoom(false);
    await fetchSubjects(); // รอให้ข้อมูลถูกบันทึกเสร็จสมบูรณ์ก่อนที่จะเรียกใช้
    setDroppedItems([]);
    setSelectDropped([]);
    setSelectRoom([]);
  };

  const handleShowManageRoom = (updatedDroppedItems, droppedRoom) => {
    setSelectDropped(updatedDroppedItems);
    setSelectRoom(droppedRoom);
    setShowManageRoom(true);
  };

  const handleHideManageRoom = async () => {
    setShowManageRoom(false);
    await fetchSubjects(); // รอให้ข้อมูลถูกบันทึกเสร็จสมบูรณ์ก่อนที่จะเรียกใช้
    setDroppedItems([]);
    setSelectDropped([]);
    setSelectRoom([]);
  };

  //Search
  const handleSelectDate = (e) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedDate(e);
      setLoading(false);
    }, 500);
  };

  const handleSelectTime = (e) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedTime(e);
      setLoading(false);
    }, 500);
  };

  const handleSelectBuilding = (e) => {
    setSelectedBuilding(e);
  };

  const handleSelectFloor = (e) => {
    setSelectedFloor(e);
  };

  const handleSelectMajor = (e) => {
    setSelectedMajor(e);
  };

  const handleSelectGrade = (e) => {
    setSelectedGrade(e);
  };

  //วัน
  const filterDate = [...new Set(dataSubject.map((item) => item.date))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const optionDate = filterDate.map((date) => {
    return {
      label: date,
      value: date,
    };
  });

  //เวลา
  const order = ["เช้า", "กลางวัน", "เย็น"];

  const filtertime = [
    ...new Set(dataSubject.map((item) => item.timezone)),
  ].sort((a, b) => order.indexOf(a) - order.indexOf(b));

  const optiontime = filtertime.map((time) => {
    return {
      label: time,
      value: time,
    };
  });

  //ตึก
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

  const filteredBuilding = selectedBuilding
    ? dataRoom.filter((item) => item.build_id === selectedBuilding.value)
    : [];

  //ชั้น
  const filterfloor = [
    ...new Set(filteredBuilding.map((item) => item.floor)),
  ].sort((a, b) => parseInt(a) - parseInt(b));
  const optionsfloor = filterfloor.map((floor) => ({
    label: floor,
    value: floor,
  }));

  //สาขา
  const filterMajor = [...new Set(dataMajor.map((item) => item.major_id))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const optionMajor = filterMajor.map((major) => ({
    label: major,
    value: major,
  }));

  const filteredMajor = selectedMajor
    ? dataMajor.filter((item) => item.major_id === selectedMajor.value)
    : [];

  //ชั้นปี
  const filterGrade = [
    ...new Set(filteredMajor.map((item) => item.major_grade)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionGrade = filterGrade.map((grade) => ({
    label: grade,
    value: grade,
  }));

  const handleClickSearchRoom = () => {
    if (!selectedBuilding && !selectedFloor && !inputAmount) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = dataRoom.filter((item) => {
          return (
            (!selectedBuilding || item.build_id === selectedBuilding.value) &&
            (!selectedFloor || item.floor === selectedFloor.value) &&
            (!inputAmount ||
              parseFloat(inputAmount) < parseFloat(item.Maxamount))
          );
        });

        setFetchDataRoom(filteredData);
        setLoading(false);
      }, 500);
    }
  };

  const handleClickSearchSubject = () => {
    if (!selectedMajor && !selectedGrade && !inputSubject) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = fetchDataSubject.filter((item) => {
          return (
            (!selectedMajor ||
              (item.major_id &&
                item.major_id.some((major) =>
                  major.major_id
                    .toLowerCase()
                    .includes(selectedMajor.value.toLowerCase())
                ))) &&
            (!selectedGrade ||
              (item.major_id &&
                item.major_id.some((grade) =>
                  grade.grade
                    .toString()
                    .toLowerCase()
                    .includes(selectedGrade.value.toString().toLowerCase())
                ))) &&
            (!inputSubject ||
              item.cs_id.toLowerCase().includes(inputSubject.toLowerCase()) ||
              item.cs_name_en
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              item.cs_name_th
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              (item.major_id &&
                item.major_id.some((major) =>
                  major.major_id
                    .toLowerCase()
                    .includes(inputSubject.toLowerCase())
                )))
          );
        });
        setFetchDataSubject(filteredData);
        setLoading(false);
      }, 500);
    }
  };

  const handleClickResetSubject = () => {
    setLoading(true);
    setTimeout(() => {
      const filteredItems = dataSubject
        .filter((amount) => !amount || amount.amount !== 0)
        .filter((date) => date.date === selectedDate?.value)
        .filter((time) => time.timezone === selectedTime?.value);

      setFetchDataSubject(filteredItems);
      setSelectedMajor(null);
      setSelectedGrade(null);
      setInputSubject("");
      setLoading(false);
    }, 500);
  };

  const handleClickResetRoom = () => {
    setLoading(true);
    setTimeout(() => {
      setFetchDataRoom(dataRoom);
      setSelectedBuilding(null);
      setSelectedFloor(null);
      setInputAmount("");
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    setFetchDataRoom(dataRoom);
  }, [inputAmount]);

  useEffect(() => {
    setFetchDataRoom(dataRoom);
    if (selectedBuilding !== null || selectedFloor !== null) {
      setInputAmount("");
    }
  }, [selectedBuilding, selectedFloor]);

  useEffect(() => {
    setSelectedFloor(null);
  }, [selectedBuilding]);

  useEffect(() => {
    const filteredItems = dataSubject
      .filter((amount) => !amount || amount.amount !== 0)
      .filter((date) => date.date === selectedDate?.value)
      .filter((time) => time.timezone === selectedTime?.value);

    setFetchDataSubject(filteredItems);
    if (!inputSubject) {
      return;
    } else {
      setSelectedMajor(null);
      setSelectedGrade(null);
    }
  }, [inputSubject]);

  useEffect(() => {
    const filteredItems = dataSubject
      .filter((amount) => !amount || amount.amount !== 0)
      .filter((date) => date.date === selectedDate?.value)
      .filter((time) => time.timezone === selectedTime?.value);

    setFetchDataSubject(filteredItems);
    if (selectedMajor !== null || selectedGrade !== null) {
      setInputSubject("");
    }
  }, [selectedMajor, selectedGrade]);

  useEffect(() => {
    setSelectedGrade(null);
  }, [selectedMajor]);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 800);
  }, []);

  const colors = {
    1: "#FD8A8A",
    2: "#F1F7B5",
    3: "#A8D1D1",
    4: "#9EA1D4",
  };

  return (
    <>
      {initialLoading && (
        <div className="overlay">
          <div className="loader" />
        </div>
      )}
      {loading && !initialLoading && <div className="loader" />}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="main-content-center">
          <Row className="d-flex gap-3">
            <Row>
              <Col className="d-flex align-items-end">
                <h5>รายวิชา</h5>
              </Col>
              <Col className="d-flex justify-content-end p-0 gap-3">
                <Card className="pe-3">
                  <Card.Body className="d-flex align-items-center gap-3 p-2">
                    <Col className="d-flex align-items-center gap-3 ps-3">
                      <p>วันที่สอบ</p>
                      <Select
                        id="dateName"
                        name="dateName"
                        options={optionDate}
                        onChange={handleSelectDate}
                        value={selectedDate}
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                  </Card.Body>
                </Card>
                <Card className="pe-3">
                  <Card.Body className="d-flex align-items-center gap-3 p-2">
                    <Col className="d-flex align-items-center gap-3 ps-3">
                      <p>เวลาสอบ</p>
                      <Select
                        id="dateName"
                        name="dateName"
                        options={optiontime}
                        onChange={handleSelectTime}
                        value={selectedTime}
                        placeholder="กรุณาเลือก"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="mx-0">
              <Card>
                <Card.Body>
                  <Row
                    className="d-flex justify-content-end rounded-3 gx-2 mb-3 p-2"
                    style={{ background: "#4A4F55" }}
                  >
                    <Col md={2}>
                      <Select
                        id="majorName"
                        name="majorName"
                        options={optionMajor}
                        onChange={handleSelectMajor}
                        value={selectedMajor}
                        placeholder="สาขา"
                        isSearchable={true}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col md={1}>
                      <Select
                        id="gradeName"
                        name="gradeName"
                        options={optionGrade}
                        onChange={handleSelectGrade}
                        value={selectedGrade}
                        placeholder="ชั้นปี"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col md={2}>
                      <Form.Control
                        id="searchName"
                        name="searchName"
                        type="search"
                        placeholder="รหัสวิชา/ชื่อวิชา"
                        className="custom-input"
                        value={inputSubject}
                        onChange={(e) => setInputSubject(e.target.value)}
                      />
                    </Col>
                    <Col
                      md="auto"
                      className="d-flex justify-content-center gap-2"
                    >
                      <Button
                        className="d-flex align-items-center gap-2"
                        variant="info"
                        onClick={() => handleClickSearchSubject()}
                      >
                        <FaMagnifyingGlass />
                        <p className="mb-0">ค้นหา</p>
                      </Button>
                      <Button
                        className="d-flex align-items-center gap-2"
                        variant="danger"
                        onClick={() => handleClickResetSubject()}
                      >
                        <FaArrowsRotate />
                        <p className="mb-0">รีเซ็ต</p>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Droppable droppableId="subject">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="subject-card-grid-manageroom"
                        >
                          {fetchDataSubject.map((item, index) => (
                            <Draggable
                              key={item.cs_id}
                              draggableId={item.cs_id}
                              index={index}
                            >
                              {(provided) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card.Body className="p-3">
                                    <Row>
                                      <Col className="d-flex justify-content-start">
                                        <p className="fw-bold pb-1">
                                          {item.cs_id}
                                        </p>
                                      </Col>
                                      <Col
                                        md={3}
                                        className="d-flex justify-content-end align-items-center pb-2"
                                      >
                                        <p
                                          style={{
                                            backgroundColor: "#5ec1d4",
                                            borderRadius: "20px",
                                            textAlign: "center",
                                            color: "white",
                                            fontSize: "12px",
                                            display: "block",
                                            width: "fit-content",
                                            padding: "1px 7px 1px 7px",
                                          }}
                                          className="d-flex align-items-center gap-1"
                                        >
                                          <FaUserGroup />
                                          {item.amount}
                                        </p>
                                      </Col>
                                    </Row>

                                    <hr style={{ margin: "2px 0" }} />
                                    <p className="pb-1 pt-1">
                                      {item.cs_name_en}
                                    </p>
                                    <div className="d-flex flex-wrap gap-1">
                                      {item.major_id
                                        .sort((a, b) => a.grade - b.grade)
                                        .map((item, index) => (
                                          <p
                                            key={index}
                                            style={{
                                              backgroundColor:
                                                colors[item.grade] || "#5e5e5e",
                                              borderRadius: "20px",
                                              textAlign: "center",
                                              color: "white",
                                              fontSize: "12px",
                                              display: "block",
                                              width: "fit-content",
                                              minWidth: "50px",
                                              padding: "2px 8px 2px 8px",
                                            }}
                                          >
                                            {`${item.major_id}`}
                                          </p>
                                        ))}
                                    </div>
                                  </Card.Body>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            <h5 className="m-0">อาคาร / ห้อง</h5>
            <Row className="mx-0">
              <Card>
                <Card.Body>
                  <Row
                    className="d-flex justify-content-end rounded-3 gx-2 mb-3 p-2"
                    style={{ background: "#4A4F55" }}
                  >
                    <Col className="d-flex justify-content-start">
                      <Button
                        className="btn-outline d-flex align-items-center gap-2"
                        onClick={() => handleEditClick()}
                      >
                        <FaPenToSquare />
                        แก้ไข
                      </Button>
                    </Col>
                    <Col md={1}>
                      <Select
                        id="buildName"
                        name="buildName"
                        options={optionBuilding}
                        onChange={handleSelectBuilding}
                        value={selectedBuilding}
                        placeholder="อาคาร"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col md={1}>
                      <Select
                        id="floorName"
                        name="floorName"
                        options={optionsfloor}
                        onChange={handleSelectFloor}
                        value={selectedFloor}
                        placeholder="ชั้น"
                        isSearchable={false}
                        className="react-select-container"
                        classNamePrefix="react-select"
                      />
                    </Col>
                    <Col md={1}>
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
                      md="auto"
                      className="d-flex justify-content-center gap-2"
                    >
                      <Button
                        className="d-flex align-items-center gap-2"
                        variant="info"
                        onClick={() => handleClickSearchRoom()}
                      >
                        <FaMagnifyingGlass />
                        <p className="mb-0">ค้นหา</p>
                      </Button>
                      <Button
                        className="d-flex align-items-center gap-2"
                        variant="danger"
                        onClick={() => handleClickResetRoom()}
                      >
                        <FaArrowsRotate />
                        <p className="mb-0">รีเซ็ต</p>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="room-card-grid-manageroom">
                      {fetchDataRoom
                        .sort((a, b) => a.build_id - b.build_id)
                        .map((item, index) => {
                          const totalAmount = dataRoomSubject
                            .filter((date) => date.date === selectedDate?.value)
                            .filter(
                              (time) => time.timezone === selectedTime?.value
                            )
                            .filter((subject) =>
                              subject.room.some(
                                (r) =>
                                  r.room_id === item.room_id &&
                                  r.seat.includes(item.seat[0])
                              )
                            )
                            .reduce(
                              (sum, subject) =>
                                sum +
                                subject.room.find(
                                  (r) => r.room_id === item.room_id
                                ).amount,
                              item.amount
                            );

                          const isDropDisabled =
                            totalAmount >= item.Maxamount ||
                            dataRoomSubject.some(
                              (subject) =>
                                subject.date === selectedDate?.value &&
                                subject.timezone === selectedTime?.value &&
                                subject.room.some(
                                  (room) =>
                                    room.room_id === item.room_id ||
                                    room.droppableIdRoom ===
                                      `droppable-${item._id}`
                                )
                            );

                          return (
                            <Droppable
                              droppableId={droppableId[index]}
                              key={index}
                              isDropDisabled={isDropDisabled}
                            >
                              {(provided) => (
                                <Card
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  className="mt-3"
                                >
                                  <Card.Header
                                    className="d-flex justify-content-center p-2"
                                    style={{
                                      background: "#03A96B",
                                      color: "white",
                                    }}
                                  >
                                    <div className="d-flex align-items-center gap-2">
                                      <p>{item.room_id}</p>
                                      <p>|</p>
                                      <p
                                        className={`${
                                          totalAmount >= item.Maxamount
                                            ? "text-danger"
                                            : ""
                                        }`}
                                      >{`${totalAmount} / ${item.Maxamount}${item.seat}`}</p>
                                    </div>
                                    {isEditing ? (
                                      <Button
                                        className="btn-icon"
                                        style={{
                                          position: "absolute",
                                          top: "-9px",
                                          right: "-7px",
                                          zIndex: 1,
                                        }}
                                        onClick={() =>
                                          handleShowEditRoom(
                                            dataRoomSubject
                                              .filter(
                                                (date) =>
                                                  date.date ===
                                                  selectedDate?.value
                                              )
                                              .filter(
                                                (time) =>
                                                  time.timezone ===
                                                  selectedTime?.value
                                              )
                                              .filter((subject) =>
                                                subject.room.some(
                                                  (r) =>
                                                    r.room_id ===
                                                      item.room_id &&
                                                    r.seat.includes(
                                                      item.seat[0]
                                                    )
                                                )
                                              ),
                                            fetchDataRoom.filter(
                                              (droppedRoom) =>
                                                `droppable-${droppedRoom._id}` ===
                                                droppableId[index]
                                            )
                                          )
                                        }
                                      >
                                        <div
                                          className="rounded-3 bg-warning"
                                          style={{
                                            paddingLeft: "5px",
                                            paddingRight: "4px",
                                            paddingBottom: "2px",
                                          }}
                                        >
                                          <FaPenToSquare className="fs-6" />
                                        </div>
                                      </Button>
                                    ) : null}
                                  </Card.Header>
                                  <Card.Body className="room-body-card">
                                    {dataRoomSubject
                                      .filter(
                                        (date) =>
                                          date.date === selectedDate?.value
                                      )
                                      .filter(
                                        (time) =>
                                          time.timezone === selectedTime?.value
                                      )
                                      .filter((subject) =>
                                        subject.room.some(
                                          (r) =>
                                            r.room_id === item.room_id &&
                                            r.seat.includes(item.seat[0])
                                        )
                                      )
                                      .map((subject, index) => (
                                        <Card
                                          key={`${subject.cs_id}-${index}`}
                                          index={index}
                                        >
                                          <div
                                            style={{
                                              background: "#5ec1d4",
                                              padding: "4px",
                                              borderRadius: "3px",
                                              color: "white",
                                              textAlign: "center",
                                            }}
                                          >
                                            {subject.cs_id}
                                          </div>
                                          <Card.Body className="p-2">
                                            <Row>
                                              <Col>
                                                <p className="pt-1 pb-2">
                                                  {subject.cs_name_en}
                                                </p>
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col>
                                                <p
                                                  key={index}
                                                  style={{
                                                    backgroundColor:
                                                      colors[subject.grade] ||
                                                      "#5e5e5e",
                                                    borderRadius: "20px",
                                                    textAlign: "center",
                                                    color: "white",
                                                    fontSize: "12px",
                                                    display: "block",
                                                    width: "fit-content",
                                                    minWidth: "50px",
                                                    padding: "2px 8px 2px 8px",
                                                  }}
                                                  className="mb-2"
                                                >
                                                  {subject.major_id}
                                                </p>
                                              </Col>
                                              <Col className="d-flex justify-content-end">
                                                {Array.from(
                                                  new Set(
                                                    subject.room.map(
                                                      (item) => item.section
                                                    )
                                                  )
                                                ).map((section) => (
                                                  <p
                                                    key={section}
                                                    style={{ color: "#03A96B" }}
                                                  >{`${section}`}</p>
                                                ))}
                                              </Col>
                                            </Row>
                                          </Card.Body>
                                        </Card>
                                      ))}
                                    {provided.placeholder}
                                  </Card.Body>
                                </Card>
                              )}
                            </Droppable>
                          );
                        })}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
          </Row>
          <PopupEditRoom
            show={showEditRoom}
            hide={handleHideEditRoom}
            dataSubject={selectDropped}
            droppedRoom={selectRoom}
            selectedDate={selectedDate}
            fetchSubjects={fetchSubjects}
          />
          <PopupManageRoom
            show={showManageRoom}
            hide={handleHideManageRoom}
            updatedDroppedItems={selectDropped}
            droppedRoom={selectRoom}
            fetchSubjects={fetchSubjects}
          />
        </div>
      </DragDropContext>
    </>
  );
};

export default ManageRoom;
