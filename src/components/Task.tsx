import { Draggable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import { Issue } from "../types/Issue";

type Props = {
  issue: Issue,
  index: number,
  columnTitle: string,
}

export const Task:React.FC<Props> = ({issue, index, columnTitle}) => {
  return (
    <Draggable key={issue.id} draggableId={issue.id.toString()} index={index}>
      {(provided) => (
        <Card>
          <li
            className={`${columnTitle.split(" ").join("").toLowerCase()}__task`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {issue.title}
          </li>
        </Card>
      )}
    </Draggable>
  );
}