import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navbar from './components/Navbar.js'
import ExercisesList from './components/ExercisesList'
import CreateUsers from './components/CreateUser.js'
import EditExercises from './components/EditExercise.js'
import CreateExercises from './components/CreateExercise'

function App() {
    return (
        <Router>
                <Navbar />
            <div className="container">
                <Switch>
                    <Route path='/' exact component={ ExercisesList }></Route>
                    <Route path="/create" component={ CreateExercises }></Route>
                    <Route path="/edit/:id" component={ EditExercises }></Route>
                    <Route path="/user" component={ CreateUsers }></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App
