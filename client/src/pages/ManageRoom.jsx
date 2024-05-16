import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Card, Form, Button } from "react-bootstrap";
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPenToSquare,
  FaCirclePlus,
} from "react-icons/fa6";
import Select from "react-select";
import axios from "axios";

// styles
import "../styles/Select.scss";
import "../styles/Input.scss";
import "../styles/Button.scss";
import "./ManageRoom.scss";

import PopupEditRoom from "./popup/PopupEditRoom";
import PopupManageRoom from "./popup/PopupManageRoom";

const ManageRoom = () => {
  const [showEditRoom, setShowEditRoom] = useState(false);
  const [showManageRoom, setShowManageRoom] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [inputAmount, setInputAmount] = useState("");
  const [inputSubject, setInputSubject] = useState("");
  const [fetchDataRoom, setFetchDataRoom] = useState([]);
  const [fetchDataSubject, setFetchDataSubject] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dataSubject, setDataSubject] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);

  //ดึงข้อมูล
  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setFetchDataRoom(response.data);
      setDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  const fetchSubjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subject");
      setDataSubject(response.data);
      setFetchDataSubject(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  const fetchMajor = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/major");
      setDataMajor(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoom();
    fetchSubjects();
    fetchMajor();
  }, [fetchRoom, fetchSubjects, fetchMajor]);

  //Modal
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleShowEditRoom = () => setShowEditRoom(true);

  const handleHideEditRoom = () => {
    setShowEditRoom(false);
  };

  const handleShowManageRoom = (subject) => {
    setSelectedSubject(subject);
    setShowManageRoom(true);
  };

  const handleHideManageRoom = () => {
    setShowManageRoom(false);
    setSelectedSubject(null);
  };

  //Search
  const handleSelectBuilding = (e) => {
    setSelectedBuilding(e.value);
  };

  const handleSelectFloor = (e) => {
    setSelectedFloor(e.value);
  };

  const handleSelectMajor = (e) => {
    setSelectedMajor(e.value);
  };

  const handleSelectGrade = (e) => {
    setSelectedGrade(e.value);
  };

  //ตึก
  const filterBuilding = [
    ...new Set(dataRoom.map((item) => item.build_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionBuilding = filterBuilding.map((buildingId) => {
    const building = dataRoom.find((item) => item.build_id === buildingId);
    return {
      label: building.build_name,
      value: buildingId,
    };
  });

  //ชั้น
  const filterfloor = [...new Set(dataRoom.map((item) => item.floor))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const optionsfloor = filterfloor.map((floor) => ({
    label: floor,
    value: floor,
  }));

  //สาขา
  const filterMajor = [...new Set(dataMajor.map((item) => item.major_id))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );
  const optionMajor = filterMajor.map((major) => ({
    label: major,
    value: major,
  }));

  //ชั้นปี
  const filterGrade = [
    ...new Set(dataMajor.map((item) => item.major_grade)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionGrade = filterGrade.map((grade) => ({
    label: grade,
    value: grade,
  }));

  const handleClickSearchRoom = () => {
    const filteredData = dataRoom.filter((item) => {
      return (
        (!selectedBuilding || item.build_id === selectedBuilding) &&
        (!selectedFloor || item.floor === selectedFloor) &&
        (!inputAmount || parseFloat(inputAmount) < parseFloat(item.Maxamount))
      );
    });

    setFetchDataRoom(filteredData);
  };

  const handleClickSearchSubject = () => {
    const filteredData = dataSubject.filter((item) => {
      return (
        (!selectedGrade ||
          item.grade
            .toString()
            .toLowerCase()
            .includes(selectedGrade.toString().toLowerCase())) &&
        (!selectedMajor ||
          item.major_id
            .toString()
            .toLowerCase()
            .includes(selectedFloor.toString().toLowerCase())) &&
        (!inputSubject ||
          item.cs_id.toLowerCase().includes(inputSubject.toLowerCase()) ||
          item.cs_name_en.toLowerCase().includes(inputSubject.toLowerCase()) ||
          item.cs_name_th.toLowerCase().includes(inputSubject.toLowerCase()) ||
          item.major_id
            .toString()
            .toLowerCase()
            .includes(inputSubject.toLowerCase()) ||
          item.lb_sec
            .toString()
            .toLowerCase()
            .includes(inputSubject.toLowerCase()) ||
          item.lc_sec
            .toString()
            .toLowerCase()
            .includes(inputSubject.toLowerCase()))
      );
    });
    setFetchDataSubject(filteredData);
  };

  const handleClickResetSubject = () => {
    setFetchDataSubject(dataSubject);
    setInputSubject("");
    setSelectedMajor(null);
    setSelectedGrade(null);
  };

  const handleClickResetRoom = () => {
    setFetchDataRoom(dataRoom);
    setInputAmount("");
    setSelectedBuilding(null);
    setSelectedFloor(null);
  };

  useEffect(() => {
    setFetchDataRoom(dataRoom);
  }, [inputAmount]);

  useEffect(() => {
    setFetchDataRoom(dataRoom);
    if (selectedBuilding !== null || selectedFloor !== null) {
      setInputAmount("");
    }
  }, [selectedBuilding, selectedFloor]);

  useEffect(() => {
    setFetchDataSubject(dataSubject);
    if (!inputSubject) {
      return;
    } else {
      setSelectedMajor(null);
      setSelectedGrade(null);
    }
  }, [inputSubject]);

  useEffect(() => {
    setFetchDataSubject(dataSubject);
    if (selectedMajor !== null || selectedGrade !== null) {
      setInputSubject("");
    }
  }, [selectedMajor, selectedGrade]);

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
                    id="dateName"
                    name="dateName"
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
                    id="majorName"
                    name="majorName"
                    options={optionMajor}
                    onChange={handleSelectMajor}
                    placeholder="สาขา"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="gradeName"
                    name="gradeName"
                    options={optionGrade}
                    onChange={handleSelectGrade}
                    placeholder="ชั้นปี"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={2}>
                  <Form.Control
                    id="searchName"
                    name="searchName"
                    type="search"
                    placeholder="รหัสวิชา/ชื่อวิชา"
                    className="custom-input"
                    value={inputSubject}
                    onChange={(e) => setInputSubject(e.target.value)}
                  />
                </Col>
                <Col md="auto" className="d-flex justify-content-center gap-2">
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="info"
                    onClick={() => handleClickSearchSubject()}
                  >
                    <FaMagnifyingGlass />
                    <p className="mb-0">ค้นหา</p>
                  </Button>
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="danger"
                    onClick={() => handleClickResetSubject()}
                  >
                    <FaArrowsRotate />
                    <p className="mb-0">รีเซ็ต</p>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="subject-card-grid-manageroom">
                  {fetchDataSubject.map((item, id) => (
                    <Card key={id}>
                      <Card.Body>
                        <Button
                          className="btn-icon"
                          style={{ position: "absolute", top: "0", right: "0" }}
                          onClick={() => handleShowManageRoom(item)}
                        >
                          <FaCirclePlus className="text-info fs-5" />
                        </Button>
                        <p>รหัสวิชา : {item.cs_id}</p>
                        <p>ชื่อวิชา : {item.cs_name_th}</p>
                        <p>สาขา : {`${item.major_id}`}</p>
                        {item.lc_sec.length > 0 && (
                          <p>บรรยาย : {`${item.lc_sec}`}</p>
                        )}
                        {item.lb_sec.length > 0 && (
                          <p>ปฎิบัติ : {`${item.lb_sec}`}</p>
                        )}
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
                    onClick={() => handleEditClick()}
                  >
                    <FaPenToSquare />
                    แก้ไข
                  </Button>
                </Col>
                <Col md={1}>
                  <Select
                    id="buildName"
                    name="buildName"
                    options={optionBuilding}
                    onChange={handleSelectBuilding}
                    placeholder="อาคาร"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="floorName"
                    name="floorName"
                    options={optionsfloor}
                    onChange={handleSelectFloor}
                    placeholder="ชั้น"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Form.Control
                    id="searchName"
                    name="searchName"
                    type="number"
                    className="custom-input"
                    placeholder="จำนวน"
                    value={inputAmount}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (!isNaN(value)) {
                        setInputAmount(value);
                      }
                    }}
                  />
                </Col>
                <Col md="auto" className="d-flex justify-content-center gap-2">
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="info"
                    onClick={() => handleClickSearchRoom()}
                  >
                    <FaMagnifyingGlass />
                    <p className="mb-0">ค้นหา</p>
                  </Button>
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="danger"
                    onClick={() => handleClickResetRoom()}
                  >
                    <FaArrowsRotate />
                    <p className="mb-0">รีเซ็ต</p>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col className="room-card-grid-manageroom">
                  {fetchDataRoom
                    .sort((a, b) => a.build_id - b.build_id)
                    .map((item, id) => (
                      <Card key={id}>
                        <Card.Header
                          className="d-flex justify-content-center gap-3"
                          style={{ background: "#03A96B", color: "white" }}
                        >
                          {isEditing ? (
                            <Button
                              className="btn-icon"
                              style={{
                                position: "absolute",
                                right: "0",
                                top: "0",
                              }}
                              onClick={() => {
                                handleShowEditRoom();
                              }}
                            >
                              <FaPenToSquare className="text-dark fs-5" />
                            </Button>
                          ) : null}
                          <p>{item.room_id}</p>
                          <p>|</p>
                          <p>{`${item.amount} / ${item.Maxamount}${item.seat}`}</p>
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
      <PopupManageRoom
        show={showManageRoom}
        hide={handleHideManageRoom}
        selectedSubject={selectedSubject}
      />
    </div>
  );
};

export default ManageRoom;
