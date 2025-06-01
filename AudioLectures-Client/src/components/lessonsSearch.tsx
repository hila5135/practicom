
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
      <div className="search-container">
      {/* <style jsx>{`
        .search-container {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          padding: 32px;
          margin-bottom: 32px;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.15);
          position: relative;
          overflow: hidden;
          direction: rtl;
        }

        .search-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
        }

        .search-header {
          position: relative;
          z-index: 2;
          margin-bottom: 24px;
        }

        .search-title {
          font-size: 28px;
          font-weight: 700;
          color: white;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }

        .search-type-container {
          display: flex;
          gap: 12px;
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }

        .search-type-button {
          flex: 1;
          padding: 16px 24px;
          border-radius: 16px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          cursor: pointer;
          font-weight: 600;
          font-size: 15px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          backdrop-filter: blur(10px);
        }

        .search-type-button.active {
          background: rgba(255, 255, 255, 0.95);
          color: #667eea;
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .search-type-button.inactive {
          background: rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.9);
        }

        .search-type-button:hover:not(.active) {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-1px);
          box-shadow: 0 4px 16px rgba(255, 255, 255, 0.15);
        }

        .input-container {
          position: relative;
          margin-bottom: 24px;
          z-index: 2;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 100%;
          padding: 18px 60px 18px 24px;
          border-radius: 16px;
          border: 2px solid rgba(255, 255, 255, 0.2);
          font-size: 16px;
          background: rgba(255, 255, 255, 0.95);
          color: #1a1a1a;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          box-sizing: border-box;
          backdrop-filter: blur(10px);
        }

        .search-input:focus {
          border: 2px solid rgba(255, 255, 255, 0.8);
          box-shadow: 0 8px 32px rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }

        .search-input::placeholder {
          color: #9ca3af;
        }

        .input-icon {
          position: absolute;
          right: 18px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          pointer-events: none;
        }

        .search-button {
          width: 100%;
          padding: 18px 32px;
          border-radius: 16px;
          border: none;
          background: linear-gradient(135deg, #ff6b6b, #ee5a24);
          color: white;
          font-size: 16px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          box-shadow: 0 8px 32px rgba(255, 107, 107, 0.3);
          z-index: 2;
        }

        .search-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
        }

        .search-button:active:not(:disabled) {
          transform: translateY(0);
        }

        .search-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .search-icon {
          width: 20px;
          height: 20px;
        }

        .type-icon {
          width: 18px;
          height: 18px;
        }

        @media (max-width: 768px) {
          .search-container {
            padding: 24px;
            margin-bottom: 24px;
          }

          .search-title {
            font-size: 24px;
          }

          .search-type-container {
            flex-direction: column;
            gap: 8px;
          }

          .search-type-button {
            padding: 14px 20px;
            font-size: 14px;
          }

          .search-input {
            padding: 16px 50px 16px 20px;
            font-size: 15px;
          }

          .search-button {
            padding: 16px 28px;
            font-size: 15px;
          }
        }
      `}</style> */}

      <div className="search-header">
        <h3 className="search-title">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path
              d="m21 21-4.35-4.35"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          חיפוש מתקדם
        </h3>
        <p className="search-subtitle">מצא את השיעור המושלם עבורך</p>
      </div>

      <div className="search-type-container">
        <button
          onClick={() => setSearchType("lecturer")}
          className={`search-type-button ${searchType === "lecturer" ? "active" : "inactive"}`}
        >
          <svg className="type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          חיפוש לפי מרצה
        </button>

        <button
          onClick={() => setSearchType("topic")}
          className={`search-type-button ${searchType === "topic" ? "active" : "inactive"}`}
        >
          <svg className="type-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          חיפוש לפי נושא
        </button>
      </div>

      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            placeholder={searchType === "lecturer" ? "הקלד שם של מרצה..." : "הקלד נושא של שיעור..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
            // onFocus={() => setIsFocused(true)}
            // onBlur={() => setIsFocused(false)}
            className="search-input"
          />
          <div className="input-icon">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      <button onClick={handleSearch} disabled={searchQuery === "" || !searchQuery.trim()} className="search-button">
        {searchQuery ? (
          <>
            <div className="spinner"></div>
            מחפש...
          </>
        ) : (
          <>
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
              <path
                d="m21 21-4.35-4.35"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            חפש עכשיו
          </>
        )}
      </button>
    </div>
      // <div
      //   style={{
      //     padding: "20px",
      //     backgroundColor: "#fff",
      //     borderRadius: "8px",
      //     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      //     marginBottom: "20px",
      //   }}
      // >
      //   <div style={{ display: "flex", gap: "15px", marginBottom: "15px", direction: "rtl" }}>
      //     <button onClick={() => setSearchType("lecturer")} style={buttonStyle("lecturer", searchType)}>
      //       חיפוש לפי מרצה
      //     </button>
      //     <button onClick={() => setSearchType("topic")} style={buttonStyle("topic", searchType)}>
      //       חיפוש לפי נושא
      //     </button>
      //   </div>
  
      //   <input
      //     type="text"
      //     placeholder={
      //       searchType === "lecturer" ? "הקלד שם של מרצה" : "הקלד נושא של שיעור"
      //     }
      //     value={searchQuery}
      //     onChange={(e) => setSearchQuery(e.target.value)}
      //     style={inputStyle}
      //   />
  
      //   <button onClick={handleSearch} style={searchButtonStyle}>
      //     חפש
      //   </button>
      // </div>
    );
  }
  export default LessonSearch;
  