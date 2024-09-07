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
import '../../css/Create.css';
import { createForm, deleteQuestion, getForm , addQuestionToForm , updateQuestion , getResponses , updateform} from '../../services/dataService';
import ShareModal from "../../components/Common/ShareModal";
import ResponsesTable from "../../components/FormAdmin/ResponseTable";
// import Button from '@mui/material/Button';
// import { createForm as saveForm } from "../db"
import UserAddModal from "../../components/FormAdmin/UserAddModal";
import { downloadCSV } from '../../components/Common/downloadCSV'
// import InputTypeMenu from "../../components/Common/InputTypeMenu";
import { useTheme } from '@mui/material/styles';

function Create() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [updateQueIndex, setupdateQueIndex] = useState(0);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  const [refresh, setRefresh] = useState(0); 
  const [responses, setResponses] = useState([]);
  const [openShareModal, setOpenShareModal] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [shareHash, setShareHash] = useState('');
  const { hash } = useParams();
  // Track login status
  // const history = useHistory()
  const theme = useTheme(); // Hook to access the theme
  const handleOpenShareModal = () => setOpenShareModal(true);
  const handleCloseShareModal = () => setOpenShareModal(false);
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
  const openUpdateModal = (inputType) => {
    setShowUpdateModal(true);
    setInputType(inputType);
  };

 
  const [formModel, setFormModel] = useState({
    title: "",
    createdAt: +new Date(),
    fields: [],
    endMessage: "",
    expiration: "",
  });

// Save form data to localStorage
const saveFormDataToLocal = (data) => {
  localStorage.setItem(`formData_${hash}`, JSON.stringify(data));
};

// Load form data from localStorage
const loadFormDataFromLocal = () => {
  const savedData = localStorage.getItem(`formData_${hash}`);
  if (savedData) {
    setFormModel(JSON.parse(savedData));
  }
};

useEffect(() => {
  loadFormDataFromLocal();
}, [hash]);

  const addFieldToFormModel = async (field) => {
    // {alert("inaddFieldToFormModel" )}
    if (formModel.id) {
      try {
        // const token = sessionStorage.getItem('token');
        await addQuestionToForm(hash, formModel.id, field);
      } catch (error) {
        console.error('Error adding question', error);

      }
    }
    let _model = Object.assign({}, formModel);
    _model.fields.push(field);
    setFormModel(_model);
    saveFormDataToLocal(_model);
  };

  


