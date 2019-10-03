import React, { useEffect, useState, useRef, useContext, } from "react";
import QuestionForm from "./questions/QuestionForm";
import axios from "../../utils/webRequests";
import { FlashContext, } from "../../providers/FlashProvider";

import { Button, IconButton, TextField, Typography, } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const QuizBuilder = ({ id, courseId, }) => {
  const [title, setTitle] = useState("");
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const ref = useRef();
  const { setFlash, } = useContext(FlashContext);

  useEffect( () => {
    axios.get(`/api/courses/${courseId}/quizzes/${id}`)
      .then( res => {
        setTitle(res.data.quiz.data.attributes.title);
        setQuiz(res.data.quiz.data.attributes);
        setQuestions(res.data.questions.data);
      })
      .catch( err => {
        console.log(err);
      })
  }, []);

  const handleAddQuestion = () => {
    axios.post(`/api/quizzes/${quiz.id}/questions`)
      .then( res => {
        setQuestions([...questions, res.data.data])
        ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      })
      .catch( err => {
        // TODO: Error handle
        console.log(err);
      })
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.attributes.id !== id));
  };

  const publishQuiz = () => {    
    axios.put(`/api/courses/${courseId}/quizzes/${id}/publish`)
    .then( res => {
        // Not working
        setFlash("Message", "success");
        setQuiz(res.data.data.attributes);
      })
      .catch( err => {
        // TODO: Error handle
        console.log(err);
      })
  };

  const handleSubmit = () => {
    axios.put(`/api/courses/${courseId}/quizzes/${id}`, { title, })
      .then( res => {
        setQuiz(res.data.data.attributes);
      })
      .catch( err => {
        // TODO: Error handle
        console.log(err);
      })
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", }}>
        {/* <Typography variant="h4" component="h1">{ quiz.title }</Typography> */}
        <TextField
          label="Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
          required
          fullWidth
          onBlur={handleSubmit}
        />
        <Button variant="contained" onClick={publishQuiz}>
          { quiz.publishedAt ? "Unpublish Quiz" : "Publish Quiz" }
        </Button>
      </div>
      <br />
      <IconButton 
        size="small" 
        style={{ border: "1px solid grey", }} 
        aria-label="delete"
        onClick={handleAddQuestion}
      >
        <AddIcon />
      </IconButton>
      { questions.map( question => (
        <QuestionForm 
          key={question.id} 
          id={question.id}
          {...question.attributes} 
          quizId={quiz.id} 
          // setQuestions={(id) => setQuestions(questions.filter( q => q.id !== id))}
          handleDelete={handleDelete}
        />
      ))}
      <br />
      <div ref={ref} />
    </div>
  );
};

export default QuizBuilder;
