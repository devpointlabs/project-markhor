import React, { useEffect, useState, } from "react";
import QuestionForm from "./questions/QuestionForm";
import axios from "../../utils/webRequests";

import { IconButton, Typography, } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const QuizBuilder = ({ id, courseId, }) => {
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);

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
      })
      .catch( err => {
        console.log(err);
      })
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.attributes.id !== id));
  };

  return (
    <div>
      <Typography variant="h4" component="h1">{ quiz.title }</Typography>
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
    </div>
  );
};

export default QuizBuilder;
