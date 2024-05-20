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

import { dataReport } from "../MockupData";

//icon
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaFileExport,
} from "react-icons/fa6";

const Report = () => {
  const [fetchData, setFetchData] = useState(dataReport);
  const [dataRoom, setDataRoom] = useState([]);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [input, setInput] = useState("");

  //ดึงข้อมูล
  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  useEffect(() => {
    fetchRoom();
  }, [fetchRoom]);

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
  const handleSelectBuilding = (e) => {
    setSelectedBuilding(e);
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

  const handleClickSearch = () => {
    const filteredData = fetchData.filter((item) => {
      return (
        !input ||
        item.id.toLowerCase().includes(input.toLowerCase()) ||
        item.name_en.toLowerCase().includes(input.toLowerCase()) ||
        item.sec.toString().toLowerCase().includes(input.toLowerCase()) ||
        item.room_num.toLowerCase().includes(input.toLowerCase()) ||
        item.date.toLowerCase().includes(input.toLowerCase()) ||
        item.start_time.toLowerCase().includes(input.toLowerCase()) ||
        item.end_time.toLowerCase().includes(input.toLowerCase()) ||
        item.amount.toString().toLowerCase().includes(input.toLowerCase())
      );
    });
    setFetchData(filteredData);
    setCurrentPage(1);
  };

  const handleClickReset = () => {
    setFetchData(dataReport);
    setSelectedBuilding(null);
    setInput("");
  };

  useEffect(() => {
    setFetchData(dataReport);
  }, [input]);

  const exportToExcel = (data) => {
    // แปลงข้อมูลในอาร์เรย์ให้มีโครงสร้างที่เหมาะสมก่อนส่งออก
    const modifiedData = data.map((item) => ({
      id: item.id,
      name_en: item.name_en,
      sec: Array.isArray(item.sec) ? item.sec.join(", ") : item.sec,
      room_num: item.room_num,
      date:
        item.date instanceof Date ? item.date.toLocaleDateString() : item.date,
      start_time: item.start_time,
      end_time: item.end_time,
      amount: Array.isArray(item.amount) ? item.amount.join(", ") : item.amount,
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
    saveAs(dataBlob, `report_${new Date().getDate()}.xlsx`);
  };

  //Alert Confirm
  const handleReportConfirm = () => {
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
        exportToExcel(dataReport);
        Swal.fire({
          title: "ส่งออกเสร็จสิ้น!",
          icon: "success",
          confirmButtonColor: "#03A96B",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "shadow-none",
          },
        });
      }
    });
  };

  return (
    <div className="main-content-center">
      <Row className="m-0">
        <Card>
          <Card.Body>
            <Row className="d-flex justify-content-end gx-2 mb-3 p-2">
              <Col md={1}>
                <Select
                  id="dateName"
                  name="dateName"
                  // options={dataMajorOption}
                  // onChange={handleOptionChange}
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
                      <th>ชื่อวิชาอังกฤษ</th>
                      <th>หมู่เรียน</th>
                      <th>ห้องสอบ</th>
                      <th>วันที่</th>
                      <th>เวลา</th>
                      <th>จำนวน</th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayData.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        <td>{item.id}</td>
                        <td style={{ textAlign: "start" }}>{item.name_en}</td>
                        <td>{`${item.sec}`}</td>
                        <td>{item.room_num}</td>
                        <td>{item.date.toString()}</td>
                        <td>{`${item.start_time} - ${item.end_time}`}</td>
                        <td>{`${item.amount}`}</td>
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
  );
};

export default Report;
