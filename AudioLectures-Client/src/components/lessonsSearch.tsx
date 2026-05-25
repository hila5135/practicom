
type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchType: string;
    setSearchType: (type: string) => void;
    handleSearch: () => void;
  };
  
  
import { Box, Button, Typography, TextField } from "@mui/material";

function LessonSearch({
  searchQuery,
  setSearchQuery,
  searchType,
  setSearchType,
  handleSearch,
}: SearchBarProps) {
  return (
    <Box
      sx={{
        background: "white",
        borderRadius: 3,
        p: 3,
        boxShadow: "0 6px 20px rgba(0,0,0,0.06)",
        border: "1px solid #e8eef7",
        display: "flex",
        flexDirection: "column",
        gap: 2,
   
      }}
    >
      <div className="search-header">
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: 16,
            color: "#1e3a8a",
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          🔍 חיפוש מתקדם
        </Typography>

        <Typography sx={{ fontSize: 13, color: "#6b7280" }}>
          מצא את השיעור המושלם עבורך
        </Typography>
      </div>

      <div className="search-type-container">
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            onClick={() => setSearchType("lecturer")}
            fullWidth
            sx={{
              textTransform: "none",
              borderRadius: 2,
              background:
                searchType === "lecturer" ? "#1976d2" : "#f3f4f6",
              color:
                searchType === "lecturer" ? "white" : "#374151",
              "&:hover": {
                background:
                  searchType === "lecturer" ? "#125aa3" : "#e5e7eb",
              },
            }}
          >
            חיפוש לפי מרצה
          </Button>

          <Button
            onClick={() => setSearchType("topic")}
            fullWidth
            sx={{
              textTransform: "none",
              borderRadius: 2,
              background:
                searchType === "topic" ? "#1976d2" : "#f3f4f6",
              color:
                searchType === "topic" ? "white" : "#374151",
              "&:hover": {
                background:
                  searchType === "topic" ? "#125aa3" : "#e5e7eb",
              },
            }}
          >
            חיפוש לפי נושא
          </Button>
        </Box>
      </div>

      
      <div className="input-container">
        <Box sx={{ position: "relative" }}>
          <TextField
            fullWidth
            placeholder={
              searchType === "lecturer"
                ? "הקלד שם של מרצה..."
                : "הקלד נושא של שיעור..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            sx={{
              background: "#fff",
              borderRadius: 2,
            }}
          />
        </Box>
      </div>

    
      <button
        onClick={handleSearch}
        disabled={!searchQuery.trim()}
        className="search-button"
        style={{
          background: searchQuery.trim() ? "#1976d2" : "#cbd5e1",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "10px",
          cursor: searchQuery.trim() ? "pointer" : "not-allowed",
          fontWeight: 600,
        }}
      >
        {searchQuery ? "מחפש..." : "חפש עכשיו"}
      </button>
    </Box>
  );
}

export default LessonSearch;