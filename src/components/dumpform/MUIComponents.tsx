import React, { memo } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  useTheme,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

interface Franchise {
  franchise: string;
}

interface OrganizationSegment {
  id: string;
  code: string;
  description: string;
}

interface MUIComponentsProps {
  selectedDate: Dayjs;
  selectedFranchise: string;
  distributor: string;
  selectedSegment: string;
  franchises: Franchise[];
  segments: OrganizationSegment[];
  isLoading: boolean;
  onDateChange: (newValue: Dayjs | null) => void;
  onFranchiseChange: (value: string) => void;
  onDistributorChange: (value: string) => void;
  onSegmentChange: (value: string) => void;
}

// Memoized constants to prevent re-creation
const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250,
    },
  },
  MenuListProps: {
    style: {
      padding: '4px 0',
    },
  },
};

const selectFieldStyles = {
  m: 1,
  width: 350,
  "& .MuiOutlinedInput-root": {
    height: "40px",
    borderRadius: "8px",
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "8px",
      borderColor: "rgba(0, 0, 0, 0.23)",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "rgba(0, 0, 0, 0.87)",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
    },
    "& input": {
      paddingTop: "10px",
      paddingBottom: "10px",
    },
  },
  "& .MuiInputLabel-root": {
    color: "gray",
    top: "-2px",
    transform: "translate(14px, 12px) scale(1)",
    "&.MuiInputLabel-shrink": {
      transform: "translate(14px, -9px) scale(0.75)",
    },
    "&.Mui-focused": {
      color: "gray",
    },
  },
};

const customDatePickerTheme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
  },
});

const CustomTextField = styled(TextField)({
  width: "350px",
  height: "50px",
  "& label": {
    color: "gray",
  },
  "& label.Mui-focused": {
    color: "gray",
  },
  "& .MuiOutlinedInput-root": {
    height: "40px",
    "& fieldset": {
      borderColor: "#c4c4c4",
      borderRadius: "8px",
    },
    "&:hover fieldset": {
      borderColor: "darkgray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray",
    },
  },
});

