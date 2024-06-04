// controllers/uploadController.js
const XLSX = require("xlsx");
const Subject = require("../models/subject");
const Major = require("../models/major");
const Building = require("../models/building");

const uploadDataSubject = async (req, res) => {
  try {
    // Log the incoming file details
    console.log("Incoming file:", req.file);

    // Read the workbook from the buffer
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
      { header: 1 }
    );

    // Log the parsed data from the workbook
    console.log("Parsed workbook data:", xlData);

    // Adjust expected headers to match the file
    const expectedHeaders = [
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
    ];

    // Check headers
    const headers = xlData[0];
    console.log("Headers from the file:", headers);
    const isValidHeaders = headers.every((header) =>
      expectedHeaders.includes(header)
    );

    if (!isValidHeaders) {
      console.log("Invalid headers");
      return res.status(400).send("Invalid file format");
    }

    // Transform data
    const data = xlData
      .slice(1)
      .filter((row) => row.some((cell) => cell !== undefined && cell !== "")) // Filter out empty rows
      .map((row) => {
        const majors = [];
        for (let i = 1; i <= 2; i++) {
          // Adjusted to the available data
          const majorIdIndex = headers.indexOf(`major_id_${i}`);
          const gradeIndex = headers.indexOf(`grade_${i}`);
          const amountIndex = headers.indexOf(`amount_${i}`);
          if (majorIdIndex > -1 && row[majorIdIndex]) {
            majors.push({
              major_id: row[majorIdIndex],
              grade: row[gradeIndex],
              amount: row[amountIndex],
            });
          }
        }

        // Filter out empty major objects
        const nonEmptyMajors = majors.filter((major) => major.major_id);

        const lcSecs = [];
        for (let i = 1; i <= 15; i++) {
          const lcSecIndex = headers.indexOf(`lc_sec_${i}`);
          if (lcSecIndex > -1 && row[lcSecIndex]) {
            lcSecs.push(Number(row[lcSecIndex]));
          }
        }

        const lbSecs = [];
        for (let i = 1; i <= 15; i++) {
          const lbSecIndex = headers.indexOf(`lb_sec_${i}`);
          if (lbSecIndex > -1 && row[lbSecIndex]) {
            lbSecs.push(Number(row[lbSecIndex]));
          }
        }

        return {
          major_id: nonEmptyMajors,
          cs_id: row[headers.indexOf("cs_id")],
          cs_name_th: row[headers.indexOf("cs_name_th")],
          cs_name_en: row[headers.indexOf("cs_name_en")],
          lc_sec: lcSecs,
          lb_sec: lbSecs,
        };
      })
      .filter((row) => row.major_id.length > 0); // Filter out rows with no major_id

    // Log the transformed data
    console.log("Transformed data:", JSON.stringify(data, null, 2));

    // Insert the data into the database
    await Subject.insertMany(data);
    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    console.error("Error uploading data:", error);
    res.status(500).send("Error uploading data");
  }
};

const uploadDataBuilding = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
      { header: 1 }
    );

    console.log(xlData); // เพิ่มการพิมพ์ข้อมูลเพื่อตรวจสอบ

    // หัวข้อที่คาดหวัง
    const expectedHeaders = [
      "build_id",
      "build_name",
      "room_id",
      "floor",
      "seat",
      "amount",
      "Maxamount",
    ];

    // ตรวจสอบหัวข้อ
    const headers = xlData[0];
    const isValidHeaders = expectedHeaders.every(
      (header, index) => headers[index] === header
    );

    if (!isValidHeaders) {
      return res.status(400).send("Invalid file format");
    }

    // ลบแถวของหัวข้อออก
    const dataRows = xlData.slice(1);

    // สร้างข้อมูลแยกกันสำหรับแต่ละแถว
    const buildings = dataRows.map((row) => {
      const [build_id, build_name, room_id, floor, seat, amount, Maxamount] =
        row;
      return {
        build_id,
        build_name,
        room_id,
        floor,
        seat: [seat],
        amount: amount || 0,
        Maxamount: Maxamount || 0,
      };
    });

    console.log(buildings); // เพิ่มการพิมพ์ข้อมูลเพื่อตรวจสอบ

    await Building.insertMany(buildings);
    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading data");
  }
};

const uploadDataMajor = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], { header: 1 });

    console.log(xlData); // เพิ่มการพิมพ์ข้อมูลเพื่อตรวจสอบ

    // หัวข้อที่คาดหวัง
    const expectedHeaders = ["major_id", "fac_id", "cs_name_th", "cs_name_en", "fac_name", "major_status", "major_grade"];

    // ตรวจสอบหัวข้อ
    const headers = xlData[0];
    const isValidHeaders = expectedHeaders.every((header, index) => headers[index] === header);

    if (!isValidHeaders) {
      return res.status(400).send('Invalid file format');
    }

    // ลบแถวของหัวข้อออก
    const dataRows = xlData.slice(1);

    // แปลงข้อมูล
    const majors = dataRows.map(row => {
      const [major_id, fac_id, cs_name_th, cs_name_en, fac_name, major_status, major_grade] = row;
      return {
        major_id,
        fac_id,
        major_name_th: cs_name_th,
        major_name_en: cs_name_en,
        fac_name,
        major_status,
        major_grade
      };
    });

    console.log(majors); // เพิ่มการพิมพ์ข้อมูลเพื่อตรวจสอบ

    await Major.insertMany(majors);
    res.status(200).send('Data uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading data');
  }
};


module.exports = { uploadDataSubject, uploadDataBuilding, uploadDataMajor };
