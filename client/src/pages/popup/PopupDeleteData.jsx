import React, { useState, useEffect, useCallback } from "react";
import { Modal, CloseButton, Row, Col, Card, Button } from "react-bootstrap";
import axios from "axios";

const PopupDeleteData = (props) => {
  const { show, hide } = props;

  const [dataSubject, setDataSubject] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);

  const fetchSubjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subject");
      setDataSubject(response.data);
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

  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  const fetchSchedule = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/schedule");
      setDataSchedule(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchRoom(),
        fetchSubjects(),
        fetchMajor(),
        fetchSchedule(),
      ]);
    };
    fetchData();
  }, [fetchRoom, fetchSubjects, fetchMajor, fetchSchedule, show]);

  return (
    <Modal show={show} onHide={hide} size="xl" centered>
      <Modal.Header>
        <Modal.Title>ลบข้อมูล</Modal.Title>
        <CloseButton variant="white" onClick={hide} />
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  fontSize: "18px",
                }}
              >
                <p>วิชา</p>
              </Card.Header>
              <Card.Body>
                <p
                  className="d-flex justify-content-center align-items-center"
                  style={{ fontSize: "50px" }}
                >
                  {dataSubject.length}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  fontSize: "18px",
                }}
              >
                <p>สาขา</p>
              </Card.Header>
              <Card.Body>
                <p
                  className="d-flex justify-content-center align-items-center"
                  style={{ fontSize: "50px" }}
                >
                  {dataMajor.length}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  fontSize: "18px",
                }}
              >
                <p>ห้องสอบ</p>
              </Card.Header>
              <Card.Body>
                <p
                  className="d-flex justify-content-center align-items-center"
                  style={{ fontSize: "50px" }}
                >
                  {dataRoom.length}
                </p>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Header
                style={{
                  background: "#4A4F55",
                  color: "#FFFFFF",
                  fontSize: "18px",
                }}
              >
                <p>ตารางสอบ</p>
              </Card.Header>
              <Card.Body>
                <p
                  className="d-flex justify-content-center align-items-center"
                  style={{ fontSize: "50px" }}
                >
                  {dataSchedule.length}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex gap-2 pt-3">
            <Button
              className="d-flex align-items-center gap-2"
              variant="success"
            >
              <p>ตกลง</p>
            </Button>
            <Button
              className="d-flex align-items-center gap-2"
              variant="danger"
            >
              <p>ยกเลิก</p>
            </Button>
          </Col>
          <Col></Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default PopupDeleteData;
