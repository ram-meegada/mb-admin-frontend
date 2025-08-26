import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FormHelperText } from "@mui/material";


type optionProps = {
  id: number;
  label: string;
  value: string;
  isHeader: boolean
}

type Props = {
  data: optionProps[];
  error?: string;
  optionSelected: (id: number) => void
}

const DropDownGroupComp = ({data, error, optionSelected}: Props) => {

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
          onChange={(e) => optionSelected(Number(e.target.value))}
        >
          {data.map((value) => {
            if (value.isHeader) {
              return <ListSubheader>{value.value}</ListSubheader>;
            } else {
              return <MenuItem value={value.id}>{value.label}</MenuItem>;
            }
          })}
        </Select>
        {error && <FormHelperText sx={{ color: 'red' }}>{error}</FormHelperText>}
      </FormControl>
    </div>
  );
};

export default DropDownGroupComp;
