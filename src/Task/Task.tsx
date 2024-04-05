import './Task.scss';
type Props = {
  title: string,
};

export const Task: React.FC<Props> = ({title}) => {


  return (
    <p className="task">{title}</p>
  )
}

export default Task
