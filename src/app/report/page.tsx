'use client'

import Image from 'next/image';
import * as React from 'react';
import { DataGrid, GridColDef, GridRowId } from '@mui/x-data-grid';
import classess from "../login/loginCss.module.css";
import axios from 'axios';
// icons
import FilterListIcon from '@mui/icons-material/FilterList';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Popover from '@mui/material/Popover';
import CircularProgress from '@mui/material/CircularProgress';
import * as XLSX from 'xlsx';
import { useRouter } from 'next/navigation';

export interface DataRowModel {
  id: GridRowId;
  [price: string]: number | string;
}

export interface GridData {
  columns: GridColDef[];
  rows: DataRowModel[];
}

// Helper function to capitalize first letter of string
const capitalizeFirstLetter = (value: any): any => {
  if (typeof value !== 'string' || value === '-') return value;
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const formatToCustomDate = (dateString: string): string => {
  if (!dateString || dateString === '-') return dateString;

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date

    // Get day with leading zero
    const day = String(date.getDate()).padStart(2, '0');

    // Get month name abbreviated
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];

    // Get full year
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString; // Return original on error
  }
};

// Helper function to format month in MMM-YYYY format
const formatMonthYear = (dateString: string): string => {
  if (!dateString || dateString === '-') return dateString;

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString; // Return original if invalid date

    // Get month name abbreviated
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[date.getMonth()];

    // Get full year
    const year = date.getFullYear();

    return `${month}-${year}`;
  } catch (error) {
    console.error("Error formatting month-year:", error);
    return dateString; // Return original on error
  }
};

// Custom header mappings (add more as needed)
const customHeaderMappings: Record<string, string> = {
  'franchise': 'Franchise',
  'subFranchise': 'Sub Franchise',
  'documentType': 'Document Type',
  'dataMonth': 'Data Month',
  'documentNumber': 'Document Number',
  'billDocDate': 'Bill Doc Date',
  'distributorRegion': 'Distributor Region',
  'distributorCode': 'Distributor Code',
  'distributorName': 'Distributor Name',
  'distributorCity': 'Distributor City',
  'distributorState': 'Distributor State',
  'distributorGroup': 'Distributor Group',
  'accountCode': 'Account Code',
  'accountName': 'Account Name',
  'accountClassification': 'Account Classification',
  'accountCity': 'Account City',
  'accountState': 'Account State',
  'accountRegion': 'Account Region',
  'accountGroup': 'Account Group',
  'accountType': 'Account Type',
  'accountSegmentation': 'Account Segmentation',
  'accountCityTier': 'Account City Tier',
  'isActive': 'Is Active',
  'surgeonCode': 'Surgeon Code',
  'surgeonName': 'Surgeon Name',
  'dateOfSurgery': 'Date Of Surgery',
  'wwidForFieldStaffByDist': 'WWID For Field Staff By Dist',
  'nameOfFieldStaffByDist': 'Name Of Field Staff By Dist',
  'dpPriceSeqId': 'DP Price Seq Id',
  'region': 'Region',
  'fswwid': 'FS WWID',
  'fieldStaffName': 'Field Staff Name',
  'fsTerritory': 'FS Territory',
  'suwwid': 'SU WWID',
  'supervisorName': 'Supervisor Name',
  'suTerritory': 'SU Territory',
  'rsmwwid': 'RSM WWID',
  'rsmName': 'RSM Name',
  'rsmTerritory': 'RSM Territory',
  'productCode': 'Product Code',
  'productDescription': 'Product Description',
  'uom': 'UOM',
  'conversionFactor': 'Conversion Factor',
  'reportingUOM': 'Reporting UOM',
  'quantity': 'Quantity',
  'jjmiStandardPrice': 'JJMI Standard Price',
  'distributorPurchasePrice': 'Distributor Purchase Price',
  'distributorGrossPurchasePrice': 'Distributor Gross Purchase Price',
  'distributorGrossPurchaseValue': 'Distributor Gross Purchase Value',
  'productCategory': 'Product Category',
  'productBrand': 'Product Brand',
  'productGroup': 'Product Group',
  'productLine': 'Product Line',
  'batchNo': 'Batch No',
  'dealerEndCustomerPrice': 'Dealer End Customer Price',
  'stdNRToDealer': 'STD NR To Dealer',
  'stdNRFromTemplate': 'STD NR From Template',
  'totalJnjSaleValueToDealer': 'Total JNJ Sale Value To Dealer',
  'totalDealerSaleValueToCustomer': 'Total Dealer Sale Value To Customer',
  'diffActualNRSTD': 'Diff Actual NR STD',
  'totalDiff': 'Total Diff',
  'finalSaleValue': 'Final Sale Value',
  'finalTotalSaleValue': 'Final Total Sale Value',
  'distributorMargin': 'Distributor Margin',
  'sraNo': 'SRA No',
  'sraEffectiveFromDate': 'SRA Effective From Date',
  'sraEffectiveToDate': 'SRA Effective To Date',
  'sraFinalApprovedDate': 'SRA Final Approved Date',
  'surgeryWithinSRAPeriod': 'Surgery Within SRA Period',
  'remark': 'Remark',
  'orgSegment': 'Org Segment',
  'territorySeqNo': 'Territory Seq No',
  'materialNumber': 'Material Number',
  'materialDescription': 'Material Description',
  'plant': 'Plant',
  'storage': 'Storage Location',
  'batch': 'Batch',
  'expiryDate': 'Expiry Date',
  'value': 'Value',
  'reason': 'Reason',
  'disposalDate': 'Disposal Date'
};

