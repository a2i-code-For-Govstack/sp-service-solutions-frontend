// import React, { useState } from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// const inputTypes = [
//   "short-text",
//   "long-text",
//   "number",
//   "multioption-singleanswer",
//   "multioption-multianswer",
//   "file",
// ];

// const InputTypeMenu = ({ onSelect }) => {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = (type) => {
//     setAnchorEl(null);
//     if (type) {
//       onSelect(type.replace("-", "_"));
//     }
//   };

//   return (
//     <div>
//       <Button
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         Select Input Type
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={() => handleClose(null)}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         {inputTypes.map((type) => (
//           <MenuItem key={type} onClick={() => handleClose(type)}>
//             {type}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// };

// export default InputTypeMenu;
