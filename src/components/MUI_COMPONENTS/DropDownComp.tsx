import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";


type Props = {
  data: string[][];
  error?: string;
  optionSelected: (option: string) => void
}

const DropDownComp = ({data, error, optionSelected}: Props) => {

  return (
    <div>
      <FormControl required>
        <InputLabel htmlFor="grouped-select">Category</InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          label="Category"
          sx={{
            width: 300,
          }}
          onChange={(e) => optionSelected(e.target.value)}
        >
          {data.map((value) => (
            <MenuItem value={value[0]}>{value[1]}</MenuItem>
          ))}
        </Select>
        {error && <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default DropDownComp;
