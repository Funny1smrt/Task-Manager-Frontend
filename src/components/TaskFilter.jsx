function TaskFilter({ filter, setFilter }) {
    return (
        <select
            name="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
        >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
        </select>
    );
}

export default TaskFilter;
