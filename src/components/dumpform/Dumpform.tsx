// 'use client';
// import React, { useState, useEffect, use } from 'react';
// import styles from './Dumpform.module.css'
// import axios from 'axios';
// import { format } from 'date-fns';



// // Import additional MUI components for DatePicker
// import {
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   OutlinedInput,
//   useTheme,
//   SelectChangeEvent,
//   TextField,
//   IconButton,
//   InputAdornment,
// } from '@mui/material';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import {
//   ThemeProvider,
//   createTheme,

// } from '@mui/material/styles';
// import { styled } from '@mui/material/styles';
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import dayjs from "dayjs";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// function getStyles(name: string, selected: any, theme: any) {
//   return {
//     fontWeight:
//       selected === name
//         ? theme.typography.fontWeightMedium
//         : theme.typography.fontWeightRegular,
//   };
// }

// // Custom styles for select fields
// const selectFieldStyles = {
//   m: 1,
//   width: 300,
//   '& .MuiOutlinedInput-root': {
//     height: '40px',
//     borderRadius: '8px',
//     '& .MuiOutlinedInput-notchedOutline': {
//       borderRadius: '8px',
//       borderColor: 'rgba(0, 0, 0, 0.23)',
//     },
//     '&:hover .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'rgba(0, 0, 0, 0.87)',
//     },
//     '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       borderColor: 'gray',
//     },
//     // Ensure the content inside the input is vertically centered
//     '& input': {
//       paddingTop: '10px',
//       paddingBottom: '10px',
//     },
//   },
//   '& .MuiInputLabel-root': {
//     color: 'gray',
//     top: '-2px', // move label up to be vertically centered with shorter input
//     transform: 'translate(14px, 12px) scale(1)', // tweak positioning manually
//     '&.MuiInputLabel-shrink': {
//       transform: 'translate(14px, -9px) scale(0.75)', // adjusted for when floating
//     },
//     '&.Mui-focused': {
//       color: 'gray',
//     },
//   }
// };


// // Use global CSS overrides for month and year pickers
// const customTheme = createTheme({
//   components: {
//     //@ts-ignore
//     MuiPickersDay: {
//       styleOverrides: {
//         root: {
//           "&.Mui-selected": {
//             backgroundColor: "red !important",
//             color: "white !important",
//           },
//         },
//       },
//     },
//   },
// });


// const CustomTextField = styled(TextField)({
//   width: "300px",
//   height: "50px",
//   "& label": {
//     color: "gray",
//   },
//   "& label.Mui-focused": {
//     color: "gray",
//   },
//   "& .MuiOutlinedInput-root": {
//     height: "40px",
//     "& fieldset": {
//       borderColor: "#c4c4c4",
//       borderRadius: "8px",
//     },
//     "&:hover fieldset": {
//       borderColor: "darkgray",
//     },
//     "&.Mui-focused fieldset": {
//       borderColor: "gray",
//     },
//   },
// });


// const DumpReportPage = () => {
//   const theme = useTheme();

//   const [selectedDate, setSelectedDate] = useState(dayjs().subtract(30, "day"));
//   // Modified to use Date object for better date handling
//   const [month, setMonth] = useState<Date | null>(null);
//   const [franchise, setFranchise] = useState<{ franchise: string }[]>([]);
//   const [distributor, setDistributor] = useState('');
//   const [errors, setErrors] = useState<{ month?: string; franchise?: string }>({});
//   const [selectedFranchise, setSelectedFranchise] = useState(''); // the selected item
//   const [organizationSegment, setOrganizationSegment] = useState<string[]>([]);
//   const [selectedSegment, setSelectedSegment] = useState(''); // selected item
//   // const [selecteddist, setselecteddist] = useState('All')


//   // Added state for handling calendar open/close
//   const [datePickerOpen, setDatePickerOpen] = useState(false);


