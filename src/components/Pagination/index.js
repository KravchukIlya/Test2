import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'

import { Context } from '../../containers/App'

import './style.css'

const Pagination = () => {

    const dispatch = useDispatch()
    const { changeTable } = useContext(Context).appActions
    const { table, page, limit } = useContext(Context).table

    const pageResLength = table.length
    const pagesLength = Math.ceil(pageResLength / limit)
    const from = pagesLength <= 2 ? 0 : page == pagesLength ? pagesLength - 5 : page > pagesLength - 2 ? pagesLength - 5 : page < 5 ? 0 : page - 3
    const to = page < 5 ? 5 : page > pagesLength - 2 ? pagesLength : page + 1

    const pageItems = []
    for (let i=1; i<=pagesLength; i++) {
        pageItems.push(<div key={i} onClick={() => handleChangePage(i)}><span className={page == i ? 'selected' : ''}>{i}</span></div>)
    }

    const prevNode = page >= 5 ? (
        <>
            <div onClick={() => handleChangePage(1)}><span>1</span></div>
            <div>...</div>
        </>
    ) : null

    const nextNode = page <= pagesLength - 2 ? (
        <>
            <div>...</div>
            <div onClick={() => handleChangePage(pagesLength)}><span>{pagesLength}</span></div>
        </>
    ) : null

    const handleChangePage = page => {
        let arr = table.slice(limit*(page-1), limit*(page-1)+limit)
        dispatch(changeTable('CHANGE_PAGE', page))
        dispatch(changeTable('SLICE_TABLE_DATA', arr))
    }

    return  <div className='pagination'>
                <div onClick={() => handleChangePage(page > 1 ? page-1 : page) } >{'<--'}</div>
                { prevNode }

                { pageItems.slice(from, to) }

                { nextNode }
                <div onClick={() => handleChangePage(pagesLength <= page ? pagesLength : page+1) }>{'-->'}</div>
            </div>
}

export default Pagination
