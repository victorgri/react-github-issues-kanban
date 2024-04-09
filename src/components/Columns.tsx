import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Container, Row } from "react-bootstrap";
import { ColumnType } from "../types/Column";
import { Column } from "./Column";

type Props = {
  handleDragEnd: (result: DropResult) => void;
  columns: ColumnType[];

};

export const Columns: React.FC<Props> = ({handleDragEnd, columns}) => {
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <Row className="d-flex flex-nowrap gap-2">
          {columns.map(({ columnTitle, items }) => (
            <Column
              key={columnTitle}
              columnTitle={columnTitle}
              items={items}
            />
          ))}
        </Row>
      </Container>
    </DragDropContext>
  );
}