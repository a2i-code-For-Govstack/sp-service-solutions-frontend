// State
export const state = () => ({    
    // seeker basic resume info
    data: [],
    load_data: [],
    load_paginate_data: [],
    pagination_data: [],
    msg: ''
})

export const mutations = {
    // Add data
    ADD_DATA (state, data) {
        state.data = data.data
        state.pagination_data = data.meta
    },
    // load data
    LOAD_DATA (state, data) {
        state.load_data = data.data[0]
        state.load_paginate_data = data.meta
    },    
    // Add error message
    ERR_MSG (state, data) {
        state.msg = data
    }
}

// Actions
export const actions = {
    async GET_DATA ({ commit }, request) {
        // eslint-disable-next-line no-console
        console.log('Online Survey info data request')      
        try {
            const { data } = await this.$axios.get('/api/online-surveys' + (request['limit']>0?'/' + request['limit']:'') + (request['page']?'?page=' + request['page']:''), {
                headers: {
                    'Authorization': 'Bearer ' + request.access_token,
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': request.access_token
                }
            })
            // eslint-disable-next-line no-console
            console.log('Get data', data)
            
            if(data.data.length) {
                commit('ADD_DATA', data)
            } else {
                commit('ERR_MSG', data.msg)
            }  
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Error', err)
        }
    },

    // eslint-disable-next-line require-await
    async DATA_SUBMIT ({ commit }, request) {
        // eslint-disable-next-line no-console
        console.log('Data submit request')
        try {
            const { data } = await this.$axios.post('/api/online-surveys' + (request['action']=='update'?'/update/' + request['edit_id']:'/store'), request.data, {
                headers: {
                    'Authorization': 'Bearer ' + request.access_token,
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': request.access_token
                }
            })

            // const { data } = await this.$axios.post('/api/online-surveys' + (request['action']=='update'?'/update/' + request['edit_id']:'/store'), request.data)

            // eslint-disable-next-line no-console
            console.log('After submit get data', data)
            
            if(data.status) {
                commit('ADD_DATA', data.data)
            } else {
                commit('ERR_MSG', data.msg)
            }   
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Error', err)
        }
    },
    // eslint-disable-next-line require-await
    async LOAD_DATA ({ commit }, config) {
        // eslint-disable-next-line no-console        
        try {
          let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
    
          const { data } = await this.$axios.post('/api/load-online-survey', config, {
            headers: {
              'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
              'Content-Type': 'application/json',
              'X-XSRF-TOKEN': getTokenType.access_token
            }
          })
          // eslint-disable-next-line no-console
          console.log('Data', data.data)

        if(data.data) {
            commit('LOAD_DATA', data)
        } else {
            commit('LOAD_DATA', [])
        }
                    
        } catch (err) {
          // eslint-disable-next-line no-console
        //   console.log('Error', err)
          commit('LOAD_DATA', [])
        }
    }
}