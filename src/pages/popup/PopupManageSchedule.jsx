import React, { useState } from "react";
import { Modal, Row, Col, Form, Button } from "react-bootstrap";
import { FaBan, FaFloppyDisk } from "react-icons/fa6";

import "./CustomDatePicker.scss";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PopupManageSchedule = (props) => {
  const { show, hide } = props;

  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  const maxDate = startDate
    ? new Date(startDate.getTime() + 8 * 24 * 60 * 60 * 1000)
    : null;

  return (
    <Modal show={show} onHide={hide} centered>
      <Modal.Header
        closeButton
        style={{ background: "#03A96B", fontSize: "16px", color: "white" }}
      >
        <Modal.Title>จัดวันสอบ</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Row>
          <Col className="d-flex flex-column align-items-center gap-3">
            <Form.Select
              className="w-75"
              aria-label="Default select example"
              style={{
                fontSize: "16px",
              }}
            >
              <option>ปีการศึกษา</option>
              <option>1</option>
            </Form.Select>
            <Form.Select
              className="w-75"
              aria-label="Default select example"
              style={{
                fontSize: "16px",
              }}
            >
              <option>ภาคเรียน</option>
              <option>1</option>
            </Form.Select>
            <Form.Select
              className="w-75"
              aria-label="Default select example"
              style={{
                fontSize: "16px",
              }}
            >
              <option>วิชา</option>
              <option>1</option>
            </Form.Select>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
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
          <Col className="d-flex justify-content-end">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              style={{
                backgroundColor: "#03A96B",
                border: "none",
                color: "white",
                fontSize: "16px",
              }}
            >
              <FaFloppyDisk /> บันทึก
            </Button>
          </Col>
          <Col className="d-flex justify-content-start">
            <Button
              className="d-flex align-items-center justify-content-center gap-2"
              style={{
                backgroundColor: "#BD4636",
                border: "none",
                color: "white",
                fontSize: "16px",
              }}
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
