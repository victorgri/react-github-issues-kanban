import { Droppable } from "react-beautiful-dnd";
import { Col } from "react-bootstrap";
import { Issue } from "../types/Issue";
import { Task } from "./Task";

type Props = {
  columnTitle: string;
  items: Issue[];
};

export const Column: React.FC<Props> = ({ columnTitle, items }) => {
  return (
    <Col className="col" key={columnTitle}>
      <Droppable droppableId={columnTitle}>
        {(provided) => (
          <div
            className="column"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <h2 className="column__title">{columnTitle}</h2>
            {items.map((issue, index) => (
              <Task
                issue={issue}
                index={index}
                columnTitle={columnTitle}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </Col>
  );
};