const dateColumnFields = [
  'dataMonth',
  'billDocDate',
  'dateOfSurgery',
  'sraEffectiveFromDate',
  'sraEffectiveToDate',
  'sraFinalApprovedDate',
  'expiryDate',
  'disposalDate'
];

// Default columns that will show immediately on render
  //@ts-ignore
const defaultColumns: GridColDef[] = [
  { field: 'franchise', headerName: customHeaderMappings['franchise'] || 'Franchise', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'subFranchise', headerName: customHeaderMappings['subFranchise'] || 'Sub Franchise', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'documentType', headerName: customHeaderMappings['documentType'] || 'Document Type', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'dataMonth', headerName: customHeaderMappings['dataMonth'] || 'Data Month', width: 140, align: 'center', headerAlign: 'center' },
  { field: 'documentNumber', headerName: customHeaderMappings['documentNumber'] || 'Document Number', width: 170, align: 'center', headerAlign: 'center' },
  { field: 'billDocDate', headerName: customHeaderMappings['billDocDate'] || 'Bill Doc Date', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'distributorRegion', headerName: customHeaderMappings['distributorRegion'] || 'Distributor Region', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'distributorCode', headerName: customHeaderMappings['distributorCode'] || 'Distributor Code', width: 170, align: 'center', headerAlign: 'center' },
  { field: 'distributorName', headerName: customHeaderMappings['distributorName'] || 'Distributor Name', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'distributorCity', headerName: customHeaderMappings['distributorCity'] || 'Distributor City', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'distributorState', headerName: customHeaderMappings['distributorState'] || 'Distributor State', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'distributorGroup', headerName: customHeaderMappings['distributorGroup'] || 'Distributor Group', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'accountCode', headerName: customHeaderMappings['accountCode'] || 'Account Code', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'accountName', headerName: customHeaderMappings['accountName'] || 'Account Name', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'accountClassification', headerName: customHeaderMappings['accountClassification'] || 'Account Classification', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'accountCity', headerName: customHeaderMappings['accountCity'] || 'Account City', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'accountState', headerName: customHeaderMappings['accountState'] || 'Account State', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'accountRegion', headerName: customHeaderMappings['accountRegion'] || 'Account Region', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'accountGroup', headerName: customHeaderMappings['accountGroup'] || 'Account Group', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'accountType', headerName: customHeaderMappings['accountType'] || 'Account Type', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'accountSegmentation', headerName: customHeaderMappings['accountSegmentation'] || 'Account Segmentation', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'accountCityTier', headerName: customHeaderMappings['accountCityTier'] || 'Account City Tier', width: 170, align: 'center', headerAlign: 'center' },
  { field: 'isActive', headerName: customHeaderMappings['isActive'] || 'Is Active', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'surgeonCode', headerName: customHeaderMappings['surgeonCode'] || 'Surgeon Code', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'surgeonName', headerName: customHeaderMappings['surgeonName'] || 'Surgeon Name', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'dateOfSurgery', headerName: customHeaderMappings['dateOfSurgery'] || 'Date Of Surgery', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'wwidForFieldStaffByDist', headerName: customHeaderMappings['wwidForFieldStaffByDist'] || 'WWID For Field Staff By Dist', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'nameOfFieldStaffByDist', headerName: customHeaderMappings['nameOfFieldStaffByDist'] || 'Name Of Field Staff By Dist', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'dpPriceSeqId', headerName: customHeaderMappings['dpPriceSeqId'] || 'DP Price Seq Id', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'region', headerName: customHeaderMappings['region'] || 'Region', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'fswwid', headerName: customHeaderMappings['fswwid'] || 'FS WWID', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'fieldStaffName', headerName: customHeaderMappings['fieldStaffName'] || 'Field Staff Name', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'fsTerritory', headerName: customHeaderMappings['fsTerritory'] || 'FS Territory', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'suwwid', headerName: customHeaderMappings['suwwid'] || 'SU WWID', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'supervisorName', headerName: customHeaderMappings['supervisorName'] || 'Supervisor Name', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'suTerritory', headerName: customHeaderMappings['suTerritory'] || 'SU Territory', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'rsmwwid', headerName: customHeaderMappings['rsmwwid'] || 'RSM WWID', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'rsmName', headerName: customHeaderMappings['rsmName'] || 'RSM Name', width: 140, align: 'center', headerAlign: 'center' },
  { field: 'rsmTerritory', headerName: customHeaderMappings['rsmTerritory'] || 'RSM Territory', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'productCode', headerName: customHeaderMappings['productCode'] || 'Product Code', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'productDescription', headerName: customHeaderMappings['productDescription'] || 'Product Description', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'uom', headerName: customHeaderMappings['uom'] || 'UOM', width: 100, align: 'center', headerAlign: 'center' },
  { field: 'conversionFactor', headerName: customHeaderMappings['conversionFactor'] || 'Conversion Factor', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'reportingUOM', headerName: customHeaderMappings['reportingUOM'] || 'Reporting UOM', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'quantity', headerName: customHeaderMappings['quantity'] || 'Quantity', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'jjmiStandardPrice', headerName: customHeaderMappings['jjmiStandardPrice'] || 'JJMI Standard Price', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'distributorPurchasePrice', headerName: customHeaderMappings['distributorPurchasePrice'] || 'Distributor Purchase Price', width: 220, align: 'center', headerAlign: 'center' },
  { field: 'distributorGrossPurchasePrice', headerName: customHeaderMappings['distributorGrossPurchasePrice'] || 'Distributor Gross Purchase Price', width: 250, align: 'center', headerAlign: 'center' },
  { field: 'distributorGrossPurchaseValue', headerName: customHeaderMappings['distributorGrossPurchaseValue'] || 'Distributor Gross Purchase Value', width: 250, align: 'center', headerAlign: 'center' },
  { field: 'productCategory', headerName: customHeaderMappings['productCategory'] || 'Product Category', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'productBrand', headerName: customHeaderMappings['productBrand'] || 'Product Brand', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'productGroup', headerName: customHeaderMappings['productGroup'] || 'Product Group', width: 160, align: 'center', headerAlign: 'center' },
  { field: 'productLine', headerName: customHeaderMappings['productLine'] || 'Product Line', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'batchNo', headerName: customHeaderMappings['batchNo'] || 'Batch No', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'dealerEndCustomerPrice', headerName: customHeaderMappings['dealerEndCustomerPrice'] || 'Dealer End Customer Price', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'stdNRToDealer', headerName: customHeaderMappings['stdNRToDealer'] || 'STD NR To Dealer', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'stdNRFromTemplate', headerName: customHeaderMappings['stdNRFromTemplate'] || 'STD NR From Template', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'totalJnjSaleValueToDealer', headerName: customHeaderMappings['totalJnjSaleValueToDealer'] || 'Total JNJ Sale Value To Dealer', width: 250, align: 'center', headerAlign: 'center' },
  { field: 'totalDealerSaleValueToCustomer', headerName: customHeaderMappings['totalDealerSaleValueToCustomer'] || 'Total Dealer Sale Value To Customer', width: 270, align: 'center', headerAlign: 'center' },
  { field: 'diffActualNRSTD', headerName: customHeaderMappings['diffActualNRSTD'] || 'Diff Actual NR STD', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'totalDiff', headerName: customHeaderMappings['totalDiff'] || 'Total Diff', width: 140, align: 'center', headerAlign: 'center' },
  { field: 'finalSaleValue', headerName: customHeaderMappings['finalSaleValue'] || 'Final Sale Value', width: 170, align: 'center', headerAlign: 'center' },
  { field: 'finalTotalSaleValue', headerName: customHeaderMappings['finalTotalSaleValue'] || 'Final Total Sale Value', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'distributorMargin', headerName: customHeaderMappings['distributorMargin'] || 'Distributor Margin', width: 180, align: 'center', headerAlign: 'center' },
  { field: 'sraNo', headerName: customHeaderMappings['sraNo'] || 'SRA No', width: 120, align: 'center', headerAlign: 'center' },
  { field: 'sraEffectiveFromDate', headerName: customHeaderMappings['sraEffectiveFromDate'] || 'SRA Effective From Date', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'sraEffectiveToDate', headerName: customHeaderMappings['sraEffectiveToDate'] || 'SRA Effective To Date', width: 200, align: 'center', headerAlign: 'center' },
  { field: 'sraFinalApprovedDate', headerName: customHeaderMappings['sraFinalApprovedDate'] || 'SRA Final Approved Date', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'surgeryWithinSRAPeriod', headerName: customHeaderMappings['surgeryWithinSRAPeriod'] || 'Surgery Within SRA Period', width: 230, align: 'center', headerAlign: 'center' },
  { field: 'remark', headerName: customHeaderMappings['remark'] || 'Remark', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'orgSegment', headerName: customHeaderMappings['orgSegment'] || 'Org Segment', width: 150, align: 'center', headerAlign: 'center' },
  { field: 'territorySeqNo', headerName: customHeaderMappings['territorySeqNo'] || 'Territory Seq No', width: 180, align: 'center', headerAlign: 'center' }
].map(column => {
  if (dateColumnFields.includes(column.field)) {
    return {
      ...column,
        //@ts-ignore
      valueFormatter: (params) => formatToCustomDate(params.value)
    };
  }
  return column;
});;

