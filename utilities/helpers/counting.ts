import { Project, KitchenType, Apartment } from '@/app/types';
export const TotalCostOnProject = (project: Project) => {
  let totalCost = 0;
  project.kitchen_types?.forEach((kitchenType: KitchenType) => {
    kitchenType?.apartments?.forEach((apartment: Apartment) => {
      totalCost += apartment.total_cost;
    });
  });
  return totalCost;
};
