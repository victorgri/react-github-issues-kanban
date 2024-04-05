
import { Tasks } from "../Tasks/Tasks";
import './Board.scss';


export const Board = () => {

  return (
    <div className="container">
      <div className="todo__wrapper">
        <h1 className="todo__column--title">Todo</h1>
        <div className="todo__items">
          <Tasks /> 
        </div> 
      </div>
      <div className="inprogress__wrapper">
        <h1 className="inprogress__column--title">In Progress</h1>
        <div className="inprogress__items">
          
        </div> 
      </div>
      <div className="done__wrapper">
        <h1 className="done__column--title">Done</h1>
        <div className="done__items">
          
        </div> 
      </div>
    </div>
  )
}

export default Board
