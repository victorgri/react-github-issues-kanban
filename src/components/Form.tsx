import { Button, Container, Form, FormControl, InputGroup } from "react-bootstrap";

type Props = {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>,
  repoUrl: string,
  setRepoUrl: React.Dispatch<React.SetStateAction<string>>,
};

export const FormInput: React.FC<Props> = ({onSubmit, repoUrl, setRepoUrl}) => {
  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        className="d-flex flex-row align-items-center"
      >
        <InputGroup size="lg" className="flex-grow-1 me-3">
          <FormControl
            aria-label="Large"
            aria-describedby="inputGroup-sizing-sm"
            type="text"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            placeholder="Enter GitHub repo URL"
          />
        </InputGroup>

        <Button type="submit" variant="dark">
          Load Issues
        </Button>
      </Form>
    </Container>
  );
}