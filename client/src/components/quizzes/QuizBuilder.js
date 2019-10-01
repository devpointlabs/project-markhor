import React, { useEffect, useState, useRef, } from "react";
import QuestionForm from "./questions/QuestionForm";
import axios from "../../utils/webRequests";

import { Button, IconButton, Typography, } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const QuizBuilder = ({ id, courseId, }) => {
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const ref = useRef();

  useEffect( () => {
    axios.get(`/api/courses/${courseId}/quizzes/${id}`)
      .then( res => {
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
        console.log(err);
      })
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.attributes.id !== id));
  };


  const publishQuiz = () => {    
    axios.put(`/api/courses/${courseId}/quizzes/${id}/publish`)
      .then( res => {
        debugger
      })
      .catch( err => {
        debugger
      })
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", }}>
        <Typography variant="h4" component="h1">{ quiz.title }</Typography>
        <Button variant="contained" onClick={publishQuiz}>Publish Quiz</Button>
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
