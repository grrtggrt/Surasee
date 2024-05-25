import React, { useState, useEffect, useCallback } from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";
import { FaCircleInfo } from "react-icons/fa6";
import axios from "axios";

const PopupDashboard = (props) => {
  const { show, hide, viewDetail, dataSubject } = props;

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);

  const fetchSelected = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/schedule");
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const scheduleData = response.data[0].schedule;

        if (typeof scheduleData === "object") {
          const selectedSemester = scheduleData.semester
            ? [scheduleData.semester]
            : [];
          setSelectedSemester(selectedSemester);
        }
      }
    } catch (error) {
      console.error("Error fetching subjects from schedule:", error);
    }
  }, []);

  const filteredSubjects = viewDetail
    ? dataSubject.filter(
        (subject) =>
          subject.major_id.includes(viewDetail.major_id) &&
          subject.grade === viewDetail.major_grade
      )
    : [];

  useEffect(() => {
    fetchSelected();
  }, [fetchSelected]);

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) {
      setStartDate(new Date(storedStartDate));
    }
    if (storedEndDate) {
      setEndDate(new Date(storedEndDate));
    }
  }, []);

  return (
    <Modal show={show} onHide={hide} size="xl" centered>
      <Modal.Header closeButton style={{ background: "#fff" }}>
        <Modal.Title>
          <Row>
            <Col>
              <h2 style={{ color: "#2F3337" }}>ตารางสอบ</h2>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex align-items-center gap-4">
              <p style={{ fontSize: "16px", color: "#03A96B" }}>
                {startDate && endDate
                  ? `${startDate.getDate()} ${startDate.toLocaleString(
                      "th-TH",
                      {
                        month: "long",
                      }
                    )} - ${endDate.getDate()} ${endDate.toLocaleString(
                      "th-TH",
                      {
                        month: "long",
                      }
                    )} ${endDate.getFullYear() + 543}`
                  : ""}
              </p>
              {selectedSemester && selectedSemester.length > 0 ? (
                <p
                  style={{
                    fontSize: "16px",
                    color: "#fff",
                    background: "#03A96B",
                    padding: ".2rem .8rem",
                    borderRadius: "20px",
                  }}
                >
                  {selectedSemester}
                </p>
              ) : null}
            </Col>
          </Row>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Row>
          <Col className="d-flex align-items-center gap-2">
            <p>สาขา</p>
            <p
              style={{
                background: "#f0906d",
                padding: ".2rem .8rem",
                borderRadius: "20px",
                color: "white",
              }}
            >
              {viewDetail ? viewDetail.major_id : ""}
            </p>
            <p>ชั้นปี</p>
            <p style={{ color: "#03A96B" }}>
              {viewDetail ? viewDetail.major_grade : ""}
            </p>
          </Col>
          <Col className="d-flex justify-content-end gap-2">
            <p>ทั้งหมด</p>
            <p style={{ color: "#5ec1d4" }}>{filteredSubjects.length}</p>
            <p>วิชา</p>
          </Col>
        </Row>
        {filteredSubjects.length === 0 ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "260px" }}
          >
            <FaCircleInfo className="fs-4 me-2 text-muted" />
            <p className="fs-5 text-muted">ไม่มีข้อมูลรายวิชาที่สอบ</p>
          </div>
        ) : (
          <Row className="g-3 p-3">
            {filteredSubjects.map((item, id) => (
              <Card key={id}>
                <Card.Body className="p-0">
                  <Row>
                    <Col md={2} className="ps-0">
                      <Card
                        style={{
                          background:
                            item.room && item.room.length > 0
                              ? "#03A96B"
                              : "#dc3545",
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                        }}
                      >
                        <Card.Body style={{ fontSize: "20px", color: "white" }}>
                          <p>{item.date}</p>
                          <p style={{ fontSize: "16px" }}>{`${
                            item.room && item.room.length > 0
                              ? item.room[0].timeStart
                              : "00:00"
                          } - ${
                            item.room && item.room.length > 0
                              ? item.room[0].timeEnd
                              : "00:00"
                          }`}</p>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={10}>
                      <Row className="pt-3 pb-3">
                        <Col md={2} className="px-3">
                          <p style={{ fontSize: "16px", color: "#424242" }}>
                            {item.cs_id}
                          </p>
                          {(item.lc_sec || item.lb_sec) && (
                            <p style={{ color: "#5B5B5B" }}>
                              หมู่{" "}
                              {`${item.lc_sec || ""}${
                                item.lc_sec.length && item.lb_sec.length
                                  ? ","
                                  : ""
                              }${item.lb_sec || ""}`}
                            </p>
                          )}
                        </Col>
                        <Col md={5}>
                          <p style={{ fontSize: "16px", color: "#424242" }}>
                            {item.cs_name_en}
                          </p>
                          <p style={{ color: "#5B5B5B" }}>{item.cs_name_th}</p>
                        </Col>
                        <Col>
                          <p style={{ fontSize: "16px", color: "#424242" }}>
                            {`${
                              item.room && item.room.length > 0
                                ? [
                                    ...new Set(
                                      item.room.map((room) => room.build_name)
                                    ),
                                  ].join(", ")
                                : "อาคาร ?"
                            }`}
                          </p>
                          <p style={{ color: "#5B5B5B" }}>
                            {`${
                              item.room && item.room.length > 0
                                ? item.room
                                    .map(
                                      (room) => `${room.room_id} ${room.seat}`
                                    )
                                    .join(", ")
                                : "????"
                            } ( ${
                              item.room &&
                              item.room.length > 0 &&
                              item.room[0].amount
                                ? item.room
                                    .map((room) => room.amount)
                                    .join(", ")
                                : "?"
                            } ที่นั่ง )`}
                          </p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
          </Row>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PopupDashboard;
