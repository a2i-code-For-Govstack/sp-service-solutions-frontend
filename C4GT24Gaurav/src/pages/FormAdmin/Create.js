import { useState } from "react";
// import { useHistory } from "react-router-dom"
import AddFieldModal from "../../components/FormAdmin/AddFieldModal";
import RenderPlainForm from "../../components/FormAdmin/RenderPlainForm";
import { useParams } from 'react-router-dom';
import { updateObjState } from "../../utils/index";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import axios from 'axios';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { updateInstance, fetchInstanceData } from '../../services/liveService';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import VotersTable from "../../components/FormAdmin/VotersTable";
import UsersFileUpload from "../../components/FormAdmin/UsersFileUpload";
// import Button from '@mui/material/Button';
// import { createForm as saveForm } from "../db"

function Create() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  // const history = useHistory()

  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLoginRedirect = () => {
    window.location.href = '/creator-login';
  };


  const openAddModal = (inputType) => {
    setShowAddModal(true);
    setInputType(inputType);
  };

  const [formModel, setFormModel] = useState({
    title: "",
    createdAt: +new Date(),
    fields: [
      {
        title: "Enter your email",
        type: "short-text",
        required: true,
      },
    ],
    endMessage: "",
    expiration: "",
  });

  const addFieldToFormModel = (field) => {
    let _model = Object.assign({}, formModel);
    _model.fields.push(field);
    setFormModel(_model);
  };

  const inputTypes = [
    "short-text",
    "long-text",
    "number",
    "multioption-singleanswer",
    "multioption-multianswer",
    "file",
  ];
  const { hash } = useParams();
  const [instanceModel, setInstanceModel] = useState({
    title: '',
    description: '',
    instanceAuthType: 1,
    instanceStatus: 1,
    createdAt: '',
  });
  const updateObjState = (setState, state, key, value) => {
    setState({
      ...state,
      [key]: value,
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionStorage.getItem('token')) {
          alert('Please login');
          return;
        }

        const data = await fetchInstanceData(hash);
        setInstanceModel({
          title: data.name,
          description: data.description,
          instanceAuthType: data.instance_auth_type,
          instanceStatus: data.instance_status,
          createdAt: data.created_at.split('T')[0], // Extract date part
        });
      } catch (error) {
        console.error('Error fetching instance data:', error);
      }
    };

    fetchData();
  }, [hash]);
 

  const handleChangeAuthType = (event) => {
    updateObjState(setInstanceModel, instanceModel, 'instanceAuthType', event.target.value);
    alert(event.target.value)
  };

  const handleChangeStatus = (event) => {
    updateObjState(setInstanceModel, instanceModel,  'instanceStatus', event.target.value);
  };

  const handleupdateInstance = async () => {
    try {
      if (!sessionStorage.getItem('token')) {
        alert('Please login');
        return;
      }

      await updateInstance(hash, {
        name: instanceModel.title,
        description: instanceModel.description,
        instance_auth_type: instanceModel.instanceAuthType,
        instance_status: instanceModel.instanceStatus,
      });

      alert('Instance updated successfully');
    } catch (error) {
      console.error('Error updating instance:', error);
      alert('Error updating instance');
    }
  };
  
  // THIS CODE FOR USER LIST UPLOAD
  const [openUserUpload, setUserUpload] = useState(false);

  const handleUploadFileOpen = () => {
    setUserUpload(true);
  };

  const handleUploadFileClose = () => {
    setUserUpload(false);
  };
  const createForm = async () => {
    if (loading) return;
    setErr("");

    if (!formModel.title.trim()) return setErr("Title is required");
    if (formModel.title.trim().length < 5 || formModel.title.trim().length > 50)
      return setErr("Title should be 5 - 50 characters long");

    if (formModel.expiration.trim() && formModel.expiration < 1)
      return setErr("Validity should be at least an hour");

    if (formModel.fields.length < 2)
      return setErr("You need to add at least one field");

  };

  const [alignment, setAlignment] = useState(1);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    
   
  }; 

  return (<>{isLoggedIn ? (
    <div
      style={{
        paddingLeft: "0vw",
        paddingRight: "0vw",
        background: "#CEE5FD",
        opacity: "1",
        border: "solid 1px green",
      }}
    >
      <div
        style={{
          position: "fixed",
          paddingBottom: "1em",
          width: "100%",
          background: "#CEE5FD",
          zIndex: "1001",
          paddingLeft: "2vw",
        }}
      >
      
        <h3 >
          {/* <label>Title of the from</label> */}
          <TextField
          type="text"
          placeholder="Enter Title"
          value={instanceModel.title}
          onChange={(e) => updateObjState(setInstanceModel, instanceModel, 'title', e.target.value)}
          id="standard-basic"
          label="Enter Title"
          variant="standard"
          
          style={{ marginRight: '10px' }}
          size="small"
        />
        <TextField
          type="text"
          placeholder="Enter Description"
          value={instanceModel.description}
          onChange={(e) => updateObjState(setInstanceModel, instanceModel, 'description', e.target.value)}
          id="standard-basic"
          label="Enter Description"
          variant="standard"
          style={{ marginRight: '10px' }}
          size="small"
        />
        <TextField
          type="text"
          placeholder="Created At"
          value={instanceModel.createdAt}
          id="standard-basic"
          label="Created At"
          variant="standard"
          size="small"
          InputProps={{
            readOnly: true,
          }}
          style={{ marginRight: '10px' }}
          
        />
             <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }} size="small">
          <InputLabel id="instanceAuthType-label">Auth Type</InputLabel>
          <Select
            labelId="instanceAuthType-label"
            id="instanceAuthType"
            value={instanceModel.instanceAuthType}
            onChange={handleChangeAuthType}
            label="Instance Auth Type"
          >
            <MenuItem value={1}>Open to all</MenuItem>
            <MenuItem value={2}>Open in org</MenuItem>
            <MenuItem value={4}>Specific users</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ mr:1 , minWidth: 120 }} size="small">
          <InputLabel id="instanceStatusLabel">Status</InputLabel>
          <Select
            labelId="instanceStatusLabel"
            id="instanceStatus"
            value={instanceModel.instanceStatus}
            onChange={handleChangeStatus}
            label="Instance Status"
          >
            <MenuItem value={1}>Closed</MenuItem>
            <MenuItem value={2}>Open</MenuItem>
          </Select>
        </FormControl>
        <button
          variant="contained"
          color="primary"
          onClick={handleupdateInstance}
          style={{ marginTop: '20px' }}
          className="btn"
        >
          Update Instance
        </button>

  <ToggleButtonGroup
  color='standard'
  value={alignment}
  exclusive
  onChange={handleChange}
  aria-label="Platform"
  size="small"
  variant = "outlined"
  style={{ fontsize:"14px"  , marginLeft:'1em' }}
  className=".btn"
  
