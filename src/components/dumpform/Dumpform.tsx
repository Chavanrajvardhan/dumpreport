"use client";
import React, { useState, useCallback, useMemo, useContext, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import dayjs, { Dayjs } from "dayjs";
import { useQuery, useMutation } from "@tanstack/react-query";
import styles from "./Dumpform.module.css";
import { LoadingContext } from '../../app/(dashboard)/layout'; // Import the context from your layout

// Types
interface Franchise {
  franchise: string;
}


interface OrganizationSegment {
  id: string;
  code: string;
  description: string;
}

interface FormPayload {
  MonthDate: string | null;
  franchise: string | null;
  distributorId: string;
  orgSegment: string | null;
}

// Dynamic imports for code splitting
const MUIComponents = dynamic(() => import("./MUIComponents"), {
  loading: () => <div>Loading form components...</div>,
  ssr: false,
});

// Custom hooks for data fetching
const useFormData = () => {
  const franchiseQuery = useQuery({
    queryKey: ["franchises"],
    queryFn: async (): Promise<Franchise[]> => {
      const response = await fetch("/api/formdata/getallfranchise", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch franchises");
      const data = await response.json();
      return data.result;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  });

  const segmentQuery = useQuery({
    queryKey: ["organization-segments"],
    queryFn: async (): Promise<OrganizationSegment[]> => {
      const response = await fetch("/api/formdata/getorgsegment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Failed to fetch segments");
      const data = await response.json();
      const segments = data.result;
      
      // Add "All" as the first item
      return [
        { id: "3", code: "ALL", description: "ALL" },
        ...segments,
      ];
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  return {
    franchises: franchiseQuery.data || [],
    segments: segmentQuery.data || [],
    isLoading: franchiseQuery.isLoading || segmentQuery.isLoading,
    error: franchiseQuery.error || segmentQuery.error,
  };
};

// Memoized form validation
const useFormValidation = (payload: FormPayload) => {
  return useMemo(() => {
    const errors: string[] = [];
    
    if (!payload.MonthDate) {
      errors.push("Month is required");
    }
    
    if (!payload.franchise) {
      errors.push("Franchise is required");
    }
    
    return {
      isValid: errors.length === 0,
      errors,
    };
  }, [payload]);
};

// Utility functions for localStorage operations
const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }
};

const getFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return null;
    }
  }
  return null;
};

// Main component
const DumpReportForm: React.FC = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setLoading(false);
  }, [setLoading]);

  // Initialize state from localStorage first, then URL params as fallback
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => {
    // Try to get from localStorage first
    const savedData = getFromLocalStorage("dumpReportFormData");
    if (savedData?.selectedDate) {
      return dayjs(savedData.selectedDate);
    }
    
    // Fallback to URL params
    const dateParam = searchParams.get("date");
    return dateParam ? dayjs(dateParam) : dayjs().subtract(0, "day");
  });
  
  const [selectedFranchise, setSelectedFranchise] = useState<string>(() => {
    const savedData = getFromLocalStorage("dumpReportFormData");
    return savedData?.selectedFranchise || searchParams.get("franchise") || "";
  });
  
  const [distributor, setDistributor] = useState<string>(() => {
    const savedData = getFromLocalStorage("dumpReportFormData");
    return savedData?.distributor || searchParams.get("distributor") || "";
  });
  
  const [selectedSegment, setSelectedSegment] = useState<string>(() => {
    const savedData = getFromLocalStorage("dumpReportFormData");
    return savedData?.selectedSegment || searchParams.get("segment") || "";
  });

  // Data fetching with React Query
  const { franchises, segments, isLoading, error } = useFormData();

  // Memoized form payload
  const formPayload = useMemo((): FormPayload => {
    const month = selectedDate ? new Date(
      selectedDate.year(),
      selectedDate.month(),
      1
    ) : null;

    return {
      MonthDate: month ? format(month, "yyyy-MM-dd") : null,
      franchise: selectedFranchise || null,
      distributorId: distributor === "ALL" ? "0" : distributor,
      orgSegment: selectedSegment === "ALL" ? null : selectedSegment,
    };
  }, [selectedDate, selectedFranchise, distributor, selectedSegment]);

  // Form validation
  const { isValid, errors } = useFormValidation(formPayload);

  // Save form state to localStorage whenever it changes
  useEffect(() => {
    const formState = {
      selectedDate: selectedDate ? selectedDate.format("YYYY-MM-DD") : null,
      selectedFranchise,
      distributor,
      selectedSegment,
    };
    saveToLocalStorage("dumpReportFormData", formState);
  }, [selectedDate, selectedFranchise, distributor, selectedSegment]);

  // Mutation for form submission
  const submitMutation = useMutation({
    mutationFn: async (payload: FormPayload) => {
      // Store payload in localStorage with a specific key for the report
      saveToLocalStorage("dumpReportPayload", payload);
      
      // Also save timestamp for cache invalidation if needed
      saveToLocalStorage("dumpReportPayloadTimestamp", Date.now());
      
      return payload;
    },
    onSuccess: () => {
      // Simply navigate to report page without URL parameters
      // The report page will read the payload from localStorage
      const url = "/report";
      window.open(url, "_blank");
    },
    onError: (error) => {
      console.error("Form submission error:", error);
    },
  });

  // Memoized event handlers
  const handleDateChange = useCallback((newValue: Dayjs | null) => {
    if (newValue) {
      setSelectedDate(newValue);
    }
  }, []);

  const handleFranchiseChange = useCallback((value: string) => {
    setSelectedFranchise(value);
  }, []);

  const handleDistributorChange = useCallback((value: string) => {
    setDistributor(value);
  }, []);

  const handleSegmentChange = useCallback((value: string) => {
    setSelectedSegment(value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (isValid) {
      submitMutation.mutate(formPayload);
    }
  }, [isValid, formPayload, submitMutation]);

  // Function to clear form data
  const handleClearForm = useCallback(() => {
    setSelectedDate(dayjs().subtract(0, "day"));
    setSelectedFranchise("");
    setDistributor("");
    setSelectedSegment("");
    
    // Also clear from localStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("dumpReportFormData");
    }
  }, []);

  // Error boundary fallback
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <h2>Error loading form data</h2>
          <p>{error instanceof Error ? error.message : "Unknown error"}</p>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.heading}>Dump Report</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.card} style={{ padding: "30px" }}>
            <MUIComponents
              selectedDate={selectedDate}
              selectedFranchise={selectedFranchise}
              distributor={distributor}
              selectedSegment={selectedSegment}
              franchises={franchises}
              segments={segments}
              isLoading={isLoading}
              onDateChange={handleDateChange}
              onFranchiseChange={handleFranchiseChange}
              onDistributorChange={handleDistributorChange}
              onSegmentChange={handleSegmentChange}
            />
            
            {/* Display validation errors */}
            {errors.length > 0 && (
              <div className={styles.errorList}>
                {errors.map((error, index) => (
                  <p key={index} className={styles.errorMessage}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className={styles.action}>
            <button 
              type="submit" 
              disabled={!isValid || submitMutation.isLoading}
              className={styles.submitButton}
            >
              {submitMutation.isLoading ? "Processing..." : "View"}
            </button>
            
            <button 
              type="button" 
              onClick={handleClearForm}
              className={styles.clearButton}
              style={{ marginLeft: "10px" }}
            >
              Clear Form
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

// Wrap with Suspense for better loading experience
const DumpReportPage: React.FC = () => (
  <DumpReportForm />
);

export default DumpReportPage;