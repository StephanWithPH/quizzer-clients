import React from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

function Quizzes() {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-8">
        <div className="flex justify-between w-full">
          <div>
            <h1 className="font-bold text-xl">Quizzes</h1>
            <h3 className="font-medium text-lg text-neutral-400">Bekijk hier alle quizzes die gespeeld zijn en de bijhorende resultaten</h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Quizzes;
