import { id } from './index';

export interface InterfaceHost {
  id: id;
  email: string;
  description: string;
  statusConnection: string;
  businessHours: businessHours;
  pushname: string;
  website: string[];
  formattedTitle: string;
  categories: categories;
  displayName: string;
  isBusiness: boolean;
  imgUrl: string;
  imgFull: string;
  previewEurl: string;
}

interface businessHours {
  timezone: string;
}

interface categories {
  id: string;
  localized_display_name: string;
}


