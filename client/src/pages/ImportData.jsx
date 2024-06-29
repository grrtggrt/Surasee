import React, { useState, useEffect, useCallback } from "react";

import {
  FaCloudArrowUp,
  FaMagnifyingGlass,
  FaArrowsRotate,
  FaChevronLeft,
  FaChevronRight,
  FaDownload,
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
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

//styles
import "./ImportData.scss";
import "../styles/Loader.scss";

import PopupImportData from "../pages/popup/PopupImportData";

const ImportData = () => {
  const [showPopupImportData, setShowPopupImportData] = useState(false);
  const [dataSubject, setDataSubject] = useState([]);
  const [dataMajor, setDataMajor] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dataSchedule, setDataSchedule] = useState([]);
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
  const [showCheckboxesSubject, setShowCheckboxesSubject] = useState(false);
  const [checkedItemsSubject, setCheckedItemsSubject] = useState({});
  const [checkedAllSubject, setCheckedAllSubject] = useState(false);
  const [showConfirmButtonsSubject, setShowConfirmButtonsSubject] =
    useState(false);
  const [showCheckboxesMajor, setShowCheckboxesMajor] = useState(false);
  const [checkedItemsMajor, setCheckedItemsMajor] = useState({});
  const [checkedAllMajor, setCheckedAllMajor] = useState(false);
  const [showConfirmButtonsMajor, setShowConfirmButtonsMajor] = useState(false);
  const [showCheckboxesRoom, setShowCheckboxesRoom] = useState(false);
  const [checkedItemsRoom, setCheckedItemsRoom] = useState({});
  const [checkedAllRoom, setCheckedAllRoom] = useState(false);
  const [showConfirmButtonsRoom, setShowConfirmButtonsRoom] = useState(false);

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
      setLoading(true);
      await Promise.all([
        fetchRoom(),
        fetchSubjects(),
        fetchMajor(),
        fetchSchedule(),
      ]);
      setLoading(false);
    };
    fetchData();
  }, [fetchRoom, fetchSubjects, fetchMajor, fetchSchedule ,showPopupImportData]);

  //Popup
  const handleShowPopupImportData = () => setShowPopupImportData(true);
  const handleHidePopupImportData = () => {

    setShowPopupImportData(false);
  };

  const handleDeleteButtonClickSubject = () => {
    setShowCheckboxesSubject(!showCheckboxesSubject);
    setShowConfirmButtonsSubject(!showConfirmButtonsSubject);
    if (showCheckboxesSubject) {
      setCheckedItemsSubject({});
      setCheckedAllSubject(false);
    }
  };

  const handleDeleteButtonClickMajor = () => {
    setShowCheckboxesMajor(!showCheckboxesMajor);
    setShowConfirmButtonsMajor(!showConfirmButtonsMajor);
    if (showCheckboxesMajor) {
      setCheckedItemsMajor({});
      setCheckedAllMajor(false);
    }
  };

  const handleDeleteButtonClickRoom = () => {
    setShowCheckboxesRoom(!showCheckboxesRoom);
    setShowConfirmButtonsRoom(!showConfirmButtonsRoom);
    if (showCheckboxesRoom) {
      setCheckedItemsRoom({});
      setCheckedAllRoom(false);
    }
  };

  const handleCancelButtonClickSubject = () => {
    setShowCheckboxesSubject(false);
    setShowConfirmButtonsSubject(false);
    setCheckedItemsSubject({});
    setCheckedAllSubject(false);
  };

  const handleCancelButtonClickMajor = () => {
    setShowCheckboxesMajor(false);
    setShowConfirmButtonsMajor(false);
    setCheckedItemsMajor({});
    setCheckedAllMajor(false);
  };

  const handleCancelButtonClickRoom = () => {
    setShowCheckboxesRoom(false);
    setShowConfirmButtonsRoom(false);
    setCheckedItemsRoom({});
    setCheckedAllRoom(false);
  };

  const handleCheckAllSubject = () => {
    setCheckedItemsSubject((prevState) => {
      const newCheckedSubject = !checkedAllSubject;
      const newCheckedItemsSubject = { ...prevState };

      if (newCheckedSubject) {
        dataSubject.forEach((item) => {
          newCheckedItemsSubject[item.cs_id] = true;
        });
      } else {
        dataSubject.forEach((item) => {
          delete newCheckedItemsSubject[item.cs_id];
        });
      }

      setCheckedAllSubject(newCheckedSubject);
      return newCheckedItemsSubject;
    });
  };

  const handleCheckAllMajor = () => {
    setCheckedItemsMajor((prevState) => {
      const newCheckedMajor = !checkedAllMajor;
      const newCheckedItemsMajor = { ...prevState };

      if (newCheckedMajor) {
        dataMajor.forEach((item) => {
          newCheckedItemsMajor[`${item.major_id}_${item.major_grade}`] = {
            major_id: item.major_id,
            major_grade: item.major_grade,
          };
        });
      } else {
        dataMajor.forEach((item) => {
          delete newCheckedItemsMajor[`${item.major_id}_${item.major_grade}`];
        });
      }

      setCheckedAllMajor(newCheckedMajor);
      return newCheckedItemsMajor;
    });
  };

  const handleCheckAllRoom = () => {
    setCheckedItemsRoom((prevState) => {
      const newCheckedRoom = !checkedAllRoom;
      const newCheckedItemsRoom = { ...prevState };

      if (newCheckedRoom) {
        dataRoom.forEach((item) => {
          newCheckedItemsRoom[`${item.room_id}_${item.seat[0]}`] = {
            room_id: item.room_id,
            seat: item.seat[0],
          };
        });
      } else {
        dataRoom.forEach((item) => {
          delete newCheckedItemsRoom[`${item.room_id}_${item.seat[0]}`];
        });
      }

      setCheckedAllRoom(newCheckedRoom);
      return newCheckedItemsRoom;
    });
  };

  const handleCheckItemSubject = (cs_id) => {
    setCheckedItemsSubject((prevState) => {
      const newCheckedItems = { ...prevState };
      if (newCheckedItems[cs_id]) {
        delete newCheckedItems[cs_id];
      } else {
        newCheckedItems[cs_id] = true;
      }
      return newCheckedItems;
    });
  };

  const handleCheckItemMajor = (major_id, major_grade) => {
    setCheckedItemsMajor((prevState) => {
      const newCheckedItems = { ...prevState };
      const key = `${major_id}_${major_grade}`;

      if (newCheckedItems[key]) {
        delete newCheckedItems[key];
      } else {
        newCheckedItems[key] = { major_id, major_grade };
      }

      return newCheckedItems;
    });
  };

  const handleCheckItemRoom = (room_id, seat) => {
    setCheckedItemsRoom((prevState) => {
      const newCheckedItems = { ...prevState };
      const key = `${room_id}_${seat[0]}`;

      if (newCheckedItems[key]) {
        delete newCheckedItems[key];
      } else {
        newCheckedItems[key] = { room_id, seat: seat[0] };
      }

      return newCheckedItems;
    });
  };

  const handleDeletePopUpSubject = async () => {
    const itemsToDeleteSubject = Object.keys(checkedItemsSubject).filter(
      (key) => checkedItemsSubject[key]
    );
    if (itemsToDeleteSubject.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลที่ต้องลบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    Swal.fire({
      title: "ต้องการลบข้อมูลใช่หรือไม่",
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete("http://localhost:5500/api/subject", {
            data: { items: itemsToDeleteSubject },
          });

          const newDataSubject = dataSubject.filter(
            (item) => !itemsToDeleteSubject.includes(item.cs_id)
          );

          setFetchDataSubject(newDataSubject);
          setDataSubject(newDataSubject);
          setCheckedItemsSubject({});
          setCheckedAllSubject(false);
          setShowConfirmButtonsSubject(false);
          setShowCheckboxesSubject(false);
          Swal.fire({
            title: "ลบข้อมูลสำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาดในการลบข้อมูล",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleDeletePopUpMajor = async () => {
    const itemsToDeleteMajor = Object.keys(checkedItemsMajor).filter(
      (key) => checkedItemsMajor[key]
    );

    if (itemsToDeleteMajor.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลที่ต้องลบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const itemsToDelete = itemsToDeleteMajor.map((key) => {
      const [major_id, major_grade] = key.split("_");
      return { major_id, major_grade: parseInt(major_grade) };
    });

    Swal.fire({
      title: "ต้องการลบข้อมูลใช่หรือไม่",
      icon: "question",
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
          await axios.delete("http://localhost:5500/api/major", {
            data: { items: itemsToDelete },
          });

          const newDataMajor = dataMajor.filter(
            (item) =>
              !itemsToDeleteMajor.includes(
                `${item.major_id}_${item.major_grade}`
              )
          );

          setFetchDataMajor(newDataMajor);
          setDataMajor(newDataMajor);
          setCheckedItemsMajor({});
          setCheckedAllMajor(false);
          setShowConfirmButtonsMajor(false);
          setShowCheckboxesMajor(false);

          Swal.fire({
            title: "ลบข้อมูลสำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาดในการลบข้อมูล",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleDeletePopUpRoom = async () => {
    const itemsToDeleteRoom = Object.keys(checkedItemsRoom).filter(
      (key) => checkedItemsRoom[key]
    );

    if (itemsToDeleteRoom.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลที่ต้องลบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const itemsToDelete = itemsToDeleteRoom.map((key) => {
      const [room_id, seat] = key.split("_");
      return { room_id, seat };
    });

    Swal.fire({
      title: "ต้องการลบข้อมูลใช่หรือไม่",
      icon: "question",
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
          await axios.delete("http://localhost:5500/api/building", {
            data: { items: itemsToDelete },
          });

          const newDataRoom = dataRoom.filter(
            (item) =>
              !itemsToDeleteRoom.includes(`${item.room_id}_${item.seat[0]}`)
          );

          setFetchDataRoom(newDataRoom);
          setDataRoom(newDataRoom);
          setCheckedItemsRoom({});
          setCheckedAllRoom(false);
          setShowConfirmButtonsRoom(false);
          setShowCheckboxesRoom(false);

          Swal.fire({
            title: "ลบข้อมูลสำเร็จ",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
        } catch (error) {
          Swal.fire({
            title: "เกิดข้อผิดพลาดในการลบข้อมูล",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      }
    });
  };

  const handleClickDeleteAll = async () => {
    if (
      dataSubject.length === 0 &&
      dataMajor.length === 0 &&
      dataRoom.length === 0 &&
      dataSchedule.length === 0
    ) {
      Swal.fire({
        icon: "warning",
        title: "ไม่มีข้อมูลที่ต้องลบ",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    } else {
      Swal.fire({
        title: "ต้องการลบข้อมูลใช่หรือไม่",
        icon: "question",
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
            const subjectPayload = {
              items: dataSubject.map((subject) => subject.cs_id),
            };
            const majorPayload = {
              items: dataMajor.map((major) => ({
                major_id: major.major_id,
                major_grade: major.major_grade,
              })),
            };
            const buildingPayload = {
              items: dataRoom.map((building) => ({
                room_id: building.room_id,
                seat: building.seat[0],
              })),
            };
            const schedulePayload = {
              items: dataSchedule.map((schedule) => ({
                major_id: schedule.schedule.major_id,
                major_grade: schedule.schedule.major_grade,
              })),
            };

            await Promise.all([
              axios
                .delete("http://localhost:5500/api/subject", {
                  data: subjectPayload,
                })
                .then((response) =>
                  console.log("Subject delete response:", response)
                ),
              axios
                .delete("http://localhost:5500/api/major", {
                  data: majorPayload,
                })
                .then((response) =>
                  console.log("Major delete response:", response)
                ),
              axios
                .delete("http://localhost:5500/api/building", {
                  data: buildingPayload,
                })
                .then((response) =>
                  console.log("Building delete response:", response)
                ),
              axios
                .delete("http://localhost:5500/api/schedule", {
                  data: schedulePayload,
                })
                .then((response) =>
                  console.log("Schedule delete response:", response)
                ),
              axios.delete("http://localhost:5500/api/FileStatus"),
              localStorage.removeItem("startDate"),
              localStorage.removeItem("endDate"),
              localStorage.removeItem("selectSemester"),
              localStorage.removeItem("selectTerm"),
            ]);
            Swal.fire({
              icon: "success",
              title: "ลบข้อมูลสำเร็จ",
              showConfirmButton: false,
              timer: 1500,
            });
            window.location.reload();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาดในการลบข้อมูล",
              showConfirmButton: false,
              timer: 1500,
            });
            console.error("Error during deletion:", error);
          }
        } else {
          console.log("User canceled deletion");
        }
      });
    }
  };

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
    ...new Set(
      dataSubject.flatMap((item) =>
        item.major_id.map((subItem) => subItem.major_id)
      )
    ),
  ].sort((a, b) => parseInt(a) - parseInt(b));

  const optionMajorSubject = filterMajorSubject.map((major) => {
    return {
      label: major,
      value: major,
    };
  });

  const filteredMajorSubject = selectedMajorSubject
    ? dataSubject.filter((item) =>
        item.major_id.map(
          (item) => item.major_id === selectedMajorSubject.value
        )
      )
    : [];

  const filterGradeSubject = [
    ...new Set(
      filteredMajorSubject.flatMap((item) =>
        item.major_id.map((item) => item.grade)
      )
    ),
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
    if (!selectedMajorSubject || (!selectedGradeSubject && !inputSubject)) {
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
              !selectedGradeSubject ||
              (item.major_id &&
                item.major_id.some(
                  (item) =>
                    item.major_id
                      .toLowerCase()
                      .includes(selectedMajorSubject?.value.toLowerCase()) &&
                    item.grade
                      .toString()
                      .toLowerCase()
                      .includes(
                        selectedGradeSubject?.value.toString().toLowerCase()
                      )
                ))) &&
            (!inputSubject ||
              (item.major_id &&
                item.major_id.some((item) =>
                  item.major_id
                    .toLowerCase()
                    .includes(inputSubject.toLowerCase())
                )) ||
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
            (!selectedBuilding || item.build_id === selectedBuilding?.value) &&
            (!selectedFloor || item.floor === selectedFloor?.value) &&
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

  const downloadTemplate = (headers, filename) => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([headers]);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    saveAs(blob, filename);
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
        <Row>
          <Col className="d-flex justify-content-end gap-3">
            <Button
              className="d-flex align-items-center gap-2"
              variant="success"
              onClick={() => handleShowPopupImportData()}
            >
              <FaCloudArrowUp />
              <p className="mb-0">เพิ่มข้อมูล</p>
            </Button>
            <Button
              className="d-flex align-items-center gap-2"
              variant="danger"
              onClick={() => handleClickDeleteAll()}
            >
              <FaTrashCan />
              <p className="mb-0">ลบข้อมูลทั้งหมด</p>
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
                      onClick={() =>
                        downloadTemplate(
                          [
                            "major_id_1",
                            "grade_1",
                            "amount_1",
                            "major_id_2",
                            "grade_2",
                            "amount_2",
                            "cs_id",
                            "cs_name_th",
                            "cs_name_en",
                            "lc_sec_1",
                            "lc_sec_2",
                            "lb_sec_1",
                            "lb_sec_2",
                          ],
                          "Subject.xlsx"
                        )
                      }
                    >
                      <FaDownload />
                      <p className="mb-0">ดาวน์โหลดแบบฟอร์ม</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{ color: "#dc3545", border: "1px solid" }}
                      onClick={() => handleDeleteButtonClickSubject()}
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
                      isSearchable={false}
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
                      {showCheckboxesSubject && (
                        <th className="fw-normal" style={{ width: "5%" }}>
                          <Form.Check
                            type="checkbox"
                            checked={checkedAllSubject}
                            onChange={handleCheckAllSubject}
                          />
                        </th>
                      )}
                      <th className="fw-normal" style={{ width: "5%" }}>
                        cs_id
                      </th>
                      <th className="fw-normal" style={{ width: "20%" }}>
                        cs_name_th
                      </th>
                      <th className="fw-normal" style={{ width: "20%" }}>
                        cs_name_en
                      </th>
                      <th className="fw-normal" style={{ width: "15%" }}>
                        lc_sec
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        lb_sec
                      </th>
                      <th className="fw-normal" style={{ width: "5%" }}>
                        amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {displayDataSubject.map((item, id) => (
                      <tr key={id} style={{ textAlign: "center" }}>
                        {showCheckboxesSubject && (
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={checkedItemsSubject[item.cs_id] || false}
                              onChange={() =>
                                handleCheckItemSubject(item.cs_id)
                              }
                            />
                          </td>
                        )}
                        <td>{item.cs_id}</td>
                        <td style={{ textAlign: "start" }}>
                          {item.cs_name_th}
                        </td>
                        <td style={{ textAlign: "start" }}>
                          {item.cs_name_en}
                        </td>
                        <td>{`${item.lc_sec}`}</td>
                        <td>{`${item.lb_sec}`}</td>

                        <td>
                          {item.major_id.reduce(
                            (sum, curr) => sum + curr.amount,
                            0
                          )}
                        </td>
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
                            {showCheckboxesSubject && (
                              <td>
                                <br />
                              </td>
                            )}
                          </tr>
                        ))}
                      </>
                    )}
                  </tbody>
                </Table>
                <Row>
                  {checkedItemsSubject &&
                    Object.values(checkedItemsSubject).length > 0 && (
                      <Col className="d-flex">
                        <div className="d-flex align-items-center gap-2 ps-3">
                          <Button
                            className="d-flex align-items-center"
                            variant="success"
                            onClick={() => handleDeletePopUpSubject()}
                          >
                            ยืนยัน
                          </Button>
                          <Button
                            className="d-flex align-items-center"
                            variant="danger"
                            onClick={() => handleCancelButtonClickSubject()}
                          >
                            ยกเลิก
                          </Button>
                        </div>
                      </Col>
                    )}
                  <Col>
                    <Pagination className="d-flex justify-content-end align-items-center gap-3 pt-3 pe-3">
                      <p style={{ color: "#4a4f55" }}>
                        Page {currentPageSubject} of{" "}
                        {Math.ceil(fetchDataSubject.length / itemsPerPage)}
                      </p>
                      {currentPageSubject > 1 && (
                        <Button
                          variant="success"
                          onClick={() =>
                            paginateSubject(currentPageSubject - 1)
                          }
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
                          onClick={() =>
                            paginateSubject(currentPageSubject + 1)
                          }
                        >
                          <FaChevronRight />
                        </Button>
                      )}
                    </Pagination>
                  </Col>
                </Row>
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
                      onClick={() =>
                        downloadTemplate(
                          [
                            "major_id",
                            "fac_id",
                            "cs_name_th",
                            "cs_name_en",
                            "fac_name",
                            "major_status",
                            "major_grade",
                          ],
                          "Major.xlsx"
                        )
                      }
                    >
                      <FaDownload />
                      <p className="mb-0">ดาวน์โหลดแบบฟอร์ม</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{
                        color: "#dc3545",
                        border: "1px solid #dc3545",
                      }}
                      onClick={() => handleDeleteButtonClickMajor()}
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
                      isSearchable={false}
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
                      {showCheckboxesMajor && (
                        <th className="fw-normal" style={{ width: "5%" }}>
                          <Form.Check
                            type="checkbox"
                            checked={checkedAllMajor}
                            onChange={handleCheckAllMajor}
                          />
                        </th>
                      )}
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
                        {showCheckboxesMajor && (
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={
                                checkedItemsMajor[
                                  `${item.major_id}_${item.major_grade}`
                                ] || false
                              }
                              onChange={() =>
                                handleCheckItemMajor(
                                  item.major_id,
                                  item.major_grade
                                )
                              }
                            />
                          </td>
                        )}
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
                              {showCheckboxesMajor && (
                                <td>
                                  <br />
                                </td>
                              )}
                            </tr>
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </Table>
                <Row>
                  {checkedItemsMajor &&
                    Object.values(checkedItemsMajor).length > 0 && (
                      <Col className="d-flex">
                        <div className="d-flex align-items-center gap-2 ps-3">
                          <Button
                            className="d-flex align-items-center gap-2"
                            variant="success"
                            onClick={() => handleDeletePopUpMajor()}
                          >
                            ยืนยัน
                          </Button>
                          <Button
                            className="d-flex align-items-center gap-2"
                            variant="danger"
                            onClick={() => handleCancelButtonClickMajor()}
                          >
                            ยกเลิก
                          </Button>
                        </div>
                      </Col>
                    )}
                  <Col>
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
                  </Col>
                </Row>
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
                      onClick={() =>
                        downloadTemplate(
                          [
                            "build_id",
                            "build_name",
                            "room_id",
                            "floor",
                            "seat",
                            "amount",
                            "Maxamount",
                          ],
                          "Room.xlsx"
                        )
                      }
                    >
                      <FaDownload />
                      <p className="mb-0">ดาวน์โหลดแบบฟอร์ม</p>
                    </Button>
                    <Button
                      className="d-flex align-items-center gap-2"
                      variant="light"
                      style={{
                        color: "#dc3545",
                        border: "1px solid #dc3545",
                      }}
                      onClick={() => handleDeleteButtonClickRoom()}
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
                      isSearchable={false}
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
                      {showCheckboxesRoom && (
                        <th className="fw-normal" style={{ width: "5%" }}>
                          <Form.Check
                            type="checkbox"
                            checked={checkedAllRoom}
                            onChange={handleCheckAllRoom}
                          />
                        </th>
                      )}
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
                        {showCheckboxesRoom && (
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={
                                checkedItemsRoom[
                                  `${item.room_id}_${item.seat[0]}`
                                ] || false
                              }
                              onChange={() =>
                                handleCheckItemRoom(item.room_id, item.seat)
                              }
                            />
                          </td>
                        )}
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
                              {showCheckboxesRoom && (
                                <td>
                                  <br />
                                </td>
                              )}
                            </tr>
                          )
                        )}
                      </>
                    )}
                  </tbody>
                </Table>
                <Row>
                  {checkedItemsRoom &&
                    Object.values(checkedItemsRoom).length > 0 && (
                      <Col className="d-flex">
                        <div className="d-flex align-items-center gap-2 ps-3">
                          <Button
                            className="d-flex align-items-center gap-2"
                            variant="success"
                            onClick={() => handleDeletePopUpRoom()}
                          >
                            ยืนยัน
                          </Button>
                          <Button
                            className="d-flex align-items-center gap-2"
                            variant="danger"
                            onClick={() => handleCancelButtonClickRoom()}
                          >
                            ยกเลิก
                          </Button>
                        </div>
                      </Col>
                    )}
                  <Col>
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
                  </Col>
                </Row>
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
