import React, { useContext } from 'react'
import { ElementData } from '../model'
import { DispatchContext } from '../reducer'

const Row: React.FC<ElementData> = ({ position, name, weight, symbol }) => {

  let dispatch = useContext(DispatchContext)

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