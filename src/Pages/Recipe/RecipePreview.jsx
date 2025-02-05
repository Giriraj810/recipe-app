import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Typography,
  ListItemText,
  Avatar,
  ListItemAvatar,
  ListItem,
  List,
  Box,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const BootstrapDialog = styled(Dialog)(() => ({
  "& .MuiDialogContent-root": {
    backgroundColor: "rgba(255, 255, 255, 1)", 
    backdropFilter: "blur(10px)",
    borderRadius: "0 12px 12px 0  ",
    opacity: 1,
    Width: "400px",
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(255, 255, 255, 0)",
    backdropFilter: "blur(0.5px)", 
  },
  "& .MuiPaper-root": {
    backgroundColor: "rgba(255, 255, 255, 0.0)",
    backdropFilter: "blur(0px)", 
    borderRadius: "16px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)", 
    width: "90%", 
    maxWidth: "800px", 

    "@media (min-width: 768px)": {
      width: "600px", 
    },
    "@media (min-width: 1024px)": {
      width: "800px", 
    },
  },
  "& .MuiDialogActions-root": {
    backgroundColor: "rgba(255, 255, 255, 0.2)", 
    backdropFilter: "blur(8px)", 
  },
}));

export const StyledDialogTitle = styled(DialogTitle)(() => ({
  margin: 0,
  position: "relative",
  backgroundColor: "rgb(54, 96, 151)", 
  backdropFilter: "blur(8px)", 
  color: "#fff",
  borderRadius: "12px 12px 0 0",
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  right: 8,
  top: 8,
  color: theme.palette.grey[600],
}));

export const StyledDialogContent = styled(DialogContent)(() => ({
  backgroundColor: "rgba(250, 250, 250, 0.4)", 
  backdropFilter: "blur(5px)",
  borderRadius: "0 0 12px 12px",
}));

export const StyledDialogActions = styled(DialogActions)(() => ({
  backgroundColor: "rgba(245, 245, 245, 0.3)",
  backdropFilter: "blur(6px)", 
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "0 0 12px 12px",
}));

export const StyledButton = styled(Button)(() => ({
  fontWeight: "bold",
  borderRadius: "8px",
  textTransform: "none",
  backgroundColor: "rgba(0, 123, 255, 0.8)", // Transparent blue
  color: "#fff",
  "&:hover": {
    backgroundColor: "rgba(0, 123, 255, 1)", // Solid blue on hover
  },
}));

// Styled Dialog Title
const BootstrapDialogTitle = ({ children, onClose, ...other }) => (
  <StyledDialogTitle sx={{ m: 0, p: 2 }} {...other}>
    {children}
    {onClose && (
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: "#fff",
        }}
      >
        <CloseIcon />
      </IconButton>
    )}
  </StyledDialogTitle>
);

BootstrapDialogTitle.propTypes = {
  children: PropTypes.any,
  onClose: PropTypes.any,
};

// Recipe Preview Component
const RecipePreview = ({ open, setOpen, recipeData }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog onClose={handleClose} open={open}>
      <BootstrapDialogTitle onClose={handleClose}>
        Recipe Details
      </BootstrapDialogTitle>
      <StyledDialogContent dividers>
        <Grid container spacing={2} sx={{ p: 2 }}>
          {/* Recipe Image */}
          <Grid item xs={12} sx={{ textAlign: "center" }}>
            <img
              src={recipeData.image}
              alt={recipeData.label}
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </Grid>

          {/* Recipe Title */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {recipeData.label}
            </Typography>
          </Grid>

          {/* Preparation Time & Serving Size */}
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Preparation Time:</strong> {recipeData.totalTime} minutes
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Serving Size:</strong> {recipeData.yield} servings
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Calories:</strong> {recipeData.calories}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body1">
              <strong>Meal Type:</strong> {recipeData.mealType}{" "}
            </Typography>
          </Grid>

          {/* Ingredients List ,HealthLabel*/}
          <Grid item xs={12}>
            <Typography variant="h6">Ingredients:</Typography>
            <List>
              {recipeData.ingredients.map((ingredient, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar src={ingredient.image} />
                  </ListItemAvatar>
                  <ListItemText primary={ingredient.text} />
                </ListItem>
              ))}
            </List>
            <Typography variant="h6">HealthLabel:</Typography>
            <List>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {recipeData.healthLabels.map((healthLabel, index) => (
                  <Chip
                    key={index}
                    label={healthLabel}
                    variant="outlined"
                    sx={{ borderRadius: "16px", px: 1.5, py: 0.5 }}
                  />
                ))}
              </Box>
            </List>
          </Grid>

          {/* Instructions */}
          <Grid item xs={12}>
            <Typography variant="h6">Instructions:</Typography>
            <Typography variant="body1">
              <a
                href={recipeData.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Click here for full instructions
              </a>
            </Typography>
          </Grid>
        </Grid>
      </StyledDialogContent>
    </BootstrapDialog>
  );
};

RecipePreview.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  recipeData: PropTypes.object, 
};

export default RecipePreview;
