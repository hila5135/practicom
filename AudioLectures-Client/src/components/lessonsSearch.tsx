type SearchBarProps = {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchType: string;
    setSearchType: (type: string) => void;
    handleSearch: () => void;
};

function LessonSearch({ searchQuery, setSearchQuery, searchType, setSearchType, handleSearch }: SearchBarProps) {
    return (<>
        <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setSearchType("lecturer")}>Search by Lecturer</button>
            <button onClick={() => setSearchType("topic")}>Search by Topic</button>
</div>
            <input
                type="text"
                placeholder={searchType === "lecturer" ? "Enter a lecturer name" : "Enter a lesson topic"}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ display: "block", marginTop: "10px", width: "100%" }}></input>
           
            <button onClick={handleSearch} style={{ marginTop: "10px" }}>Search</button>
        </>
    );
}

export default LessonSearch;