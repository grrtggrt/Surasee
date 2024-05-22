import React from "react";
import { Modal, Row, Col, Card } from "react-bootstrap";

const PopupDashboard = (props) => {
  const { show, hide, viewDetail, dataSubject } = props;

  const filteredSubjects = viewDetail
    ? dataSubject.filter(
        (subject) =>
          subject.major_id.includes(viewDetail.major_id) &&
          subject.grade === viewDetail.major_grade
      )
    : [];

  console.log(dataSubject);

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
                21 เมษายน 2567 - 29 เมษายน 2567
              </p>
              <p
                style={{
                  fontSize: "16px",
                  color: "#fff",
                  background: "#03A96B",
                  padding: ".2rem .8rem",
                  borderRadius: "20px",
                }}
              >
                กลางภาค
              </p>
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
        <Row className="g-3 p-3">
          {filteredSubjects.map((item, id) => (
            <Card key={id}>
              <Card.Body className="p-0">
                <Row>
                  <Col sm={2} className="p-0">
                    <Card
                      style={{
                        background:
                          item.room && item.room.length > 0
                            ? "#03A96B"
                            : "#dc3545",
                      }}
                    >
                      <Card.Body style={{ fontSize: "22px", color: "white" }}>
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
                  <Col sm={10}>
                    <Row className="pt-4">
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
                      <Col md={6}>
                        <p style={{ fontSize: "16px", color: "#424242" }}>
                          {item.cs_name_en}
                        </p>
                        <p style={{ color: "#5B5B5B" }}>{item.cs_name_th}</p>
                      </Col>
                      <Col>
                        <p style={{ fontSize: "16px", color: "#424242" }}>
                          {`${
                            item.room && item.room.length > 0
                              ? [...new Set (item.room
                                  .map((room) => room.build_name))]
                                  .join(", ")
                              : "อาคาร ?"
                          }`}
                        </p>
                        <p style={{ color: "#5B5B5B" }}>
                          {`${
                            item.room && item.room.length > 0
                              ? item.room
                                  .map((room) => `${room.room_id} ${room.seat}`)
                                  .join(", ")
                              : "????"
                          } ( ${
                            item.room &&
                            item.room.length > 0 &&
                            item.room[0].amount
                              ? item.room.map((room) => room.amount).join(", ")
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
      </Modal.Body>
    </Modal>
  );
};

export default PopupDashboard;
