import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, Checkbox, FormGroup,IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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

function RenderPlainForm({ model , deleteField  , editField}) {
  return (
    <div className="surveyView">
      <h2 style={{color:'black' , fontSize:"25px" }}>PREVIEW</h2>
      {model.fields.map((field, index) => 
        field.type === "short-text" || field.type === "number" ? (
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
              <div style={{display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent:'space-between'}}>
            <label style={{ fontWeight: "400", color: "black" }}>
              {field.title}
              {field.required && <span className="err"> * </span>}
              
            </label>
            <div>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => deleteField(index)}
            >
             <DeleteIcon  />
              
            </IconButton>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => editField(index)}
            >
             <EditIcon  />
            </IconButton>
            </div>
            </div>
            <TextField
              style={{ marginTop: ".5em " }}
              type={field.type}
              id="standard-basic"
              label="answer here"
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
            <div style={{display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent:'space-between'}}>
            <label style={{ fontWeight: "400", color: "black" }}>
              {field.title}
              {field.required && <span className="err">*</span>}
             
            </label>
            <div>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => deleteField(index)}
            >
             <DeleteIcon  />
              
            </IconButton>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => editField(index)}
            >
             <EditIcon  />
            </IconButton>
            </div>
           </div>
            <TextField
              style={{ marginTop: ".5em " }}
              id="standard-textarea"
              label="long answer here"
              placeholder="long answer here"
              multiline
              variant="standard"
            />
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
            <div style={{display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent:'space-between'}}>
            <label
              style={{ fontWeight: "400", color: "black", marginBottom: "1em" }}
            >
              {field.title}
              {field.required && <span className="err">*</span>}
             
            </label>
            <div>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => deleteField(index)}
            >
             <DeleteIcon  />
              
            </IconButton>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => editField(index)}
            >
             <EditIcon  />
            </IconButton>
            </div>
            </div>
            {/* <input type="file" /> */}
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </div>
        ) : field.type === "multioption-singleanswer" ||
          field.type === "multioption-multianswer" ? (
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
            <div style={{display:'flex' , flexDirection:'row' , alignItems:'center' , justifyContent:'space-between'}}>
            <label
              style={{ fontWeight: "400", color: "black", marginBottom: "1em" }}
            >
              {field.title}
              {field.required && <span className="err">*</span>}
           
            </label>
            <div>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => deleteField(index)}
            >
             <DeleteIcon  />
              
            </IconButton>
            <IconButton
              aria-label="delete"
              style={{ float:'right' }}
              onClick={() => editField(index)}
            >
             <EditIcon  />
            </IconButton>
            </div>
            </div>
            {field.type === "multioption-singleanswer" ? (
              <FormControl component="fieldset">
                <RadioGroup name={field.title.replace(" ", "")}>
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
                <FormGroup>
                  {field.options.map((option, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={<Checkbox />}
                      label={option}
                    />
                  ))}
                </FormGroup>
              </FormControl>
            )}
          </div>
        ) : (
          <p key={index}>Unknown fiel type.</p>
        )
      )}
      <Button variant="contained">submit</Button>
    </div>
  );
}

export default RenderPlainForm;
