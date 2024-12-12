import React from 'react';
import DashboardStats from '../_components/modules/adminDashboard/dashboardStats';
import CompleteLessonTable from '../_components/modules/adminDashboard/completeLessonTable';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <DashboardStats /> <CompleteLessonTable />
    </div>
  );
}
