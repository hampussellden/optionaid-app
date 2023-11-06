export type ClientUser = {
  id: string;
  email: string;
  full_name: string;
  app_role: 'client'
}

export type CreationMessage = {
  message: string;
  type: 'success' | 'error';
}

export type App_role = 'client' | 'admin'
export type User = {
  id: string;
  email: string;
  full_name: string;
  app_role: App_role;
};
export type Apartment = {
  id:number;
  kitchen_type_id: number;
  user_id: string;
  users?: User;
  name: string;
  front_option_id: number;
  front_options?: FrontOption;
  worktop_option_id: number;
  worktop_options?: WorktopOption;
  ready_for_order: boolean;
  total_cost: number;
  kitchen_types?: KitchenType;  
}
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
}
export type Project = {
  id: number,
  name: string | null,
  kitchen_types?: KitchenType[],
}
export type FrontType = {
  id: number;
  name: string;
}
export type Front = {
  id: number;
  name: string;
  front_type_id: number;
  color: string;
  front_types: FrontType
}
export type WorktopType = {
  id: number;
  make: string;
}
export type Worktop = {
  id:number;
  worktop_type_id: number;
  color: string;
  name: string;
  worktop_types: WorktopType
}
export type FrontOption = {
  front_id: number;
  id: number;
  kitchen_type_id: number;
  price: number | null;
  fronts?: Front | null;
  
}
export type WorktopOption = {
  id: number;
  kitchen_type_id: number;
  worktop_id: number;
  price: number;
  worktops?: Worktop;
}