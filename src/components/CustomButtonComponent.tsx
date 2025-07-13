import { Button } from "@mui/material";


type buttonStylesProps = {
    buttonStyles?: any;
    onClick?: () => void
}

const CustomButtonComponent = ({ buttonStyles, onClick }: buttonStylesProps) => {
  return (
    <Button
    type="submit"
    variant="contained"
    onClick={onClick}
    sx={{
        // maxWidth: "200px",
        width: "10%",
        backgroundColor: "var(--hover-red-color)",
        py: 1.5,
        fontWeight: 'bold',
        "&:hover": {
            backgroundColor: "white",
            color: "var(--primary-background-color)"
        },
        ...buttonStyles
    }}
    >
    Submit
    </Button>
  )
}

export default CustomButtonComponent;
