// Type definition for province mapping
type ProvinceMapping = {
  [key: string]: string;
};

// Map of province/territory abbreviations to full names
export const PROVINCES: ProvinceMapping = {
  'AB': 'Alberta',
  'BC': 'British Columbia',
  'MB': 'Manitoba',
  'NB': 'New Brunswick',
  'NL': 'Newfoundland and Labrador',
  'NS': 'Nova Scotia',
  'NT': 'Northwest Territories',
  'NU': 'Nunavut',
  'ON': 'Ontario',
  'PE': 'Prince Edward Island',
  'QC': 'Quebec',
  'SK': 'Saskatchewan',
  'YT': 'Yukon'
};

// Helper function to get full province name from abbreviation
export const getProvinceName = (abbreviation: string | undefined): string => {
  if (!abbreviation) return '';
  return PROVINCES[abbreviation.toUpperCase()] || '';
};

// Helper function to get abbreviation from full province name
export const getProvinceAbbreviation = (fullName: string): string => {
  const entry = Object.entries(PROVINCES).find(([_, name]) => 
    name.toLowerCase() === fullName.toLowerCase()
  );
  return entry ? entry[0] : '';
};

// Array of just the abbreviations
export const PROVINCE_CODES = Object.keys(PROVINCES);

// Array of just the full names
export const PROVINCE_NAMES = Object.values(PROVINCES); 