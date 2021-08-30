import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

const EditExercises = (props) => {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
      axios.get('http://localhost:5000/exercises/'+props.match.params.id)
        .then(res => {
          setUsername(res.data.username)
          setDescription(res.data.description)
          setDuration(res.data.duration)
          setDate(new Date(res.data.date))
        }).catch(function(error) { console.log(error) })

      axios.get('http://localhost:5000/users/')
        .then(response => {
          setUsers(response.data.map(user => user.username))
        }).catch((error) => { console.log(error) })
    }, [props.match.params.id])

    const onChangeDate = (date) => {
      setDate(date)
    }

    const onSubmit = (e) => {
      e.preventDefault();

      const exercise = {
        username: username,
        description: description,
        duration: duration,
        date: date,
      };

      console.log(exercise);

      axios.post('http://localhost:5000/exercises/update/'+props.match.params.id, exercise)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))
      
      window.location = '/';
    }

    return(
      <div>
          <h3>Edit Exercise Log</h3>
          <form onSubmit={ onSubmit }>
              <div className="form-group">
                  <label>Username: </label>
                  <select name="username" required className="form-control" useref="userInput" value={ username } onChange={ (e) => { setUsername(e.target.value) }}>
                      { users.map(function(user) {
                          return <option key={ user } value={ user }>{ user }</option>
                      })}
                  </select>
              </div>
              <div className="form-group">
                  <label>Description: </label>
                  <input type="text" name="description" required className="form-control" value={ description } onChange={ (e) => { setDescription(e.target.value) }}/>
              </div>
              <div className="form-group">
                  <label>Duration (in minutes): </label>
                  <input type="text" name="duration" className="form-control" value={ duration } onChange={ (e) => { setDuration(e.target.value) }}/>
              </div>
              <div className="form-group">
                  <label>Date: </label>
                  <div><DatePicker selected={ date } onChange={ onChangeDate }/></div>
              </div>
              <div className="form-group" style={{ marginTop: "15px"}}>
                  <input type="submit" value="Create Exercise Log" className="btn btn-primary"/>
              </div>
          </form>
      </div>
    )
}

export default EditExercises