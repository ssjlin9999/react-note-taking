import { useState } from 'react';

import './NoteBuilder.css';
import NewNote from '../../components/NewNote/NewNote';
import Note from '../../components/Note/Note';

const NoteBuilder = () => {
  const [data, setData] = useState([]);

  const notes = data.map(item => {
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
  })

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