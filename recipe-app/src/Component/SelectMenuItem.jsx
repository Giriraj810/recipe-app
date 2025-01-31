import PropTypes from "prop-types"
import React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  Fertility: {
    height: 40,
    width:150,
    "& .MuiSelect-select": {
      zIndex: "99",
      fontSize: "1rem",
      Padding:"20px 20px !important",
      

    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0d6efd",
      backgroundColor: "#FFFFFF",
      borderRadius: "10px",
    },
    "& .MuiSelect-icon": {
      zIndex: "99",
    },
    "& .MuiButtonBase-root-MuiMenuItem-root": {
      WebkitAlignItems:'normal',
      alignItems: 'normal',
      backgroundColor:'red'
    },
    },
  });
function SelectMenuItem(props) {
  const { styles, option,name, value, handleChange ,label ,placeholder} = props;
  const classes = useStyles();
  return (
    <>
       <p className=" pt-2 mx-3">
      {label }
     
       </p>
      
    <FormControl className={styles}>
  
      <Select
        value={value}
        onChange={handleChange}
        name={name}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        className={styles === "select-custom" ?  styles : classes.Fertility}
        placeholder={placeholder}
      >
        
        {option.map((a, i) => (
          <MenuItem value={a.value} key={i}>
            <span>
            {a.icon}&nbsp;
              {a.label}</span>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    </>
  );
}

SelectMenuItem.propTypes = {
  handleChange: PropTypes.any,
  img: PropTypes.any,
  label: PropTypes.any,
  name: PropTypes.any,
  option: PropTypes.shape({
    map: PropTypes.func
  }),
  placeholder: PropTypes.any,
  styles: PropTypes.string,
  submit: PropTypes.any,
  value: PropTypes.any
}

export default React.memo(SelectMenuItem);
