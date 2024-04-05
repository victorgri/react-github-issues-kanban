import { Button, Stack } from 'react-bootstrap';
import './Search.scss';

export const Search = () => {


  return (
    <Stack direction="horizontal" gap={5} className="search w-100">
      <input className="search__input" type="text" placeholder="Enter repo URL"/>
      <Button variant="primary" className='w-20'>Load issues</Button>
    </Stack>
  );
}


