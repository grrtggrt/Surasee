const dataFacultyOption = [
  {
    id: "R",
    label: "วิทยาการจัดการ",
    value: "วิทยาการจัดการ",
  },
  {
    id: "T",
    label: "วิศวกรรมศาสตร์",
    value: "วิศวกรรมศาสตร์",
  },
  {
    id: "S",
    label: "วิทยาศาสตร์",
    value: "วิทยาศาสตร์",
  },
  {
    id: "G",
    label: "เศรษฐศาสตร์",
    value: "เศรษฐศาสตร์",
  },
  {
    id: "M",
    label: "พาณิชยนาวีนานาชาติ",
    value: "พาณิชยนาวีนานาชาติ",
  },
];

const dataMajorOption = [
  {
    id: "S09",
    label: "เทคโนโลยีสารสนเทศ",
    value: "เทคโนโลยีสารสนเทศ",
  },
  {
    id: "S10",
    label: "เทคโนโลยีสารสนเทศ(ภาคพิเศษ)",
    value: "เทคโนโลยีสารสนเทศ(ภาคพิเศษ)",
  },
  {
    id: "M09",
    label: "วิศวกรรมเครื่องกลเรือ",
    value: "วิศวกรรมเครื่องกลเรือ",
  },
  {
    id: "M04",
    label: "การขนส่งทางทะเล",
    value: "การขนส่งทางทะเล",
  },
  {
    id: "R01",
    label: "การเงิน",
    value: "การเงิน",
  },
  {
    id: "R02",
    label: "การจัดการ",
    value: "การจัดการ",
  },
  {
    id: "T02",
    label: "วิศวกรรมคอมพิวเตอร์	",
    value: "วิศวกรรมคอมพิวเตอร์	",
  },
  {
    id: "T03",
    label: "วิศวกรรมเครื่องกล",
    value: "วิศวกรรมเครื่องกล",
  },
  {
    id: "T04",
    label: "วิศวกรรมไฟฟ้า",
    value: "วิศวกรรมไฟฟ้า",
  },
  {
    id: "T05",
    label: "วิศวกรรมโยธา",
    value: "วิศวกรรมโยธา",
  },
  {
    id: "T06",
    label: "วิศวกรรมอุสาหการ",
    value: "วิศวกรรมอุสาหการ",
  },
];

const dataGradeOption = [
  {
    id: "1",
    label: "1",
    value: "1",
  },
  {
    id: "2",
    label: "2",
    value: "2",
  },
  {
    id: "3",
    label: "3",
    value: "3",
  },
  {
    id: "4",
    label: "4",
    value: "4",
  },
];

const dataYearOption = [
  {
    id: "1",
    label: "2560",
    value: "2560",
  },
  {
    id: "2",
    label: "2561",
    value: "2561",
  },
  {
    id: "3",
    label: "2561",
    value: "2561",
  },
  {
    id: "4",
    label: "2562",
    value: "2562",
  },
  {
    id: "5",
    label: "2563",
    value: "2563",
  },
  {
    id: "6",
    label: "2564",
    value: "2564",
  },
  {
    id: "7",
    label: "2565",
    value: "2565",
  },
  {
    id: "8",
    label: "2566",
    value: "2566",
  },
  {
    id: "9",
    label: "2567",
    value: "2567",
  },
];

const dataTermOption = [
  {
    id: "1",
    label: "ฤดูร้อน",
    value: "ฤดูร้อน",
  },
  {
    id: "2",
    label: "ต้น",
    value: "ต้น",
  },
  {
    id: "3",
    label: "ปลาย",
    value: "ปลาย",
  },
];

const dataSemesterOption = [
  {
    id: "1",
    label: "กลางภาค",
    value: "กลางภาค",
  },
  {
    id: "2",
    label: "ปลายภาค",
    value: "ปลายภาค",
  },
];

const dataTypeSubjectOption = [
  {
    id: "1",
    label: "วิชาเสรี",
    value: "วิชาเสรี",
  },
  {
    id: "2",
    label: "วิชาเลือก",
    value: "วิชาเลือก",
  },
  {
    id: "3",
    label: "วิชาบังคับเลือก",
    value: "วิชาบังคับเลือก",
  },
];

const dataSeatOption = [
  {
    id: "A",
    label: "A",
    value: "A",
  },
  {
    id: "B",
    label: "B",
    value: "B",
  },
  {
    id: "C",
    label: "C",
    value: "C",
  },
  {
    id: "D",
    label: "D",
    value: "D",
  },
  {
    id: "E",
    label: "E",
    value: "E",
  },
  {
    id: "F",
    label: "F",
    value: "F",
  },
];

