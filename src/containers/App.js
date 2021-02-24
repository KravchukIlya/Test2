import React, { useState, useEffect, useContext } from 'react'
import { connect, useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as apiActions from '../actions/ApiActions'
import * as appActions from '../actions/AppActions'

import Pagination from '../components/Pagination'

import './style.css';

export const Context = React.createContext()

const App = props => {

    const { data, table, limit, page } = props.table

    const dispatch = useDispatch()

    const [search, setSearch] = useState('')

    useEffect(() => {
        const { getTableData } = apiActions
        dispatch(getTableData())
    }, [])

    useEffect(() => {
        const { changeTable } = appActions
        let filtered = table.slice(limit*(page-1), limit*(page-1)+limit)
        if (search != '') {
            filtered = filtered.filter(f => {
                let str = ''
                for (let i in f) {
                    str += '_'+f[i]
                }

                if (str.toLowerCase().includes(search.toLowerCase())) return f
            })
        }
        
        dispatch(changeTable('SLICE_TABLE_DATA', filtered))
    }, [search])

    let titles = [], items = []

    for (let i=0;i<=data.length-1;i++) {
        if (!i) titles = Object.keys(data[i]).map((o, oIdx) => <span key={oIdx}>{o}</span>)

        items.push(
            <div key={i} className='app__table_item'>
                {Object.values(data[i]).map((v, vIdx) => <span title={v} key={vIdx}>{v}</span>)}
            </div>
        )
    }

    return  <Context.Provider value={{...props}}>
                <div className='app'>
                    {props.table.loader ?
                        <div className='app__loader'>Loading...</div>
                        :
                        <>
                            <header className='app__header'>
                                <div className='app__header_search'>
                                    <input type='text' value={search} onChange={e => setSearch(e.target.value)} placeholder='Search' />
                                </div>
                                <Pagination />
                            </header>
                            <div className='app__table'>
                                <div className='app__table_title'>
                                    { titles }
                                </div>
                                { items }
                            </div>
                            <footer className='app__footer'>
                                footer
                            </footer>
                        </>
                    }
                </div>
            </Context.Provider>
}

const mapDispatchToProps = (dispatch) => {
    return {
        apiActions: bindActionCreators(apiActions, dispatch),
        appActions: bindActionCreators(appActions, dispatch)
    }
}

const mapStateToProps = (state) => {
    return state
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
