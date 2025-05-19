"use client";
import React, { useState, useEffect } from "react";
import styles from "./Dumpform.module.css";
import axios from "axios";
import { format } from "date-fns";

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
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";

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
  MenuListProps: {
    style: {
      padding: '4px 0', // Reduce padding around the menu list
    },
  },
};

// Style utility function for menu items
function getMenuItemStyle(
  name: string,
  selectedValue: string,
  theme: ReturnType<typeof useTheme>
) {
  return {
    fontWeight:
      selectedValue === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
    padding: '8px 16px', // Adjust padding for each menu item
    minHeight: '20px', // Set a consistent height for menu items
    display: 'flex',
    alignItems: 'center',
    fontSize: '14px',
    
  };
}

// Custom styled components
const selectFieldStyles = {
  m: 1,
  width: 300,
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
    // Add these additional component overrides
    MuiButtonBase: {
      styleOverrides: {
        root: {
          "&.MuiPickersMonth-root.Mui-selected": {
            backgroundColor: "red !important",
            color: "white !important",
          },
          "&.MuiPickersYear-root.Mui-selected": {
            backgroundColor: "red !important",
            color: "white !important",
          },
        },
      },
    },
    MuiYearCalendar: {
      styleOverrides: {
        root: {
          "& .MuiPickersYear-yearButton.Mui-selected": {
            backgroundColor: "red !important",
            color: "white !important",
          },
        },
      },
    },
    MuiMonthCalendar: {
      styleOverrides: {
        root: {
          "& .MuiPickersMonth-monthButton.Mui-selected": {
            backgroundColor: "red !important",
            color: "white !important",
          },
        },
      },
    },
    // Customize dropdown menu styling
    MuiList: {
      styleOverrides: {
        root: {
          padding: '4px 0',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          minHeight: '35px',
          padding: '6px 16px',
          '&.Mui-selected': {
            backgroundColor: 'rgba(0, 0, 0, 0.08)',
          },
          '&.Mui-selected:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.12)',
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
  const [selectedDate, setSelectedDate] = useState<Dayjs>(
    dayjs().subtract(30, "day")
  );
  const [month, setMonth] = useState<Date | null>(null);
  const [franchiseList, setFranchiseList] = useState<Franchise[]>([]);
  const [selectedFranchise, setSelectedFranchise] = useState<string>("");
  const [distributor, setDistributor] = useState<string>("");
  const [organizationSegments, setOrganizationSegments] = useState<
    OrganizationSegment[]
  >([]);
  const [selectedSegment, setSelectedSegment] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

  // Fetch franchise and organization segment data
  const fetchInitialData = async () => {
    try {
      // Fetch franchises
      const franchiseResponse = await axios.post(
        "/api/formdata/getallfranchise"
      );
      const franchiseData = franchiseResponse.data.result as Franchise[];
      setFranchiseList(franchiseData);

      // Fetch organization segments
      const segmentResponse = await axios.post("/api/formdata/getorgsegment");
      const segmentData = segmentResponse.data.result as OrganizationSegment[];
      setOrganizationSegments(segmentData);
    } catch (error) {
      console.error("Error fetching initial data:", error);
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
      const firstOfMonth = new Date(
        dateObj.getFullYear(),
        dateObj.getMonth(),
        1
      );
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
      newErrors.month = "Please select a month";
    }

    if (!selectedFranchise) {
      newErrors.franchise = "Please select a franchise";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Prepare payload
    const payload: FormPayload = {
      MonthDate: month ? format(month, "yyyy-MM-dd") : null,
      franchise: selectedFranchise || null,
      distributorId: distributor === "ALL" ? "0" : distributor,
      orgSegment: selectedSegment || null,
    };

    // Save to localStorage and open report
    if (typeof window !== "undefined") {
      localStorage.setItem("formPayload", JSON.stringify(payload));
      window.open("/report", "_blank");
    }
  };

  return (
    <ThemeProvider theme={customDatePickerTheme}>
      <div className={styles.container}>
        <main className={styles.main}>
          <h1 className={styles.heading}>Dump Report</h1>
          <div className={styles.card}>
            {/* Month picker */}
            <div className={styles.formGroup}>
              <label>Month:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker"]}
                  sx={{ paddingLeft: "8px" }}
                >
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
                          "& .MuiPickersYear-yearButton.Mui-selected": {
                            backgroundColor: "red !important",
                            color: "white !important",
                          },
                          "& .MuiPickersMonth-monthButton.Mui-selected": {
                            backgroundColor: "red !important",
                            color: "white !important",
                          },
                          "& .MuiYearCalendar-root .Mui-selected": {
                            backgroundColor: "red !important",
                            color: "white !important",
                          },
                          "& .MuiMonthCalendar-root .Mui-selected": {
                            backgroundColor: "red !important",
                            color: "white !important",
                          },
                        },
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
                      style={getMenuItemStyle(
                        item.franchise,
                        selectedFranchise,
                        theme
                      )}
                    >
                      {item.franchise}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.franchise && (
                <p className={styles.error}>{errors.franchise}</p>
              )}
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
                  {["Distributor A", "Distributor B"].map((name) => (
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
                      style={getMenuItemStyle(
                        segment.code,
                        selectedSegment,
                        theme
                      )}
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
    </ThemeProvider>
  );
};

export default DumpReportPage;