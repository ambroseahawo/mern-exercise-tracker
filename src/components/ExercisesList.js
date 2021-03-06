import React, { useState, useEffect } from 'react'
import Exercise from './Exercise'
import axios from 'axios'

const ExercisesList = () => {
    const [exercises, setExercises] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/exercises/')
            .then(res => { setExercises(res.data) })
            .catch((error) => { console.log(error) })
    },[])

    const deleteExercise = (id) => {
        axios.delete('http://localhost:5000/exercises/'+id)
            .then(res => console.log(res.data));

        setExercises(exercises.filter((item) => item._id !== id))
    }

    const exerciseList = () => {
        return exercises.map(currentExercise => {
            return <Exercise exercise={ currentExercise } deleteExercise={ deleteExercise } key={ currentExercise._id }/>;
        })
    }

    return(
        <div>
            <h3>Logged Exercises</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { exerciseList() }
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList