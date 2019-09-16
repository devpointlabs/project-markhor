import React, { useEffect, useState, } from "react";
import axios from "../../utils/webRequests";

import { Avatar, Paper, Table, TableHead, TableRow, TableCell, TableBody, } from "@material-ui/core";

const CourseStudents = ({ courseId, }) => {
  const [users, setUsers] = useState([]);  

  useEffect( () => {
    axios.get(`/api/courses/${courseId}/course_users`)
      .then( res => {        
        setUsers(res.data.data);
      })
      .catch( err => {
        // TODO: Error Handle
        console.log(err)
      })
  }, []);

  return (
    <div>
      <br />
      <br />
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Role</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { users.map( user => {
              const { id, email, firstName, lastName, avatar, role, } = user.attributes;
              return (
                <TableRow key={id}>
                  <TableCell align="right">
                    <Avatar alt="student img" src={avatar} />
                  </TableCell>
                  <TableCell>{lastName}</TableCell>
                  <TableCell>{ firstName }</TableCell>
                  <TableCell>{email}</TableCell>
                  <TableCell>{role}</TableCell>
                </TableRow>
              )
             } )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
};

export default CourseStudents;