const dataBranch = [
  {
    id: 1,
    faculty: "วิทยาศาสตร์",
    majorId: "S09",
    majorName: "เทคโนโลยีสารสนเทศ",
    grade: "1",
  },
  {
    id: 2,
    faculty: "วิทยาศาสตร์",
    majorId: "S10",
    majorName: "เทคโนโลยีสารสนเทศ(ภาคพิเศษ)",
    grade: "1",
  },
  {
    id: 3,
    faculty: "พาณิชยนาวีนานาชาติ",
    majorId: "M09",
    majorName: "วิศวกรรมเครื่องกลเรือ",
    grade: "1",
  },
  {
    id: 4,
    faculty: "พาณิชยนาวีนานาชาติ",
    majorId: "M04",
    majorName: "การขนส่งทางทะเล",
    grade: "1",
  },
  {
    id: 5,
    faculty: "วิทยาการจัดการ",
    majorId: "R01",
    majorName: "การเงิน",
    grade: "1",
  },
  {
    id: 6,
    faculty: "วิทยาการจัดการ",
    majorId: "R02",
    majorName: "การจัดการ",
    grade: "1",
  },
  {
    id: 7,
    faculty: "วิศวกรรมศาสตร์",
    majorId: "T02",
    majorName: "วิศวกรรมคอมพิวเตอร์",
    grade: "1",
  },
  {
    id: 8,
    faculty: "วิศวกรรมศาสตร์",
    majorId: "T03",
    majorName: "วิศวกรรมเครื่องกล",
    grade: "1",
  },
  {
    id: 9,
    faculty: "วิศวกรรมศาสตร์",
    majorId: "T04",
    majorName: "วิศวกรรมไฟฟ้า",
    grade: "1",
  },
  {
    id: 10,
    faculty: "วิศวกรรมศาสตร์",
    majorId: "T05",
    majorName: "วิศวกรรมโยธา",
    grade: "1",
  },
  {
    id: 11,
    faculty: "วิศวกรรมศาสตร์",
    majorId: "T07",
    majorName: "วิศวกรรมอุสาหการ",
    grade: "1",
  },
];

const dataSubjects = [
  {
    id: "01361101-64",
    name_en: "Introductory Thai Usage",
    name_th: "การใช้ภาษไทยเบื้องต้น",
    majorId: ["R07", "R03", "R17"],
    sec: [800, 850],
    type: "เสรี",
    active: false,
  },
  {
    id: "01101372-65",
    name_en: "Econometrics I",
    name_th: "เศรษฐมิติ I",
    majorId: ["G01"],
    sec: [800, 801, 900],
    type: "บังคับ",
    active: false,
  },
  {
    id: "01417111-65",
    name_en: "Calculus I",
    name_th: "แคลคูลัส I",
    majorId: ["S09", "S18", "M04", "M02"],
    sec: [800, 807],
    type: "วิชาเลือก",
    active: false,
  },
  {
    id: "01361101-64",
    name_en: "Introductory Thai Usage",
    name_th: "การใช้ภาษไทยเบื้องต้น",
    majorId: ["R07", "R03", "R17"],
    sec: [800, 850],
    type: "เสรี",
    active: false,
  },
  {
    id: "01101372-65",
    name_en: "Econometrics I",
    name_th: "เศรษฐมิติ I",
    majorId: ["G01"],
    sec: [800, 801, 900],
    type: "บังคับ",
    active: false,
  },
  {
    id: "01417111-65",
    name_en: "Calculus I",
    name_th: "แคลคูลัส I",
    majorId: ["S09", "S18", "M04", "M02"],
    sec: [800, 807],
    type: "วิชาเลือก",
    active: false,
  },
  {
    id: "01361101-64",
    name_en: "Introductory Thai Usage",
    name_th: "การใช้ภาษไทยเบื้องต้น",
    majorId: ["R07", "R03", "R17"],
    sec: [800, 850],
    type: "เสรี",
    active: false,
  },
  {
    id: "01101372-65",
    name_en: "Econometrics I",
    name_th: "เศรษฐมิติ I",
    majorId: ["G01"],
    sec: [800, 801, 900],
    type: "บังคับ",
    active: false,
  },
  {
    id: "01417111-65",
    name_en: "Calculus I",
    name_th: "แคลคูลัส I",
    majorId: ["S09", "S18", "M04", "M02"],
    sec: [800, 807],
    type: "วิชาเลือก",
    active: false,
  },
];

//   const dataSemesterOption = [
//     {
//         id: "1",
//         label: "กลางภาค",
//         value: "กลางภาค"
//     },
//     {
//         id: "2",
//         label: "ปลายภาค",
//         value: "ปลายภาค"
//     },
// ];

//   const dataSemesterOption = [
//     {
//         id: "1",
//         label: "กลางภาค",
//         value: "กลางภาค"
//     },
//     {
//         id: "2",
//         label: "ปลายภาค",
//         value: "ปลายภาค"
//     },
// ];

export {
  dataFacultyOption,
  dataMajorOption,
  dataGradeOption,
  dataYearOption,
  dataTermOption,
  dataSemesterOption,
  dataTypeSubjectOption,
  dataSeatOption,
  dataBranch,
  dataSubjects
};
