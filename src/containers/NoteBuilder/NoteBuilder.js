import { useState, useEffect, useRef } from 'react';

import './NoteBuilder.css';
import NewNote from '../../components/NewNote/NewNote';
import Note from '../../components/Note/Note';
import { API_GET_DATA } from '../../shared/utility';

/** GET  /notes/1 */
async function getFetchData(setData) {
  const res = await fetch(API_GET_DATA);
  const result = await res.json();
  setData(result.data);
}

/** PUT  /notes/1 */
async function putFetchData(data) {
  await fetch(API_GET_DATA, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data })
  })
}

const NoteBuilder = () => {
  const [data, setData] = useState([]);
  const isFirstTime = useRef(true);
  // Do not use `let isFirstTime = true;`  It will be reset when re-rendered.

  useEffect(() => {
    getFetchData(setData);
  }, []);
 
  useEffect(() => {
    // console.log('isFirstTime', isFirstTime.current);
    if(!isFirstTime.current) {
      putFetchData(data);
    }
  }, [data, isFirstTime])

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
          notFirstTime = {() => isFirstTime.current = false}
        />
      );
    });
  }

  return (
    <div>
      <h1>Notes</h1>
      <NewNote
        add={setData}
        notFirstTime = {() => isFirstTime.current = false}
      />
      <div className="list">
        {notes}
      </div>
    </div>
  );
};

export default NoteBuilder;