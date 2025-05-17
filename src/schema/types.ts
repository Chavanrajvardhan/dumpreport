
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
  
  export interface AppCardProps {
    item: ApplicationData;
    appToken: string;
  }

  export interface AppWithToken {
  app: ApplicationData;
  appToken: string;
}


export interface OrganizationSegment {
  id: string;
  code: string;
  description: string;
}

export interface Franchise {
  franchise: string;
}
 

export interface FormPayload {
  MonthDate: string | null;
  franchise: string | null;
  distributorId: string;
  orgSegment: string | null;
}