
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../../utils/index";
import MultiOptionField from "./MultiOptionField";
import FileField from "./FileField";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormGroup } from '@mui/material';
import { submitForm } from '../../services/dataService';
import { showToast } from '../../utils/index'; // assuming showToast is imported from utils
import '../../css/Create.css';
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function RenderReactiveForm({ model, onSubmitted }) {
    // console.log("instanceInfo in render reactive form", instance);
    const [fillableModel, setFillableModel] = useState(createFillableModel(model));
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
 
    const { hash } = useParams();
    const handleSubmit = async () => {
        setErr("");
        if (loading) return;

        let error = hasError(fillableModel);
        if (error) {
            window.showToast('error', 'Please fill all required fields');
            return setErr(error);
        }

        setLoading(true);
        console.log(fillableModel, "fillable model in submit handle")
        let submitableModel = createSubmitableModel(fillableModel);
        console.log(submitableModel, "submittable  model in submit handle");

        try {
            await submitForm(submitableModel, hash);
            setLoading(false);
            onSubmitted();
            window.showToast('success', 'Successfully submitted');
    } catch (e) {
            setErr(e.message);
            setLoading(false);
        }
    };
    const logoutUser = () => {
        sessionStorage.removeItem('voting_token');
        window.location.href = `/${hash}`;
    }

    // useEffect(() => {
    //     setFillableModel(createFillableModel(model))
    // }, []);

    return (
        <div className="surveyView">
            <h2 style={{color:'black', fontSize:"25px" }}>{model.title}</h2>
            <div
                 
                    style={{
                        border: "1px solid grey",
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        minWidth:300,
                        padding: "2.5em 2em 2.5em 2em",
                        background: "white",
                        borderRadius: "7px",
                        margin: "1em 0em 1em 0em",
                    }}
                >
                    <label style={{ fontWeight: "400", color: "black" }}>
                      Description
                    </label>
                    <TextField
                        style={{ marginTop: ".5em " }}
                         variant="standard"
                        multiline
                        value={model.description}
                        // placeholder=
                    />
                </div>
            {fillableModel.map((field, index) => ["short-text", "number"].indexOf(field.type) > -1 ? (
                <div
                    key={index}
                    style={{
                        border: "1px solid grey",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent:'center',
                        width: "50%",
                        minWidth:300,
                        padding: "2.5em 2em 2.5em 2em",
                        background: "white",
                        borderRadius: "7px",
                        margin: "1em 0em 1em 0em",
                    }}
                >
                    <label style={{ fontWeight: "400", color: "black" }}>
                        {field.title}
                        {field.required && <span className="err"> * </span>}
                    </label>
                    <TextField
                        style={{ marginTop: ".5em " }}
                        type={field.type === "number" ? "number" : "text"}
                        onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}
                        variant="standard"
                    />
                </div>
            ) : field.type === "long-text" ? (
                <div
                    key={index}
                    style={{
                        border: "1px solid grey",
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        minWidth:300,
                        padding: "2.5em 2em 2.5em 2em",
                        background: "white",
                        borderRadius: "7px",
                        margin: "1em 0em 1em 0em",
                    }}
                >
                    <label style={{ fontWeight: "400", color: "black" }}>
                        {field.title}
                        {field.required && <span className="err">*</span>}
                    </label>
                    <TextField
                        style={{ marginTop: ".5em " }}
                        onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}
                        variant="standard"
                        multiline
                        placeholder="long answer here"
                    />
                </div>
            ) : field.type === "multioption-singleanswer" || field.type === "multioption-multianswer" ? (
                <div
                    key={index}
                    style={{
                        border: "1px solid grey",
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        minWidth:300,
                        padding: "2em 2em 2em 2em",
                        background: "white",
                        borderRadius: "7px",
                        margin: "1em 0em 1em 0em",
                    }}
                >
                    <label
                        style={{ fontWeight: "400", color: "black", marginBottom: "1em" }}
                    >
                        {field.title}
                        {field.required && <span className="err">*</span>}
                    </label>
                    {field.type === "multioption-singleanswer" ? (
                        <FormControl component="fieldset">
                            <RadioGroup
                                name={field.title.replace(" ", "")}
                                onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}
                            >
                                {field.options.map((option, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        value={option}
                                        control={<Radio />}
                                        label={option}
                                    />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    ) : (
                        <FormControl component="fieldset">
                            <FormGroup
                                onChange={e => {
                                    const valueArray = fillableModel[index].value || [];
                                    const newValue = e.target.checked
                                        ? [...valueArray, e.target.value]
                                        : valueArray.filter(val => val !== e.target.value);
                                    updateArrOfObjState(setFillableModel, fillableModel, index, "value", newValue);
                                }}
                            >
                                {field.options.map((option, idx) => (
                                    <FormControlLabel
                                        key={idx}
                                        control={<Checkbox value={option} />}
                                        label={option}
                                    />
                                ))}
                            </FormGroup>
                        </FormControl>
                    )}
                </div>
            ) : field.type === "file" ? (
                <div
                    key={index}
                    style={{
                        border: "1px solid grey",
                        display: "flex",
                        flexDirection: "column",
                        width: "50%",
                        minWidth:300,
                        padding: "2.5em 2em 2.5em 2em",
                        background: "white",
                        borderRadius: "7px",
                        margin: "1em 0em 1em 0em",
                    }}
                >
                    <label
                        style={{ fontWeight: "400", color: "black", marginBottom: "1em" }}
                    >
                        {field.title}
                        {field.required && <span className="err">*</span>}
                    </label>
                    <Button
                        color="primary"
                        startIcon={<CloudUploadIcon />}
                        variant="contained"
                        component="label"
                    >
                        Upload File
                        <VisuallyHiddenInput
                            type="file"
                            onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.files[0])}
                        />
                    </Button>
                    {field.value && (
                        <span style={{ marginTop: "1em" }}>{field.value.name}</span>
                    )}
                </div>
            ) : null)}
            <Button
                onClick={handleSubmit}
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ marginTop: "1em" }}
            >
                Submit
            </Button>
            <Button
                onClick={logoutUser}
                variant="contained"
                color="error"
                disabled={loading}
                style={{ margin: "1em" }}
                size="small"
            >
                LogOut
            </Button>
            {err && <p style={{ color: "red" }}>{err}</p>}
        </div>
    );
}

