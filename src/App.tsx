import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { ColumnType } from "./types/Column";
import { FormInput } from "./components/Form";
import { Columns } from "./components/Columns";
import { Container } from "react-bootstrap";

export const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");
  const [columns, setColumns] = useState<ColumnType[]>([
    { columnTitle: "ToDo", items: [] },
    { columnTitle: "In Progress", items: [] },
    { columnTitle: "Done", items: [] },
  ]);
  const [owner, setOwner] = useState("");
  const [repo, setRepo] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Regular expression for validating GitHub repo URL
    const urlRegex =
      /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

    if (!urlRegex.test(repoUrl)) {
      setError("Invalid GitHub repo URL format");
      return;
    }

    // Extract owner and repo name from the URL
    const urlParts = repoUrl.split("/");
    const owner = urlParts[3];
    const repoName = urlParts[4];
    setOwner(owner);
    setRepo(repoName);

    // Construct the API URL for fetching issues
    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/issues`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }
      const data = await response.json();
      if (data.length === 0) {
        setError("No issues found");
        return;
      }
      setColumns([
        { columnTitle: "ToDo", items: data },
        { columnTitle: "In Progress", items: [] },
        { columnTitle: "Done", items: [] },
      ]);
      console.log(data);

      setError("");
    } catch (error) {
      console.error(error);
      setError("Failed to fetch issues");
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    // Отримання початкового та кінцевого індексів переміщення
    const startIndex = source.index;
    const endIndex = destination.index;

    // Отримання джерела та призначення стовпців за їх droppableId
    const sourceColumnIndex = columns.findIndex(
      (column) => column.columnTitle === source.droppableId
    );
    const destinationColumnIndex = columns.findIndex(
      (column) => column.columnTitle === destination.droppableId
    );

    // Перевірка, чи отримані стовпці та їх індекси
    if (
      sourceColumnIndex === -1 ||
      destinationColumnIndex === -1 ||
      startIndex === endIndex
    ) {
      return;
    }

    const updatedColumns = [...columns];
    const [removed] = updatedColumns[sourceColumnIndex].items.splice(
      startIndex,
      1
    );
    updatedColumns[destinationColumnIndex].items.splice(endIndex, 0, removed);

    // Оновлення стану змінених стовпців
    setColumns(updatedColumns);
  };

  return (
    <div>
      <FormInput
        onSubmit={handleSubmit}
        repoUrl={repoUrl}
        setRepoUrl={setRepoUrl}
      />

      <Container>
        <p>{`${owner} > ${repo}`}</p>
        <p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="orange"
          >
            <path d="M8 .2l4.9 15.2L0 6h16L3.1 15.4z" />
          </svg>
        </p>
      </Container>

      {error && <p style={{ color: "red" }}>{error}</p>}
      <Columns
        handleDragEnd={handleDragEnd}
        columns={columns}
      />
    </div>
  );
};
