import React, { useEffect, useState, } from "react";
import CourseStudents from "./CourseStudents";
import axios from "../../utils/webRequests";

import { AppBar, Box, Tab, Tabs, Typography, } from "@material-ui/core";

const CourseView = ({ id, }) => {
  const [course, setCourse] = useState({});
  const [value, setValue] = React.useState(0);

  useState( () => {
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
            <CourseStudents />
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
