export type ClientUser = {
  id: string;
  email: string;
  full_name: string;
  app_role: 'client';
};

export type CreationMessage = {
  message: string;
  type: 'success' | 'error';
};

export type App_role = 'client' | 'admin';
export type User = {
  id: string;
  email: string;
  full_name: string;
  app_role: App_role;
};
export type Apartment = {
  id: number;
  kitchen_type_id: number;
  user_id: string | null;
  name: string;
  front_option_id: number | null;
  worktop_option_id: number | null;
  ready_for_order: boolean;
  total_cost: number;
  users?: User;
  front_options?: FrontOption;
  worktop_options?: WorktopOption;
  kitchen_types?: KitchenType;
};
export type New_Apartment = Pick<Apartment, 'name' | 'kitchen_type_id'>;
export type ApartmentWithoutId = Omit<Apartment, 'id'>;
export type KitchenType = {
  id: number;
  name: string | null;
  project_id: number;
  standard_front_id: number | null;
  standard_worktop_id: number | null;
  apartments?: Apartment[];
  fronts?: Front;
  worktops?: Worktop;
  users?: User;
  projects?: Project;
};
export type KitchenTypeWithoutId = Omit<KitchenType, 'id'>;
export type Project = {
  id: number;
  name: string | null;
  kitchen_types?: KitchenType[];
};
export type ProjectWithoutId = Omit<Project, 'id'>;
export type FrontType = {
  id: number;
  name: string;
  fronts?: Front[];
};
export type FrontTypeWithoutId = Omit<FrontType, 'id'>;
export type Front = {
  id: number;
  name: string;
  front_type_id: number;
  color: string;
  front_types?: FrontType;
};
export type FrontWithoutId = Omit<Front, 'id'>;
export type WorktopType = {
  id: number;
  make: string;
  worktops?: Worktop[];
};
export type WorktopTypeWithoutId = Omit<WorktopType, 'id'>;
export type Worktop = {
  id: number;
  worktop_type_id: number;
  color: string;
  name: string;
  worktop_types?: WorktopType;
};
export type WorktopWithoutId = Omit<Worktop, 'id'>;
export type FrontOption = {
  front_id: number | null;
  id: number;
  kitchen_type_id: number;
  price: number | null;
  fronts?: Front | null;
};
export type WorktopOption = {
  id: number;
  kitchen_type_id: number;
  worktop_id: number | null;
  price: number;
  worktops?: Worktop;
};
