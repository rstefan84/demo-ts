import React from 'react'
import { ElementData } from '../model'
import { useAppDispatch } from '../hooks'

const Row: React.FC<ElementData> = ({ position, name, weight, symbol }) => {

  let dispatch = useAppDispatch()

  const handleDelete = () => {
    if (dispatch) {
      dispatch({ type: 'delete', payload: position })
    }
  }

  return (
    <tr>
      <td>{position}</td>
      <td>{name}</td>
      <td>{weight}</td>
      <td>{symbol}</td>
      <td><button onClick={handleDelete}>Delete</button></td>
    </tr>
  )
}

export default Row