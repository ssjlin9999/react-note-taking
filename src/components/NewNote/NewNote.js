import { useState } from 'react';
import { v4 } from 'uuid'; 

import './NewNote.css';

const NewNote = props => {
  const [note, setNote] = useState("");
  function changeNote(e) {
    setNote(e.target.value);
  }

  const [date, setDate] = useState("");
  function changeDate(e) {
    setDate(e.target.value);
  }

  const [time, setTime] = useState("");
  function changeTime(e) {
    setTime(e.target.value);
  }

  // console.log(note, date, time);

  function addNote() {
    props.add(function(prevData) {
      return [
        {
          id: v4(),
          note,
          date,
          time
        },
        ...prevData
      ];
    });
  }
  
  return (
    <div>
      <p>Note</p>
      <input type="text" value={note} onChange={changeNote}></input>
      <p>Date</p>
      <input type="date" value={date} onChange={changeDate}></input>
      <p>Time</p>
      <input type="time" value={time} onChange={changeTime}></input>
      <button onClick={addNote} className="add">Add a note</button>
    </div>
  );
};

export default NewNote;