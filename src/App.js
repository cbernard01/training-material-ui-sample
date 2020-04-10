import React, {Fragment} from 'react';
import './App.css';

import NavBar from "./components/NavBar";
import CourseList from "./components/CourseList";

const App = () => {
  return (
    <Fragment>
      <NavBar/>
      <CourseList/>
    </Fragment>
  );
}

export default App;
