import React, { useState, } from "react";
import axios from "../../utils/webRequests";
import styled from "styled-components";

import { Button, TextField, Typography, } from "@material-ui/core";

const QuizForm = ({ courseId, setOpen, setQuizzes, }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`/api/courses/${courseId}/quizzes`, { title, description, })
      .then( res => {
        setOpen(false);
        setQuizzes(res.data.data);
      })
      .catch( err => {
        // TODO: Error Handle
        console.log(err);
      })
  };

  return (
    <Modal>
      <Typography variant="h4" component="h1">New Quiz</Typography>
      <Form onSubmit={handleSubmit}>
        <TextField
          label="Question"
          name="name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          margin="normal"
          fullWidth
          onBlur={handleSubmit}
        />
        <br />

        <TextField
          label="Description"
          multiline
          rowsMax="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}          
          margin="normal"
          variant="outlined"
          rows="5"
        />
        <br />
        <Button variant="contained" type="submit">Submit</Button>
      </Form>
    </Modal>
  );
};

const Modal = styled.div`
  background: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 50px;
  width: 500px;
  border-radius: 5px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

export default QuizForm;
