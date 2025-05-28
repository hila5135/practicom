type SubjectsListProps = {
    titles: string[];
    isLoading: boolean;
};

function LessonsTitle({ titles, isLoading }: SubjectsListProps) {
    return (
        <div style={{ padding: "20px", backgroundColor: "#f4f6f8", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#333", marginBottom: "15px" }}>Available Subjects:</h3>
            {isLoading ? (
                <p style={{ fontSize: "18px", color: "#777" }}>Loading...</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {titles.map((title, index) => (
                        <li key={index} style={{ padding: "10px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", marginBottom: "10px" }}>
                            {title}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LessonsTitle;
