import React, { useState } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";

import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPlus,
  FaFloppyDisk,
  FaPenToSquare,
  FaEraser,
} from "react-icons/fa6";

import PopupManageRoom from "./popup/PopupManageRoom";
import PopupManageSchedule from "./popup/PopupManageSchedule";
import "./Schedule.scss";

import {
  dataFacultyOption,
  dataMajorOption,
  dataGradeOption,
  dataSubjects,
} from "../MockupData";

const Schedule = () => {
  const [showManageRoom, setShowManageRoom] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(null); // เพิ่ม state เก็บค่า startDate
  const [endDate, setEndDate] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

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

  const handleShowManageRoom = () => setShowManageRoom(true);

  const handleHideManageRoom = () => setShowManageRoom(false);

  const handleShowSchedule = () => setShowSchedule(true);

  const handleHideSchedule = () => setShowSchedule(false);

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
                <Card.Body
                  style={{
                    background: "rgb(33, 37, 41"
                  }}
                >
                  <p style={{color:"white", justifyContent:"center"}}>{content}</p>
                </Card.Body>
              </Card>
            </Col>
          );
        }
      } else {
        for (let j = 0; j < numCols; j++) {
          const peClass = j === numCols - 1 ? "pe-3" : "";
          const psClass = j === 0 ? "ps-3" : "";
          const content =
            i === 1 && j === 0 ? (
              "เช้า"
            ) : i === 2 && j === 0 ? (
              "กลางวัน"
            ) : j === 0 ? (
              "เย็น"
            ) : j !== 0 ? (
              <br />
            ) : (
              ""
            );
          cols.push(
            <Col key={`col-${j}`} className={`p-0 ${psClass} ${peClass}`}>
              <Card>
                <Card.Body
                  style={{
                    background: j === 0 ? "rgb(33, 37, 41" : "#4A4F55",
                    color: j === 0 ? "white" : "",
                    textAlign: j === 0 ? "center" : "",
                    height: j === 0 ? "10vw" : "10vw",
                  }}
                >
                  {content}
                </Card.Body>
              </Card>
            </Col>
          );
        }
      }

      rows.push(
        <Row
          key={`row-${i}`}
          style={{
            paddingTop: i === 0 ? "1rem" : "0" 
          }}
        >
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
      <Row className="pt-3">
        <Col md={9}>
          <Card>
            <Card.Body>
              <Row>
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
                  />
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="info"
                  >
                    <FaMagnifyingGlass />
                    <p className="mb-0">ค้นหา</p>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="subject-card-grid">
                  {dataSubjects.map((item, id) => (
                    <Card key={id}>
                      <Card.Body>
                        <p>รหัสวิชา : {item.id}</p>
                        <p>ชื่อวิชา : {item.name_th}</p>
                        <p>สาขา : {`${item.majorId}`}</p>
                        <p>หมู่เรียน : {`${item.sec}`}</p>
                        <p>ประเภท : {item.type}</p>
                      </Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <PopupManageRoom show={showManageRoom} hide={handleHideManageRoom} />
      <PopupManageSchedule
        show={showSchedule}
        hide={handleHideSchedule}
        onSave={handleSaveSchedule}
      />
    </div>
  );
};

console.log({ dataSubjects });

export default Schedule;
