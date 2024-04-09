export type  Issue = {
  id: number;
  title: string;
  body: string;
  user: {
    login: string;
    id: number;
  };
  state: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  assignee: {
    login: string;
    id: number;
  } | null;
  labels: Label[],
}

type Label = {
  color: string
}