>
  <ToggleButton  variant = "outlined" value={1} style={{fontWeight:'600'}} >Edit</ToggleButton>
  <ToggleButton variant = "outlined" value={2} style={{fontWeight:'600'}} >Voters</ToggleButton>
  <ToggleButton variant = "outlined" value={3} style={{fontWeight:'600'}} >Responses</ToggleButton>
</ToggleButtonGroup>
          {/* <input type="text" placeholder="Enter title" onChange={e => updateObjState(setFormModel, formModel ,"title", e.target.value)} /> */}
        </h3>
        <div>
        <div>
  {alignment == 1 && (
    <div>
          <span>Type Of que</span>
          {inputTypes.map((inputType, index) => (
            <Button
              class="btn"
              variant="outlined"
              size="small"
              HO
              key={index}
              onClick={() => openAddModal(inputType)}
            >
              {inputType.replace("-", " ")}
            </Button>
          ))}
          </div>
  )}
  {alignment == 2 && <div><div>
      <button className="btn"  onClick={handleUploadFileOpen}>
        Upload Users
      </button>
      <UsersFileUpload open={openUserUpload} onClose={handleUploadFileClose} />
    </div></div>}
  {alignment == 3 && <div>This is alignment 3</div>}
</div>
        </div>
      </div>
      {alignment == 1 && (
        <div style={{ paddingTop: "14vh" }}>
        <div className="form" style={{ paddingLeft:'2vw'}}>
          {formModel.fields.length > 0 && <RenderPlainForm model={formModel} />}

          <div
            style={{
              border: "1px solid grey",
              display: "flex",
              flexDirection: "column",
              width: "50%",
              padding: "2.5em 2em 2.5em 2em",
              background: "white",
              borderRadius: "7px",
              margin: "1em 0em 1em 0em",
            }}
          >
            <label style={{ fontWeight: "400", color: "black" }}>
              End message
            </label>
            {/* <input type="text" placeholder="What should user see after submitting the form" onChange={e => updateObjState(setFormModel, formModel ,"endMessage", e.target.value)} /> */}
            <TextField
              style={{ marginTop: ".5em " }}
              type="text"
              id="standard-basic"
              //   label="answer here"
              variant="standard"
              placeholder="What should user see after submitting the form"
              onChange={(e) =>
                updateObjState(
                  setFormModel,
                  formModel,
                  "endMessage",
                  e.target.value
                )
              }
            />
          </div>

          <div
            style={{
              border: "1px solid grey",
              display: "flex",
              flexDirection: "column",
              width: "50%",
              padding: "2.5em 2em 2.5em 2em",
              background: "white",
              borderRadius: "7px",
              margin: "1em 0em 1em 0em",
            }}
          >
            <label style={{ fontWeight: "400", color: "black" }}>
              Validity(Optonal)
            </label>
            <TextField
              style={{ marginTop: ".5em " }}
              //  type="text"
              id="standard-basic"
              //   label="answer here"
              variant="standard"
              type="number"
              placeholder="For how many hours the form should be fillable"
              onKeyDown={(e) => {
                if (e.key === "." || e.key === "-") {
                  e.preventDefault();
                }
              }}
              onChange={(e) =>
                updateObjState(
                  setFormModel,
                  formModel,
                  "expiration",
                  e.target.value
                )
              }
            />
          </div>
        </div>

        <p className="mb-2 text-right">
          {err && <p className="err text-right mb-1">{err}</p>}
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "1000",
            }}
          >
            <Button
              variant="contained"
              onClick={(createForm, console.log(formModel))}
            >
              {loading ? (
                <span className="spinner white"></span>
              ) : (
                <span>Publish Form</span>
              )}
            </Button>
          </div>
        </p>

        {showAddModal && (
          <AddFieldModal
            inputType={inputType}
            close={() => setShowAddModal(false)}
            add={addFieldToFormModel}
          />
        )}
      </div>
  )}
  {alignment == 2 && <div style={{marginTop:'16vh'}}><VotersTable hash={hash}/></div> }
  {alignment == 3 && <div>This is alignment 3</div>}
      
    </div> ) : (<div style ={{display:'flex' , alignItems:'center', justifyContent:'center' , flexDirection:'column' , height:'60vh'}}>
            <h1 style={{fontWeight:'400'}}>Please login</h1>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLoginRedirect}
            >
              Login
            </Button>
          </div>)}</>
  );
}

export default Create;