//   //api call fro franchies and segment
//   const fetchInitialData = async () => {
//     try {
//       const response = await axios.post('api/formdata/getallfranchise');
//       // console.log('Response:', response.data.result);
//       const franchiseList = response.data.result
//       setFranchise(franchiseList)
//       console.log('FranchiseList List:', franchiseList);
//       // console.log('Franchise List:', franchise);


//       const res = await axios.post('api/formdata/getorgsegment');
//       console.log('Response:', res.data.result);
//       const orgList = res.data.result
//       setOrganizationSegment(orgList)

//     } catch (error) {
//       console.error('Error fetching initial data:', error);
//     }
//   };
//   console.log('Franchise List:', franchise);
//   console.log('Organization Segment List:', organizationSegment);


//   useEffect(() => {

//     fetchInitialData();
//   }, []);


//   // const handleFranchiseChange = (event: SelectChangeEvent) => {
//   //   setFranchise(event.target.value);
//   // };

//   // const handleDistributorChange = (event: SelectChangeEvent) => {
//   //   setDistributor(event.target.value);
//   // };

//   // const handleOrganizationSegmentChange = (event: SelectChangeEvent) => {
//   //   setOrganizationSegment(event.target.value);
//   // };

//   // Handler for date changes
//   const handleDateChange = (newValue: any) => {
//   setSelectedDate(newValue);
//   if (newValue) {
//     const dateObj = new Date(newValue);
//     const firstOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
//     setMonth(firstOfMonth);
//     setErrors((prev) => ({ ...prev, month: undefined }));
//   } else {
//     setMonth(null);
//   }
// };



//   // Format date to display as MMM-YYYY (e.g., Jan-2024)
//   const formatDateDisplay = (date: Date | null): string => {
//     if (!date) return '';

//     // Get month abbreviation (Jan, Feb, etc.) and year
//     const month = date.toLocaleString('en-US', { month: 'short' });
//     const year = date.getFullYear();

//     return `${month}-${year}`;
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       MonthDate: month ? format(month, 'yyyy-MM-dd') : null,
//       franchise: selectedFranchise || null,
//       distributorId: distributor === "ALL" ? "0" : distributor,
//       orgSegment: null,
//     };

//     // Save to localStorage
//     if (typeof window !== "undefined") {
//       localStorage.setItem('formPayload', JSON.stringify(payload));

//       // Open the next page in a new tab
//       window.open('/report', '_blank');
//     }
//   };




//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <h1 className={styles.heading}>Dump Report</h1>
//         <div className={styles.card}>
//           {/* Month picker with calendar icon */}
//           <div className={styles.formGroup}>
//             <label>Month :</label>
//             <LocalizationProvider dateAdapter={AdapterDayjs}>
//               <DemoContainer
//                 components={["DatePicker"]}
//                 sx={{ paddingLeft: "8px" }}
//               >
//                 <DatePicker
//                   label="Month"
//                   value={selectedDate}
//                   onChange={handleDateChange}
//                   format="MMM-YYYY"
//                   views={["month", "year"]}
//                   enableAccessibleFieldDOMStructure={false}
//                   slots={{
//                     textField: (params) => <CustomTextField {...params} />,
//                   }}
//                   slotProps={{
//                     popper: {
//                       modifiers: [
//                         {
//                           name: "offset",
//                           options: {
//                             offset: [0, 10],
//                           },
//                         },
//                       ],
//                       sx: {
//                         height: "300px",

//                         "& .MuiMonthCalendar-button.Mui-focused": {
//                           backgroundColor: "red",
//                           color: "white",
//                           fontWeight: "bold",
//                         },
//                         "& .MuiMonthCalendar-button.Mui-selected": {
//                           backgroundColor: "red",
//                           color: "white",
//                           fontWeight: "bold",
//                         },
//                         "& .MuiYearCalendar-button.Mui-focused": {
//                           backgroundColor: "red",
//                           color: "white",
//                           fontWeight: "bold",
//                         },
//                         "& .MuiYearCalendar-button.Mui-selected": {
//                           backgroundColor: "red",
//                           color: "white",
//                           fontWeight: "bold",
//                         },
//                         "& .MuiPickersYear-year, & .MuiPickersMonth-month": {
//                           fontWeight: 500,
//                         },

