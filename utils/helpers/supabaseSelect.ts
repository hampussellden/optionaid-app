export const kitchenTypesAllData = '*,fronts(*,front_types(*)),worktops(*,worktop_types(*))';
export const apartmentsInteriorDeep =
  '*,users(*),front_options(*,fronts(*,front_types(*))),worktop_options(*,worktops(*,worktop_types(*)))';
export const dashboardApartmentsAllData =
  '*,kitchen_types(*,projects(*),fronts(*,front_types(*)),worktops(*,worktop_types(*))),worktop_options(*,worktops(*,worktop_types(*))),front_options(*,fronts(*,front_types(*)))';
export const worktopsWithType = '*,worktop_types(*)';
export const frontsWithType = '*,front_types(*)';
export const worktopOptionsWithWorktops = '*,worktops(*,worktop_types(*))';
export const frontOptionsWithFronts = '*,fronts(*,front_types(*))';
