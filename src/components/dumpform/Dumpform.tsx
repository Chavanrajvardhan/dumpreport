'use client';
import React, { useState, useEffect } from 'react';
import styles from './Dumpform.module.css'
import axios from 'axios';


// Import additional MUI components for DatePicker
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  useTheme,
  SelectChangeEvent,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {
  ThemeProvider,
  createTheme,
  StyledEngineProvider,
} from '@mui/material/styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, selected: any, theme: any) {
  return {
    fontWeight:
      selected === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

// Custom styles for select fields
const selectFieldStyles = {
  m: 1,
  width: 300,
  '& .MuiOutlinedInput-root': {
    height: '40px',
    borderRadius: '8px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '8px',
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray',
    },
    // Ensure the content inside the input is vertically centered
    '& input': {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'gray',
    top: '-2px', // move label up to be vertically centered with shorter input
    transform: 'translate(14px, 12px) scale(1)', // tweak positioning manually
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)', // adjusted for when floating
    },
    '&.Mui-focused': {
      color: 'gray',
    },
  }
};

// Custom styles for DatePicker field
const datePickerStyles = {
  m: 1,
  width: 300,
  '& .MuiOutlinedInput-root': {
    height: '20px',
    borderRadius: '50px',
    '& .MuiOutlinedInput-notchedOutline': {
      borderRadius: '50px',
      borderColor: 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    // Target the focused state AND the outline specifically
    '&.Mui-focused > .MuiOutlinedInput-notchedOutline': {
      borderColor: 'gray !important',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'gray',
    '&.Mui-focused': {
      color: 'gray !important',
    },
  },
  '& .MuiFormLabel-root.Mui-error': {
    color: 'gray !important',
  },
  '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
    borderColor: 'gray !important',
  },
};

// Use global CSS overrides for month and year pickers
const customTheme = createTheme({
  components: {
    //@ts-ignore
    MuiPickersDay: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: "red !important",
            color: "white !important",
          },
        },
      },
    },
  },
});

// Updated CSS for better calendar layout
const injectGlobalStyles = `
  /* Style for selected months and years */
  .MuiMonthPicker-root .MuiPickersMonth-root.Mui-selected,
  .MuiYearPicker-root .MuiPickersYear-root.Mui-selected,
  .MuiMonthCalendar-root .Mui-selected,
  .MuiYearCalendar-root .Mui-selected,
  .css-1u23akw-MuiButtonBase-root-MuiPickersDay-root.Mui-selected {
    background-color: red !important;
    color: white !important;
    font-weight: bold !important;
  }
 
  /* Style for the calendar popup - different sizes for year and month views */
  .MuiPaper-root.MuiPickersPopper-paper,
  .MuiDialog-paper,
  .MuiPickersPopper-paper,
  .MuiPaper-root.MuiDialog-paper,
  .MuiPaper-root.MuiPopover-paper {
    border-radius: 16px !important;
    overflow: hidden !important;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
  }
 
  /* Month view - compact with proper padding */
  .MuiMonthCalendar-root {
    width: 280px !important;
    max-width: 280px !important;
    margin: 0 auto !important;
    padding: 8px !important;
  }
 
  /* Year view - larger size */
  .MuiYearCalendar-root {
    min-width: 320px !important;
    margin: 0 auto !important;
    padding: 16px !important;
  }
 
  /* Year buttons styling */
  .MuiPickersYear-yearButton {
    margin: 4px !important;
    padding: 6px 8px !important;
  }
 
  /* Month buttons styling */
  .MuiPickersMonth-monthButton {
    margin: 4px !important;
    padding: 6px 8px !important;
  }
 
  /* Calendar container - general improvements */
  .MuiCalendarOrClockPicker-root,
  .MuiCalendarPicker-root,
  .MuiPickersCalendarHeader-root,
  .MuiDateCalendar-root {
    margin: 0 auto !important;
  }
 
  /* Make the container horizontally centered */
  .MuiPickersCalendarHeader-root {
    margin: 0 auto !important;
    padding: 8px !important;
    justify-content: center !important;
  }
 
  /* Style for month/year view headers */
  .MuiPickersCalendarHeader-label {
    font-weight: bold !important;
    font-size: 1rem !important;
    color: black !important;
  }
`;

