import React, { useEffect, useState } from "react";

function App() {
  const [Sid, setSid] = useState("");
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [allStudent, setAllStudent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3030/api/v1/getstudent",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setAllStudent(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const sid = parseInt(Sid);

    try {
      const response = await fetch("http://localhost:3030/api/v1/student", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sid, name, grade }),
      });

      if (response.ok) {
        window.location.reload(true);
      } else {
        const errorData = await response.json();
        alert("Error:", errorData);
      }
    } catch (error) {
      alert("Error:", error);
    }
  };

  const handleEdit = (sid) => {
    // Implement edit functionality here
    alert(`Edit student with ID ${sid}`);
  };

  const handleDelete = async (sid) => {
    try {
      const response = await fetch(
        `http://localhost:3030/api/v1/deletebyid/${sid}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        window.location.reload(true);
      } else {
        const errorData = await response.json();
        alert("Error:", errorData);
      }
    } catch (error) {
      alert("Error:", error);
    }
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          width: 250,
          gap: 10,
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Student Registration</h2>
        <label>Student id</label>
        <input
          type="number"
          value={Sid}
          onChange={(e) => setSid(e.target.value)}
        />
        <label>Student Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Student Grade</label>
        <input
          type="text"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Submit
        </button>
      </form>
      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}
      >
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th style={tableHeaderStyle}>Student Id</th>
            <th style={tableHeaderStyle}>Student Name</th>
            <th style={tableHeaderStyle}>Student Grade</th>
            <th style={tableHeaderStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allStudent.map((item) => (
            <tr key={item.sid}>
              <td style={tableCellStyle}>{item.sid}</td>
              <td style={tableCellStyle}>{item.name}</td>
              <td style={tableCellStyle}>{item.grade}</td>
              <td style={{ ...tableCellStyle, display: "flex", gap: 7 }}>
                <button
                  onClick={() => handleEdit(item.sid)}
                  style={{
                    padding: "5px",
                    backgroundColor: "#5155FF",
                    color: "white",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.sid)}
                  style={{
                    padding: "5px",
                    backgroundColor: "#FF5155",
                    color: "white",
                    cursor: "pointer",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableHeaderStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "10px",
  backgroundColor: "#4CAF50",
  color: "white",
};

const tableCellStyle = {
  border: "1px solid #dddddd",
  textAlign: "left",
  padding: "10px",
};

export default App;
