
export interface ApplicationData {
    applicationCode: string;
    applicationName: string;
    url: string | null;
    applicationDescription: string;
    applicationIcon: string;
    applicationRole: string;
    distributorCode?: string; // Optional since not in all responses
    wwid?: string;            // Optional
  }
  