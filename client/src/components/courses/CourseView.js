import React, { useEffect, useState, useContext, } from "react";
import CourseStudents from "./CourseStudents";
import EnrollmentLink from "./EnrollmentLink";
import axios from "../../utils/webRequests";
import { AuthContext, } from "../../providers/AuthProvider";

import { AppBar, Button, Box, Tab, Tabs, Typography, } from "@material-ui/core";

const CourseView = ({ id, }) => {
  const [course, setCourse] = useState({});
  const [value, setValue] = React.useState(0);
  const [showForm, setShowForm] = useState(false);
  const { state: { user: { admin, }, } } = useContext(AuthContext);

  useEffect( () => {
    axios.get(`/api/courses/${id}`)
      .then( res => {
        setCourse(res.data.data.attributes);
      })
      .catch( err => {
        // TODO: Error handle
        console.log(err);
      })
  }, []);

  const handleChange = (e, newValue) => {
    setValue(newValue);
  }

  return (
    <div>
      <Typography variant="h4" component="h1">
        { course.name }

        <br />
        <br />

        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Quizzes" {...a11yProps(0)} />
            <Tab label="Students" {...a11yProps(1)} />
            <Tab label="Settings" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
            Quizzes
        </TabPanel>
          <TabPanel value={value} index={1}>
            { admin &&
              <Button
                variant="contained"
                onClick={() => setShowForm(!showForm)}
              >
                { showForm ? "Show Students" : "Enroll Students" }
              </Button>
            }
            { value === 1 && !showForm && <CourseStudents courseId={id} /> }
            { showForm && 
              <EnrollmentLink courseId={id} />           
            }
        </TabPanel>
          <TabPanel value={value} index={2}>
            Settings
        </TabPanel>
      </Typography>
    </div>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

const a11yProps = (index) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

export default CourseView;
