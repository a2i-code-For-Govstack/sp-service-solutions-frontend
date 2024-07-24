
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import RenderReactiveForm from '../../components/FormAdmin/RenderReactiveForm';
import SelectedUserLoginPage from '../Auth/SelectedUserLoginPage';
import { fetchInstanceInfo } from '../../services/liveService';
import { fetchFormData } from '../../services/dataService';

function Fill() {
    const { hash } = useParams();
    const location = useLocation();
    const [form, setForm] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    const [instanceAuthType, setInstanceAuthType] = useState(null);
    const [instanceStatus, setInstanceStatus] = useState(null);
    const voteAccessToken = sessionStorage.getItem('voting_token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const instanceData = await fetchInstanceInfo(hash);
                setInstanceAuthType(instanceData.instance_auth_type);
                setInstanceStatus(instanceData.instance_status);

                if (instanceData.instance_status === 2) {
                    const formData = await fetchFormData(hash, voteAccessToken);
                    console.log(formData[0], "form data in fill.js");
                    setForm(formData[0]);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                if (error.response && error.response.status === 404) {
                    window.showToast('error', 'No Form on this link');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [hash, voteAccessToken]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div >
           {instanceStatus === 2 ? (
              <>  
                  {instanceAuthType === 1 ? (
                      <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
                  ) : (instanceAuthType === 2 || instanceAuthType === 4) && voteAccessToken ? (
                      <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
                  ) : (instanceAuthType === 2 || instanceAuthType === 4) ? (
                      <SelectedUserLoginPage />
                  ) : null}
              </>
          ) : (
              <p>Form is no longer accepting responses.</p>
          )}
        </div>
    );
}

export default Fill;


         // import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import RenderReactiveForm from '../../components/FormAdmin/RenderReactiveForm';
// import { expired } from '../../utils/index';
// import SelectedUserLoginPage from '../Auth/SelectedUserLoginPage';
// import {handleGoogleCallback} from '../../services/liveService';
// import {  useLocation } from 'react-router-dom';
// import { fetchInstanceInfo } from '../../services/liveService';
// function Fill() {
//     const { hash } = useParams();
//     const location = useLocation();

//     const [form, setForm] = useState(null);
   
//     const [submitted, setSubmitted] = useState(false);
//     const [loading, setLoading] = useState(true);
    
    
//     const [instanceAuthType, setInstanceAuthType] = useState(null);
//     const [instanceStatus, setInstanceStatus] = useState(null);
//     // const fun = () => {
//     //     const urlParams = new URLSearchParams(location.search);
//     //     const state = urlParams.get('state');
//     //     const code = urlParams.get('code');
//     //     alert("part1")
//     //     if (state && code) {
//     //         console.log(state , "  " , code , "fun ")
//     //         handleGoogleCallback(state, code);
//     //     }
//     // }
//     useEffect(() => {
       
//         const fetchData = async () => {
//             try {
//                 const instanceData = await fetchInstanceInfo(hash);
//                 setInstanceAuthType(instanceData.instance_auth_type);
//                 setInstanceStatus(instanceData.instance_status);

//             } catch (error) {
//                 console.error('Error fetching instance data:', error);
//                 // fun()
//             } finally {
//                 setLoading(false);
//             }
           
           
//         };
//         fetchData();
//         setForm({
//             "title": "Health Survey ",
//             "createdAt": 1720720166108,
//             "fields": [
//                 {
//                     "title": "Enter your email",
//                     "type": "short-text",
//                     "required": true
//                 },
                
// {
//     "title": "what is your name write in short text",
//     "required": true,
//     "type": "short-text"
// },
// {
//     "title": "this is long test question ?",
//     "required": false,
//     "type": "long-text"
// },
// {
//     "title": "this is for number ??",
//     "required": false,
//     "type": "number"
// },
// {
//     "title": "this is multioption single answer ",
//     "required": true,
//     "options": [
//         "a",
//         "b",
//         "cat",
//         "dog",
//         "ban"
//     ],
//     "type": "multioption-singleanswer"
// },
// {
//     "title": "multioption multianswer ",
//     "required": true,
//     "options": [
//         "opt a",
//         "opt b",
//         "opt c"
//     ],
//     "type": "multioption-multianswer"
// },
// {
//     "title": "upload file of particular type ?",
//     "required": true,
//     "type": "file",
//     "accepted": [
//         "jpg",
//         "png",
//         "jpeg",
//         "pdf",
//         "txt"
//     ]
// }
              
//             ],
//             "endMessage": "thanks for submitting ",
//             "expiration": "40"
//         });
//         setLoading(false);
//     }, [hash]);

//     console.log(form, "FORM IN FILL JS");

//     const voteAccessToken=sessionStorage.getItem('voting_token');

   


//     return (
//         <div>
//       {instanceStatus === 2 ? (
//                 <>
//                     {instanceAuthType === 1 ? (
//                         <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
//                     ) : (instanceAuthType === 2 || instanceAuthType === 4) && voteAccessToken ? (
//                         <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
//                     ) : (instanceAuthType === 2 || instanceAuthType === 4) ? (
//                         <SelectedUserLoginPage />
//                     ) : null}
//                 </>
//             ) : (
//                 <p>Form is no longer accepting responses.</p>
//             )}
//     </div>
//     );
// }

// export default Fill;



// // import React from 'react';
// // import SelectedUserLogin from '../../components/Auth/SelectedUserLogin';


// // const SelectedUserLoginPage = () => {
// //     const handleUserLogin = (email, password) => {
// //         // login(email, password);
// //         // login function
// //     };

 
    

  

// //     return (
// //         <div>
// //             <h3>User Login</h3>
// //             <SelectedUserLogin onLogin={handleUserLogin} />
         
           
// //         </div>
// //     );
// // };

// // export default SelectedUserLoginPage;

// import { useState, useEffect } from 'react';
// import { useParams, useLocation } from 'react-router-dom';
// import RenderReactiveForm from '../../components/FormAdmin/RenderReactiveForm';
// import SelectedUserLoginPage from '../Auth/SelectedUserLoginPage';
// import { fetchInstanceInfo } from '../../services/liveService';
// import {fetchFormData} from '../../services/dataService';

// function Fill() {
//     const { hash } = useParams();
//     const location = useLocation();
//     const [form, setForm] = useState(null);
//     const [submitted, setSubmitted] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [instanceAuthType, setInstanceAuthType] = useState(null);
//     const [instanceStatus, setInstanceStatus] = useState(null);
//     const voteAccessToken = sessionStorage.getItem('voting_token');

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const instanceData = await fetchInstanceInfo(hash);
//                 setInstanceAuthType(instanceData.instance_auth_type);
//                 setInstanceStatus(instanceData.instance_status);

//                 // const formData = await fetchFormData(hash, voteAccessToken);
//                 // console.log(formData[0] , "form data in fill.js")
//                 // setForm(formData[0]);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//                 if (error.response && error.response.status === 404) {
//                     window.showToast('error', 'No Form on this link');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//         fetchFormData();
//     }, [hash, voteAccessToken]);
   
//     const fetchFormData = async () => {
//         try {
//             // const instanceData = await fetchInstanceInfo(hash);
//             // setInstanceAuthType(instanceData.instance_auth_type);
//             // setInstanceStatus(instanceData.instance_status);

//             const formData = await fetchFormData(hash, voteAccessToken);
//             console.log(formData[0] , "form data in fill.js")
//             setForm(formData[0]);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             if (error.response && error.response.status === 404) {
//                 window.showToast('error', 'No Form on this link');
//             }
//         } finally {
//             setLoading(false);
//         }
//     };
//     // useEffect(() => {
     
//     //     fetchFormData();
//     // }, [hash, voteAccessToken]);
//     // console.log(form, "FORM IN FILL JS");

//     return (
//         <div>
//             {instanceStatus === 2 ? (
//                 <>  <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
//                     {/* {instanceAuthType === 1 ? (
//                         <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
//                     ) : (instanceAuthType === 2 || instanceAuthType === 4) && voteAccessToken ? (
//                         <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
//                     ) : (instanceAuthType === 2 || instanceAuthType === 4) ? (
//                         <SelectedUserLoginPage />
//                     ) : null} */}
//                 </>
//             ) : (
//                 <p>Form is no longer accepting responses.</p>
//             )}
//         </div>
//     );
// }

// export default Fill;