//                       },
//                     },
//                   }}
//                 />
//               </DemoContainer>
//             </LocalizationProvider>
//             {errors.month && <p className={styles.error}>{errors.month}</p>}
//           </div>
//           <div className={styles.formGroup}>
//             <label>Franchise :</label>
//             {/* Franchise select with custom styling and blue label */}
//             <FormControl sx={selectFieldStyles}>
//               <InputLabel id="franchise-label">Franchise</InputLabel>
//               <Select
//                 labelId="franchise-label"
//                 id="franchise-select"
//                 value={selectedFranchise}
//                 onChange={(e) => setSelectedFranchise(e.target.value)}
//                 input={<OutlinedInput label="Franchise" />}
//                 MenuProps={MenuProps}
//               >
//                 {franchise.map((item) => (
//                   <MenuItem
//                     key={item.franchise}
//                     value={item.franchise}
//                     style={getStyles(item.franchise, selectedFranchise, theme)}
//                   >
//                     {item.franchise}
//                   </MenuItem>
//                 ))}
//               </Select>

//             </FormControl>
//             {errors.franchise && <p className={styles.error}>{errors.franchise}</p>}
//           </div>

//           <div className={styles.formGroup}>
//             <label>Distributor Name :</label>
//             {/* Distributor select with custom styling and blue label */}
//             {/* <FormControl sx={selectFieldStyles} disabled>
//               <InputLabel id="distributor-label">Distributor</InputLabel>
//               <Select
//                 labelId="distributor-label"
//                 id="distributor-select"
//                 value={'ALL'} // Force value
//                 input={<OutlinedInput label="Distributor" />}
//                 MenuProps={MenuProps}
//               >
//                 <MenuItem value="ALL" style={getStyles("ALL", 'ALL', theme)}>
//                   ALL
//                 </MenuItem>
//               </Select>
//             </FormControl> */}
//             <FormControl sx={selectFieldStyles}>
//               <InputLabel id="distributor-label">Distributor</InputLabel>
//               <Select
//                 labelId="distributor-label"
//                 id="distributor-select"
//                 value={distributor}
//                 onChange={(e) => setDistributor(e.target.value)} // updated
//                 input={<OutlinedInput label="Distributor" />}
//                 MenuProps={MenuProps}
//               >
//                 {/* Add "ALL" option */}
//                 <MenuItem
//                   key="ALL"
//                   value="ALL"
//                   style={getStyles("ALL", distributor, theme)}
//                 >
//                   ALL
//                 </MenuItem>

//                 {/* Add actual distributor options here as needed */}
//                 {['Distributor A', 'Distributor B'].map((name) => (
//                   <MenuItem
//                     key={name}
//                     value={name}
//                     style={getStyles(name, distributor, theme)}
//                   >
//                     {name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>


//           </div>

//           <div className={styles.formGroup}>
//             <label>Organization Segment :</label>
//             {/* Organization segment select with custom styling and blue label */}
//             <FormControl sx={selectFieldStyles}>
//               <InputLabel id="segment-label">Organization Segment</InputLabel>
//               <Select
//                 labelId="segment-label"
//                 id="segment-select"
//                 value={selectedSegment}
//                 onChange={(e) => setSelectedSegment(e.target.value)}
//                 input={<OutlinedInput label="Organization Segment" />}
//                 MenuProps={MenuProps}
//               >
//                 {organizationSegment.map((seg) => (
//                   <MenuItem
//                     //@ts-ignore
//                     key={seg.id}
//                     //@ts-ignore
//                     value={seg.code}
//                     //@ts-ignore
//                     style={getStyles(seg.code, selectedSegment, theme)}

//                   >

//                     {seg.description}
//                   </MenuItem>
//                 ))}
//               </Select>


//             </FormControl>
//           </div>
//         </div>

//         <div className={styles.action}>
//           <button onClick={handleSubmit}>View</button>
//         </div>
//       </main>
//     </div>

