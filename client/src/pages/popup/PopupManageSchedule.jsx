import React, { useState } from "react";
import { Modal, Row, Col, Form, Button, CloseButton } from "react-bootstrap";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import Select from "react-select";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// styles
import "../../styles/DatePicker.scss";
import "../../styles/Select.scss";
import "../../styles/Modal.scss";

// mockup data
import { dataTermOption, dataSemesterOption } from "../../MockupData.js";

const PopupManageSchedule = (props) => {
  const { show, hide } = props;

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectTerm, SetSelectTerm] = useState("");
  const [selectSemester, SetSelectSemester] = useState(null);

  const maxDate = startDate
    ? new Date(startDate.getTime() + 8 * 24 * 60 * 60 * 1000)
    : null;

  const handleTermSelect = (e) => {
    SetSelectTerm(e.value);
  };

  const handleSemesterSelect = (e) => {
    SetSelectSemester(e.value);
  };

  const handleSaveConfirm = () => {
    if (
      selectTerm === null ||
      selectSemester === null ||
      startDate === null ||
      endDate === null
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

    const differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (differenceInDays < 8) {
      Swal.fire({
        icon: "error",
        title: "กรุณาเลือกช่วงเวลาให้มีระยะเวลาอย่างน้อย 9 วัน",
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
        props.onSave(startDate, endDate, selectTerm, selectSemester);
        hide();
      }
    });
  };

  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header>
        <Modal.Title>จัดวันสอบ</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        <Row className="d-flex justify-content-center gy-2 mb-3">
          <Col md={8}>
            <Select
              id="termSelect"
              name="termSelect"
              options={dataTermOption}
              onChange={handleTermSelect}
              placeholder="ภาคเรียน"
              isSearchable={false}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </Col>
          <Col md={8}>
            <Select
              id="semesterSelect"
              name="semesterSelect"
              options={dataSemesterOption}
              onChange={handleSemesterSelect}
              placeholder="เทอม"
              isSearchable={false}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </Col>
          <Col md={8}>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              minDate={startDate}
              maxDate={maxDate}
              isClearable={true}
              className="custom-datepicker"
              calendarClassName="custom-calendar"
              shouldCloseOnSelect={false}
              monthsShown={2}
              placeholderText="เลือกวันสอบ"
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center "></Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center gap-2">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="success"
              onClick={() => handleSaveConfirm()}
            >
              <FaFloppyDisk /> บันทึก
            </Button>
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              variant="danger"
              onClick={() => hide()}
            >
              <FaBan /> ยกเลิก
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupManageSchedule;