const DumpReportPage = () => {
  const theme = useTheme();

  // Modified to use Date object for better date handling
  const [month, setMonth] = useState<Date | null>(null);
  const [franchise, setFranchise] = useState<{ franchise: string }[]>([]);
  const [distributor, setDistributor] = useState([]);
  const [errors, setErrors] = useState<{ month?: string; franchise?: string }>({});
  const [selectedFranchise, setSelectedFranchise] = useState(''); // the selected item
  const [organizationSegment, setOrganizationSegment] = useState<string[]>([]);
  const [selectedSegment, setSelectedSegment] = useState(''); // selected item


  // Added state for handling calendar open/close
  const [datePickerOpen, setDatePickerOpen] = useState(false);


  //api call fro franchies and segment
  const fetchInitialData = async () => {
    try {
      const response = await axios.post('api/formdata/getallfranchise');
      // console.log('Response:', response.data.result);
      const franchiseList = response.data.result
      setFranchise(franchiseList)
      console.log('FranchiseList List:', franchiseList);
      // console.log('Franchise List:', franchise);


      const res = await axios.post('api/formdata/getorgsegment');
      console.log('Response:', res.data.result);
      const orgList = res.data.result
      setOrganizationSegment(orgList)

    } catch (error) {
      console.error('Error fetching initial data:', error);
    }
  };
  console.log('Franchise List:', franchise);
  console.log('Organization Segment List:', organizationSegment);


  useEffect(() => {

    fetchInitialData();
  }, []);


  // const handleFranchiseChange = (event: SelectChangeEvent) => {
  //   setFranchise(event.target.value);
  // };

  // const handleDistributorChange = (event: SelectChangeEvent) => {
  //   setDistributor(event.target.value);
  // };

  // const handleOrganizationSegmentChange = (event: SelectChangeEvent) => {
  //   setOrganizationSegment(event.target.value);
  // };

  // Handler for date changes
  const handleDateChange = (newDate: Date | null) => {
    setMonth(newDate);
    // Clear the error when a date is selected
    if (newDate) {
      setErrors((prev) => ({ ...prev, month: undefined }));
    }
  };

  // Format date to display as MMM-YYYY (e.g., Jan-2024)
  const formatDateDisplay = (date: Date | null): string => {
    if (!date) return '';

    // Get month abbreviation (Jan, Feb, etc.) and year
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();

    return `${month}-${year}`;
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};
    if (!month) newErrors.month = 'Month is required';
    if (!franchise) newErrors.franchise = 'Franchise is required';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Format the date in MMM-YYYY format for the alert demonstration
      const formattedDate = formatDateDisplay(month);

      alert(`Form submitted with date: ${formattedDate}, franchise: ${franchise}`);
    }
  };

  // Add global styles to head
  React.useEffect(() => {
    // Create style element
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = injectGlobalStyles;

    // Append to head
    document.head.appendChild(style);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Dump Report</h1>
        <div className={styles.card}>
          {/* Month picker with calendar icon */}
          <div className={styles.formGroup}>
            <label>Month :</label>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={customTheme}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    views={['month', 'year']}
                    label="Select Month and Year"
                    value={month}
                    onChange={handleDateChange}
                    open={datePickerOpen}
                    onClose={() => setDatePickerOpen(false)}
                    openTo="month"
                    slotProps={{
                      textField: {
                        sx: {
                          ...datePickerStyles,

                          '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'gray !important',
                          },
                          '& .MuiInputLabel-root.Mui-focused': {
                            color: 'gray !important',
                          },
                        },
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={() => setDatePickerOpen(true)}>
                                <CalendarMonthIcon />
                              </IconButton>
                            </InputAdornment>
                          ),
                        },
                      },
                      // Better sizing for the popper
                      popper: {
                        sx: {
                          '& .MuiPaper-root': {
                            borderRadius: '16px',
                          },
                        },
                      },
                    }}
                    format="MMM-yyyy"
                  />
                </LocalizationProvider>
              </ThemeProvider>
            </StyledEngineProvider>
            {errors.month && <p className={styles.error}>{errors.month}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Franchise :</label>
            {/* Franchise select with custom styling and blue label */}
            <FormControl sx={selectFieldStyles}>
              <InputLabel id="franchise-label">Franchise</InputLabel>
              <Select
                labelId="franchise-label"
                id="franchise-select"
                value={selectedFranchise}
                onChange={(e) => setSelectedFranchise(e.target.value)}
                input={<OutlinedInput label="Franchise" />}
                MenuProps={MenuProps}
              >
                {franchise.map((item) => (
                  <MenuItem
                    key={item.franchise}
                    value={item.franchise}
                    style={getStyles(item.franchise, selectedFranchise, theme)}
                  >
                    {item.franchise}
                  </MenuItem>
                ))}
              </Select>

            </FormControl>
            {errors.franchise && <p className={styles.error}>{errors.franchise}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Distributor Name :</label>
            {/* Distributor select with custom styling and blue label */}
            <FormControl sx={selectFieldStyles}>
              <InputLabel id="distributor-label">Distributor</InputLabel>
              <Select
                labelId="distributor-label"
                id="distributor-select"
                value={distributor}
                // onChange={handleDistributorChange}
                input={<OutlinedInput label="Distributor" />}
                MenuProps={MenuProps}
              >
                {['ALL'].map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, distributor, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className={styles.formGroup}>
            <label>Organization Segment :</label>
            {/* Organization segment select with custom styling and blue label */}
            <FormControl sx={selectFieldStyles}>
              <InputLabel id="segment-label">Organization Segment</InputLabel>
              <Select
                labelId="segment-label"
                id="segment-select"
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                input={<OutlinedInput label="Organization Segment" />}
                MenuProps={MenuProps}
              >
                {organizationSegment.map((seg) => (
                  <MenuItem
                    key={seg.id}
                    value={seg.code}
                    style={getStyles(seg.code, selectedSegment, theme)}
                  >
                    {seg.description}
                  </MenuItem>
                ))}
              </Select>


            </FormControl>
          </div>
        </div>

        <div className={styles.action}>
          <button onClick={handleSubmit}>View</button>
        </div>
      </main>
    </div>

  );
};

export default DumpReportPage;