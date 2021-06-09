import { useState, useEffect } from 'react';

import './NoteBuilder.css';
import NewNote from '../../components/NewNote/NewNote';
import Note from '../../components/Note/Note';
import { API_GET_DATA } from '../../shared/utility';

/** GET  /notes/1 */
async function getNotes(setData) {
  const res = await fetch(API_GET_DATA);
  const result = await res.json();
  setData(result.data);
}

/** PUT  /notes/1 */
async function putNotes(data) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data })
  });
}

const NoteBuilder = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3000/notes/1")
  //     .then(res => res.json())
  //     .then(result => {
  //       console.log(result.data);
  //       setData(result.data);
  //     });
  // }, []);

  useEffect(() => {
    getNotes(setData);
  }, []);

  useEffect(() => {
    putNotes(data);
  }, [data])

  let notes;
  if(isNaN(data)) {
    notes = data.map(item => {
      return (
        <Note
          key={item.id}
          id={item.id}
          note={item.note}
          date={item.date}
          time={item.time}
          delete={setData}
        />
      );
    });
  }

  return (
    <div>
      <h1>Notes</h1>
      <NewNote add={setData}/>
      <div className="list">
        {notes}
      </div>
    </div>
  );
};

export default NoteBuilder;