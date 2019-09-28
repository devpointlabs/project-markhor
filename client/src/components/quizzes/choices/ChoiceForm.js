import React, { useEffect, useState, } from "react";
import axios from "../../../utils/webRequests";
import styled from "styled-components";

import { Checkbox, IconButton, TextField, } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';

const ChoiceForm = (props) => {
  const [answer, setAnswer] = useState("");
  const [correct, setCorrect] = useState(false);

  useEffect( () => {
    setAnswer(props.answer);
    setCorrect(props.correct);
  }, []);

  const handleTextField = (e) => {
    e.preventDefault();
    if (answer !== props.answer || correct !== props.correct)
      axios.put(`/api/questions/${props.questionId}/choices/${props.id}`, { answer, correct })
      .then( res => {
        // NOTE: Adding this line adds an additional choice to the array (not the db)
        // props.setChoices(res.data.data);
      })
      .catch( err => {
        // TODO: Error handling 
        console.log(err);
      })
  };

  const handleCheckbox = (e) => {
    setCorrect(e.target.checked);    
    axios.put(`/api/questions/${props.questionId}/choices/${props.id}`, { answer, correct: !correct, })
      .then( res => {
        // NOTE: Adding this line adds an additional choice to the array (not the db)
        // props.setChoices(res.data.data);
      })
      .catch( err => {
        // TODO: Error handling 
        console.log(err);
      })
  };

  const handleDelete = () => {
    axios.delete(`/api/questions/${props.questionId}/choices/${props.id}`)
      .then( () => {
        props.deleteChoice(props.id);
      })
      .catch( err => {
        // TODO: Error Handle
        console.log(err);
      })
  };

  return (
    <div>
      <form style={{ display: "flex", }}>
        <TextField
          label={`Choice ${props.index}`}
          style={{ margin: 8, }}
          placeholder={`Choice ${props.index}`}       
          fullWidth
          margin="normal"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onBlur={handleTextField}
        />
        <StyledCheckbox
          checked={correct}
          color="default"
          value={correct}
          onChange={handleCheckbox}
        />
        <StyledIconButton aria-label="delete" onClick={handleDelete}>
          <DeleteIcon />
        </StyledIconButton>
      </form>
    </div>
  );
};

const StyledCheckbox = styled(Checkbox)`
  &:hover {
    background-color: white !important;
  }
`;

const StyledIconButton = styled(IconButton)`
  &:hover {
    background-color: white !important;

    & > span {
      color: rgba(0, 0, 0, 0.28) !important;
      transition: color 0.3s ease;
    }
  }
`;

export default ChoiceForm;