const updateFieldToFormModel = async (field) => {
  // Check if the form is published (has an ID)
  if (formModel.id) {
    try {
      await updateQuestion(hash, formModel.id, formModel.fields[updateQueIndex].id, field);
    } catch (error) {
      console.error('Error updating question:', error);
    }
  } else {
    // If the form is not published, update the frontend model
    const updatedFields = [...formModel.fields];
    updatedFields[updateQueIndex] = {
      ...updatedFields[updateQueIndex],
      ...field,
    };

    const updatedFormModel = {
      ...formModel,
      fields: updatedFields,
    };

    setFormModel(updatedFormModel);
    saveFormDataToLocal(updatedFormModel);
  }
  
  setRefresh(1); // Trigger a refresh
};

  


  const inputTypes = [
    "short-text",
    "long-text",
    "number",
    "multioption-singleanswer",
    "multioption-multianswer",
    "file",
  ];
  
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
          window.showToast('error', 'Please login');
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
      finally {
        setLoading(false);
       }
    };

    fetchData();
  }, [hash]);
 

  const handleChangeAuthType = (event) => {
    updateObjState(setInstanceModel, instanceModel, 'instanceAuthType', event.target.value);
    // alert(event.target.value)
  };

  const handleChangeStatus = (event) => {
    updateObjState(setInstanceModel, instanceModel,  'instanceStatus', event.target.value);
  };

  const handleupdateInstance = async () => {
    try {
      // Check for the presence of a token in sessionStorage
      const token = sessionStorage.getItem('token');
      if (!token) {
        window.showToast('error', 'Please login');
        return;
      }
  
      // Update the instance with the provided data
      await updateInstance(hash, {
        name: instanceModel.title,
        description: instanceModel.description,
        instance_auth_type: instanceModel.instanceAuthType,
        instance_status: instanceModel.instanceStatus,
      });
  
  
      // Show success message upon successful update
      window.showToast('success', 'Instance updated successfully');
    } catch (error) {
      console.error('Error updating instance:', error);
      // Show error message if update fails
      window.showToast('error', 'Error in updating instance');
    }
  };
  
  const handleupdateFormMeta = async () => {
    const token = sessionStorage.getItem('token');
    try {
      if (formModel.id) {
        await updateform(
          hash, 
          {
            title: instanceModel.title,
            description: instanceModel.description,
          }, 
          formModel.id, 
          token
        );
        window.showToast('success', 'Title and description updated successfully');
      }
    } catch (error) {
      console.error('Error in updating form title and description:', error);
      window.showToast('error', 'Error in updating title and description');
    }
  };
  //THIS CODE FOR DATA SERVICES 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          // alert('Please login');
          window.showToast('error', 'Please login');
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
        window.showToast('error', 'Unable to fetch instance info');
      }
    };
    fetchData();
  }, [hash]);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          // alert('Please login');
          window.showToast('error', 'Please login');
          return;
        }
        const formData = await getForm(hash, token);
        if (formData.length > 0) {
          const form = formData[0];
          setFormModel({
            id: form.id,
            title: form.title,
            createdAt: form.created_at,
            fields: form.fields,
            endMessage: form.endMessage,
            expiration: form.expiration || "",
          });
        }
      } catch (error) {
        window.showToast('error', 'Error in fetching form');
        console.error('Error fetching form data:', error);
      }
    };
    fetchForm();
    setRefresh(0);
  }, [hash,refresh]);
  
  // THIS CODE FOR USER LIST UPLOAD
  const [openUserUpload, setUserUpload] = useState(false);

  const handleUploadFileOpen = () => {
    setUserUpload(true);
  };

  const handleUploadFileClose = () => {
    setUserUpload(false);
  };
  
  const createOrUpdateForm = async () => {
    // if( formModel.id) window.showToast('error', 'Already Published'); return; 
    if (loading) return;
    setErr("");
    if (!formModel.title.trim()) return window.showToast('error', 'Title is required');
    if (formModel.title.trim().length < 5 || formModel.title.trim().length > 50)
      return window.showToast('error', 'Title should be 5 - 50 characters long');
    // if (formModel.expiration.trim() && formModel.expiration < 1)
    //   return window.showToast('error', 'Validity should be at least an hour');
    if (formModel.fields.length < 1)
      return window.showToast('error', 'You need to add at least one field');

    try {
      setLoading(true);
      const token = sessionStorage.getItem('token');
      
      const response = await createForm(hash, formModel, token);
      setFormModel(response);
      handleupdateInstance()
      handleupdateFormMeta()
      localStorage.removeItem(`formData_${hash}`);
      window.showToast('success', 'Instance & Survey Published');
      // alert('Form published');
    } catch (error) {
      console.error('Error creating form:', error);
      // alert('Error creating form');
      window.showToast('error', 'Error in creating form');
    } finally {
      setLoading(false);
    }
   
  };

  const [alignment, setAlignment] = useState(1);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
    
   
  }; 
  


  const [openAddUser, setOpenAddUser] = useState(false);
 

  const handleAddUserOpen = () => setOpenAddUser(true);
  const handleAddUserClose = () => setOpenAddUser(false);



  const deleteFieldFromFormModel = async (index) => {
    // alert(index , "in delete")
    if (formModel.id) {
      try {
        const token = sessionStorage.getItem('token');
        await deleteQuestion(hash, formModel.id, formModel.fields[index].id, token);
        window.showToast('success', 'Question successfully deleted');
      } catch (error) {
        console.error('Error deleting question:', error);
        window.showToast('error', 'error in deleting question');
      }
    }
   
    let _model = Object.assign({}, formModel);
    _model.fields.splice(index, 1);
    setFormModel(_model);
    saveFormDataToLocal(_model);
  };

  const editFieldFromFormModel = async (index) => {
    console.log(formModel.fields[index].type)
    // alert(index , "in edit")
    if (formModel.id) {
      setupdateQueIndex(index) 
      openUpdateModal(formModel.fields[index].type)
      // {alert("ineditFieldFromFormModel" )}
    }
    else{
      // deleteFieldFromFormModel(index)
      setupdateQueIndex(index) 
      openUpdateModal(formModel.fields[index].type)
    }

  };



  useEffect(() => {
      const fetchResponseData = async () => {
          const result = await getResponses(hash);
          setResponses(result);
      };
      fetchResponseData();
  }, [hash]);
  
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

  return (<>{isLoggedIn ? (
    <div
      style={{
        paddingLeft: "0vw",
        paddingRight: "0vw",
        backgroundColor: theme.palette.firstColor.main,
        opacity: "1",
        // border: "solid 1px red",
        width:'100%',
        // marginTop:'10px'
      }}
    >
      <div
        className="instanceFixdiv"
      >
      
        <div className="instanceinfodiv">
          {/* <label>Title of the from</label> */}
          <TextField
  type="text"
  placeholder="Enter Title"
  value={instanceModel.title}
  onChange={(e) => {
    updateObjState(setInstanceModel, instanceModel, 'title', e.target.value);
    setFormModel((prevModel) => ({
      ...prevModel,
      title: e.target.value,
    }));
  }}
  
  id="standard-basic"
  label="Enter Title"
  variant="standard"
    InputProps={{
        style: { color: theme.palette.secondColor.main }, // Use theme to access the color
      }}
 color="secondColor"   style={{ margin: '10px' }}
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
            InputProps={{
        style: { color: theme.palette.secondColor.main }, // Use theme to access the color
      }}
         color="secondColor"   style={{ margin: '10px'}}
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
         color="secondColor"
          InputProps={{
            readOnly: true,
            style: { color: theme.palette.secondColor.main }, 
          }}
         
         style={{ margin: '10px' }}
          
        />
             <FormControl variant="standard" sx={{ mr: 1, minWidth: 120 }} color="secondColor"   style={{ margin: '10px' }}  size="small">
          <InputLabel id="instanceAuthType-label">Auth Type</InputLabel>
          <Select
            labelId="instanceAuthType-label"
            id="instanceAuthType"
            value={instanceModel.instanceAuthType}
            onChange={handleChangeAuthType}
            label="Instance Auth Type"
            // he & symbol in the sx prop is a way to reference the current component within the styles.
            sx={{
      '& .MuiSelect-select': {
        color: theme.palette.secondColor.main,
      },
    }}
          >
            <MenuItem value={1}>Open to all</MenuItem>
            <MenuItem value={2}>Open in org</MenuItem>
            <MenuItem value={4}>Specific users</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="standard" sx={{ mr:1 , minWidth: 120 }}color="secondColor"   style={{ margin: '10px' }}  size="small">
          <InputLabel id="instanceStatusLabel">Status</InputLabel>
          <Select
            labelId="instanceStatusLabel"
            id="instanceStatus"
            value={instanceModel.instanceStatus}
            onChange={handleChangeStatus}
            label="Instance Status"
            sx={{
      '& .MuiSelect-select': {
        color: theme.palette.secondColor.main,
      },
    }}
          >
            <MenuItem value={1}>Close</MenuItem>
            <MenuItem value={2}>Open</MenuItem>
          </Select>
        </FormControl>
        <button
  variant="contained"
  color="primary"
  onClick={() => {
    handleupdateInstance();
    handleupdateFormMeta();
  }}
  style={{ margin: '10px' }}
  className="btn"
>
  Update Form Settings
</button>

  <ToggleButtonGroup
  color='standard'
  value={alignment}
  exclusive
  onChange={handleChange}
  aria-label="Platform"
  size="small"
  variant = "outlined"
  style={{ fontsize:"14px"  , margin: '10px' }}
  className=".btn"
  
>
  <ToggleButton  variant = "outlined" value={1} style={{fontWeight:'600', color: theme.palette.secondColor.main}} >Edit</ToggleButton>
  <ToggleButton variant = "outlined" value={2} style={{fontWeight:'600' , color: theme.palette.secondColor.main}} >Voters</ToggleButton>
  <ToggleButton variant = "outlined" value={3} style={{fontWeight:'600' , color: theme.palette.secondColor.main}} >Responses</ToggleButton>
</ToggleButtonGroup>
          {/* <input type="text" placeholder="Enter title" onChange={e => updateObjState(setFormModel, formModel ,"title", e.target.value)} /> */}
        </div>
    
      </div>
      {alignment == 1 && (<div>
        <div className="renderView">
        <div>
          {formModel.fields.length > 0 && <RenderPlainForm model={formModel} deleteField={deleteFieldFromFormModel} editField={editFieldFromFormModel} />}
       </div>
       </div>

        {/* the next div is added for getting adding question at bottom */}
<div style={{width:'100vw',  background:'white' , display:"flex" , justifyContent:'center'}}>

          {alignment == 1 && (
    <div className="questypediv">
    
         {inputTypes.map((inputType, index) => (
            <Button
              class="btn"
              variant="outlined"
              size="small"
              key={index}
              onClick={() => openAddModal(inputType)}
            >
            {/* {inputType} */}
              {inputType.replace("-", "_")}
            </Button>
          ))}
          </div>
  )}
  </div>
  {/* new added div ends */}

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
              color="primary"
              disabled={formModel.id} 
              onClick={createOrUpdateForm}
              
              // disabled={loading}
              // style={{ width: "70vw", margin: "10px" }}
            >
              {formModel.id ? "Published" : "Publish Form"}
              {/* Publish Form */}
            </Button>
            <span style={{  width:'100px' , color:'white' }}>...</span>
            {
              formModel.id && <Button size="small" variant="contained" color="success" 
                  // onClick={() => {if(sessionStorage.getItem('token')){window.location.href=`${window.location.origin}/${instance.hash}`} }}
                  onClick={() => {if(sessionStorage.getItem('token')){  setShareUrl(`${window.location.origin}/${hash}`); setShareHash(hash); handleOpenShareModal()} }}
                 
                  >
                    SHARE
                  </Button>
            }
          </div>
        </p>

        {showAddModal && (
          <AddFieldModal
            inputType={inputType}
            close={() => setShowAddModal(false)}
            add={addFieldToFormModel}
          />
        )}
        {showUpdateModal && (
          <AddFieldModal
            inputType={inputType}
            close={() => setShowUpdateModal(false)}
            add={updateFieldToFormModel}
          />
        )}
        <ShareModal
        open={openShareModal}
        handleClose={handleCloseShareModal}
        shareUrl={shareUrl}
        hash = {shareHash}
        
      />
     </div>
  )}
  {alignment == 2 && 
   <div>
    {/* <div className="questypediv">
    <div>
      <button className="btn" style={{margin:'10px'}}  onClick={handleUploadFileOpen}>
        Upload Users
      </button>
      
      <UsersFileUpload open={openUserUpload} onClose={handleUploadFileClose} />
    
      <button className="btn" style={{margin:'10px'}}  onClick={handleAddUserOpen}>
        Add User
      </button>
      <div style={{  display:'flex' , justifyContent:'center' , alignItems:'center' , color: theme.palette.secondColor.main}}><span>table for auth type specific users</span></div>

    
      
      <UserAddModal open={openAddUser} onClose={handleAddUserClose} hash={hash} />
    </div></div> */}
    <div className="renderView"> 
   <VotersTable hash={hash}/></div></div>}






  {alignment == 3 && <div>
  
  {/* <div><button className="btn" style={{margin:'10px'}}  onClick={() => downloadCSV(responses)}>
        Download_CSV
      </button></div> */}
      
      <div className="renderView"><ResponsesTable hash={hash}/></div></div>}
      
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