//   );
// };

// export default DumpReportPage;















'use client';
import React, { useState, useEffect } from 'react';
import styles from './Dumpform.module.css';
import axios from 'axios';
import { format } from 'date-fns';
 
// MUI components
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  useTheme,
  SelectChangeEvent,
  TextField,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useRouter } from 'next/navigation';
 
// Define types for better type safety
interface Franchise {
  franchise: string;
}
 
interface OrganizationSegment {
  id: string;
  code: string;
  description: string;
}
 
interface FormErrors {
  month?: string;
  franchise?: string;
}
 
interface FormPayload {
  MonthDate: string | null;
  franchise: string | null;
  distributorId: string;
  orgSegment: string | null;
}
 
// Menu props for consistent dropdown behavior
const MENU_PROPS = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8, // ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
      width: 250,
    },
  },
};
 
// Style utility function for menu items
function getMenuItemStyle(name: string, selectedValue: string, theme: ReturnType<typeof useTheme>) {
  return {
    fontWeight:
      selectedValue === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}
 
// Custom styled components
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
    '& input': {
      paddingTop: '10px',
      paddingBottom: '10px',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'gray',
    top: '-2px',
    transform: 'translate(14px, 12px) scale(1)',
    '&.MuiInputLabel-shrink': {
      transform: 'translate(14px, -9px) scale(0.75)',
    },
    '&.Mui-focused': {
      color: 'gray',
    },
  }
};
 
