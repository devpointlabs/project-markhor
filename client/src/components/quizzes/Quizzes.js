import React, { useContext, useEffect, useState, } from "react";
import axios from "../../utils/webRequests";
import QuizForm from "./QuizForm";
import { Link, } from "@reach/router";
import { AuthContext, } from "../../providers/AuthProvider";

import { Button, Card, CardActions, CardContent, Modal, Typography, } from "@material-ui/core";

const Quizzes = ({ courseId, }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [open, setOpen] = useState(false);
  const { state: { user, }, } = useContext(AuthContext);

  useEffect( () => {
    axios.get(`/api/courses/${courseId}/quizzes`)
      .then( res => {
        setQuizzes(res.data.data);
      })
      .catch( err => {
        // TODO: Handle Errors
        console.log(err);
      })
  }, []);

  return (
    <div>
      { user.admin && <Button variant="contained" onClick={() => setOpen(true)}>New Quiz</Button> }
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={() => setOpen(false)}
      >
        <QuizForm 
          setOpen={setOpen} 
          courseId={courseId} 
          setQuizzes={quiz => setQuizzes([quiz, ...quizzes])} 
        />
      </Modal>
      {
        quizzes.map( quiz => {
          const { id, title, description, } = quiz.attributes;
          return (
            <Card key={id} style={{ marginTop: "20px", }}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  { title }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  { description }
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  Take Quiz
                </Button>
                <Button size="small" color="primary">
                  See Results
                </Button>
                <Link to={`/admin/courses/${courseId}/quizzes/${quiz.id}`}>
                  <Button size="small" color="primary">
                    Edit Quiz
                  </Button>
                </Link>
              </CardActions>
            </Card>
          );
        })
      }
    </div>
  );
};

export default Quizzes;
 