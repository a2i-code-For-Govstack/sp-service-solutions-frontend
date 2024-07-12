import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import RenderReactiveForm from '../../components/FormAdmin/RenderReactiveForm';
import { expired } from '../../utils/index';

function Fill() {
    const { id } = useParams();

    const [form, setForm] = useState(null);
    const [msg, setMsg] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
    }, []);

    console.log(form, "FORM IN FILL JS");

    return (
        <div>
            {/* <h3>{form ? form.title : "Fill in the form"}</h3> */}
            {
                loading ? <p className="text-center mt-1"><span className="spinner"></span></p>
                    : msg ? <h3 className="msg mt-1">{msg}</h3>
                        : submitted ? <h3 className="msg mt-1">{form ? (form.endMessage || "Thank you for submitting the form") : "Unknown state"}</h3>
                            : form ? expired() ? <h3 className="msg mt-1">This form has been expired</h3>
                                : <RenderReactiveForm model={form} onSubmitted={() => setSubmitted(true)} />
                                : <h3 className="msg mt-1">Form not found</h3>
            }
        </div>
    );
}

export default Fill;