export default RenderReactiveForm;

// import { useState } from 'react';
// import { createFillableModel, createSubmitableModel, updateArrOfObjState, hasError } from "../../utils/index";
// import MultiOptionField from "./MultiOptionField";
// import FileField from "./FileField";

// export const submitForm = (submission, formId) => alert("submitted");

// function RenderReactiveForm({ model, onSubmitted }) {
//     console.log("model in render reactive form", model);
//     const [fillableModel, setFillableModel] = useState(createFillableModel(model));
//     const [loading, setLoading] = useState(false);
//     const [err, setErr] = useState("");

//     const handleSubmit = async () => {
//         setErr("");
//         if (loading) return;

//         let error = hasError(fillableModel);
//         if (error) return setErr(error);

//         setLoading(true);

//         let submitableModel = createSubmitableModel(fillableModel);

//         try {
//             await submitForm(submitableModel, model.id);
//             setLoading(false);
//             onSubmitted();
//         } catch (e) {
//             setErr(e.message);
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="main-form mt-1">
//             {fillableModel.map((field, index) => ["short-text", "number"].indexOf(field.type) > -1 ? (
//                 <div key={index} className="input">
//                     <label>{field.title}{field.required && <span className="err">*</span>}</label>
//                     <input type={field.type === "number" ? "number" : "text"} onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)} />
//                 </div>
//             ) : field.type === "long-text" ? (
//                 <div key={index} className="input">
//                     <label>{field.title}{field.required && <span className="err">*</span>}</label>
//                     <textarea onChange={e => updateArrOfObjState(setFillableModel, fillableModel, index, "value", e.target.value)}></textarea>
//                 </div>
//             ) : field.type === "multioption-singleanswer" || field.type === "multioption-multianswer" ? (
//                 <MultiOptionField key={index} fieldModel={field} onSelected={res => updateArrOfObjState(setFillableModel, fillableModel, index, "value", res)} />
//             ) : field.type === "file" ? (
//                 <FileField key={index} fieldModel={field} onCompleted={fileName => updateArrOfObjState(setFillableModel, fillableModel, index, "value", fileName)} />
//             ) : <p key={index}>Unknown field type</p>)}
//             {err && <p className="err mb-1">{err}</p>}
//             <button className="btn" onClick={handleSubmit}>{loading ? <span className="spinner white"></span> : <span>submit</span>}</button>
//         </div>
//     );
// }

// export default RenderReactiveForm;