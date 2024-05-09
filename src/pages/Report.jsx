import React, { useState } from "react";
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

import { dataReport, dataBuildingOption } from "../MockupData";

//icon
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaFileExport,
} from "react-icons/fa6";

const Report = () => {
  const handleReportConfirm = () => {
    Swal.fire({
      title: "ต้องการส่งออกข้อมูลใช่หรือไม่",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#03A96B ",
      cancelButtonColor: "#BD4636",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
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

  // นับ CurrentItems ที่แสดงใน Table
  const [fetchData, setFetchData] = useState(dataReport);
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

  return (
    <div className="main-content-center">
      <Row className="m-0">
        <Card>
          <Card.Body>
            <Row className="d-flex justify-content-end gx-2 mb-3 p-2">
              <Col md={1}>
                <Select
                  id="fieldName"
                  name="fieldName"
                  // options={dataMajorOption}
                  // onChange={handleOptionChange}
                  // value={selectedOption}
                  placeholder="วันที่"
                  isSearchable={false}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
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
                    {displayData.map((item) => (
                      <tr key={item.id} style={{ textAlign: "center" }}>
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
