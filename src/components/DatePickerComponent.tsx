import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";


type Props = {
  onDateSelect: (dateSelected: string | null) => void;
  defaultDate?: string | null
}


export default function DatePickerComponent({onDateSelect, defaultDate}: Props) {
  const [ selectedDate, setSelectedDate ] = useState<Dayjs | null>(null)

  function handleDateChange(date: Dayjs | null) {
    setSelectedDate(date)
    onDateSelect(date ? date.format('YYYY-MM-DD') : null)
  }

  useEffect(() => {
    if (defaultDate){
      setSelectedDate(dayjs(defaultDate, 'YYYY-MM-DD'))
    }
  }, [defaultDate])
  

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: 300, p: 0 }}>
        <DatePicker
          value={selectedDate}
          onChange={(date) => handleDateChange(date)}
          format="YYYY-MM-DD"
          slotProps={{
            textField: {
              fullWidth: true,
              sx: {
                backgroundColor: "white",
              },
            },
            field: {
              clearable: true,
            }
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
