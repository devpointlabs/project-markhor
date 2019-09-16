import React, { useEffect, useState, } from "react";
import axios from "../utils/webRequests";
import NotFound from "./NotFound";

const CheckToken = ({ children, id, token, }) => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    axios.get(`/api/courses/${id}/verify_register_token?token=${token}`)
      .then( res => {
        setCourse(res.data.data.attributes);
      })
      .catch( err => {
        console.log(err);
      })
  }, []);

  if (course.id) {
    return children;
  } else {
    return <NotFound />
  }
};

export default CheckToken;
