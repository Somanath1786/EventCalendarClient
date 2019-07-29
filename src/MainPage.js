import React from "react";
import { BrowserRouter as Router, Route} from 'react-router-dom'
import EventCalendar from './Calendar';
import FHLCalendar from "./FHLCalendar";
import EnDFunCalendar from "./EnDFunEvents";
import SummerOfOneCalendar from "./SummerOfOne";
import Home from "./Home";

class MainPage extends React.Component {
  render()
  {
    return (
        <Router>
        <div>
          <Route exact path="/" component = {Home} />
          <Route exact path="/GiveCalendar" component = {EventCalendar} />
          <Route exact path="/FHLCalendar" component = {FHLCalendar} />
          <Route exact path="/EnDFunEvents" component = {EnDFunCalendar} />
          <Route exact path="/SummerOfOne" component = {SummerOfOneCalendar} />
        </div>
      </Router>

    );
  }
}

export default MainPage;