import React, {Fragment, useState, useEffect, useCallback} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import * as contentful from "contentful";

import Course from "./Course";

const SPACE_ID = "<SPACE>";
const ACCESS_TOKEN = "<API KEY>";

const client = contentful.createClient({space: SPACE_ID, accessToken: ACCESS_TOKEN});

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [searchString, setSearchString] = useState("");

  const getCourses = useCallback (() => {
    client.getEntries({
      content_type: "courses",
      query: searchString
    }).then(response => {
      setCourses(response.items);
    }).catch(error => {
      console.log("Error occurred while fetching data");
      console.log(error);
    });
  }, [searchString]);

  useEffect(() => {
    getCourses();
  },[getCourses]);


  const onSearchInputChange = (e) => {
    if (e.target.value) setSearchString(e.target.value);
    else setSearchString("");
    getCourses();
  }

  const renderCourses = () => {
    return (
      <Fragment>
        <TextField
          style={{padding: 24}}
          id={"searchInput"}
          placeholder={"Search for Courses"}
          margin={"normal"}
          onChange={onSearchInputChange}
          value={searchString}
        />
        <Grid container spaceing={24} style={{padding: 24}}>
          {courses.map(course => {
            return (
              <Grid item xs={12} sm={6} lg={4} xl={3}>
                <Course course={course}/>
              </Grid>
            );
          })}
        </Grid>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {courses ? renderCourses() : <div>No Courses Found!</div>}
    </Fragment>
  );
};

export default CourseList;
