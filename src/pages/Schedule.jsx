import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./Schedule.scss";

const Schedule = () => {
  const [boards, setBoards] = useState([]);
  const [subjects, setSubjects] = useState([
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
      active: false,
    },
  ]);

  const handleAddSubjectToBoard = (id) => {
    const selectedSubject = subjects.find((subject) => subject.id === id);
    selectedSubject.active = true;
    setBoards((prevBoards) => [...prevBoards, selectedSubject]);
    setSubjects((prevSubjects) => prevSubjects.filter((subject) => subject.id !== id));
  };

  const handleRemoveSubject = (index) => {
    const removedSubject = boards[index];
    removedSubject.active = false;
    setBoards((prevBoards) => prevBoards.filter((_, idx) => idx !== index));
    setSubjects((prevSubjects) => [...prevSubjects, removedSubject]);
  };

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "SUBJECT",
    drop: (item) => handleAddSubjectToBoard(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));

  return (
    <div className="mainContent">
      <div className="subjectContent">
        <div className="content-grid">
          {subjects.map((subject) => (
            <Subject key={subject.id} subject={subject} onAddToBoard={handleAddSubjectToBoard} />
          ))}
        </div>
      </div>
      <div className="drop-target">
        <div className={`content-drop ${isOver && canDrop ? 'can-drop' : ''}`} ref={drop}>
          {boards.map((boardSubject, index) => (
            <div key={index} onClick={() => handleRemoveSubject(index)}>
              {boardSubject.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Subject = ({ subject, onAddToBoard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "SUBJECT",
    item: { id: subject.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      className="grid-cl"
      onClick={() => onAddToBoard(subject.id)}
      ref={drag}
      style={{
        display: subject.active ? "none" : "",
        background: "rgb(112, 205, 255)",
      }}
    >
      <h3 className="grid-c-title">{subject.name}</h3>
    </div>
  );
};

export default Schedule;
