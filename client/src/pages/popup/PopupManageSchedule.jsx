import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Button, CloseButton } from "react-bootstrap";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";
import Select from "react-select";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import axios from "axios";

// styles
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/DatePicker.scss";
import "../../styles/Select.scss";
import "../../styles/Modal.scss";

// mockup data
import { dataTermOption, dataSemesterOption } from "../../MockupData.js";

const PopupManageSchedule = (props) => {
  const { show, hide } = props;

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [selectTerm, SetSelectTerm] = useState(null);
  const [selectSemester, SetSelectSemester] = useState(null);

  useEffect(() => {
    setDateRange([null, null]);
    SetSelectTerm(null);
    SetSelectSemester(null);
  }, [show]);

  const maxDate = startDate
    ? new Date(startDate.getTime() + 11 * 24 * 60 * 60 * 1000)
    : null;

  const handleTermSelect = (e) => {
    SetSelectTerm(e);
  };

  const handleSemesterSelect = (e) => {
    SetSelectSemester(e);
  };

  const saveDateRangeToLocalStorage = () => {
    if (startDate && endDate) {
      localStorage.setItem("startDate", startDate.toISOString());
      localStorage.setItem("endDate", endDate.toISOString());
    }
  };

  //Alert Confirm
  const handleSaveConfirm = async () => {
    if (
      selectTerm === null ||
      selectSemester === null ||
      startDate === null ||
      endDate === null
    ) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const differenceInDays = (endDate - startDate) / (1000 * 60 * 60 * 24);

    if (differenceInDays < 8) {
      Swal.fire({
        icon: "warning",
        title: "กรุณาเลือกช่วงเวลาให้มีระยะเวลาอย่างน้อย 9 วัน",
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(
            "http://localhost:5500/api/update-schedules",
            {
              semester: selectSemester.value,
              term: selectTerm.value,
            }
          );

          if (response.status === 200) {
            saveDateRangeToLocalStorage();
            Swal.fire({
              icon: "success",
              title: "บันทึกข้อมูลสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
            hide();
          } else {
            Swal.fire({
              icon: "error",
              title: "การบันทึกล้มเหลว",
              text: response.data.error || "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
            });
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
            text: error.message,
          });
        }
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
              value={selectTerm}
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
              value={selectSemester}
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
