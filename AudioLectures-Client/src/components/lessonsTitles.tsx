type SubjectsListProps = {
    titles: string[];
    isLoading: boolean;
};

function LessonsTitle({ titles, isLoading }: SubjectsListProps) {
    return (
        <div style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
            <h3>Available Subjects:</h3>
            {isLoading ? <p>Loading...</p> : (
                <ul>
                    {titles.map((title, index) => (
                        <li key={index}>{title}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LessonsTitle;