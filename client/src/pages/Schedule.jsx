import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";

//ICONS
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPlus,
  FaFloppyDisk,
  FaPenToSquare,
  FaEraser,
  FaCircleMinus,
} from "react-icons/fa6";

//POPUP
import PopupManageRoom from "./popup/PopupManageRoom";
import PopupManageSchedule from "./popup/PopupManageSchedule";

//STYLE
import "./Schedule.scss";

//DATA
import {
  dataFacultyOption,
  dataMajorOption,
  dataGradeOption,
} from "../MockupData";

const Schedule = () => {
  const [showManageRoom, setShowManageRoom] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [droppedItems, setDroppedItems] = useState([]);
  const [input, setInput] = useState("");
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5500/api/subject")
      .then((response) => {
        setData(response.data);
        setItems(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(items)

  //DND
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; // ไม่มีปลายทาง

    // ตรวจสอบว่าปลายทางเป็น droppable ที่ถูกต้องหรือไม่
    if (source.droppableId !== destination.droppableId) {
      const draggedItem = items[source.index]; // กำหนดค่าให้ draggedItem จาก items ที่ถูกลาก
      const newItems = [...items];
      newItems.splice(source.index, 1);

      // อัปเดต state ของไอเท็มเฉพาะเมื่อถูกวางใน droppable ที่ถูกต้อง
      setItems(newItems);
      setDroppedItems((prevItems) => {
        return [
          ...prevItems,
          { ...draggedItem, droppableId: destination.droppableId },
        ];
      });
      setSelectedSubject(draggedItem);
      handleShowManageRoom();
    }
  };

  //DELETE-BTN
  const handleDeleteItem = (droppableId, itemId) => {
    // ตัดไอเท็มที่ต้องการลบออกจาก droppedItems
    let deletedCount = 0;

    // สร้าง list ใหม่ของ droppedItems โดยไม่รวมไอเท็มที่ต้องการลบ
    const newDroppedItems = droppedItems.filter((item) => {
      if (item.droppableId === droppableId && item.id === itemId) {
        // ถ้าไอเท็มที่พบเป็นไอเท็มที่ต้องการลบ และยังไม่ลบไอเท็มที่ต้องการลบ
        if (deletedCount === 0) {
          deletedCount++;
          return false; // ไม่เอาไอเท็มนี้
        }
      }
      return true; // เก็บไอเท็มนี้
    });

    // หากต้องการให้ลบออกจาก items ด้วย ก็ให้ทำการอัปเดต items ด้วยการเพิ่มไอเท็มนั้นอีกครั้ง
    const deletedItem = droppedItems.find(
      (item) => item.droppableId === droppableId && item.id === itemId
    );
    const newItems = [...items, deletedItem];

    // อัปเดต state ของ droppedItems และ items (หากต้องการลบจาก items)
    setDroppedItems(newDroppedItems);
    setItems(newItems);
  };

  //BTN-EDIT
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  //SELECT-DATE
  const handleSaveSchedule = (
    startDate,
    endDate,
    selectTerm,
    selectSemester
  ) => {
    // Convert start and end dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    const term = selectTerm;
    const semester = selectSemester;

    // Set the start date and end date state
    setStartDate(start);
    setEndDate(end);
    setSelectedTerm(term);
    setSelectedSemester(semester);
  };

  const handleSaveConfirm = () => {
    Swal.fire({
      title: "ต้องการบันทึกข้อมูลใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "บันทึก",
      confirmButtonColor: "#03A96B ",
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

  const handleDeleteConfirm = () => {
    Swal.fire({
      title: "ต้องการลบข้อมูลใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#BD4636",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ลบข้อมูลเสร็จสิ้น!",
          icon: "success",
          confirmButtonColor: "#03A96B",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "shadow-none",
          },
        });
        // handleEditClick();
        setIsEditing(false);
      }
    });
  };

  //Search

  const handleClickSearch = () => {
    const filteredData = items.filter((item) => {
      return (
        !input ||
        item.cs_id.toLowerCase().includes(input.toLowerCase()) ||
        item.cs_name_en.toLowerCase().includes(input.toLowerCase()) ||
        item.cs_name_th.toLowerCase().includes(input.toLowerCase()) ||
        item.major_id.toString().toLowerCase().includes(input.toLowerCase()) ||
        item.lb_sec.toString().toLowerCase().includes(input.toLowerCase()) ||
        item.lc_sec.toString().toLowerCase().includes(input.toLowerCase())
      );
    });

    setItems(filteredData);
  };

  useEffect(() => {
    const filteredItems = data.filter(
      (item) =>
        !droppedItems.find((droppedItem) => droppedItem.cs_id === item.cs_id)
    );
    setItems(filteredItems);
  }, [input]);

  //POPUP
  const handleShowManageRoom = () => setShowManageRoom(true);

  const handleHideManageRoom = () => {
    setSelectedSubject(null);
    setShowManageRoom(false);
  };

  const handleShowSchedule = () => setShowSchedule(true);

  const handleHideSchedule = () => {
    setShowSchedule(false);
  };

  //TABLE
  const numRows = 4; // จำนวนวันที่ต้องการสร้าง
  const numCols = 10; // จำนวนคอลัมน์ในแต่ละแถว

  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const cols = [];
      if (i === 0) {
        for (let j = 0; j < numCols; j++) {
          const peClass = j === numCols - 1 ? "pe-3" : "";
          const psClass = j === 0 ? "ps-3" : "";
          const date = new Date(startDate);
          if (startDate && endDate) {
            date.setDate(startDate.getDate() + (j - 1));
          }

          // Format the date to 'DD/MM/YY'
          const formattedDate =
            j !== 0 && startDate && endDate
              ? `${date.getDate().toString().padStart(2, "0")}/${(
                  date.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}/${(date.getFullYear() + 543)
                  .toString()
                  .slice(-2)}`
              : ""; // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า startDate และ endDate ไม่ใช่ null ก่อนที่จะรูปแบบวันที่
          const content =
            j !== 0 && startDate && endDate
              ? formattedDate
              : j === 0
              ? "S09"
              : ""; // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า startDate และ endDate ไม่ใช่ null ก่อนที่จะกำหนดค่าของ content
          cols.push(
            <Col key={`col-${j}`} className={`p-0 ${psClass} ${peClass}`}>
              <Card>
                <Card.Body className="table-header-card">{content}</Card.Body>
              </Card>
            </Col>
          );
        }
      } else {
        for (let j = 0; j < numCols; j++) {
          const peClass = j === numCols - 1 ? "pe-3" : "";
          const psClass = j === 0 ? "ps-3" : "";
          const droppableId = `droppable-${i}-${j}`;
          const content =
            i === 1 && j === 0 ? (
              <Card>
                <Card.Body
                  style={{
                    background: "#212529",
                    textAlign: "center",
                    color: "white",
                    height: "10vw",
                  }}
                >
                  <p>เช้า</p>
                </Card.Body>
              </Card>
            ) : i === 2 && j === 0 ? (
              <Card>
                <Card.Body
                  style={{
                    background: "#212529",
                    textAlign: "center",
                    color: "white",
                    height: "10vw",
                  }}
                >
                  <p>กลางวัน</p>
                </Card.Body>
              </Card>
            ) : j === 0 ? (
              <Card>
                <Card.Body
                  style={{
                    background: "#212529",
                    textAlign: "center",
                    color: "white",
                    height: "10vw",
                  }}
                >
                  <p>เย็น</p>
                </Card.Body>
              </Card>
            ) : (
              <Droppable droppableId={droppableId}>
                {(provided) => (
                  <Card {...provided.droppableProps} ref={provided.innerRef}>
                    <Card.Body className="table-body-card">
                      {/* รายการของไอเท็มที่ถูกลากมาวาง */}
                      {droppedItems
                        .filter((item) => item.droppableId === droppableId)
                        .map((item, index) => (
                          <Card key={item.cs_id} index={index}>
                            <Button
                              className="btn-icon"
                              style={{ position: "absolute", right: "0" }}
                              onClick={() =>
                                handleDeleteItem(droppableId, item.id)
                              }
                            >
                              <FaCircleMinus className="text-danger fs-5" />
                            </Button>
                            <Card.Body>
                              <p>รหัสวิชา : {item.cs_id}</p>
                              <p>ชื่อวิชา : {item.cs_name_en}</p>
                              <p>สาขา : {`${item.major_id}`}</p>
                            </Card.Body>
                          </Card>
                        ))}
                      {/* Placeholder สำหรับขยายพื้นที่ใน droppable area */}
                      {provided.placeholder}
                    </Card.Body>
                  </Card>
                )}
              </Droppable>
            );
          cols.push(
            <Col key={`col-${j}`} className={`p-0 ${psClass} ${peClass}`}>
              {content}
            </Col>
          );
        }
      }

      rows.push(
        <Row key={`row-${i}`} className="d-flex flex-nowrap">
          {cols}
        </Row>
      );
    }
    return rows;
  };

  return (
    <div className="main-content-center">
      <Row>
        <Col sm={9} className="d-flex gap-3">
          <Select
            id="fieldName"
            name="fieldName"
            options={dataFacultyOption}
            // onChange={handleOptionChange}
            // value={selectedOption}
            placeholder="คณะ"
            isSearchable={false}
            className="react-select-container w-100"
            classNamePrefix="react-select"
          />
          <Select
            id="fieldName"
            name="fieldName"
            options={dataMajorOption}
            // onChange={handleOptionChange}
            // value={selectedOption}
            placeholder="สาขา"
            isSearchable={false}
            className="react-select-container w-100"
            classNamePrefix="react-select"
          />
        </Col>
        <Col className="d-flex gap-3">
          <Select
            id="fieldName"
            name="fieldName"
            options={dataGradeOption}
            // onChange={handleOptionChange}
            // value={selectedOption}
            placeholder="ชั้นปี"
            isSearchable={false}
            className="react-select-container w-100"
            classNamePrefix="react-select"
          />
          <Button className="d-flex align-items-center gap-2" variant="info">
            <FaMagnifyingGlass />
            <p className="mb-0">ค้นหา</p>
          </Button>
          <Button className="d-flex align-items-center gap-2" variant="danger">
            <FaArrowsRotate />
            <p className="mb-0">รีเซ็ต</p>
          </Button>
        </Col>
      </Row>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row className="pt-3">
          <Col md={9}>
            <Card>
              <Card.Body>
                <Row className="pb-3">
                  <Col className="d-flex align-items-center justify-content-center gap-3">
                    <Card className="w-75">
                      <Card.Body
                        style={{
                          background: "#212529",
                          color: "white",
                          padding: "5.4px 10.8px",
                          fontSize: "16px",
                          borderRadius: "0.25rem",
                          textAlign: "center",
                        }}
                      >
                        <p className="mb-0">
                          {startDate &&
                          endDate &&
                          selectedTerm &&
                          selectedSemester ? (
                            `ตารางสอบ${selectedSemester} ภาค${selectedTerm} ${startDate.getDate()} ${startDate.toLocaleString(
                              "th-TH",
                              { month: "long" }
                            )} - ${endDate.getDate()} ${endDate.toLocaleString(
                              "th-TH",
                              { month: "long" }
                            )} ${endDate.getFullYear() + 543}`
                          ) : (
                            <br />
                          )}
                        </p>
                      </Card.Body>
                    </Card>
                    <Button
                      className="d-flex align-items-center justify-content-center gap-2 w-25"
                      variant="success"
                      onClick={() => handleShowSchedule()}
                    >
                      <FaPlus />
                      <p className="mb-0">จัดวันสอบ</p>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {startDate && endDate && selectedTerm && selectedSemester
                      ? renderRows()
                      : ""}
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex justify-content-end pt-3 gap-3">
                    <Button
                      className="d-flex align-items-center justify-content-center gap-2"
                      variant={isEditing ? "danger" : "secondary"}
                      disabled={isEditing === false}
                      onClick={() => {
                        if (isEditing === true) {
                          handleDeleteConfirm();
                        }
                      }}
                    >
                      <FaEraser />
                      <p className="mb-0">ล้างทั้งหมด</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center justify-content-center gap-2"
                      variant="dark"
                      // variant={isEditing ? "secondary" : "dark"}
                      // disabled={isEditing === true}
                      onClick={() => handleEditClick()}
                    >
                      <FaPenToSquare />
                      <p className="mb-0">แก้ไข</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center justify-content-center gap-2"
                      variant="success"
                      onClick={() => handleSaveConfirm()}
                    >
                      <FaFloppyDisk />
                      <p className="mb-0">บันทึก</p>
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card style={{ background: "#4A4F55" }}>
              <Card.Body>
                <Row className="pb-3">
                  <Col className="d-flex gap-3">
                    <Form.Control
                      style={{ fontSize: "16px" }}
                      type="search"
                      placeholder="ค้นหารหัสวิชา/ชื่อวิชา"
                      aria-label="Search"
                      className="custom-input"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="info"
                      onClick={() => handleClickSearch()}
                    >
                      <FaMagnifyingGlass />
                      <p className="mb-0">ค้นหา</p>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Droppable droppableId="subject">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="subject-card-grid"
                      >
                        {/* รายการของไอเท็มที่ถูกลากมาวาง */}
                        {items.map((item, index) => (
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
                                <Card.Body>
                                  <p>รหัสวิชา : {item.cs_id}</p>
                                  <p>ชื่อวิชา : {item.cs_name_en}</p>
                                  <p>สาขา : {`${item.major_id}`}</p>
                                  <p>บรรยาย : {`${item.lc_sec}`}</p>
                                  <p>ปฎิบัติ : {`${item.lb_sec}`}</p>
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
          </Col>
        </Row>
      </DragDropContext>

      <PopupManageRoom
        show={showManageRoom}
        hide={handleHideManageRoom}
        selectedSubject={selectedSubject}
      />
      <PopupManageSchedule
        show={showSchedule}
        hide={handleHideSchedule}
        onSave={handleSaveSchedule}
      />
    </div>
  );
};

export default Schedule;