function useData(rowLength: number, columnLength: number) {
    //@ts-ignore
  const [data, setData] = React.useState<GridData>({ columns: defaultColumns, rows: [] });
  const [payloadInfo, setPayloadInfo] = React.useState<{ franchise?: string, MonthDate?: string }>({});
  const [totalCount, setTotalCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const router = useRouter();

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        // Retrieve from localStorage
        const storedPayload = localStorage.getItem('formPayload');
        let payload = storedPayload ? JSON.parse(storedPayload) : {};

        // Replace null with 0
        payload = Object.fromEntries(
          Object.entries(payload).map(([key, value]) => [key, value === null ? 0 : value])
        );

        console.log("Payload", payload);

        // Set payload info for UI
        setPayloadInfo({
          franchise: payload.franchise,
          MonthDate: payload.MonthDate
        });

        // Send to API
        const response = await axios.post('/api/report', payload);
        let rawData = response.data.result;

        if (Array.isArray(rawData) && rawData.length > 0) {
          // Get all the column keys from the first data row
          const allKeys = Object.keys(rawData[0]);

          // ✅ FIXED: Skip only the first 3 columns, not rows
          // This will start displaying from the 4th column onward (index 3 and greater)
          const columnsToSkip = 3;
          const displayKeys = allKeys.slice(columnsToSkip);

          // Create a filtered version of the default columns that only includes
          // fields that exist in the data
          const filteredColumns = defaultColumns.filter(col =>
            displayKeys.includes(col.field)
          );

          // Build rows using actual data fields
          const rows = rawData.map((row, index) => {
            const formattedRow: any = { id: index };
            for (const key of displayKeys) {
              if (key === 'dataMonth') {
                formattedRow[key] = formatMonthYear(row[key] ?? '-');
              } else if (key.toLowerCase().includes('date')) {
                formattedRow[key] = formatToCustomDate(row[key] ?? '-');
              } else {
                formattedRow[key] = row[key] ?? '-';
              }
            }
            return formattedRow;
          });
            //@ts-ignore
          setData({ columns: filteredColumns, rows });
          setTotalCount(rawData.length);
        } else {
          console.warn('Empty or invalid data from API');
            //@ts-ignore
          setData(prevData => ({ columns: prevData.columns, rows: [] }));
          setTotalCount(0);
        }
      } catch (error) {
        console.error('Failed to load data:', error);
        router.push('/error'); 
          //@ts-ignore
        setData(prevData => ({ columns: prevData.columns, rows: [] }));
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return { data, payloadInfo, totalCount, isLoading };
}


export default function ColumnVirtualizationGrid() {
  const { data, payloadInfo, totalCount, isLoading } = useData(100, 1000)
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [searchText, setSearchText] = React.useState('');

  // Format for franchise and month display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleString('default', { month: 'short', year: 'numeric' }); // e.g., "Jan 2025"
  };

  // Handle popover open and close
  const handleExportClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'export-popover' : undefined;

  const exportToExcel = () => {
    handleClose();

    if (!data.rows || data.rows.length === 0) {
      console.warn("No data to export");
      return;
    }

    try {
      // Format data for Excel - remove the 'id' property which is only for the grid
      const exportData = data.rows.map(row => {
        const rowData: any = {};
        data.columns.forEach(col => {
          const value = row[col.field];
          if (col.field === 'dataMonth') {
              //@ts-ignore
            rowData[col.field] = formatMonthYear(value);
          } else if (col.field.toLowerCase().includes('date')) {
              //@ts-ignore
            rowData[col.field] = formatToCustomDate(value);
          } else {
            rowData[col.field] = typeof value === 'string' ? capitalizeFirstLetter(value) : value;
          }
        });
        return rowData;
      });

      const ws = XLSX.utils.json_to_sheet(exportData);

      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Data");

      const fileName = `DumpReport_${payloadInfo.franchise || 'All'}_${payloadInfo.MonthDate ? formatDate(payloadInfo.MonthDate) : new Date().toLocaleDateString()
        }.xlsx`;

      XLSX.writeFile(wb, fileName);

      console.log("Excel export successful");
    } catch (error) {
      console.error("Failed to export Excel:", error);
    }
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  // Filter rows based on search
  const filteredRows = React.useMemo(() => {
    if (!searchText.trim()) return data.rows;

    return data.rows.filter(row => {
      return Object.entries(row).some(([key, value]) => {
        if (key === 'id') return false; // Skip the id field
        return value && value.toString().toLowerCase().includes(searchText.toLowerCase());
      });
    });
  }, [data.rows, searchText]);

  return (
    <div className='min-h-screen bg-[#fff9f9]'>
      <nav className="h-23 bg-white border-gray-200 ">
        <div className="flex items-center h-full pl-10">
          {/* Red Logo Box */}
          <div
            style={{ backgroundColor: '#cb001c', marginLeft: '28px' }}
            className="w-[280px] h-full flex items-center justify-center"
          >
            <Image
              src="/jnj_logo_white.jpg"
              alt="JJ Core Medtech Logo"
              priority
              width={165}
              height={45}
            />
          </div>

          {/* Johnson & Johnson Text */}
          <div className='w-[130px]' style={{ marginLeft: '50px' }}>
            <Image
              src="/image.png"
              alt=" Johnson & Johnson "
              priority
              width={155}
              height={35}
            />
          </div>
        </div>
      </nav>

      <div style={{ backgroundColor: '#fff9f9' }}>
        <div style={{ marginLeft: '40px', marginRight: '40px', borderColor: '#fceeee' }} >
          <h2 style={{ marginTop: '11px', marginBottom: '15px', fontSize: '26px', fontWeight: '800', color: 'rgb(52, 45, 45)' }} className={classess.font}>
            Dump Report 
            <span className='text-[18px] font-medium '>
              {payloadInfo.franchise && payloadInfo.MonthDate && ` : ${payloadInfo.franchise}, ${formatDate(payloadInfo.MonthDate)}`}
            </span>
          </h2>

          {/* grid box  */}
          <div style={{ height: '390px' }} className='border border-[#fceeee] rounded-xl bg-white shadow-sm'>
            <div style={{ marginLeft: '25px', marginRight: '25px' }} className="flex items-center justify-center h-[85%]">
              <div style={{ height: 300, width: '100%' }}>

                {/* top section  */}
                <div style={{ marginBottom: '10px', paddingTop : '7px' }} className="flex items-center justify-between rounded-lg">
                  {/* Left Section */}
                  <p style={{ fontSize: '14px', fontWeight: '600' }}
                    className="text-[#342d2d] font-large">
                    Total No. of Records <span
                      style={{ fontSize: '14px', fontWeight: '500' }}
                      className="text-black font-large hover:bg-[#f5ebeb] rounded-2xl">[{totalCount}]</span>
                    {isLoading && <span className="ml-2 text-gray-500">(Loading...)</span>}
                  </p>

                  {/* Right Section */}
                  <div className="flex items-center space-x-4">
                    {/* Search Input */}
                    <div className="relative w-[300px]" >
                      <input
                        style={{ margin: '2px', paddingLeft: '28px', backgroundColor : 'transparent' , }} 
                      
                        type="text"
                        placeholder="Search"
      
                        value={searchText}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 h-10 border border-[#dad7d7] rounded-md hover:border-[#000] outline-none focus:border-black"
                      />
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        <SearchOutlinedIcon fontSize="small" />
                      </div>
                    </div>


                    {/* Filters Button */}
                    <button
                      style={{ margin: '4px', padding: '4px', fontSize: '13px', fontWeight: '700' }}
                      className="text-black font-large text-bold hover:bg-[#f5ebeb] rounded-2xl">
                      <FilterListIcon />
                      Filters
                    </button>

                    {/* Export Button */}
                    <button
                      aria-describedby={id}
                      onClick={handleExportClick}
                      style={{ margin: '4px', padding: '4px', fontSize: '13px', fontWeight: '700' }}
                      className="text-black font-large text-bold hover:bg-[#f5ebeb] rounded-2xl">
                      <FileDownloadOutlinedIcon />
                      Export
                    </button>

                    {/* Export Popover */}
                    <Popover
                      id={id}
                      open={open}
                      anchorEl={anchorEl}
                      onClose={handleClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                      }}
                      PaperProps={{
                        style: {
                          backgroundColor: 'white',
                          boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                          borderRadius: '4px',
                          marginTop: '5px',
                        },
                      }}
                    >
                      <div
                        onClick={exportToExcel}
                        style={{ padding: '10px 15px', cursor: 'pointer', fontSize: '13px' }}
                        className="hover:bg-[#f5ebeb]"
                      >
                        Download as Excel
                      </div>
                    </Popover>
                  </div>
                </div>

                {/* Display headers even while loading */}
                <DataGrid
                  initialState={{ density: 'compact', }}
                  columns={data.columns}
                  rows={isLoading ? [] : filteredRows}
                  loading={isLoading}
                    //@ts-ignore
                  components={{
                    NoRowsOverlay: () => (
                      <div className="flex flex-col items-center justify-center h-full">
                        {isLoading ? (
                          <div className="flex flex-col items-center">
                            <CircularProgress size={40} style={{ color: '#cb001c' }} />
                            <p style={{ marginTop: '16px', fontSize: '14px' }}>Loading data...</p>
                          </div>
                        ) : (
                          <p style={{ fontSize: '14px' }}>No records found</p>
                        )}
                      </div>
                    ),
                  }}
                  sx={{
                    border: 'none',
                    '& .MuiDataGrid-main': {
                      overflow: 'hidden', // Prevent overflow
                      margin: 0,
                      padding: 0,
                    },
                    '& .MuiDataGrid-cell': {
                      borderBottom: 'none !important',
                      borderTop: 'none !important',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      padding: '8px 16px',
                      margin: 0,
                    },
                    '& .MuiDataGrid-columnHeaders': {
                      backgroundColor: '#fff9f9',
                      borderBottom: 'none !important',
                      margin: 0,
                    },
                    '& .MuiDataGrid-columnHeader': {
                      backgroundColor: '#fff9f9',
                      fontFamily: 'Arial, sans-serif',
                      color: 'rgb(52, 45, 45)',
                      fontWeight: '700',
                      fontSize: '13px',
                      display: 'flex',
                      justifyContent: 'flex-start',
                      padding: '8px 16px',
                      margin: 0,
                      borderBottom: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                      fontWeight: 700,
                      whiteSpace: 'normal',
                      lineHeight: '1.2',
                      textAlign: 'left',
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer': {
                      justifyContent: 'flex-start !important',
                      alignItems: 'flex-start !important',
                      textAlign: 'left !important',
                    },
                    '& .MuiDataGrid-columnSeparator': {
                      display: 'none !important',
                    },
                    '& .MuiDataGrid-row': {
                      border: 'none !important',
                      margin: 0,
                      borderBottom: 'none !important',
                      borderTop: 'none !important',
                      '&:not(:last-child)': {
                        borderBottom: 'none !important',
                      },
                    },
                    '& .MuiDataGrid-row--lastVisible': {
                      borderBottom: 'none !important',
                    },
                    '& .MuiDataGrid-virtualScroller': {
                      border: 'none',
                      margin: 0,
                      '&:before, &:after': {
                        display: 'none', // Remove virtual scroller pseudo elements
                      }
                    },
                    '& .MuiDataGrid-virtualScrollerContent': {
                      margin: 0,
                      padding: 0,
                    },
                    '& .MuiDataGrid-virtualScrollerRenderZone': {
                      margin: 0,
                      padding: 0,
                    },
                    '& .MuiDataGrid-footerContainer': {
                      borderTop: 'none !important',
                      margin: 0,
                    },
                    '& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within': {
                      outline: 'none',
                    },
                    '& .MuiDataGrid-withBorderColor': {
                      borderColor: 'transparent !important',
                    },
                    '& .MuiDataGrid-iconSeparator': {
                      display: 'none',
                    },
                    '& .MuiDataGrid-columnHeadersInner': {
                      margin: 0,
                      borderBottom: 'none !important',
                    },
                    '& .MuiDataGrid-cellContent': {
                      textAlign: 'left',
                    },
                    // More aggressive removal of borders and row spacing
                    '& .MuiDataGrid-root': {
                      border: 'none !important',
                    },
                    '& div[data-rowindex]': {
                      margin: 0,
                      borderBottom: 'none !important',
                    },
                    // Specifically target any remaining divider lines
                    '& .MuiDataGrid-row .MuiDataGrid-cell': {
                      borderBottom: 'none !important',
                    },
                    // Target any horizontal dividers
                    '& .MuiDataGrid-horizontalDivider': {
                      display: 'none !important',
                    },
                    // Additional selectors to remove borders
                    '& .MuiDataGrid-window': {
                      borderBottom: 'none !important',
                    },
                    '& .MuiDataGrid-row--editing': {
                      borderBottom: 'none !important',
                    },
                    // Specifically target the internal cell borders
                    '& .MuiDataGrid-cell, & .MuiDataGrid-cell:focus': {
                      borderBottom: 'none !important',
                    },
                    '& .MuiDataGrid-columnHeader, & .MuiDataGrid-columnHeader:focus': {
                      borderBottom: 'none !important',
                    },
                    // Override any divider lines that might be added
                    '& .MuiDivider-root': {
                      display: 'none !important',
                    }
                  }}
                  // disableColumnMenu
                  // disableColumnFilter
                  // disableColumnSelector
                  hideFooter={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}