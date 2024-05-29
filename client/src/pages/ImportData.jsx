import React, { useState, useEffect, useCallback } from "react";
import {
  FaCloudArrowUp,
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaChevronLeft,
  FaChevronRight,
  FaPlus,
  FaTrashCan,
} from "react-icons/fa6";
import {
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Pagination,
} from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
//styles
import "./ImportData.scss";
import "../styles/Loader.scss";

import PopupImportData from "../pages/popup/PopupImportData";

const ImportData = () => {
  const [showPopupImportData, setShowPopupImportData] = useState(false);
  const [dataSubject, setDataSubject] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [fetchDataSubject, setFetchDataSubject] = useState([]);
  const [fetchDataMajor, setFetchDataMajor] = useState([]);
  const [fetchDataRoom, setFetchDataRoom] = useState([]);
  const [selectedMajorSubject, setSelectedMajorSubject] = useState(null);
  const [selectedGradeSubject, setSelectedGradeSubject] = useState(null);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [selectedFloor, setSelectedFloor] = useState(null);
  const [inputSubject, setInputSubject] = useState("");
  const [inputMajor, setInputMajor] = useState("");
  const [inputRoom, setInputRoom] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

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
      setFetchDataMajor(response.data);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  const fetchRoom = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/building");
      setDataRoom(response.data);
      setFetchDataRoom(response.data);
    } catch (error) {
      console.error("Error fetching room:", error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchRoom(), fetchSubjects(), fetchMajor()]);
      setLoading(false);
    };
    fetchData();
  }, [fetchRoom, fetchSubjects, fetchMajor]);

  //Popup
  const handleShowPopupImportData = () => setShowPopupImportData(true);
  const handleHidePopupImportData = () => setShowPopupImportData(false);

  const handleResetDataSubject = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedMajorSubject(null);
      setSelectedGradeSubject(null);
      setInputSubject("");
      setFetchDataSubject(dataSubject);
      setLoading(false);
    }, 600);
  };

  const handleResetDataMajor = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedFaculty(null);
      setSelectedMajor(null);
      setSelectedGrade(null);
      setInputMajor("");
      setFetchDataMajor(dataMajor);
      setLoading(false);
    }, 600);
  };

  const handleResetDataRoom = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedBuilding(null);
      setSelectedFloor(null);
      setInputRoom(0);
      setFetchDataRoom(dataRoom);
      setLoading(false);
    }, 600);
  };

  const handleSelectMajorSubject = (e) => {
    setSelectedMajorSubject(e);
  };

  const handleSelectGradeSubject = (e) => {
    setSelectedGradeSubject(e);
  };

  const handleSelectFaculty = (e) => {
    setSelectedFaculty(e);
  };

  const handleSelectMajor = (e) => {
    setSelectedMajor(e);
  };

  const handleSelectGrade = (e) => {
    setSelectedGrade(e);
  };

  const handleSelectBuilding = (e) => {
    setSelectedBuilding(e);
  };

  const handleSelectFloor = (e) => {
    setSelectedFloor(e);
  };

  useEffect(() => {
    setFetchDataSubject(dataSubject);
    if (!inputSubject) {
      return;
    } else {
      setSelectedMajorSubject(null);
      setSelectedGradeSubject(null);
    }
  }, [inputSubject]);

  useEffect(() => {
    setFetchDataSubject(dataSubject);
    if (selectedMajorSubject !== null || selectedGradeSubject !== null) {
      setInputSubject("");
    }
  }, [selectedMajorSubject, selectedGradeSubject]);

  useEffect(() => {
    setSelectedGradeSubject(null);
  }, [selectedMajorSubject]);

  useEffect(() => {
    setFetchDataMajor(dataMajor);
    if (!inputMajor) {
      return;
    } else {
      setSelectedFaculty(null);
      setSelectedMajor(null);
      setSelectedGrade(null);
    }
  }, [inputMajor]);

  useEffect(() => {
    setFetchDataMajor(dataMajor);
    if (
      selectedFaculty !== null ||
      selectedMajor !== null ||
      selectedGrade !== null
    ) {
      setInputMajor("");
    }
  }, [selectedFaculty, selectedMajor, selectedGrade]);

  useEffect(() => {
    setSelectedMajor(null);
    setSelectedGrade(null);
  }, [selectedFaculty]);

  useEffect(() => {
    setSelectedGrade(null);
  }, [selectedMajor]);

  useEffect(() => {
    setFetchDataRoom(dataRoom);
  }, [inputRoom]);

  useEffect(() => {
    setFetchDataRoom(dataRoom);
    if (selectedBuilding !== null || selectedFloor !== null) {
      setInputRoom("");
    }
  }, [selectedBuilding, selectedFloor]);

  useEffect(() => {
    setSelectedFloor(null);
  }, [selectedBuilding]);

  const filterMajorSubject = [
    ...new Set(dataSubject.map((item) => item.major_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionMajorSubject = filterMajorSubject.map((major) => {
    return {
      label: major,
      value: major,
    };
  });

  const filteredMajorSubject = selectedMajorSubject
    ? dataSubject.filter((item) => item.major_id === selectedMajorSubject.value)
    : [];

  const filterGradeSubject = [
    ...new Set(filteredMajorSubject.map((item) => item.grade)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionGradeSubject = filterGradeSubject.map((grade) => {
    return {
      label: grade,
      value: grade,
    };
  });

  const filterFaculty = [...new Set(dataMajor.map((item) => item.fac_id))];
  const optionFaculty = filterFaculty.map((facultyId) => {
    const faculty = dataMajor.find((item) => item.fac_id === facultyId);
    return {
      label: faculty.fac_name,
      value: facultyId,
    };
  });

  const filteredMajor = selectedFaculty
    ? dataMajor.filter((item) => item.fac_id === selectedFaculty.value)
    : [];

  const filterMajor = [
    ...new Set(filteredMajor.map((item) => item.major_id)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionMajor = filterMajor.map((major) => ({
    label: major,
    value: major,
  }));

  const filteredGrade = selectedMajor
    ? dataMajor.filter((item) => item.major_id === selectedMajor.value)
    : [];

  const filterGrade = [
    ...new Set(filteredGrade.map((item) => item.major_grade)),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionGrade = filterGrade.map((grade) => ({
    label: grade,
    value: grade,
  }));

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

  const filteredFloor = selectedBuilding
    ? dataRoom.filter((item) => item.build_id === selectedBuilding.value)
    : [];

  const filterfloor = [
    ...new Set(filteredFloor.map((item) => item.floor)),
  ].sort((a, b) => parseInt(a) - parseInt(b));
  const optionfloor = filterfloor.map((floor) => ({
    label: floor,
    value: floor,
  }));

  const handleClickSearchSubject = () => {
    if (!selectedMajorSubject && !selectedGradeSubject && !inputSubject) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = fetchDataSubject.filter((item) => {
          return (
            (!selectedMajorSubject ||
              item.major_id
                .toLowerCase()
                .includes(selectedMajorSubject?.value.toLowerCase())) &&
            (!selectedGradeSubject ||
              item.grade
                .toString()
                .toLowerCase()
                .includes(
                  selectedGradeSubject?.value.toString().toLowerCase()
                )) &&
            (!inputSubject ||
              item.major_id
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              item.cs_id.toLowerCase().includes(inputSubject.toLowerCase()) ||
              item.cs_name_th
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              item.cs_name_en
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              item.lc_sec
                .toString()
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              item.lb_sec
                .toString()
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              item.grade
                .toString()
                .toLowerCase()
                .includes(inputSubject.toLowerCase()) ||
              item.amount
                .toString()
                .toLowerCase()
                .includes(inputSubject.toLowerCase()))
          );
        });

        setFetchDataSubject(filteredData);
        setCurrentPageSubject(1);
        setLoading(false);
      }, 600);
    }
  };

  const handleClickSearchMajor = () => {
    if (!selectedFaculty && !selectedMajor && !selectedGrade && !inputMajor) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = fetchDataMajor.filter((item) => {
          return (
            (!selectedFaculty ||
              item.fac_id
                .toLowerCase()
                .includes(selectedFaculty?.value.toLowerCase())) &&
            (!selectedMajor ||
              item.major_id
                .toLowerCase()
                .includes(selectedMajor?.value.toLowerCase())) &&
            (!selectedGrade ||
              item.major_grade
                .toString()
                .toLowerCase()
                .includes(selectedGrade?.value.toString().toLowerCase())) &&
            (!inputMajor ||
              item.major_id.toLowerCase().includes(inputMajor.toLowerCase()) ||
              item.fac_id.toLowerCase().includes(inputMajor.toLowerCase()) ||
              item.major_name_th
                .toLowerCase()
                .includes(inputMajor.toLowerCase()) ||
              item.major_name_en
                .toLowerCase()
                .includes(inputMajor.toLowerCase()) ||
              item.fac_name.toLowerCase().includes(inputMajor.toLowerCase()) ||
              item.major_status
                .toLowerCase()
                .includes(inputMajor.toLowerCase()) ||
              item.major_grade
                .toString()
                .toLowerCase()
                .includes(inputMajor.toLowerCase()))
          );
        });

        setFetchDataMajor(filteredData);
        setCurrentPageMajor(1);
        setLoading(false);
      }, 600);
    }
  };

  const handleClickSearchRoom = () => {
    if (!selectedBuilding && !selectedFloor && !inputRoom) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        icon: "warning",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = fetchDataRoom.filter((item) => {
          return (
            (!selectedBuilding || item.build_id === selectedBuilding.value) &&
            (!selectedFloor || item.floor === selectedFloor.value) &&
            (!inputRoom || parseFloat(inputRoom) < parseFloat(item.Maxamount))
          );
        });

        setFetchDataRoom(filteredData);
        setCurrentPageRoom(1);
        setLoading(false);
      }, 600);
    }
  };

  // นับ CurrentItems ที่แสดงใน Table
  const itemsPerPage = 6;
  const maxPageButtons = 5;

  const [currentPageSubject, setCurrentPageSubject] = useState(1);
  const indexOfLastItemSubject = currentPageSubject * itemsPerPage;
  const indexOfFirstItemSubject = indexOfLastItemSubject - itemsPerPage;

  const sortedDataSubject = fetchDataSubject.sort(
    (a, b) => b.amount - a.amount
  );

  const displayDataSubject = sortedDataSubject.slice(
    indexOfFirstItemSubject,
    indexOfLastItemSubject
  );
  const pageNumbersSubject = [];
  let startPageSubject = 1;
  let endPageSubject = Math.min(
    startPageSubject + maxPageButtons - 1,
    Math.ceil(fetchDataSubject.length / itemsPerPage)
  );
  if (currentPageSubject > Math.floor(maxPageButtons / 2)) {
    startPageSubject = currentPageSubject - Math.floor(maxPageButtons / 2);
    endPageSubject = Math.min(
      startPageSubject + maxPageButtons - 1,
      Math.ceil(fetchDataSubject.length / itemsPerPage)
    );
  }
  for (let i = startPageSubject; i <= endPageSubject; i++) {
    pageNumbersSubject.push(i);
  }
  const paginateSubject = (pageNumber) => setCurrentPageSubject(pageNumber);

  const [currentPageRoom, setCurrentPageRoom] = useState(1);
  const indexOfLastItemRoom = currentPageRoom * itemsPerPage;
  const indexOfFirstItemRoom = indexOfLastItemRoom - itemsPerPage;

  const sortedDataRoom = fetchDataRoom.sort((a, b) => a.build_id - b.build_id);

  const displayDataRoom = sortedDataRoom.slice(
    indexOfFirstItemRoom,
    indexOfLastItemRoom
  );
  const pageNumbersRoom = [];
  let startPageRoom = 1;
  let endPageRoom = Math.min(
    startPageRoom + maxPageButtons - 1,
    Math.ceil(fetchDataRoom.length / itemsPerPage)
  );
  if (currentPageRoom > Math.floor(maxPageButtons / 2)) {
    startPageRoom = currentPageRoom - Math.floor(maxPageButtons / 2);
    endPageRoom = Math.min(
      startPageRoom + maxPageButtons - 1,
      Math.ceil(fetchDataRoom.length / itemsPerPage)
    );
  }
  for (let i = startPageRoom; i <= endPageRoom; i++) {
    pageNumbersRoom.push(i);
  }
  const paginateRoom = (pageNumber) => setCurrentPageRoom(pageNumber);

  const [currentPageMajor, setCurrentPageMajor] = useState(1);
  const indexOfLastItemMajor = currentPageMajor * itemsPerPage;
  const indexOfFirstItemMajor = indexOfLastItemMajor - itemsPerPage;

  const sortedDataMajor = fetchDataMajor
    .filter((item) => item.major_grade >= 1 && item.major_grade <= 4)
    .sort((a, b) => a.major_grade - b.major_grade);

  const displayDataMajor = sortedDataMajor.slice(
    indexOfFirstItemMajor,
    indexOfLastItemMajor
  );
  const pageNumbersMajor = [];
  let startPageMajor = 1;
  let endPageMajor = Math.min(
    startPageMajor + maxPageButtons - 1,
    Math.ceil(fetchDataMajor.length / itemsPerPage)
  );
  if (currentPageMajor > Math.floor(maxPageButtons / 2)) {
    startPageMajor = currentPageMajor - Math.floor(maxPageButtons / 2);
    endPageMajor = Math.min(
      startPageMajor + maxPageButtons - 1,
      Math.ceil(fetchDataMajor.length / itemsPerPage)
    );
  }
  for (let i = startPageMajor; i <= endPageMajor; i++) {
    pageNumbersMajor.push(i);
  }
  const paginateMajor = (pageNumber) => setCurrentPageMajor(pageNumber);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 800);
  }, []);

  return (
    <>
      {initialLoading && (
        <div className="overlay">
          <div className="loader" />
        </div>
      )}
      {loading && !initialLoading && <div className="loader" />}
      <div className="main-content-center">
        <Row>
          <Col className="d-flex justify-content-end gap-3">
            <Button
              className="d-flex align-items-center gap-2"
              variant="success"
              onClick= {() => handleShowPopupImportData()}
            >
              <FaCloudArrowUp />
              <p className="mb-0">Upload</p>
            </Button>
            <Button
              className="d-flex align-items-center gap-2"
              variant="danger"
              onClick={() => {}}
            >
              <FaTrashCan />
              <p className="mb-0">Delete</p>
            </Button>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <Card>
              <Card.Header style={{ background: "#4A4F55" }}>
                <Row className="d-flex align-items-center justify-content-end gx-2">
                  <Col
                    className="d-flex align-items-center justify-content-start gap-2"
                    md={7}
                  >
                    <h4 className="m-0" style={{ color: "white" }}>
                      วิชา
                    </h4>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="success"
                      onClick={() => {}}
                    >
                      <FaPlus />
                      <p className="mb-0">เพิ่มรายการ</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{ color: "#dc3545", border: "1px solid" }}
                      onClick={() => {}}
                    >
                      <FaTrashCan />
                      <p className="mb-0">ลบรายการ</p>
                    </Button>
                  </Col>
                  <Col>
                    <Select
                      id="majorName"
                      name="majorName"
                      options={optionMajorSubject}
                      onChange={handleSelectMajorSubject}
                      value={selectedMajorSubject}
                      placeholder="สาขา"
                      isSearchable={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Select
                      id="gradeName"
                      name="gradeName"
                      options={optionGradeSubject}
                      onChange={handleSelectGradeSubject}
                      value={selectedGradeSubject}
                      placeholder="ชั้นปี"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="search"
                      placeholder="ค้นหา"
                      className="custom-input"
                      value={inputSubject}
                      onChange={(e) => setInputSubject(e.target.value)}
                    />
                  </Col>
                  <Col className="d-flex justify-content-center gap-2">
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
                      onClick={() => handleResetDataSubject()}
                    >
                      <FaArrowsRotate />
                      <p className="mb-0">รีเซ็ต</p>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
                <Table
                  responsive
                  striped
                  hover
                  bordered
                  className="m-0"
                  style={{
                    tableLayout: "fixed",
                    whiteSpace: "nowrap",
                  }}
                >
                  <thead>
                    <tr
                      style={{
                        background: "#03a96b",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <th className="fw-normal" style={{ width: "5%" }}>
                        major_id
                      </th>
                      <th className="fw-normal" style={{ width: "10%" }}>
                        cs_id
                      </th>
                      <th className="fw-normal" style={{ width: "25%" }}>
                        cs_name_th
                      </th>
                      <th className="fw-normal" style={{ width: "35%" }}>
                        cs_name_en
                      </th>
                      <th className="fw-normal" style={{ width: "10%" }}>
                        lc_sec
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        lb_sec
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        grade
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDataSubject.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        <td>{item.major_id}</td>
                        <td>{item.cs_id}</td>
                        <td style={{ textAlign: "start" }}>
                          {item.cs_name_th}
                        </td>
                        <td style={{ textAlign: "start" }}>
                          {item.cs_name_en}
                        </td>
                        <td>{`${item.lc_sec}`}</td>
                        <td>{`${item.lb_sec}`}</td>
                        <td>{item.grade}</td>
                        <td>{item.amount}</td>
                      </tr>
                    ))}
                    {displayDataSubject.length < itemsPerPage && (
                      <>
                        {[
                          ...Array(itemsPerPage - displayDataSubject.length),
                        ].map((_, index) => (
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
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </Table>
                <Pagination className="d-flex justify-content-end align-items-center gap-3 pt-3 pe-3">
                  <p style={{ color: "#4a4f55" }}>
                    Page {currentPageSubject} of{" "}
                    {Math.ceil(fetchDataSubject.length / itemsPerPage)}
                  </p>
                  {currentPageSubject > 1 && (
                    <Button
                      variant="success"
                      onClick={() => paginateSubject(currentPageSubject - 1)}
                    >
                      <FaChevronLeft />
                    </Button>
                  )}
                  {pageNumbersSubject.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPageSubject}
                      onClick={() => paginateSubject(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  {currentPageSubject <
                    Math.ceil(fetchDataSubject.length / itemsPerPage) && (
                    <Button
                      variant="success"
                      onClick={() => paginateSubject(currentPageSubject + 1)}
                    >
                      <FaChevronRight />
                    </Button>
                  )}
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="pt-3">
          <Col>
            <Card>
              <Card.Header style={{ background: "#4A4F55" }}>
                <Row className="d-flex align-items-center justify-content-end gx-2">
                  <Col
                    className="d-flex align-items-center justify-content-start gap-2"
                    md={6}
                  >
                    <h4 className="m-0" style={{ color: "white" }}>
                      สาขา
                    </h4>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="success"
                      onClick={() => {}}
                    >
                      <FaPlus />
                      <p className="mb-0">เพิ่มรายการ</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{
                        color: "#dc3545",
                        border: "1px solid #dc3545",
                      }}
                      onClick={() => {}}
                    >
                      <FaTrashCan />
                      <p className="mb-0">ลบรายการ</p>
                    </Button>
                  </Col>
                  <Col>
                    <Select
                      id="facultyName"
                      name="facultyName"
                      options={optionFaculty}
                      onChange={handleSelectFaculty}
                      value={selectedFaculty}
                      placeholder="คณะ"
                      isSearchable={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
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
                  <Col>
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
                  <Col>
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="search"
                      placeholder="ค้นหา"
                      className="custom-input"
                      value={inputMajor}
                      onChange={(e) => setInputMajor(e.target.value)}
                    />
                  </Col>
                  <Col className="d-flex justify-content-center gap-2">
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="info"
                      onClick={() => handleClickSearchMajor()}
                    >
                      <FaMagnifyingGlass />
                      <p className="mb-0">ค้นหา</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="danger"
                      onClick={() => handleResetDataMajor()}
                    >
                      <FaArrowsRotate />
                      <p className="mb-0">รีเซ็ต</p>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive striped hover bordered className="m-0">
                  <thead style={{ overflowY: "auto" }}>
                    <tr
                      style={{
                        background: "#03a96b",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <th className="fw-normal" style={{ width: "5%" }}>
                        major_id
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        fac_id
                      </th>
                      <th className="fw-normal" style={{ width: "25%" }}>
                        major_name_th
                      </th>
                      <th className="fw-normal" style={{ width: "35%" }}>
                        major_name_en
                      </th>
                      <th className="fw-normal" style={{ width: "15%" }}>
                        fac_name
                      </th>
                      <th className="fw-normal" style={{ width: "10%" }}>
                        major_status
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        major_grade
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDataMajor.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        <td>{item.major_id}</td>
                        <td>{item.fac_id}</td>
                        <td style={{ textAlign: "start" }}>
                          {item.major_name_th}
                        </td>
                        <td style={{ textAlign: "start" }}>
                          {item.major_name_en}
                        </td>
                        <td>{item.fac_name}</td>
                        <td>{item.major_status}</td>
                        <td>{item.major_grade}</td>
                      </tr>
                    ))}
                    {displayDataMajor.length < itemsPerPage && (
                      <>
                        {[...Array(itemsPerPage - displayDataMajor.length)].map(
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
                <Pagination className="d-flex justify-content-end align-items-center gap-3 pt-3 pe-3">
                  <p style={{ color: "#4a4f55" }}>
                    Page {currentPageMajor} of{" "}
                    {Math.ceil(fetchDataMajor.length / itemsPerPage)}
                  </p>
                  {currentPageMajor > 1 && (
                    <Button
                      variant="success"
                      onClick={() => paginateMajor(currentPageMajor - 1)}
                    >
                      <FaChevronLeft />
                    </Button>
                  )}
                  {pageNumbersMajor.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPageMajor}
                      onClick={() => paginateMajor(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  {currentPageMajor <
                    Math.ceil(fetchDataMajor.length / itemsPerPage) && (
                    <Button
                      variant="success"
                      onClick={() => paginateMajor(currentPageMajor + 1)}
                    >
                      <FaChevronRight />
                    </Button>
                  )}
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="pt-3 pb-5">
          <Col>
            <Card>
              <Card.Header style={{ background: "#4A4F55" }}>
                <Row className="d-flex align-items-center justify-content-end gx-2">
                  <Col
                    className="d-flex align-items-center justify-content-start gap-2"
                    md={7}
                  >
                    <h4 className="m-0" style={{ color: "white" }}>
                      ห้องสอบ
                    </h4>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="success"
                      onClick={() => {}}
                    >
                      <FaPlus />
                      <p className="mb-0">เพิ่มรายการ</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{
                        color: "#dc3545",
                        border: "1px solid #dc3545",
                      }}
                      onClick={() => {}}
                    >
                      <FaTrashCan />
                      <p className="mb-0">ลบรายการ</p>
                    </Button>
                  </Col>
                  <Col>
                    <Select
                      id="buildName"
                      name="buildName"
                      options={optionBuilding}
                      onChange={handleSelectBuilding}
                      value={selectedBuilding}
                      placeholder="อาคาร"
                      isSearchable={true}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Select
                      id="floorName"
                      name="floorName"
                      options={optionfloor}
                      onChange={handleSelectFloor}
                      value={selectedFloor}
                      placeholder="ชั้น"
                      isSearchable={false}
                      className="react-select-container"
                      classNamePrefix="react-select"
                    />
                  </Col>
                  <Col>
                    <Form.Control
                      id="searchName"
                      name="searchName"
                      type="number"
                      placeholder="จำนวน"
                      className="custom-input"
                      min="0"
                      value={inputRoom}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (!isNaN(value)) {
                          setInputRoom(parseInt(value));
                        }
                      }}
                    />
                  </Col>
                  <Col className="d-flex justify-content-center gap-2">
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
                      onClick={() => handleResetDataRoom()}
                    >
                      <FaArrowsRotate />
                      <p className="mb-0">รีเซ็ต</p>
                    </Button>
                  </Col>
                </Row>
              </Card.Header>
              <Card.Body className="p-0">
                <Table responsive striped hover bordered className="m-0">
                  <thead>
                    <tr
                      style={{
                        background: "#03a96b",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      <th className="fw-normal" style={{ width: "5%" }}>
                        build_id
                      </th>
                      <th className="fw-normal">build_name</th>
                      <th className="fw-normal">room_id</th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        floor
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        seat
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        Maxamount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDataRoom.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        <td>{item.build_id}</td>
                        <td>{item.build_name}</td>
                        <td>{item.room_id}</td>
                        <td>{item.floor}</td>
                        <td>{item.seat}</td>
                        <td>{item.Maxamount}</td>
                      </tr>
                    ))}
                    {displayDataRoom.length < itemsPerPage && (
                      <>
                        {[...Array(itemsPerPage - displayDataRoom.length)].map(
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
                            </tr>
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </Table>
                <Pagination className="d-flex justify-content-end align-items-center gap-3 pt-3 pe-3">
                  <p style={{ color: "#4a4f55" }}>
                    Page {currentPageRoom} of{" "}
                    {Math.ceil(fetchDataRoom.length / itemsPerPage)}
                  </p>
                  {currentPageRoom > 1 && (
                    <Button
                      variant="success"
                      onClick={() => paginateRoom(currentPageRoom - 1)}
                    >
                      <FaChevronLeft />
                    </Button>
                  )}
                  {pageNumbersRoom.map((number) => (
                    <Pagination.Item
                      key={number}
                      active={number === currentPageRoom}
                      onClick={() => paginateRoom(number)}
                    >
                      {number}
                    </Pagination.Item>
                  ))}
                  {currentPageRoom <
                    Math.ceil(fetchDataRoom.length / itemsPerPage) && (
                    <Button
                      variant="success"
                      onClick={() => paginateRoom(currentPageRoom + 1)}
                    >
                      <FaChevronRight />
                    </Button>
                  )}
                </Pagination>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <PopupImportData
        show={showPopupImportData}
        hide={handleHidePopupImportData}
      />
    </>
  );
};

export default ImportData;
