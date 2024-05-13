import React, { useState } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPenToSquare,
  FaCirclePlus
} from "react-icons/fa6";
import Select from "react-select";
// styles
import "../styles/Select.scss";
import "../styles/Input.scss";
import "../styles/Button.scss";
import "./ManageRoom.scss";

import PopupEditRoom from "./popup/PopupEditRoom";
import PopupManageRoom from "./popup/PopupManageRoom";

import {
  dataMajorOption,
  dataGradeOption,
  dataTypeSubjectOption,
  dataSubjects,
  dataBuildingOption,
  dataBuilding,
} from "../MockupData";

const ManageRoom = () => {
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [showManageRoom, setShowManageRoom] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleShowEditRoom = () => setShowEditRoom(true);

  const handleHideEditRoom = () => setShowEditRoom(false);

  const handleShowManageRoom = (subject) => {
    setSelectedSubject(subject);
    setShowManageRoom(true);
  };

  const handleHideManageRoom = () => {
    setShowManageRoom(false);
    setSelectedSubject(null);
  };

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

        <Row className="mx-0">
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
                <Col className="subject-card-grid-manageroom">
                  {dataSubjects.map((item, id) => (
                    <Card key={id}>
                      <Card.Body>
                        <Button
                          className="btn-icon"
                          style={{ position: "absolute", top:"0", right:"0"}}
                          onClick={() => handleShowManageRoom(item)}
                        >
                          <FaCirclePlus className="text-info fs-5" />
                        </Button>
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
                    onClick={() => handleShow()}
                  >
                    <FaPenToSquare />
                    แก้ไข
                  </Button>
                </Col>
                <Col md={1}>
                  <Select
                    id="fieldName"
                    name="fieldName"
                    options={dataBuildingOption}
                    // onChange={handleOptionChange}
                    // value={selectedOption}
                    placeholder="อาคาร"
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
                <Col md={1}>
                  <Form.Control
                    id="fieldName"
                    name="fieldName"
                    type="input"
                    className="custom-input"
                    placeholder="จำนวน"
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
                <Col className="room-card-grid-manageroom">
                  {dataBuilding.map((item, id) => (
                    <Card key={id}>
                      <Card.Header
                        className="d-flex justify-content-center gap-3"
                        style={{ background: "#03A96B", color: "white" }}
                      >
                        <p>{item.room_num}</p>
                        <p>|</p>
                        <p>{`${item.amount} / ${item.max_amount}`}</p>
                      </Card.Header>
                      <Card.Body style={{ maxHeight: "7vw" }}></Card.Body>
                    </Card>
                  ))}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Row>
      <PopupEditRoom show={showEditRoom} hide={handleHideEditRoom} />
      <PopupManageRoom show={showManageRoom} hide={handleHideManageRoom} selectedSubject={selectedSubject}  />
    </div>
  );
};

export default ManageRoom;
