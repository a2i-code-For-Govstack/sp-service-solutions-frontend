import { useState, useEffect } from 'react'

// import { getForms } from "../db"
import FormCard from "../../components/FormAdmin/FormCard";
import axios from 'axios';
import FormTable from '../../components/FormAdmin/FormTable';

function Forms(){
    const [forms, setForms] = useState([])
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(true)

    // useEffect(() => {
    //     if(!localStorage.getItem('gfc-user')) return
    //     const fetchData = async () => {
    //         try{
    //             let frms = await getForms()
                
    //             setForms(frms)
    //             setLoading(false)
//         }catch(e){
    //             setLoading(false)
    //             setMsg(e.message)
    //         }
    //     }
    //     fetchData()
    // }, [])

    useEffect(() => {
        setForms([{
            "title": "trial FORM",
            "createdAt": 1720218086247,
            "fields": [
                {
                    "title": "Enter your email",
                    "type": "short-text",
                    "required": true
                },
                {
                    "title": "this is short text req",
                    "required": true,
                    "type": "short-text"
                },
                {
                    "title": "this lknlk ngfjdr kj esjkdfn srkj fkc redskjv erksg 34wlesfn lk wrjll r3wls efcwkrsj gk,n cwakej dj welkfd cwrl svdlke rsgk;l vetklis long text",
                 
                    "required": false,
                    "type": "long-text"
                },
                {
                    "title": "what is your age ",
                    "required": false,
                    "type": "number"
                },
                {
                    "title": "choose one of the following ",
                    "required": false,
                    "options": [
                        "arnav",
                        "kriti",
                        "yash",
                        "aarav"
                    ],
                    "type": "multioption-singleanswer"
                },
                {
                    "title": "this is multioption multianswer",
                    "required": false,
                    "options": [
                        "apple",
                        "ball",
                        "cat",
                        "dog"
                    ],
                    "type": "multioption-multianswer"
                },
                {
                    "title": "what is age ?",
                    "required": true,
                    "type": "number"
                },
                {
                    "title": "upload resume ",
                    "required": true,
                    "type": "file",
                    "accepted": [
                        "png",
                        "pdf",
                        "jpeg",
                        "jpg",
                        "txt"
                    ]
                }
            ],
            "endMessage": "thanks for filling",
            "expiration": "109"
        },{
            "title": "trial FORM",
            "createdAt": 1720218086247,
            "fields": [
                {
                    "title": "Enter your email",
                    "type": "short-text",
                    "required": true
                },
                {
                    "title": "this is short text req",
                    "required": true,
                    "type": "short-text"
                },
                {
                    "title": "this lknlk ngfjdr kj esjkdfn srkj fkc redskjv erksg 34wlesfn lk wrjll r3wls efcwkrsj gk,n cwakej dj welkfd cwrl svdlke rsgk;l vetklis long text",
                    "required": false,
                    "type": "long-text"
                },
                {
                    "title": "what is your age ",
                    "required": false,
                    "type": "number"
                },
                {
                    "title": "choose one of the following ",
                    "required": false,
                    "options": [
                        "arnav",
                        "kriti",
                        "yash",
                        "aarav"
                    ],
                    "type": "multioption-singleanswer"
                },
                {
                    "title": "this is multioption multianswer",
                    "required": false,
                    "options": [
                        "apple",
                        "ball",
                        "cat",
                        "dog"
                    ],
                    "type": "multioption-multianswer"
                },
                {
                    "title": "what is age ?",
                    "required": true,
                    "type": "number"
                },
                {
                    "title": "upload resume ",
                    "required": true,
                    "type": "file",
                    "accepted": [
                        "png",
                        "pdf",
                        "jpeg",
                        "jpg",
                        "txt"
                    ]
                }
            ],
            "endMessage": "thanks for filling",
            "expiration": "109"
        },{
            "title": "trial FORM",
            "createdAt": 1720218086247,
            "fields": [
                {
                    "title": "Enter your email",
                    "type": "short-text",
                    "required": true
                },
                {
                    "title": "this is short text req",
                    "required": true,
                    "type": "short-text"
                },
                {
                    "title": "this is long text",
                    "required": false,
                    "type": "long-text"
                },
                {
                    "title": "what is your age ",
                    "required": false,
                    "type": "number"
                },
                {
                    "title": "choose one of the following ",
                    "required": false,
                    "options": [
                        "arnav",
                        "kriti",
                        "yash",
                        "aarav"
                    ],
                    "type": "multioption-singleanswer"
                },
                {
                    "title": "this is multioption multianswer",
                    "required": false,
                    "options": [
                        "apple",
                        "ball",
                        "cat",
                        "dog"
                    ],
                    "type": "multioption-multianswer"
                },
                {
                    "title": "what is age ?",
                    "required": true,
                    "type": "number"
                },
                {
                    "title": "upload resume ",
                    "required": true,
                    "type": "file",
                    "accepted": [
                        "png",
                        "pdf",
                        "jpeg",
                        "jpg",
                        "txt"
                    ]
                }
            ],
            "endMessage": "thanks for filling",
            "expiration": "109"
        },{
            "title": "trial FORM",
            "createdAt": 1720218086247,
            "fields": [
                {
                    "title": "Enter your email",
                    "type": "short-text",
                    "required": true
                },
                {
                    "title": "this is short text req",
                    "required": true,
                    "type": "short-text"
                },
                {
                    "title": "this is long text",
                    "required": false,
                    "type": "long-text"
                },
                {
                    "title": "what is your age ",
                    "required": false,
                    "type": "number"
                },
                {
                    "title": "choose one of the following ",
                    "required": false,
                    "options": [
                        "arnav",
                        "kriti",
                        "yash",
                        "aarav"
                    ],
                    "type": "multioption-singleanswer"
                },
                {
                    "title": "this is multioption multianswer",
                    "required": false,
                    "options": [
                        "apple",
                        "ball",
                        "cat",
                        "dog"
                    ],
                    "type": "multioption-multianswer"
                },
                {
                    "title": "what is age ?",
                    "required": true,
                    "type": "number"
                },
                {
                    "title": "upload resume ",
                    "required": true,
                    "type": "file",
                    "accepted": [
                        "png",
                        "pdf",
                        "jpeg",
                        "jpg",
                        "txt"
                    ]
                }
            ],
            "endMessage": "thanks for filling",
            "expiration": "109"
        }])
       
    }, [])

    const [instances, setInstances] = useState([]);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (!storedToken) {
            alert('Please login to access this page.');
            // You may want to redirect to login page or handle this case differently
            return;
        }

        const config = {
            headers: {
                Authorization: `Bearer ${storedToken}`
            }
        };

        axios.get('http://localhost:8000/api/v1/live/instance', config)
            .then(response => {
                setInstances(response.data);
            })
            .catch(error => {
                console.error('Error fetching instances:', error);
                // Handle error state if needed
            });
    }, []); // Empty dependency array ensures useEffect runs once on component mount



    const onFormDelete = id => {
        setForms(forms.filter(form => form.id !== id))
    }
  
    return (
        <div>
            <h2 style={{fontWeight:400 , paddingLeft:'1.3em'}}>My Forms</h2>
            {/* {
                loading ? <p className="text-center mt-1"><span className="spinner"></span></p>
                : msg ? <h3 className="msg mt-1">{msg}</h3> 
                : (
                    <div className="cards-container">
                        { forms.length > 0 ? (
                            forms.map(form => (
                                <FormCard key={form.id} form={form} onDelete={onFormDelete} />
                            ))
                        ) : <h3 className="msg mt-1">You haven't created any forms yet</h3> }
                    </div>
                )
            } */}
            <div className="cards-container">
                        {/* { forms.length > 0 ? (
                            forms.map(form => (
                                <FormCard key={form.id} form={form} onDelete={onFormDelete} />
                            ))
                        ) : <h3 className="msg mt-1">You haven't created any forms yet</h3> } */}
                        { instances.length > 0 ? (
                            instances.map(instance => (
                                <FormCard key={instance.id} form={instance}  onDelete={onFormDelete} />
                            ))
                        ) : <h3 className="msg mt-1">You haven't created any forms yet</h3> }
                        <FormTable/>
                    </div>
        </div>
    )
}

export default Forms