// Memoized individual form fields for better performance
const DatePickerField = memo(({ selectedDate, onDateChange }: {
  selectedDate: Dayjs;
  onDateChange: (newValue: Dayjs | null) => void;
}) => (
  <div style={{
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    gap: "91px"
  }}>
    <label style={{
      color: 'black',
      minWidth: "180px",
      fontSize: "18px",
      fontWeight: "500",
      textAlign: "left"
    }}>Month :</label>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Month"
          value={selectedDate}
          onChange={onDateChange}
          format="MMM-YYYY"
          views={["month", "year"]}
          maxDate={dayjs('2025-12-31')}
          enableAccessibleFieldDOMStructure={false}
          slots={{
            textField: (params) => <CustomTextField {...params} />,
          }}
          slotProps={{
            popper: {
              modifiers: [
                {
                  name: "offset",
                  options: {
                    offset: [0, 10],
                  },
                },
              ],
              sx: {
                height: "300px",
                "& .MuiYearCalendar-root .Mui-selected": {
                  backgroundColor: "rgb(213, 25, 0) !important",
                  color: "white !important",
                },
                "& .MuiMonthCalendar-root .Mui-selected": {
                  backgroundColor: "rgb(213, 25, 0) !important",
                  color: "white !important",
                },
              },
            },
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  </div>
));

const FranchiseSelect = memo(({ 
  selectedFranchise, 
  franchises, 
  onFranchiseChange,
  isLoading 
}: {
  selectedFranchise: string;
  franchises: Franchise[];
  onFranchiseChange: (value: string) => void;
  isLoading: boolean;
}) => {
  const theme = useTheme();
  
  const getMenuItemStyle = (name: string, selectedValue: string) => ({
    fontWeight: selectedValue === name 
      ? theme.typography.fontWeightMedium 
      : theme.typography.fontWeightRegular,
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    margin: '0px 8px',
    borderRadius: '7px',
  });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      gap: "84px"
    }}>
      <label style={{
        color: 'black', 
        minWidth: "180px",
        fontSize: "18px",
        fontWeight: "500",
        textAlign: "left"
      }}>Franchise :</label>
      <FormControl sx={{ ...selectFieldStyles }}>
        <InputLabel id="franchise-label">Franchise</InputLabel>
        <Select
          labelId="franchise-label"
          id="franchise-select"
          value={selectedFranchise}
          onChange={(e) => onFranchiseChange(e.target.value)}
          input={<OutlinedInput label="Franchise" />}
          MenuProps={MENU_PROPS}
          disabled={isLoading}
        >
          {franchises.map((item) => (
            <MenuItem
              key={item.franchise}
              value={item.franchise}
              style={getMenuItemStyle(item.franchise, selectedFranchise)}
            >
              {item.franchise}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

const DistributorSelect = memo(({ 
  distributor, 
  onDistributorChange 
}: {
  distributor: string;
  onDistributorChange: (value: string) => void;
}) => {
  const theme = useTheme();
  
  const getMenuItemStyle = (name: string, selectedValue: string) => ({
    fontWeight: selectedValue === name 
      ? theme.typography.fontWeightMedium 
      : theme.typography.fontWeightRegular,
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    margin: '0px 8px',
    borderRadius: '7px',
  });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "10px",
      gap: "84px"
    }}>
      <label style={{
        color: 'black',
        minWidth: "180px",
        fontSize: "18px",
        fontWeight: "500",
        textAlign: "left"
      }}>Distributor Name :</label>
      <FormControl sx={{ ...selectFieldStyles }}>
        <InputLabel id="distributor-label">Distributor</InputLabel>
        <Select
          labelId="distributor-label"
          id="distributor-select"
          value={distributor}
          onChange={(e) => onDistributorChange(e.target.value)}
          input={<OutlinedInput label="Distributor" />}
          MenuProps={MENU_PROPS}
        >
          <MenuItem
            key="ALL"
            value="ALL"
            style={getMenuItemStyle("ALL", distributor)}
          >
            ALL
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
});

const SegmentSelect = memo(({ 
  selectedSegment, 
  segments, 
  onSegmentChange,
  isLoading 
}: {
  selectedSegment: string;
  segments: OrganizationSegment[];
  onSegmentChange: (value: string) => void;
  isLoading: boolean;
}) => {
  const theme = useTheme();
  
  const getMenuItemStyle = (name: string, selectedValue: string) => ({
    fontWeight: selectedValue === name 
      ? theme.typography.fontWeightMedium 
      : theme.typography.fontWeightRegular,
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    margin: '0px 8px',
    borderRadius: '7px',
  });

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      marginBottom: "30px",
      gap: "84px"
    }}>
      <label style={{
        color: 'black',
        minWidth: "180px",
        fontSize: "18px",
        fontWeight: "500",
        textAlign: "left"
      }}>Organization Segment :</label>
      <FormControl sx={{ ...selectFieldStyles }}>
        <InputLabel id="segment-label">Organization Segment</InputLabel>
        <Select
          labelId="segment-label"
          id="segment-select"
          value={selectedSegment}
          onChange={(e) => onSegmentChange(e.target.value)}
          input={<OutlinedInput label="Organization Segment" />}
          MenuProps={MENU_PROPS}
          disabled={isLoading}
        >
          {segments.map((segment) => (
            <MenuItem
              key={segment.id}
              value={segment.code}
              style={getMenuItemStyle(segment.code, selectedSegment)}
            >
              {segment.description}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
});

const MUIComponents: React.FC<MUIComponentsProps> = memo((props) => {
  const {
    selectedDate,
    selectedFranchise,
    distributor,
    selectedSegment,
    franchises,
    segments,
    isLoading,
    onDateChange,
    onFranchiseChange,
    onDistributorChange,
    onSegmentChange,
  } = props;

  return (
    <ThemeProvider theme={customDatePickerTheme}>
      <DatePickerField 
        selectedDate={selectedDate} 
        onDateChange={onDateChange} 
      />
      
      <FranchiseSelect
        selectedFranchise={selectedFranchise}
        franchises={franchises}
        onFranchiseChange={onFranchiseChange}
        isLoading={isLoading}
      />
      
      <DistributorSelect
        distributor={distributor}
        onDistributorChange={onDistributorChange}
      />
      
      <SegmentSelect
        selectedSegment={selectedSegment}
        segments={segments}
        onSegmentChange={onSegmentChange}
        isLoading={isLoading}
      />
    </ThemeProvider>
  );
});

DatePickerField.displayName = 'DatePickerField';
FranchiseSelect.displayName = 'FranchiseSelect';
DistributorSelect.displayName = 'DistributorSelect';
SegmentSelect.displayName = 'SegmentSelect';
MUIComponents.displayName = 'MUIComponents';

export default MUIComponents;