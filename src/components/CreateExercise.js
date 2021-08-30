import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"

const CreateExercises = () => {
    const [username, setUsername] = useState('')
    const [description, setDescription] = useState('')
    const [duration, setDuration] = useState(0)
    const [date, setDate] = useState(new Date())
    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                if (res.data.length > 0){
                    setUsers(res.data.map(user => user.username))
                    setUsername(res.data[0].username)
                }
            })
    }, [])

    // const handleOnChange = (e) => {
    //     const { name, value } = e.target
    //     set`${name}`(value)

    //     this.setState({ [name]: value })
    // }

    const onChangeDate = (date) => {
        setDate(date)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))


        window.location = '/'
    }

    return(
        <div>
            <h3>Create New Exercise</h3>
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

export default CreateExercises