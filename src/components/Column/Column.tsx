import { useEffect, useState } from 'react';
import './Column.scss';
import { Tasks } from '../Tasks/Tasks';

export const Column = ({ title }) => {


  return (
    <div className="column">
      <h3 className="column__title">{title}</h3>
      <Tasks />
    </div>
  );
}

