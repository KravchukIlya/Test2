const axios = require('axios')

export function getTableData() {
    return async dispatch => {
        dispatch({
            type: 'GETTING_TABLE_DATA'
        })

        try {
            let fetch = await axios.get('https://api.github.com/orgs/octokit/repos')

            if(fetch.data && fetch.data[0]) {

                let titles = Object.keys(fetch.data[0]).filter(f => (typeof(fetch.data[0][f]) == 'string' && !fetch.data[0][f].includes('http')) || typeof(fetch.data[0][f]) == 'number')

                let arr = fetch.data.map(i => {
                    let obj = {}
                    titles.forEach(item => {
                        if (i[item]) obj[item] = i[item]
                            else obj[item] = ''
                    })
                    return obj
                })

                dispatch({
                    type: 'GETED_TABLE_DATA',
                    payload: arr
                })

            }
        } catch(err) {
            console.log(err)
        }
    }
}
