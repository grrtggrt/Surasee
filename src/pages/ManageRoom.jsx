import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPenToSquare,
} from "react-icons/fa6";
import Select from "react-select";
// styles
import "../styles/Select.scss";
import "../styles/Input.scss";
import "../styles/Button.scss";

import PopupEditRoom from "./popup/PopupEditRoom";

import {
  dataMajorOption,
  dataGradeOption,
  dataTypeSubjectOption,
} from "../MockupData";

const ManageRoom = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  const handleHide = () => setShow(false);

  return (
    <div className="main-content-center">
      <Row className="d-flex gap-3">
        <Row>
          <Col className="d-flex align-items-end">
            <h5>รายวิชา</h5>
          </Col>
          <Col className="d-flex justify-content-end p-0">
            <Card className="pe-3">
              <Card.Body className="d-flex gap-3 p-2">
                <Col
                  md={4}
                  className="d-flex justify-content-center align-items-center"
                >
                  <p>วันที่สอบ</p>
                </Col>
                <Col md={8}>
                  <Select
                    id="date"
                    name="date"
                    // options={options}
                    // onChange={handleOptionChange}
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

        <Row>
          <Card>
            <Card.Body>
              <Row
                className="d-flex justify-content-end rounded-3 gx-2 mb-3 p-2"
                style={{ background: "#4A4F55" }}
              >
                <Col md={2}>
                  <Select
                    id="fieldName"
                    name="fieldName"
                    options={dataMajorOption}
                    // onChange={handleOptionChange}
                    // value={selectedOption}
                    placeholder="สาขา"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="fieldName"
                    name="fieldName"
                    options={dataGradeOption}
                    // onChange={handleOptionChange}
                    // value={selectedOption}
                    placeholder="ชั้นปี"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md="auto">
                  <Select
                    id="fieldName"
                    name="fieldName"
                    options={dataTypeSubjectOption}
                    // onChange={handleOptionChange}
                    // value={selectedOption}
                    placeholder="ประเภทวิชา"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    id="fieldName"
                    name="fieldName"
                    type="input"
                    className="custom-input"
                    placeholder="รหัสวิชา/ชื่อวิชา"
                  />
                </Col>
                <Col md="auto" className="d-flex justify-content-center gap-2">
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="info"
                  >
                    <FaMagnifyingGlass />
                    <p className="mb-0">ค้นหา</p>
                  </Button>
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="danger"
                  >
                    <FaArrowsRotate />
                    <p className="mb-0">รีเซ็ต</p>
                  </Button>
                </Col>
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
              <Row
                className="d-flex justify-content-between rounded-3 gx-2 mb-3 p-2"
                style={{ background: "#4A4F55" }}
              >
                <Col>
                  <Button
                    className="btn-outline d-flex align-items-center gap-2"
                    onClick={() => handleShow()}
                  >
                    <FaPenToSquare />
                    แก้ไข
                  </Button>
                </Col>
                <Col className="d-flex flex-wrap justify-content-end gap-2 ">
                  <Col>
                    <Select
                      id="fieldName"
                      name="fieldName"
                      // options={options}
                      // onChange={handleOptionChange}
                      // value={selectedOption}
                      placeholder="อาคาร"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Select
                      id="fieldName"
                      name="fieldName"
                      options={dataGradeOption}
                      // onChange={handleOptionChange}
                      // value={selectedOption}
                      placeholder="ชั้นปี"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="fieldName"
                      name="fieldName"
                      type="number"
                      className="custom-input"
                      placeholder="จำนวน"
                    />
                  </Col>
                  <Col className="d-flex justify-content-center gap-2">
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="info"
                    >
                      <FaMagnifyingGlass />
                      <p className="mb-0">ค้นหา</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="danger"
                    >
                      <FaArrowsRotate />
                      <p className="mb-0">รีเซ็ต</p>
                    </Button>
                  </Col>
                </Col>
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
                            <Col className="align-self-center text-danger">
                              <p className="fs-4">A50</p>
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
      <PopupEditRoom show={show} hide={handleHide} />
    </div>
  );
};

export default ManageRoom;
