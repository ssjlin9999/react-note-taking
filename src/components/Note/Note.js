import './Note.css';

const Note = props => {
  function deleteNote() {
    props.notFirstTime();
    props.delete(function(prev) {
      return prev.filter(item => item.id !== props.id);
    });
  }

  return (
    <div className="note">
      <div>
        <p>{props.note}</p>
        <p>{`${props.date} ${props.time}`}</p>
      </div>
      <button onClick={deleteNote} className="remove">Delete</button>
    </div>
  );
};

export default Note;