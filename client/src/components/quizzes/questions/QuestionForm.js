import React, { useEffect, useState, } from "react";
import axios from "../../../utils/webRequests";

import { Button, IconButton, Paper, TextField, } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const QuestionForm = (props) => {
  const [title, setTitle] = useState("");

  useEffect( () => {
    setTitle(props.title);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/api/quizzes/${props.quizId}/questions/${props.id}`, { question: { title }, })
      .then( res => {
        console.log("Success");
      })
      .catch( err => {
        console.log(err);
      })
  };

  const handleDelete = () => {
    axios.delete(`/api/quizzes/${props.quizId}/questions/${props.id}`)
      .then( res => {
        // props.setQuestions(props.id);
        props.handleDelete(props.id);
      })
      .catch( err => {
        console.log(err);
      })
  };  

  return (
    <Paper style={{ marginTop: "25px", padding: "25px" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex" }}>
        <TextField        
          label="Question"        
          name="name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          margin="normal"
          fullWidth
        />
        <Button variant="contained" type="submit">Update Quiz</Button>
      </form>
      <br />
      <hr />
      <IconButton
        size="small"
        aria-label="delete"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
    </Paper>
  );
};

export default QuestionForm;
