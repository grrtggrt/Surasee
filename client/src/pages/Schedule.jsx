import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";

//ICONS
import {
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaPlus,
  FaFloppyDisk,
  FaPenToSquare,
  FaEraser,
  FaCircleMinus,
} from "react-icons/fa6";

//POPUP
import PopupManageSchedule from "./popup/PopupManageSchedule";

//STYLE
import "../styles/Loader.scss";
import "./Schedule.scss";

const Schedule = () => {
  const [showSchedule, setShowSchedule] = useState(false);
  const [isDisabledSelect, setIsDisabledSelect] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [input, setInput] = useState("");
  const [dataSubject, setDataSubject] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [items, setItems] = useState([]);
  const [fetchDataSchedule, setFetchDataSchedule] = useState([]);
  const [droppedItems, setDroppedItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  //ดึงข้อมูล
  const fetchSubjects = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subject");
      const subject = response.data;
      setDataSubject(subject);
    } catch (error) {
      console.error("Error fetching subjects:", error);
    }
  }, []);

  const fetchSchedule = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/subjects");
      const subjects = response.data[0].subject;
      setDataSchedule(subjects);
      setFetchDataSchedule(subjects);
    } catch (error) {
      console.error("Error fetching subjects from schedule:", error);
    }
  }, []);

  const fetchSelected = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5500/api/schedule");
      if (
        response.data &&
        Array.isArray(response.data) &&
        response.data.length > 0
      ) {
        const scheduleData = response.data[0].schedule;

        if (typeof scheduleData === "object") {
          const selectedSemester = scheduleData.semester
            ? [scheduleData.semester]
            : [];
          const selectedTerm = scheduleData.term ? [scheduleData.term] : [];

          setSelectedSemester(selectedSemester);
          setSelectedTerm(selectedTerm);
        }
      }
    } catch (error) {
      console.error("Error fetching subjects from schedule:", error);
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
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([
        fetchSubjects(),
        fetchMajor(),
        fetchSchedule(),
        fetchSelected(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [fetchSubjects, fetchMajor, fetchSchedule, fetchSelected]);

  useEffect(() => {
      const csIds = dataSchedule.map((item) => item.cs_id);
      const filteredSubjects = dataSubject.filter(
        (subject) => !csIds.includes(subject.cs_id)
      );
      setDataSubject(filteredSubjects);
      setItems(filteredSubjects);
  }, [dataSchedule]);

  useEffect(() => {
    const storedStartDate = localStorage.getItem("startDate");
    const storedEndDate = localStorage.getItem("endDate");

    if (storedStartDate) {
      setStartDate(new Date(storedStartDate));
    }
    if (storedEndDate) {
      setEndDate(new Date(storedEndDate));
    }
  }, []);

  useEffect(() => {
    if (!showSchedule) {
      const storedStartDate = localStorage.getItem("startDate");
      const storedEndDate = localStorage.getItem("endDate");

      if (storedStartDate) {
        setStartDate(new Date(storedStartDate));
      }
      if (storedEndDate) {
        setEndDate(new Date(storedEndDate));
      }
    }
    fetchSelected();
  }, [showSchedule]);

  //PopupSchedule
  const handleShowSchedule = () => setShowSchedule(true);
  const handleHideSchedule = () => setShowSchedule(false);

  //DropItems
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const draggedItem = items[source.index];
      const newItems = [...items];
      newItems.splice(source.index, 1);

      const colIndex = parseInt(destination.droppableId.split("-")[2], 10) - 1;
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + colIndex);

      const formattedDate = date
        ? `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${(date.getFullYear() + 543)
            .toString()
            .slice(-2)}`
        : "";

      let timezone = "";
      const rowIndex = parseInt(destination.droppableId.split("-")[1], 10);
      if (rowIndex === 1) {
        timezone = "เช้า";
      } else if (rowIndex === 2) {
        timezone = "กลางวัน";
      } else if (rowIndex === 3) {
        timezone = "เย็น";
      }

      const majorIdExists =
        droppedItems
          .filter((item) => item.droppableId === destination.droppableId)
          .some((item) => item.major_id === draggedItem.major_id) ||
        fetchDataSchedule
          .filter(
            (item) => item.droppableIdSchedule === destination.droppableId
          )
          .some((item) => item.major_id === draggedItem.major_id);

      if (majorIdExists) return;

      if (
        droppedItems.some(
          (item) =>
            item.date === formattedDate &&
            item.timezone === "เช้า" &&
            item.major_id === draggedItem.major_id
        ) ||
        fetchDataSchedule.some(
          (item) =>
            item.date === formattedDate &&
            item.timezone === "เช้า" &&
            item.major_id === draggedItem.major_id
        )
      ) {
        if (timezone === "กลางวัน") {
          return;
        }
      } else if (
        droppedItems.some(
          (item) =>
            item.date === formattedDate &&
            item.timezone === "กลางวัน" &&
            item.major_id === draggedItem.major_id
        ) ||
        fetchDataSchedule.some(
          (item) =>
            item.date === formattedDate &&
            item.timezone === "กลางวัน" &&
            item.major_id === draggedItem.major_id
        )
      ) {
        return;
      } else if (
        droppedItems.some(
          (item) =>
            item.date === formattedDate &&
            item.timezone === "เย็น" &&
            item.major_id === draggedItem.major_id
        ) ||
        fetchDataSchedule.some(
          (item) =>
            item.date === formattedDate &&
            item.timezone === "เย็น" &&
            item.major_id === draggedItem.major_id
        )
      ) {
        if (timezone === "กลางวัน") {
          return;
        }
      }

      const newDroppedItems = [
        ...droppedItems,
        {
          ...draggedItem,
          droppableId: destination.droppableId,
          date: formattedDate,
          timezone: timezone,
        },
      ];

      setItems(newItems);
      setDroppedItems(newDroppedItems);
    }
  };

  //DELETE-BTN
  const handleDeleteItem = async (droppableId, itemId) => {
    let deletedCount = 0;

    const newDroppedItems = droppedItems.filter((item) => {
      if (
        item.droppableId === droppableId &&
        item.cs_id === itemId &&
        deletedCount === 0
      ) {
        deletedCount++;
        return false;
      }
      return true;
    });
    const deletedItemDrop = droppedItems.find(
      (item) => item.droppableId === droppableId && item.cs_id === itemId
    );

    const deletedItem = fetchDataSchedule.find(
      (item) =>
        item.droppableIdSchedule === droppableId && item.cs_id === itemId
    );

    if (deletedItem) {
      try {
        const response = await axios.post(
          "http://localhost:5500/api/delete-subject",
          {
            cs_id: deletedItem.cs_id,
            major_id: deletedItem.major_id,
          }
        );
        console.log("Delete item response:", response.data);
        if (response.status === 200) {
          Swal.fire({
            icon: "success",
            title: "ลบข้อมูลสำเร็จแล้ว",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            fetchSubjects();
            fetchSchedule();
          });
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดในการลบข้อมูล",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } else if (deletedItemDrop) {
      Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จแล้ว",
        showConfirmButton: false,
        timer: 1500,
      });

      const newItems = [...items, deletedItemDrop];
      setDroppedItems(newDroppedItems);
      setItems(newItems);
    }
  };

  //BTN-DELETE-ALL
  const handleClearAll = () => {
    setDroppedItems([]);
    setItems(dataSubject);
  };

  //BTN-EDIT
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  //Alert Confirm
  const handleSaveConfirm = async () => {
    if (droppedItems.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลที่ต้องบันทึก",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      title: "ต้องการบันทึกข้อมูลใช่หรือไม่ ?",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const majorId = droppedItems[0].major_id;
          const subjects = droppedItems.map((item) => ({
            cs_id: item.cs_id,
            cs_name_en: item.cs_name_en,
            cs_name_th: item.cs_name_th,
            grade: item.grade,
            major_id: item.major_id,
            amount: item.amount,
            date: item.date,
            timezone: item.timezone,
            droppableIdSchedule: item.droppableId,
          }));

          const response = await axios.post(
            "http://localhost:5500/api/update-subjects",
            {
              major_id: majorId,
              subjects: subjects,
            }
          );

          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "บันทึกข้อมูลสำเร็จแล้ว",
              showConfirmButton: false,
              timer: 1500,
            });
            setDroppedItems([]);
            fetchSchedule();
          }
        } catch (error) {
          console.error("Error saving dropped items:", error);
          Swal.fire({
            icon: "error",
            title: "เกิดข้อผิดพลาด",
            text: "ไม่สามารถบันทึกข้อมูลได้",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  const handleDeleteConfirm = () => {
    if (droppedItems.length === 0 && fetchDataSchedule.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลที่ต้องบันทึก",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    Swal.fire({
      title: "ต้องการลบทั้งหมดใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ลบข้อมูลสำเร็จ",
          icon: "success",
          confirmButtonColor: "#03A96B",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "shadow-none",
          },
        });
        handleClearAll();
        setIsEditing(false);
      }
    });
  };

  const handleDeleteConfirmSubject = (droppableId, itemId) => {
    Swal.fire({
      title: "ต้องการลบข้อมูลใช่หรือไม่ ?",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "ยกเลิก",
      confirmButtonText: "ตกลง",
      confirmButtonColor: "#03A96B",
      cancelButtonColor: "#dc3545",
      customClass: {
        confirmButton: "shadow-none",
        cancelButton: "shadow-none",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteItem(droppableId, itemId);
      }
    });
  };
  //Option
  const handleSelectFaculty = (e) => {
    setSelectedFaculty(e);
  };

  const handleSelectMajor = (e) => {
    setSelectedMajor(e);
  };

  const handleSelectGrade = (e) => {
    setSelectedGrade(e);
  };

  //คณะ
  const filterFaculty = [...new Set(dataMajor.map((item) => item.fac_id))];
  const optionFaculty = filterFaculty.map((facultyId) => {
    const faculty = dataMajor.find((item) => item.fac_id === facultyId);
    return {
      label: faculty.fac_name,
      value: facultyId,
    };
  });

  //สาขา
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

  //ชั้นปี

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

  //Search
  const handleClickSearchMajor = () => {
    if (!selectedFaculty || !selectedMajor || !selectedGrade) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = items.filter((item) => {
          return (
            (!selectedMajor || item.major_id === selectedMajor.value) &&
            (!selectedGrade || item.grade === selectedGrade.value)
          );
        });

        const filteredDataSchedule = fetchDataSchedule.filter((item) => {
          return (
            (!selectedMajor || item.major_id === selectedMajor.value) &&
            (!selectedGrade || item.grade === selectedGrade.value)
          );
        });

        setItems(filteredData);
        setFetchDataSchedule(filteredDataSchedule);
        setIsDisabledSelect(true);
        setLoading(false);
      }, 500);
    }
  };

  const handleClickSearchSubject = () => {
    if (!input) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลเพื่อค้นหา",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      setLoading(true);
      setTimeout(() => {
        const filteredData = items.filter((item) => {
          return (
            !input ||
            item.cs_id.toLowerCase().includes(input.toLowerCase()) ||
            item.cs_name_en.toLowerCase().includes(input.toLowerCase()) ||
            item.cs_name_th.toLowerCase().includes(input.toLowerCase()) ||
            item.major_id
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase()) ||
            item.lb_sec
              .toString()
              .toLowerCase()
              .includes(input.toLowerCase()) ||
            item.lc_sec.toString().toLowerCase().includes(input.toLowerCase())
          );
        });
        setItems(filteredData);
        setLoading(false);
      }, 500);
    }
  };

  const handleClickResetMajor = () => {
    setSelectedFaculty(null);
    setSelectedMajor(null);
    setSelectedGrade(null);
    setIsDisabledSelect(false);
    setItems(
      dataSubject.filter(
        (item) =>
          !droppedItems.find((droppedItem) => droppedItem.cs_id === item.cs_id)
      )
    );
    setFetchDataSchedule(dataSchedule);
  };

  //เช็คค่า
  useEffect(() => {
    setSelectedMajor(null);
    setSelectedGrade(null);
    const filteredItems = dataSubject.filter(
      (item) =>
        !droppedItems.find((droppedItem) => droppedItem.cs_id === item.cs_id)
    );
    setItems(filteredItems);
  }, [selectedFaculty]);

  useEffect(() => {
    setSelectedGrade(null);
  }, [selectedMajor]);

  useEffect(() => {
    if (selectedFaculty && selectedMajor && selectedGrade) {
      const filteredItems = dataSubject.filter(
        (item) =>
          item.major_id === selectedMajor?.value &&
          !droppedItems.find((droppedItem) => droppedItem.cs_id === item.cs_id)
      );
      setItems(filteredItems);
    } else {
      const filteredItems = dataSubject.filter(
        (item) =>
          !droppedItems.find((droppedItem) => droppedItem.cs_id === item.cs_id)
      );
      setItems(filteredItems);
    }
  }, [input]);

  useEffect(() => {
    setTimeout(() => {
      setInitialLoading(false);
    }, 800);
  }, []);

  //TABLE
  const numRows = 4; // จำนวนวันที่ต้องการสร้าง
  const numCols = 10; // จำนวนคอลัมน์ในแต่ละแถว
  const renderRows = () => {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const cols = [];
      if (i === 0) {
        for (let j = 0; j < numCols; j++) {
          const peClass = j === numCols - 1 ? "pe-3" : "";
          const psClass = j === 0 ? "ps-3" : "";
          let date;

          if (startDate && endDate) {
            date = new Date(startDate);
            date.setDate(startDate.getDate() + (j - 1));
          }

          // Format the date to 'DD/MM/YY'
          const formattedDate =
            j !== 0 && startDate && endDate
              ? `${date.getDate().toString().padStart(2, "0")}/${(
                  date.getMonth() + 1
                )
                  .toString()
                  .padStart(2, "0")}/${(date.getFullYear() + 543)
                  .toString()
                  .slice(-2)}`
              : ""; // เพิ่มเงื่อนไขเพื่อตรวจสอบว่า startDate และ endDate ไม่ใช่ null ก่อนที่จะรูปแบบวันที่
          const content =
            j !== 0 && startDate && endDate ? (
              formattedDate
            ) : j === 0 && selectedMajor && isDisabledSelect ? (
              selectedMajor.value
            ) : (
              <br />
            );
          cols.push(
            <Col key={`col-${j}`} className={`p-0 ${psClass} ${peClass}`}>
              <Card>
                <Card.Body className="table-header-card">{content}</Card.Body>
              </Card>
            </Col>
          );
        }
      } else {
        for (let j = 0; j < numCols; j++) {
          const peClass = j === numCols - 1 ? "pe-3" : "";
          const psClass = j === 0 ? "ps-3" : "";
          const droppableId = `droppable-${i}-${j}`;
          const content =
            i === 1 && j === 0 ? (
              <Card>
                <Card.Body
                  style={{
                    background: "#212529",
                    textAlign: "center",
                    color: "white",
                    height: "10vw",
                  }}
                >
                  <p>เช้า</p>
                </Card.Body>
              </Card>
            ) : i === 2 && j === 0 ? (
              <Card>
                <Card.Body
                  style={{
                    background: "#212529",
                    textAlign: "center",
                    color: "white",
                    height: "10vw",
                  }}
                >
                  <p>กลางวัน</p>
                </Card.Body>
              </Card>
            ) : j === 0 ? (
              <Card>
                <Card.Body
                  style={{
                    background: "#212529",
                    textAlign: "center",
                    color: "white",
                    height: "10vw",
                  }}
                >
                  <p>เย็น</p>
                </Card.Body>
              </Card>
            ) : (
              <Droppable droppableId={droppableId}>
                {(provided) => (
                  <Card {...provided.droppableProps} ref={provided.innerRef}>
                    <Card.Body className="table-body-card">
                      {fetchDataSchedule
                        .filter(
                          (item) => item.droppableIdSchedule === droppableId
                        )
                        .map((item, index) => (
                          <Card
                            key={item.cs_id}
                            index={index}
                            style={{ height: "max-content" }}
                          >
                            <div
                              style={{
                                background: "#03A96B",
                                padding: "4px",
                                borderRadius: "3px",
                                color: "white",
                                textAlign: "center",
                                fontSize: "12px",
                              }}
                            >
                              {item.cs_id}
                            </div>
                            {isEditing ? (
                              <Button
                                className="btn-icon"
                                style={{
                                  position: "absolute",
                                  top: "-12px",
                                  right: "-8px",
                                  zIndex: 1,
                                }}
                                onClick={() =>
                                  handleDeleteConfirmSubject(
                                    droppableId,
                                    item.cs_id
                                  )
                                }
                              >
                                <FaCircleMinus className="text-danger fs-5" />
                              </Button>
                            ) : null}
                            <Card.Body className="p-1">
                              <p
                                className="pt-1 pb-2"
                                style={{ fontSize: "12px" }}
                              >
                                {item.cs_name_en}
                              </p>
                              <p
                                style={{
                                  backgroundColor: "#F0906D",
                                  borderRadius: "20px",
                                  textAlign: "center",
                                  color: "white",
                                  fontSize: "12px",
                                  display: "block",
                                  width: "fit-content",
                                  padding: "2px 8px 2px 8px",
                                }}
                                className="mb-2"
                              >{`${item.major_id}`}</p>
                              <p
                                style={{
                                  border: "1px solid #5ec1d4",
                                  borderRadius: "20px",
                                  textAlign: "center",
                                  color: "#5ec1d4",
                                  fontSize: "12px",
                                  display: "block",
                                  width: "fit-content",
                                  padding: "1px 7px 1px 7px",
                                }}
                                className="d-flex align-items-center gap-1"
                              >
                                {`ปี ${item.grade}`}
                              </p>
                            </Card.Body>
                          </Card>
                        ))}
                      {droppedItems
                        .filter((item) => item.droppableId === droppableId)
                        .map((item, index) => (
                          <Card
                            key={item.cs_id}
                            index={index}
                            style={{ height: "max-content" }}
                          >
                            <div
                              style={{
                                background: "#dc3545",
                                padding: "4px",
                                borderRadius: "3px",
                                color: "white",
                                textAlign: "center",
                                fontSize: "12px",
                              }}
                            >
                              {item.cs_id}
                            </div>
                            {isEditing ? (
                              <Button
                                className="btn-icon"
                                style={{
                                  position: "absolute",
                                  top: "-12px",
                                  right: "-8px",
                                  zIndex: 1,
                                }}
                                onClick={() =>
                                  handleDeleteConfirmSubject(
                                    droppableId,
                                    item.cs_id
                                  )
                                }
                              >
                                <FaCircleMinus className="text-danger fs-5" />
                              </Button>
                            ) : null}
                            <Card.Body className="p-1">
                              <p
                                className="pt-1 pb-2"
                                style={{ fontSize: "12px" }}
                              >
                                {item.cs_name_en}
                              </p>
                              <p
                                style={{
                                  backgroundColor: "#F0906D",
                                  borderRadius: "20px",
                                  textAlign: "center",
                                  color: "white",
                                  fontSize: "12px",
                                  display: "block",
                                  width: "fit-content",
                                  padding: "2px 8px 2px 8px",
                                }}
                                className="mb-2"
                              >
                                {`${item.major_id}`}
                              </p>
                              <p
                                style={{
                                  border: "1px solid #5ec1d4",
                                  borderRadius: "20px",
                                  textAlign: "center",
                                  color: "#5ec1d4",
                                  fontSize: "12px",
                                  display: "block",
                                  width: "fit-content",
                                  padding: "1px 7px 1px 7px",
                                }}
                                className="d-flex align-items-center gap-1"
                              >
                                {`ปี ${item.grade}`}
                              </p>
                            </Card.Body>
                          </Card>
                        ))}
                      {provided.placeholder}
                    </Card.Body>
                  </Card>
                )}
              </Droppable>
            );
          cols.push(
            <Col key={`col-${j}`} className={`p-0 ${psClass} ${peClass}`}>
              {content}
            </Col>
          );
        }
      }
      rows.push(
        <Row key={`row-${i}`} className="d-flex flex-nowrap">
          {cols}
        </Row>
      );
    }
    return rows;
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
        <Row style={{ position: "relative", zIndex: "2" }}>
          <Col sm={9} className="d-flex gap-3">
            <Select
              id="facultyName"
              name="facultyName"
              options={optionFaculty}
              onChange={handleSelectFaculty}
              value={selectedFaculty}
              placeholder="คณะ"
              isSearchable={false}
              isDisabled={isDisabledSelect}
              className="react-select-container w-100"
              classNamePrefix="react-select"
            />
            <Select
              id="majorName"
              name="majorName"
              options={optionMajor}
              onChange={handleSelectMajor}
              value={selectedMajor}
              placeholder="สาขา"
              isSearchable={false}
              isDisabled={isDisabledSelect}
              className="react-select-container w-100"
              classNamePrefix="react-select"
            />
          </Col>
          <Col className="d-flex gap-3">
            <Select
              id="gradeName"
              name="gradeName"
              options={optionGrade}
              onChange={handleSelectGrade}
              value={selectedGrade}
              placeholder="ชั้นปี"
              isSearchable={false}
              isDisabled={isDisabledSelect}
              className="react-select-container w-100"
              classNamePrefix="react-select"
            />
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
              onClick={() => handleClickResetMajor()}
            >
              <FaArrowsRotate />
              <p className="mb-0">รีเซ็ต</p>
            </Button>
          </Col>
        </Row>
        <DragDropContext onDragEnd={onDragEnd}>
          <Row className="pt-3">
            <Col md={9}>
              <Card>
                <Card.Body>
                  <Row className="pb-3">
                    <Col className="d-flex align-items-center justify-content-center gap-3">
                      <Card className="w-75">
                        <Card.Body
                          style={{
                            background: "#212529",
                            color: "white",
                            padding: "5.4px 10.8px",
                            fontSize: "16px",
                            borderRadius: "0.25rem",
                            textAlign: "center",
                          }}
                        >
                          <p className="mb-0">
                            {startDate &&
                            endDate &&
                            selectedTerm &&
                            selectedSemester ? (
                              `ตารางสอบ${selectedSemester} ภาค${selectedTerm} ${startDate.getDate()} ${startDate.toLocaleString(
                                "th-TH",
                                { month: "long" }
                              )} - ${endDate.getDate()} ${endDate.toLocaleString(
                                "th-TH",
                                { month: "long" }
                              )} ${endDate.getFullYear() + 543}`
                            ) : (
                              <br />
                            )}
                          </p>
                        </Card.Body>
                      </Card>
                      <Button
                        className="d-flex align-items-center justify-content-center gap-2 w-25"
                        variant="success"
                        onClick={() => handleShowSchedule()}
                        disabled={startDate && endDate}
                      >
                        <FaPlus />
                        <p className="mb-0">จัดวันสอบ</p>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col>{startDate && endDate ? renderRows() : ""}</Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-end pt-3 gap-3">
                      <Button
                        className="d-flex align-items-center justify-content-center gap-2"
                        variant={isEditing ? "danger" : "secondary"}
                        disabled={isEditing === false}
                        onClick={() => {
                          if (isEditing === true) {
                            handleDeleteConfirm();
                          }
                        }}
                      >
                        <FaEraser />
                        <p className="mb-0">ล้างทั้งหมด</p>
                      </Button>
                      <Button
                        className="d-flex align-items-center justify-content-center gap-2"
                        variant="dark"
                        onClick={() => handleEditClick()}
                      >
                        <FaPenToSquare />
                        <p className="mb-0">แก้ไข</p>
                      </Button>
                      <Button
                        className="d-flex align-items-center justify-content-center gap-2"
                        variant="success"
                        onClick={() => handleSaveConfirm()}
                      >
                        <FaFloppyDisk />
                        <p className="mb-0">บันทึก</p>
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ background: "#4A4F55" }}>
                <Card.Body>
                  <Row className="pb-3">
                    <Col className="d-flex gap-3">
                      <Form.Control
                        id="searchName"
                        name="searchName"
                        type="search"
                        placeholder="ค้นหารหัสวิชา/ชื่อวิชา"
                        className="custom-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                      />
                      <Button
                        className="d-flex align-items-center gap-2"
                        variant="info"
                        onClick={() => handleClickSearchSubject()}
                      >
                        <FaMagnifyingGlass />
                        <p className="mb-0">ค้นหา</p>
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Droppable droppableId="subject">
                      {(provided) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="subject-card-grid"
                        >
                          {items.map((item, index) => (
                            <Draggable
                              key={item.cs_id}
                              draggableId={item.cs_id}
                              index={index}
                            >
                              {(provided) => (
                                <Card
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <Card.Body className="p-2">
                                    <Row>
                                      <Col className="d-flex justify-content-start">
                                        <p className="fw-bold pb-1">
                                          {item.cs_id}
                                        </p>
                                      </Col>
                                    </Row>
                                    <Row className="mb-2">
                                      <Col>
                                        <p
                                          style={{
                                            border: "1px solid #5ec1d4",
                                            borderRadius: "20px",
                                            textAlign: "center",
                                            color: "#5ec1d4",
                                            fontSize: "12px",
                                            display: "block",
                                            width: "fit-content",
                                            padding: "1px 7px 1px 7px",
                                          }}
                                          className="d-flex align-items-center gap-1"
                                        >
                                          {`ปี${item.grade}`}
                                        </p>
                                      </Col>
                                    </Row>
                                    <hr style={{ margin: "2px 0" }} />
                                    <p className="pb-1 pt-1">
                                      {item.cs_name_en}
                                    </p>
                                    <p
                                      style={{
                                        backgroundColor: "#E5987C",
                                        borderRadius: "20px",
                                        textAlign: "center",
                                        color: "white",
                                        fontSize: "12px",
                                        display: "block",
                                        width: "fit-content",
                                        padding: "2px 8px 2px 8px",
                                        margin: "2px 0",
                                      }}
                                    >
                                      {item.major_id}
                                    </p>
                                  </Card.Body>
                                </Card>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </DragDropContext>
        <PopupManageSchedule show={showSchedule} hide={handleHideSchedule} />
      </div>
    </>
  );
};

export default Schedule;
