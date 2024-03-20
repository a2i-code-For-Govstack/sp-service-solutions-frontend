// State
export const state = () => ({
    dashboard: {
        'name': 'Dashboard',
        'prefix': 'dashboard'
    },
    outh_token_name: 'oauth_token',
    // content type list
    dashboard_featured_list: {
        'Collection Types': {
            1: {
                name: 'Opinion Polls',
                path: '/dashboard/opinion-polls',
                route: 'dashboard-opinion-polls',
                icon: '<i class="fa fa-poll"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            2: {
                name: 'Online Surveys',
                path: '/dashboard/online-surveys',
                route: 'dashboard-online-surveys',
                icon: '<i class="fa fa-chart-pie"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },            
            3: {
                name: 'Comments Management',
                path: '/dashboard/comments-management',
                route: 'dashboard-comments-management',
                icon: '<i class="far fa-comments"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            4: {
                name: 'Media Gallery',
                path: '/dashboard/media-galleries',
                route: 'dashboard-media-galleries',
                icon: '<i class="fa fa-images"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        },
        'Components': {
            5: {
                name: 'Categories',
                path: '/dashboard/categories',
                route: 'dashboard-categories',
                icon: '<i class="fa fa-bars"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },            
            6: {
                name: 'Domain List',
                path: '/dashboard/domain-list',
                route: 'dashboard-domain-list',
                icon: '<i class="fa fa-bars"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            7: {
                name: 'Domain Groups',
                path: '/dashboard/domain-groups',
                route: 'dashboard-domain-groups',
                icon: '<i class="fa fa-bars"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            8: {
                name: 'Domain Access Credentials',
                path: '/dashboard/domain-access-credentials',
                route: 'dashboard-domain-access-credentials',
                icon: '<i class="fa fa-bars"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            9: {
                name: 'Flag Report Types',
                path: '/dashboard/flag-report-types',
                route: 'dashboard-flag-report-types',
                icon: '<i class="far fa-flag"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            // 8: {
            //     name: 'Tags',
            //     path: '/dashboard/tags',
            //     route: 'dashboard-tags',
            //     icon: '<i class="fa fa-tags"></i>',
            //     position: 'dashboard-left-nav',
            //     onClick: 'page'
            // }
            45: {
                name: 'Basic Configuration',
                path: '/dashboard/basic-configuration',
                route: 'dashboard-basic-configuration',
                icon: '<i class="fa fa-cogs"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        },
        'Generals': {
            10: {
                name: 'Admin User Roles',
                path: '/dashboard/admin-user-roles',
                route: 'dashboard-admin-user-roles',
                icon: '<i class="fa fa-list"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            11: {
                name: 'Admin Users',
                path: '/dashboard/admin-users',
                route: 'dashboard-admin-users',
                icon: '<i class="fa fa-users"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            50: {
                name: 'Pre Define Message',
                path: '/dashboard/pre-define-message',
                route: 'dashboard-pre-define-message',
                icon: '<i class="fa fa-list"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        },
        'Configuration': {
            12: {
                name: 'SMTP Setup',
                path: '/dashboard/smtp-setup',
                route: 'dashboard-smtp-setup',
                icon: '<i class="fa fa-cogs"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
        }
    },
    
    // Comment type list
    comment_type_list: {
        1: {
            id: 2,
            title: 'জিজ্ঞাস্য',
            image: '',
            icon: 'fa fa-comment',
            external_url: '',
            flag: false,
            status: true
        },
        2: {
            id: 1,
            title: 'মতামত',
            image: '',
            icon: 'fa fa-comment',
            external_url: '',
            flag: false,
            status: true
        },        
        3: {
            id: 3,
            title: 'পরামর্শ',
            image: '',
            icon: 'fa fa-comment',
            flag: false,
            status: true
        },
        4: {
            id: 4,
            title: 'অভিযোগ',
            // image: process.env.BASE_URL + '/grs-logo.png',
            image: '/grs-logo.png',
            icon: 'fa fa-comment',
            external_url: 'http://grs.gov.bd/complainWithoutLogin.do',
            flag: false,
            status: true
        },
        5: {
            id: 10,
            title: 'ফ্ল্যাগ রিপোর্ট',
            image: '',
            icon: 'fa fa-flag',
            external_url: '',
            flag: true,
            status: false
        }
    },

    // Get role access 
    user_role_access: {},

    // Get feature access list
    feature_access_list: '',

    // site basic config data
    site_basic_config_data: {},

    // form action status
    add_new_status: false,
    form_submit_status: false,
    auth_form_open_status: false,
    auth_req_from_others: false, 

    // search data info
    search_keyword: ''
  })

  export const mutations = {
    // Basic config data
    BASIC_CONFIG_DATA (state, data) {
        state.site_basic_config_data = data.site_basic_config_data
    },
    // Get user data
    USER_ROLE_ACCESS (state, data) {
        state.user_role_access = data
    },
    // Get feature access list by role list
    FEATURE_ACCESS_LIST (state) {
        let arr = {};
        /*for (var access_id in state.user_role_access) {
            arr[access_id] = state.dashboard_featured_list[access_id];
        }*/
        console.log('Get user role access', state.user_role_access)
        state.user_role_access.forEach(v => {
            arr[v.feature_id] = v
        });

        state.feature_access_list = arr
    },
    // Get form action status
    ADD_NEW_STATUS (state, status) {
        state.add_new_status = status
    },
    FORM_SUBMIT_STATUS (state, status) {
        state.form_submit_status = status
    },
    SERACH_STATUS(state, data) {
        state.search_keyword = data        
    },
    AUTH_FORM_OPEN_STATUS(state, status) {
        state.auth_form_open_status = status
    },
    AUTH_REQ_FROM_STATUS(state, status) {
        state.auth_req_from_others = status
    }
  }
  
  // Actions
  export const actions = {
    // eslint-disable-next-line require-await
    // async nuxtServerInit ({ dispatch }) {
    //   // eslint-disable-next-line no-console
    //   // console.log('Testing')
    //   const res = dispatch('oauth_token/GET_TOKEN_INFO')
    //   return res
    // }
    async GET_BASIC_CONFIG_INFO ({ commit }, getTokenType) {
        // eslint-disable-next-line no-console
        // console.log('Basic configuration info data request', getTokenType)
        let headerObj = {
            headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getTokenType.access_token
            }
        }
        // console.log('header object', headerObj)
        try {
            // let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            const { data } = await this.$axios.get('/api/basic-config', headerObj)
            // eslint-disable-next-line no-console
            console.log('Get data', data)
            
            commit('BASIC_CONFIG_DATA', data.data)
        } catch (err) {
            // eslint-disable-next-line no-console
            console.log('Error', err.message)
        }
    },
  }  