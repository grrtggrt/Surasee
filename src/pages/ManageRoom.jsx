import React from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaMagnifyingGlass, FaArrowsRotate } from "react-icons/fa6";

const ManageRoom = () => {
  return (
    <div className="main-content-center">
      <Row className="d-flex gap-3">
        <Row>
          <Col className="d-flex align-items-end">
            <h5>รายวิชา</h5>
          </Col>
          <Col className="d-flex justify-content-end p-0">
            <Card>
              <Card.Body className="d-flex gap-3">
                <Col className="d-flex justify-content-center align-items-center">
                <p>วันที่สอบ</p>
                </Col >
                <Col>
                <Form.Select
                  aria-label="Default select example"
                  style={{ width:"100px", fontSize: "16px" }}
                >
                  <option>วันที่</option>
                  <option>1</option>
                </Form.Select>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Card style={{ background: "#F8F9FA" }}>
            <Card.Body>
              <Row className="mb-3">
                <Card style={{ background: "#4A4F55" }}>
                  <Card.Body className="d-flex justify-content-end flex-wrap gap-3">
                    <Form.Select
                      aria-label="Default select example"
                      style={{ width: "10%", fontSize: "16px" }}
                    >
                      <option>สาขา</option>
                      <option>1</option>
                    </Form.Select>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ width: "10%", fontSize: "16px" }}
                    >
                      <option>ชั้นปี</option>
                      <option>1</option>
                    </Form.Select>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ width: "10%", fontSize: "16px" }}
                    >
                      <option>ประเภทวิชา</option>
                      <option>1</option>
                    </Form.Select>
                    <Form>
                      <Form.Control
                        style={{ fontSize: "16px" }}
                        type="search"
                        placeholder="รหัสวิชา/ชื่อวิชา"
                        aria-label="Search"
                      />
                    </Form>
                    <Button
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: "16px", color: "white" }}
                      variant="info"
                    >
                      <FaMagnifyingGlass />
                      ค้นหา
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      style={{
                        fontSize: "16px",
                        color: "white",
                        background: "#BD4636",
                        border: "none",
                      }}
                    >
                      <FaArrowsRotate />
                      รีเซ็ต
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
              <Row>
                <Col className="d-flex gap-3">
                  <Card style={{ background: "#E8E8E8" }}>
                    <Card.Body className="d-flex flex-column">
                      <p>0141711-65 | 50/100</p>
                      <p>Name : Econometrics I</p>
                      <p>สาขา : G01</p>
                      <p>Sec : 800, 801, 900</p>
                      <p>ประเภท : บังคับ</p>
                    </Card.Body>
                  </Card>
                  <Card style={{ background: "#E8E8E8" }}>
                    <Card.Body className="d-flex flex-column">
                      <p>0141711-65 | 50/100</p>
                      <p>Name : Econometrics I</p>
                      <p>สาขา : G01</p>
                      <p>Sec : 800, 801, 900</p>
                      <p>ประเภท : บังคับ</p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <h5 className="m-0">อาคาร / ห้อง</h5>
        <Row>
          <Card>
            <Card.Body>
              <Row className="mb-3">
                <Card style={{ background: "#4A4F55" }}>
                  <Card.Body className="d-flex justify-content-end flex-wrap gap-3">
                    <Form.Select
                      aria-label="Default select example"
                      style={{ width: "10%", fontSize: "16px" }}
                    >
                      <option>อาคาร</option>
                      <option>1</option>
                    </Form.Select>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ width: "10%", fontSize: "16px" }}
                    >
                      <option>ชั้นปี</option>
                      <option>1</option>
                    </Form.Select>
                    <Form>
                      <Form.Control
                        style={{ fontSize: "16px" }}
                        type="search"
                        placeholder="จำนวน"
                        aria-label="Search"
                      />
                    </Form>
                    <Button
                      className="d-flex align-items-center gap-2"
                      style={{ fontSize: "16px", color: "white" }}
                      variant="info"
                    >
                      <FaMagnifyingGlass />
                      ค้นหา
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      style={{
                        fontSize: "16px",
                        color: "white",
                        background: "#BD4636",
                        border: "none",
                      }}
                    >
                      <FaArrowsRotate />
                      รีเซ็ต
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
              <Row className="row-cols-6 gy-3">
                <Col>
                  <Card
                    className="d-inline-flex"
                    style={{ textAlign: "center" }}
                  >
                    <Card.Header
                      style={{ background: "#03a96b", color: "white" }}
                    >
                      17201 | 50 / 200
                    </Card.Header>
                    <Card.Body style={{ background: "#E8E8E8" }}>
                      <Card>
                        <Card.Body>
                          <Row>
                            <Col>
                              <p>0141711-65</p>
                              <p>Econometrics</p>
                            </Col>
                            <Col className="align-self-center">
                              <p style={{ fontSize: "20px", color: "#BD4636" }}>
                                A50
                              </p>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Row>
    </div>
  );
};

export default ManageRoom;