// Custom date picker theme
const customDatePickerTheme = createTheme({
  components: {
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
 
// Styled TextField for date picker
const CustomTextField = styled(TextField)({
  width: "300px",
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
 
const DumpReportPage: React.FC = () => {
  const theme = useTheme();
 
  // State management
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs().subtract(30, "day"));
  const [month, setMonth] = useState<Date | null>(null);
  const [franchiseList, setFranchiseList] = useState<Franchise[]>([]);
  const [selectedFranchise, setSelectedFranchise] = useState<string>('');
  const [distributor, setDistributor] = useState<string>('');
  const [organizationSegments, setOrganizationSegments] = useState<OrganizationSegment[]>([]);
  const [selectedSegment, setSelectedSegment] = useState<string>('');
  const [errors, setErrors] = useState<FormErrors>({});

  const router = useRouter();
 
  // Fetch franchise and organization segment data
  const fetchInitialData = async () => {
    try {
      // Fetch franchises
      const franchiseResponse = await axios.post('/api/formdata/getallfranchise');
      const franchiseData = franchiseResponse.data.result as Franchise[];
      setFranchiseList(franchiseData);
 
      // Fetch organization segments
      const segmentResponse = await axios.post('/api/formdata/getorgsegment');
      const segmentData = segmentResponse.data.result as OrganizationSegment[];
      setOrganizationSegments(segmentData);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      router.push('/error'); // Redirect to error page
    }
  };
 
  useEffect(() => {
    fetchInitialData();
  }, []);
 
  // Handler for date changes
  const handleDateChange = (newValue: Dayjs | null) => {
    if (newValue) {
      setSelectedDate(newValue);
      const dateObj = newValue.toDate();
      const firstOfMonth = new Date(dateObj.getFullYear(), dateObj.getMonth(), 1);
      setMonth(firstOfMonth);
      setErrors((prev) => ({ ...prev, month: undefined }));
    } else {
      setMonth(null);
    }
  };
 
  // Handler for franchise selection
  const handleFranchiseChange = (event: SelectChangeEvent<string>) => {
    setSelectedFranchise(event.target.value);
    setErrors((prev) => ({ ...prev, franchise: undefined }));
  };
 
  // Handler for distributor selection
  const handleDistributorChange = (event: SelectChangeEvent<string>) => {
    setDistributor(event.target.value);
  };
 
  // Handler for segment selection
  const handleSegmentChange = (event: SelectChangeEvent<string>) => {
    setSelectedSegment(event.target.value);
  };
 
  // Form submission handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
 
    // Validate form
    const newErrors: FormErrors = {};
   
    if (!month) {
      newErrors.month = 'Please select a month';
    }
   
    if (!selectedFranchise) {
      newErrors.franchise = 'Please select a franchise';
    }
   
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
 
    // Prepare payload
    const payload: FormPayload = {
      MonthDate: month ? format(month, 'yyyy-MM-dd') : null,
      franchise: selectedFranchise || null,
      distributorId: distributor === "ALL" ? "0" : distributor,
      orgSegment: selectedSegment || null,
    };
 
    // Save to localStorage and open report
    if (typeof window !== "undefined") {
      localStorage.setItem('formPayload', JSON.stringify(payload));
      window.open('/report', '_blank');
    }
  };
 
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Dump Report</h1>
        <div className={styles.card}>
          {/* Month picker */}
          <div className={styles.formGroup}>
            <label>Month:</label>
            <ThemeProvider theme={customDatePickerTheme}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]} sx={{ paddingLeft: "8px" }}>
                  <DatePicker
                    label="Month"
                    value={selectedDate}
                    onChange={handleDateChange}
                    format="MMM-YYYY"
                    views={["month", "year"]}
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
                          "& .MuiMonthCalendar-button.Mui-focused": {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                          },
                          "& .MuiMonthCalendar-button.Mui-selected": {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                          },
                          "& .MuiYearCalendar-button.Mui-focused": {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                          },
                          "& .MuiYearCalendar-button.Mui-selected": {
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "bold",
                          },
                          "& .MuiPickersYear-year, & .MuiPickersMonth-month": {
                            fontWeight: 500,
                          },
                        },
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </ThemeProvider>
            {errors.month && <p className={styles.error}>{errors.month}</p>}
          </div>
 
          {/* Franchise dropdown */}
          <div className={styles.formGroup}>
            <label>Franchise:</label>
            <FormControl sx={selectFieldStyles}>
              <InputLabel id="franchise-label">Franchise</InputLabel>
              <Select
                labelId="franchise-label"
                id="franchise-select"
                value={selectedFranchise}
                onChange={handleFranchiseChange}
                input={<OutlinedInput label="Franchise" />}
                MenuProps={MENU_PROPS}
              >
                {franchiseList.map((item) => (
                  <MenuItem
                    key={item.franchise}
                    value={item.franchise}
                    style={getMenuItemStyle(item.franchise, selectedFranchise, theme)}
                  >
                    {item.franchise}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.franchise && <p className={styles.error}>{errors.franchise}</p>}
          </div>
 
          {/* Distributor dropdown */}
          <div className={styles.formGroup}>
            <label>Distributor Name:</label>
            <FormControl sx={selectFieldStyles}>
              <InputLabel id="distributor-label">Distributor</InputLabel>
              <Select
                labelId="distributor-label"
                id="distributor-select"
                value={distributor}
                onChange={handleDistributorChange}
                input={<OutlinedInput label="Distributor" />}
                MenuProps={MENU_PROPS}
              >
                <MenuItem
                  key="ALL"
                  value="ALL"
                  style={getMenuItemStyle("ALL", distributor, theme)}
                >
                  ALL
                </MenuItem>
                {['Distributor A', 'Distributor B'].map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getMenuItemStyle(name, distributor, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
 
          {/* Organization Segment dropdown */}
          <div className={styles.formGroup}>
            <label>Organization Segment:</label>
            <FormControl sx={selectFieldStyles}>
              <InputLabel id="segment-label">Organization Segment</InputLabel>
              <Select
                labelId="segment-label"
                id="segment-select"
                value={selectedSegment}
                onChange={handleSegmentChange}
                input={<OutlinedInput label="Organization Segment" />}
                MenuProps={MENU_PROPS}
              >
                {organizationSegments.map((segment) => (
                  <MenuItem
                    key={segment.id}
                    value={segment.code}
                    style={getMenuItemStyle(segment.code, selectedSegment, theme)}
                  >
                    {segment.description}
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