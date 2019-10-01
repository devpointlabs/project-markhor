import React, { useEffect, useState, } from "react";
import axios from "../../../utils/webRequests";
import ChoiceForm from "../choices/ChoiceForm";

import { IconButton, Paper, TextField, } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const QuestionForm = (props) => {
  const [title, setTitle] = useState("");
  const [choices, setChoices] = useState([]);

  useEffect( () => {
    setTitle(props.title);
  }, []);

  useEffect( () => {
    axios.get(`/api/questions/${props.id}/choices`)
      .then( res => {
        setChoices(res.data.data);
      })
      .catch( err => {
        // TODO: Error Handle
        console.log(err);
      })
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title !== props.title)
      axios.put(`/api/quizzes/${props.quizId}/questions/${props.id}`, { question: { title }, })
        .then( () => {
          console.log("Success");
        })
        .catch( err => {
          console.log(err);
        })
  };

  const handleDelete = () => {
    axios.delete(`/api/quizzes/${props.quizId}/questions/${props.id}`)
      .then( () => {
        props.handleDelete(props.id);
      })
      .catch( err => {
        console.log(err);
      })
  };  

  const handleAddChoice = () => {
    axios.post(`/api/questions/${props.id}/choices`)
      .then( res => {        
        setChoices([...choices, res.data.data]);
      })
      .catch( err => {
        console.log(err);
      })
  };

  const deleteChoice = (id) => setChoices(choices.filter(c => c.attributes.id !== id));

  return (
    <Paper style={{ marginTop: "25px", padding: "25px", }}>
      <form style={{ display: "flex", }}>
        <TextField        
          label="Question"        
          name="name"
          value={title}
          onChange={e => setTitle(e.target.value)}
          margin="normal"
          fullWidth
          onBlur={handleSubmit}
        />
      </form>
      <br />
      <IconButton
        size="small"
        aria-label="add"
        onClick={handleAddChoice}
      >
        <AddIcon />
      </IconButton>
      <IconButton
        size="small"
        aria-label="delete"
        onClick={handleDelete}
      >
        <DeleteIcon />
      </IconButton>
      <br />
      <br />
      <br />
      <br />
      { choices.map( (choice, i) => (
        <ChoiceForm 
          key={choice.id}
          index={i + 1} 
          { ...choice.attributes } 
          questionId={props.id} 
          setChoices={(choice) => setChoices([...choices, choice])}
          deleteChoice={deleteChoice}
        />
      ))}
    </Paper>
  );
};

export default QuestionForm;
