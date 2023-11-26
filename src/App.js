
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: 0, grade: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/students')
      .then(response => setStudents(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewStudent({ ...newStudent, [name]: value });
  };

  const handleSubmit = () => {
    axios.post('http://localhost:5000/students', newStudent)
      .then(response => {
        console.log(response.data);
        setNewStudent({ name: '', age: 0, grade: '' });
      })
      .catch(error => console.error('Error adding student:', error));
  };

  return (
    <div>
      <h1>Student Admission System</h1>
      <div>
        <h2>Students</h2>
        <ul>
          {students.map(student => (
            <li key={student._id}>{student.name} - {student.age} years old - Grade: {student.grade}</li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Add New Student</h2>
        <label>Name:</label>
        <input type="text" name="name" value={newStudent.name} onChange={handleInputChange} /><br />
        <label>Age:</label>
        <input type="number" name="age" value={newStudent.age} onChange={handleInputChange} /><br />
        <label>Grade:</label>
        <input type="text" name="grade" value={newStudent.grade} onChange={handleInputChange} /><br />
        <button onClick={handleSubmit}>Add Student</button>
      </div>
    </div>
  );
};

export default App;
