// controllers/uploadController.js
const XLSX = require("xlsx");
const Subject = require("../models/subject");
const Major = require("../models/major");
const Building = require("../models/building");

const uploadDataSubject = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(
      workbook.Sheets[sheet_name_list[0]],
      { header: 1 }
    );

    const headers = xlData[0];
    const majorIdHeaders = headers.filter((header) =>
      header.startsWith("major_id_")
    );
    const lcSecHeaders = headers.filter((header) =>
      header.startsWith("lc_sec_")
    );
    const lbSecHeaders = headers.filter((header) =>
      header.startsWith("lb_sec_")
    );

    const numMajors = majorIdHeaders.length;
    const numLcSecs = lcSecHeaders.length;
    const numLbSecs = lbSecHeaders.length;

    const Headers = [];
    for (let i = 1; i <= numMajors; i++) {
      Headers.push(`major_id_${i}`, `grade_${i}`, `amount_${i}`);
    }

    const lcHeaders = [];
    for (let i = 1; i <= numLcSecs; i++) {
      lcHeaders.push(`lc_sec_${i}`);
    }

    const lbHeaders = [];
    for (let i = 1; i <= numLbSecs; i++) {
      lbHeaders.push(`lb_sec_${i}`);
    }

    const fixedHeaders = ["cs_id", "cs_name_th", "cs_name_en"];
    const expectedHeaders = [
      ...Headers,
      ...fixedHeaders,
      ...lcHeaders,
      ...lbHeaders,
    ];

    const isValidHeaders = expectedHeaders.every((header) =>
      headers.includes(header)
    );
    if (!isValidHeaders) {
      console.log("Invalid headers");
      return res.status(400).send("Invalid file format");
    }

    const data = xlData
      .slice(1)
      .filter((row) => row.some((cell) => cell !== undefined && cell !== "")) // Filter out empty rows
      .map((row) => {
        const majors = [];
        for (let i = 1; i <= numMajors; i++) {
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

        const nonEmptyMajors = majors.filter((major) => major.major_id);

        const lcSecs = [];
        for (let i = 1; i <= numLcSecs; i++) {
          const lcSecIndex = headers.indexOf(`lc_sec_${i}`);
          if (lcSecIndex > -1 && row[lcSecIndex]) {
            lcSecs.push(Number(row[lcSecIndex]));
          }
        }

        const lbSecs = [];
        for (let i = 1; i <= numLbSecs; i++) {
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
      .filter((row) => row.major_id.length > 0);

    console.log("Transformed data:", JSON.stringify(data, null, 2));

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

    console.log(xlData); // Print data to verify

    // Expected headers
    const expectedHeaders = [
      "build_id",
      "build_name",
      "room_id",
      "floor",
      "seat",
      "amount",
      "Maxamount",
    ];

    // Check headers
    const headers = xlData[0];
    const isValidHeaders = expectedHeaders.every((header) =>
      headers.includes(header)
    );

    if (!isValidHeaders) {
      return res.status(400).send("Invalid file format");
    }

    const indices = {};
    expectedHeaders.forEach((header) => {
      indices[header] = headers.indexOf(header);
    });

    // Remove header row
    const dataRows = xlData.slice(1);

    // Create data for each row
    const buildings = dataRows.map((row) => {
      return {
        build_id: row[indices.build_id],
        build_name: row[indices.build_name],
        room_id: row[indices.room_id],
        floor: row[indices.floor],
        seat: [row[indices.seat]],
        amount: row[indices.amount] || 0,
        Maxamount: row[indices.Maxamount] || 0,
      };
    });

    console.log(buildings); // Print data to verify

    // Insert data into the database
    await Building.insertMany(buildings);
    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    console.error("Error uploading data:", error.message);
    console.error("Stack Trace:", error.stack);
    res.status(500).send("Error uploading data");
  }
};

const uploadDataMajor = async (req, res) => {
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
      "major_id",
      "fac_id",
      "major_name_th",
      "major_name_en",
      "fac_name",
      "major_status",
      "major_grade",
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

    // แปลงข้อมูล
    const majors = dataRows.map((row) => {
      const [
        major_id,
        fac_id,
        cs_name_th,
        cs_name_en,
        fac_name,
        major_status,
        major_grade,
      ] = row;
      return {
        major_id,
        fac_id,
        major_name_th: cs_name_th,
        major_name_en: cs_name_en,
        fac_name,
        major_status,
        major_grade,
      };
    });

    console.log(majors); // เพิ่มการพิมพ์ข้อมูลเพื่อตรวจสอบ

    await Major.insertMany(majors);
    res.status(200).send("Data uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error uploading data");
  }
};

module.exports = { uploadDataSubject, uploadDataBuilding, uploadDataMajor };
