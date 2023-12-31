import React, { useEffect, useState } from 'react'
import { ElementDataList } from '../model'
import Row from './Row'
import { Link, useLocation } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../hooks'

export interface ElementsViewProps {
  elements: ElementDataList,
  currentPage?: number,
  showPerPage: number,
}

function useQuery() {
  const { search } = useLocation()

  return new URLSearchParams(search);
}

const ElementsView: React.FC<ElementsViewProps> = ({ elements, currentPage = 1, showPerPage }) => {

  let query = useQuery()
  let pageAsString = query.get('page')

  let [page, setPage] = useState(1)
  let dispatch = useAppDispatch()
  let stateElements = useAppSelector(state => state.elementsReducer.elements)
  let sortType = useAppSelector(state => state.elementsReducer.sortType)

  useEffect(() => {
    if (pageAsString) {
      setPage(parseInt(pageAsString))
    } else {
      setPage(currentPage)
    }
    dispatch({ type: 'init', payload: elements })
  }, [currentPage, pageAsString, dispatch, elements])

  let startIndex = (page - 1) * showPerPage
  let endIndex = startIndex + showPerPage;

  const rowsElements = [...stateElements].sort(sortType.fn).slice(startIndex, endIndex);

  let rows = rowsElements.map(element =>
    <Row key={element.position} {...element} />
  )

  const onPageUp = () => setPage(p => p + 1)
  const onPageDown = () => setPage(p => p - 1)
  const handleSort = () => dispatch({ type: 'sort' })

  return (
    <div>
      <h2>Element Data List</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>#&nbsp;<button onClick={handleSort}>{sortType.text}</button></th>
            <th>Name</th>
            <th>Weight</th>
            <th>Symbol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
        <tfoot>
          <tr>
            <td><button onClick={onPageDown}>&lt;</button></td>
            <td colSpan={3}>Current Page: {page}&nbsp;|&nbsp;
              <Link to="/?page=1">Page 1</Link>&nbsp;|&nbsp;
              <Link to="/?page=2">Page 2</Link>&nbsp;|&nbsp;
              <Link to="/?page=3">Page 3</Link>&nbsp;|&nbsp;
            </td>
            <td colSpan={2} align='right'><button onClick={onPageUp}>&gt;</button></td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default ElementsView