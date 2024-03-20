export const state = () => ({
    // oauth token
    data: []
  })
  
  export const mutations = {
    // Get Token
    ADD_TOKEN (state, data) {
      state.data.push(data)
    },
    // Resetn Token
    RESET_TOKEN (state) {
      state.data = []
    }
  }
  
  export const actions = {
    // eslint-disable-next-line require-await
    async GET_TOKEN_INFO ({ commit }) {
      console.log('Request for oauth token')
      try {
        const { data } = await this.$axios.post('/oauth/token', {
          'grant_type': 'client_credentials',
          'client_id': process.env.API_CLIENT_ID,
          'client_secret': process.env.API_CLIENT_SECRET
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        // eslint-disable-next-line no-console
        // console.log('Data', data)
        commit('ADD_TOKEN', data)
      } catch (err) {
        // eslint-disable-next-line no-console
        // console.log('Error', err)
        commit('RESET_TOKEN')
      }
    }
  }
    