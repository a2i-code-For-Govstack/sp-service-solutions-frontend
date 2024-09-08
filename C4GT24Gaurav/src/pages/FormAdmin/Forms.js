import { useState, useEffect } from 'react'

// import { getForms } from "../db"
import FormCard from "../../components/FormAdmin/FormCard";
import axios from 'axios';
import FormTable from '../../components/FormAdmin/FormTable';
import {getInstances} from '../../services/liveService'
function Forms(){
    const [forms, setForms] = useState([])
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        setForms([])
       
    }, [])

    const [instances, setInstances] = useState([]);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('token');
        if (!storedToken) {
            alert('Please login to access this page.');
            // You may want to redirect to login page or handle this case differently
            return;
        }

     

        const fetchInstances = async () => {
            try {
                const data = await getInstances();
                setInstances(data);
            } catch (error) {
                // Handle error state if needed
            }finally {
                setLoading(false);
            }
        };

        fetchInstances();
    }, []); // Empty dependency array ensures useEffect runs once on component mount



    const onFormDelete = id => {
        setForms(forms.filter(form => form.id !== id))
    }

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
            <img 
                src={`${process.env.PUBLIC_URL}/loader.gif`} 
                alt="Loading..." 
                style={{ width: '50px', height: 'auto' }} 
            />
        </div>
        );
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