import React from "react";
import "./Dashboard.scss";

const Dashboard = () => {
  const subject = [
    {
      id: 1,
      name: "Math",
      active: false,
    },
    {
      id: 2,
      name: "English",
      active: false,
    },
    {
      id: 3,
      name: "Science",
      active: true,
    },
  ];
  return (
    <>
      <div className="mainContent">
        <div className="content-grid-one">
          <div className="grid-cl-one">
            <h3 className="grid-c-title">วิชาที่ยังไม่ได้จัด</h3>
            <div className="grid-cl-content">
              <h1>{subject.filter((item) => !item.active).length}</h1>
            </div>
          </div>
          <div className="grid-cl-two">
            <h3 className="grid-c-title">วิชาที่จัดแล้ว</h3>
            <div className="grid-cl-content">
              <h1>{subject.filter((item) => item.active).length}</h1>
            </div>
          </div>
          <div className="grid-cl-three">
            <h3 className="grid-c-title">วิชาทั้งหมด</h3>
            <div className="grid-cl-content">
              <h1>{subject.length}</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
