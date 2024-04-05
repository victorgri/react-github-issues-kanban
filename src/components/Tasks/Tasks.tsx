import { useEffect, useState } from "react";
import Task from "../../Task/Task";
import './Tasks.scss';


export const Tasks = () => {
  const [issues, setIssues] = useState([""]);

  useEffect(() => {
    fetch("https://api.github.com/repos/facebook/react/issues")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.labels);
        
        setIssues(data.map((d) => d.body));
      })
      .catch((error) => {
        console.error(
          "There was a problem with your fetch operation:",
          error
        );
      });
  }, []);

  return (
    <div className="tasks">
      {issues.filter(issue => issue !== null).map(issue => (
        <Task key={issue} title={issue} />
      ))}
    </div>
  )
}

