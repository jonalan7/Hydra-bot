import { id } from './index';

export interface InterfaceHost {
  id: id;
  address: string;
  coverPhoto: string;
  customUrlPath: string;
  customUrlPaths: string;
  businessHours: businessHours;
  eurl: string;
  fbPage: object;
  eurlStale: boolean;
  formattedUser: string;
  directConnection: string;
  email: string;
  description: string;
  statusConnection: string;
  pushname: string;
  formattedTitle: string;
  categories: categories[];
  displayName: string;
  isBusiness: boolean;
  previewEurl: string;
  igProfessional: object;
  isProfileLinked: boolean;
  latitude: string;
  legalEntityDetails: string;
  longitude: string;
  notifyName: string;
  pendingPic: string;
  profileOptions: profileOptions
  raw: string;
  searchName: string;
  stale: boolean;
  structuredAddress: string;
  tag: string;
  timestamp: number;
  verifiedName: string;
  website: string[];
}

interface profileOptions{
  cartEnabled: boolean;
  commerceExperience: string;
  directConnection: string;
}

interface businessHours {
  timezone: string;
  config: object[];
  catalogStatus: string;
}

interface categories {
  id: string;
  localized_display_name: string;
}


