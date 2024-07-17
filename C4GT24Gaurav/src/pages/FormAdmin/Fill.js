import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RenderReactiveForm from '../../components/FormAdmin/RenderReactiveForm';
import { expired } from '../../utils/index';
import SelectedUserLoginPage from '../Auth/SelectedUserLoginPage';
import { fetchInstanceInfo } from '../../services/liveService';

function Fill() {
    const { hash } = useParams();

    const [form, setForm] = useState(null);
   
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);
    
 
    
    const [instanceAuthType, setInstanceAuthType] = useState(null);
    const [instanceStatus, setInstanceStatus] = useState(null);

    useEffect(() => {
       
        const fetchData = async () => {
            try {
                const instanceData = await fetchInstanceInfo(hash);
                setInstanceAuthType(instanceData.instance_auth_type);
                setInstanceStatus(instanceData.instance_status);

                // Prepare form data based on instance status or other conditions
                // For instance_status === 2 and instance_auth_type === 1, prepare form
                // if (instanceStatus === 2 && instanceAuthType === 1) {
                
                // }
            } catch (error) {
                console.error('Error fetching instance data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
        setForm({
            "title": "Health Survey ",
            "createdAt": 1720720166108,
            "fields": [
                {
                    "title": "Enter your email",
                    "type": "short-text",
                    "required": true
                },
                
{
    "title": "what is your name write in short text",
    "required": true,
    "type": "short-text"
},
{
    "title": "this is long test question ?",
    "required": false,
    "type": "long-text"
},
{
    "title": "this is for number ??",
    "required": false,
    "type": "number"
},
{
    "title": "this is multioption single answer ",
    "required": true,
    "options": [
        "a",
        "b",
        "cat",
        "dog",
        "ban"
    ],
    "type": "multioption-singleanswer"
},
{
    "title": "multioption multianswer ",
    "required": true,
    "options": [
        "opt a",
        "opt b",
        "opt c"
    ],
    "type": "multioption-multianswer"
},
{
    "title": "upload file of particular type ?",
    "required": true,
    "type": "file",
    "accepted": [
        "jpg",
        "png",
        "jpeg",
        "pdf",
        "txt"
    ]
}
              
            ],
            "endMessage": "thanks for submitting ",
            "expiration": "40"
        });
        setLoading(false);
    }, [hash]);

    console.log(form, "FORM IN FILL JS");

    return (
        <div>
        {instanceStatus === 2 ? (
            instanceAuthType === 1 ? (
                <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
            ) : (
                <SelectedUserLoginPage />
            )
        ) : (
            <p>Form is no longer accepting responses.</p>
        )}
    </div>
    );
}

export default Fill;



// import React from 'react';
// import SelectedUserLogin from '../../components/Auth/SelectedUserLogin';


// const SelectedUserLoginPage = () => {
//     const handleUserLogin = (email, password) => {
//         // login(email, password);
//         // login function
//     };

 
    

  

//     return (
//         <div>
//             <h3>User Login</h3>
//             <SelectedUserLogin onLogin={handleUserLogin} />
         
           
//         </div>
//     );
// };

// export default SelectedUserLoginPage;
