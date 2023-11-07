import React from 'react';
import { CSVLink, CSVDownload } from 'react-csv';
import { Project } from '../types';
import { FileDownloadRounded } from '@mui/icons-material';

export type ReactCSVProps = {
  project: Project;
  children?: React.ReactNode;
};

const transformProject = (project: Project) => {
  const csvHeaders = ['project name', 'kitchen type', 'apartment', 'user', 'front', 'worktop', 'total_cost'];
  let result = [];
  result.push(csvHeaders);
  if (project.kitchen_types) {
    for (const kitchen_type of project.kitchen_types) {
      if (kitchen_type.apartments) {
        for (const apartment of kitchen_type.apartments) {
          const row = [
            project.name,
            kitchen_type.name,
            apartment.name,
            apartment.users?.email || '',
            apartment.front_options?.fronts?.name || 'standard',
            apartment.worktop_options?.worktops?.name || 'standard',
            apartment.total_cost,
          ];
          result.push(row);
        }
      }
    }
  }
  return result;
};

const ReactCSV = (props: ReactCSVProps) => {
  const csvData = transformProject(props.project);
  return (
    <div className="rounded py-2 px-4 text-xl font-semibold self-end bg-secondary hover:bg-secondaryHover flex flex-row gap-2 items-center justify-center">
      <CSVLink data={csvData} target="_blank" className="flex flex-row gap-2 items-center justify-center">
        <FileDownloadRounded />
        <p className="text-lg font-semibold">Export to CSV</p>
      </CSVLink>
    </div>
  );
};

export default ReactCSV;
