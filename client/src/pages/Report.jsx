import React, { useState, useEffect, useCallback } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Pagination,
} from "react-bootstrap";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

//icon
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaFileExport,
} from "react-icons/fa6";

//styles
import "../styles/Loader.scss";

const Report = () => {
  const [fetchData, setFetchData] = useState([]);
  const [dataSubject, setDataSubject] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedDate, setSelectDate] = useState(null);
  const [selectedRoom, setSelectRoom] = useState(null);
  const [selectedMajor, setSelectMajor] = useState(null);
  const [selectedGrade, setSelectGrade] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  //ดึงข้อมูล
  const fetchSchedule = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subjects");
      const data = response.data;
      const subjects = data.flatMap((item) => item.subject || []);
      setDataSubject(subjects);
      setFetchData(subjects);
    } catch (error) {
      console.error("Error fetching subjects from schedule:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchSchedule()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchSchedule]);

  // นับ CurrentItems ที่แสดงใน Table
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 14;

  const indexOfFirstItem = (currentPage - 1) * itemsPerPage;
  const indexOfLastItem = Math.min(
    currentPage * itemsPerPage,
    fetchData.length
  );

  const displayData = fetchData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(fetchData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //ค้นหา
  const handleSelectDate = (e) => {
    setSelectDate(e);
  };

  const handleSelectBuilding = (e) => {
    setSelectedBuilding(e);
  };

  const handleSelectRoom = (e) => {
    setSelectRoom(e);
  };

  const handleSelectMajor = (e) => {
    setSelectMajor(e);
  };

  const handleSelectGrade = (e) => {
    setSelectGrade(e);
  };

  //วัน
  const filterDate = [...new Set(dataSubject.map((item) => item.date))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const optionDate = filterDate.map((date) => {
    return {
      label: date,
      value: date,
    };
  });

  //ตึก
  const filterBuilding = [
    ...new Set(
      dataSubject.flatMap((item) => item.room.map((room) => room.build_name))
    ),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionBuilding = filterBuilding.map((build) => {
    return {
      label: build,
      value: build,
    };
  });

  const filteredRoom = selectedBuilding
    ? dataSubject
        .filter((item) =>
          item.room.some((room) => room.build_name === selectedBuilding.value)
        )
        .flatMap((item) => item.room || [])
        .filter((room) => room.build_name === selectedBuilding.value)
    : [];

  const FilteredRoom = Array.from(
    new Map(filteredRoom.map((room) => [room.room_id, room])).values()
  );

  const filterRoom = FilteredRoom.map((room) => room.room_id).sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const optionRoom = filterRoom.map((room) => {
    return {
      label: room,
      value: room,
    };
  });

  const filterMajor = [
    ...new Set(dataSubject.map((item) => item.major_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionMajor = filterMajor.map((major) => {
    return {
      label: major,
      value: major,
    };
  });

  const filterGrade = [...new Set(dataSubject.map((item) => item.grade))].sort(
    (a, b) => parseInt(a) - parseInt(b)
  );

  const optionGrade = filterGrade.map((grade) => {
    return {
      label: grade,
      value: grade,
    };
  });

  const handleClickSearch = () => {
    if (
      !selectedBuilding &&
      !input &&
      !selectedDate &&
      !selectedMajor &&
      !selectedGrade
    ) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = fetchData.filter((item) => {
          return (
            (!input ||
              item.cs_id.toLowerCase().includes(input.toLowerCase()) ||
              item.cs_name_en.toLowerCase().includes(input.toLowerCase()) ||
              item.cs_name_th.toLowerCase().includes(input.toLowerCase())) &&
            (!selectedBuilding ||
              (item.room &&
                item.room.some(
                  (room) =>
                    room.build_name &&
                    room.build_name
                      .toLowerCase()
                      .includes(selectedBuilding?.label.toLowerCase())
                ))) &&
            (!selectedDate ||
              item.date
                .toLowerCase()
                .includes(selectedDate?.value.toLowerCase())) &&
            (!selectedRoom ||
              (item.room &&
                item.room.some(
                  (room) =>
                    room.room_id &&
                    room.room_id
                      .toLowerCase()
                      .includes(selectedRoom?.value.toLowerCase())
                ))) &&
            (!selectedMajor ||
              item.major_id
                .toLowerCase()
                .includes(selectedMajor?.value.toLowerCase())) &&
            (!selectedGrade ||
              item.grade
                .toString()
                .toLowerCase()
                .includes(selectedGrade?.value.toString().toLowerCase()))
          );
        });

        setFetchData(filteredData);
        setCurrentPage(1);
        setLoading(false);
      }, 600);
    }
  };

  const handleClickReset = () => {
    setLoading(true);
    setTimeout(() => {
      setFetchData(dataSubject);
      setSelectedBuilding(null);
      setSelectDate(null);
      setSelectRoom(null);
      setSelectMajor(null);
      setSelectGrade(null);
      setInput("");
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    setFetchData(dataSubject);
    if (!input) {
      return;
    } else {
      setSelectedBuilding(null);
      setSelectDate(null);
      setSelectRoom(null);
      setSelectMajor(null);
      setSelectGrade(null);
    }
  }, [input]);

  useEffect(() => {
    setFetchData(dataSubject);
    if (
      selectedBuilding !== null ||
      selectedDate !== null ||
      selectedRoom !== null ||
      selectedMajor !== null ||
      selectedGrade !== null
    ) {
      setInput("");
    }
  }, [
    selectedBuilding,
    selectedDate,
    selectedRoom,
    selectedMajor,
    selectedGrade,
  ]);

  useEffect(() => {
    setSelectRoom(null);
  }, [selectedBuilding]);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
      setFetchData(dataSubject);
    }, 800);
  }, [dataSubject]);

  const exportToExcel = (data) => {
    const modifiedData = data.map((item) => ({
      id: item.cs_id,
      cs_name_en: item.cs_name_en,
      cs_name_th: item.cs_name_th,
      major_id: item.major_id,
      section: Array.isArray(item.room)
        ? [
            ...new Set(item.room.map((sec) => sec.section).filter(Boolean)),
          ].join(", ")
        : "",
      grade: item.grade,
      room_id: Array.isArray(item.room)
        ? item.room
            .map((room) => {
              const roomId = room.room_id ? room.room_id : "";
              const seat = room.seat ? ` (${room.seat})` : "";
              return roomId + seat;
            })
            .filter(Boolean)
            .join(", ")
        : item.room?.room_id || "",
      date:
        item.date instanceof Date ? item.date.toLocaleDateString() : item.date,
      timeStart: Array.isArray(item.room)
        ? [
            ...new Set(item.room.map((room) => room.timeStart).filter(Boolean)),
          ].join(", ")
        : "",
      timeEnd: Array.isArray(item.room)
        ? [
            ...new Set(item.room.map((room) => room.timeEnd).filter(Boolean)),
          ].join(", ")
        : "",
      amount: Array.isArray(item.room)
        ? item.room
            .map((room) => room.amount)
            .filter(Boolean)
            .join(", ")
        : item.room?.amount || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(modifiedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(dataBlob, `report_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  //Alert Confirm
  const handleReportConfirm = () => {
    if (fetchData.length === 0) {
      Swal.fire({
        title: "ไม่มีข้อมูลให้ส่งออก",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      Swal.fire({
        title: "ต้องการส่งออกข้อมูลใช่หรือไม่",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "ยกเลิก",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#03A96B ",
        cancelButtonColor: "#dc3545",
        customClass: {
          confirmButton: "shadow-none",
          cancelButton: "shadow-none",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          exportToExcel(fetchData);
          Swal.fire({
            title: "ส่งออกข้อมูลสำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <>
      {initialLoading && (
        <div className="overlay">
          <div className="loader" />
        </div>
      )}
      {loading && !initialLoading && <div className="loader" />}
      <div className="main-content-center">
        <Row className="m-0">
          <Card>
            <Card.Body>
              <Row className="d-flex justify-content-end gx-2 mb-3 mt-1">
                <Col md={1}>
                  <Select
                    id="dateName"
                    name="dateName"
                    options={optionDate}
                    onChange={handleSelectDate}
                    value={selectedDate}
                    placeholder="วันที่"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="buildName"
                    name="buildName"
                    options={optionBuilding}
                    onChange={handleSelectBuilding}
                    value={selectedBuilding}
                    placeholder="อาคาร"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="roomName"
                    name="roomName"
                    options={optionRoom}
                    onChange={handleSelectRoom}
                    value={selectedRoom}
                    placeholder="ห้อง"
                    isSearchable={false}
                    className="react-select-container"
                    classNamePrefix="react-select"
                  />
                </Col>
                <Col md={1}>
                  <Select
                    id="majorName"
                    name="majorName"
                    options={optionMajor}
                    onChange={handleSelectMajor}
                    value={selectedMajor}
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
                    value={selectedGrade}
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
                    className="custom-input"
                    placeholder="รหัสวิชา/ชื่อวิชา"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />
                </Col>
                <Col md="auto" className="d-flex justify-content-center gap-2">
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="info"
                    onClick={() => handleClickSearch()}
                  >
                    <FaMagnifyingGlass />
                    <p className="mb-0">ค้นหา</p>
                  </Button>
                  <Button
                    className="d-flex align-items-center gap-2"
                    variant="danger"
                    onClick={() => handleClickReset()}
                  >
                    <FaArrowsRotate />
                    <p className="mb-0">รีเซ็ต</p>
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table
                    responsive
                    striped
                    hover
                    bordered
                    style={{ fontSize: "16px" }}
                  >
                    <thead>
                      <tr
                        style={{
                          background: "#03a96b",
                          color: "white",
                          textAlign: "center",
                        }}
                      >
                        <th>รหัสวิชา</th>
                        <th className="w-25">ชื่อวิชาอังกฤษ</th>
                        <th className="w-25">ชื่อวิชาภาษาไทย</th>
                        <th>สาขา</th>
                        <th>หมู่เรียน</th>
                        <th>ชั้นปี</th>
                        <th>ห้องสอบ</th>
                        <th>วันที่</th>
                        <th>เวลา</th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayData.map((item, id) => (
                        <tr key={id} style={{ textAlign: "center" }}>
                          <td>{item.cs_id}</td>
                          <td style={{ textAlign: "start" }}>
                            {item.cs_name_en}
                          </td>
                          <td style={{ textAlign: "start" }}>
                            {item.cs_name_th}
                          </td>
                          <td>{item.major_id}</td>
                          <td>{`${
                            item.room && item.room.length > 0
                              ? [
                                  ...new Set(
                                    item.room.map((sec) => sec.section)
                                  ),
                                ].join(", ")
                              : "????"
                          }`}</td>
                          <td>{item.grade}</td>
                          <td>{`${
                            item.room && item.room.length > 0
                              ? item.room
                                  .map(
                                    (room) =>
                                      `${room.room_id}(${room.amount}${room.seat})`
                                  )
                                  .join(", ")
                              : "????"
                          }`}</td>
                          <td>{item.date.toString()}</td>
                          <td>
                            {`${
                              item.room && item.room.length > 0
                                ? [
                                    ...new Set(
                                      item.room.map(
                                        (room) =>
                                          `${room.timeStart} - ${room.timeEnd}`
                                      )
                                    ),
                                  ].join(", ")
                                : "????"
                            }`}
                          </td>
                        </tr>
                      ))}
                      {displayData.length < itemsPerPage && (
                        <>
                          {[...Array(itemsPerPage - displayData.length)].map(
                            (_, index) => (
                              <tr key={index}>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                                <td>
                                  <br />
                                </td>
                              </tr>
                            )
                          )}
                        </>
                      )}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-end">
                  <Pagination>
                    {pageNumbers.map((number) => (
                      <Pagination.Item
                        key={number}
                        active={number === currentPage}
                        onClick={() => paginate(number)}
                      >
                        {number}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
        <Row className="pt-3">
          <Col className="d-flex justify-content-end">
            <Button
              className="d-flex align-items-center gap-2"
              variant="success"
              onClick={() => handleReportConfirm()}
            >
              <FaFileExport />
              <p className="mb-0">ส่งออกข้อมูล</p>
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Report;
