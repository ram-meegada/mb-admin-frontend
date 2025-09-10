import { Checkbox, FormControlLabel } from "@mui/material";


type Props = {
    label: string;
    optionSelected: (x: boolean) => void
}

const CheckBoxComp = ({label, optionSelected}: Props) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          sx={{
            color: "white",
            "&.Mui-checked": {
              color: "var(--dark-grey-border)",
            },
            paddingLeft: 0,
          }}
          onChange={(e) => optionSelected(e.target.checked)}
        />
      }
      label={label}
      labelPlacement="end"
      sx={{
        color: "white",
        flexDirection: "row",
      }}
    />
  );
};

export default CheckBoxComp;
