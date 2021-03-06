import React from 'react'
import { Link } from 'react-router-dom'
import { GrEdit } from 'react-icons/gr'
import { RiDeleteBin5Line } from 'react-icons/ri'

const Exercise = (props) => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to={ "/edit/"+props.exercise._id }><GrEdit/></Link> | <RiDeleteBin5Line style={{ cursor: "pointer"}} onClick={() => { props.deleteExercise(props.exercise._id) }}/>
            </td>
        </tr>
    )
}

export default Exercise