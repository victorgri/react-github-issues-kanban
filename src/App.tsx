import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Issue } from "./types/Issue";
import { Column } from "./types/Column";

export const App = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [error, setError] = useState("");
  const [columns] = useState<Column[]>([
    { columnTitle: "ToDo", items: issues },
    { columnTitle: "In Progress", items: [] },
    { columnTitle: "Done", items: [] },
  ]);

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

    // Construct the API URL for fetching issues
    const apiUrl = `https://api.github.com/repos/${owner}/${repoName}/issues`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Failed to fetch issues");
      }
      const data = await response.json();
      setIssues(data);
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

  const startIndex = result.source.index;
  const endIndex = result.destination.index;

  const updatedIssues = Array.from(issues);

  const [removed] = updatedIssues.splice(startIndex, 1);

  updatedIssues.splice(endIndex, 0, removed);

  setIssues(updatedIssues);
};
  
  console.log(issues);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="Enter GitHub repo URL"
        />
        <button type="submit">Fetch Issues</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="column-container">
          {columns.map(({columnTitle, items}) => (
            <Droppable droppableId={columnTitle} key={columnTitle}>
              {(provided) => (
                <ul
                  className="column"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="column__title">{columnTitle}</h2>
                  {items.map((issue, index) => (
                    <Draggable
                      key={issue.id}
                      draggableId={issue.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className={`${columnTitle
                            .split(" ")
                            .join("")
                            .toLowerCase()}__task`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {issue.title}
                        </li>
                      )}
                      
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}


