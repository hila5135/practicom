
// type SearchBarProps = {
//     searchQuery: string;
//     setSearchQuery: (query: string) => void;
//     searchType: string;
//     setSearchType: (type: string) => void;
//     handleSearch: () => void;
// };

// function LessonSearch({ searchQuery, setSearchQuery, searchType, setSearchType, handleSearch }: SearchBarProps) {
//     return (
//         <div style={{ padding: "20px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", marginBottom: "20px" }}>
//             <div style={{ display: "flex", gap: "15px", marginBottom: "15px" }}>
//                 <button onClick={() => setSearchType("lecturer")} style={buttonStyle("lecturer", searchType)}>Search by Lecturer</button>
//                 <button onClick={() => setSearchType("topic")} style={buttonStyle("topic", searchType)}>Search by Topic</button>
//             </div>
//             <input
//                 type="text"
//                 placeholder={searchType === "lecturer" ? "Enter a lecturer name" : "Enter a lesson topic"}
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 style={{
//                     width: "100%",
//                     padding: "8px",
//                     fontSize: "16px",
//                     borderRadius: "4px",
//                     border: "1px solid #ccc",
//                 }}            />
//                 <button onClick={handleSearch} style={buttonStyle()}>Search</button>
//         </div>
//     );
// }

// const buttonStyle = (type?: string, searchType?: string) => ({
//     padding: "10px 20px",
//     backgroundColor: searchType === type ? "#B8860B" : "#f1f1f1",
//     border: "1px solid #ddd",
//     borderRadius: "5px",
//     cursor: "pointer",
//     fontWeight: "500",
//     color: searchType === type ? "#fff" : "#333",
//     transition: "background-color 0.3s",
//     width: "auto",
//     ":hover": {
//         backgroundColor: searchType === type ? "#0056b3" : "#ddd"
//     }
// });

// const inputStyle = {
//     width: "100%",
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ddd",
//     marginTop: "10px",
//     marginBottom: "10px",
//     fontSize: "16px",
//     boxSizing: "border-box"
// };

// export default LessonSearch;

type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchType: string;
    setSearchType: (type: string) => void;
    handleSearch: () => void;
  };
  
  function LessonSearch({
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    handleSearch,
  }: SearchBarProps) {
    return (
      <div
        style={{
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          marginBottom: "20px",
        }}
      >
        <div style={{ display: "flex", gap: "15px", marginBottom: "15px", direction: "rtl" }}>
          <button onClick={() => setSearchType("lecturer")} style={buttonStyle("lecturer", searchType)}>
            חיפוש לפי מרצה
          </button>
          <button onClick={() => setSearchType("topic")} style={buttonStyle("topic", searchType)}>
            חיפוש לפי נושא
          </button>
        </div>
  
        <input
          type="text"
          placeholder={
            searchType === "lecturer" ? "הקלד שם של מרצה" : "הקלד נושא של שיעור"
          }
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={inputStyle}
        />
  
        <button onClick={handleSearch} style={searchButtonStyle}>
          חפש
        </button>
      </div>
    );
  }
  
  const buttonStyle = (type?: string, searchType?: string) => ({
    padding: "10px 20px",
    backgroundColor: searchType === type ? "#1976d2" : "#e3f2fd", // כחול תכלת
    border: "1px solid #90caf9",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: 500,
    color: searchType === type ? "#fff" : "#0d47a1",
    transition: "background-color 0.3s",
  });
  
  const searchButtonStyle = {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    backgroundColor: "#1976d2",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  };
  
  const inputStyle = {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
    fontSize: "16px",
    boxSizing: "border-box" as const,
  };
  
  export default LessonSearch;
  