export type Address = {
  id: string;
  label: string;
  street: string;
  city: string;
  county?: string;
  postalCode?: string;
  isDefault?: boolean;
};
