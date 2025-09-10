import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";


type Props = {
  data: string[][];
  error?: string;
  optionSelected: (option: string) => void;
  label?: string
}

const DropDownComp = ({data, error, optionSelected, label='Category'}: Props) => {

  return (
    <div>
      <FormControl required>
        <InputLabel htmlFor="grouped-select">{label}</InputLabel>
        <Select
          defaultValue=""
          id="grouped-select"
          label={label}
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
