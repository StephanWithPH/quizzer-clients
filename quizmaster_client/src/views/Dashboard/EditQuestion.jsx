import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import toastr from 'toastr';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import fetcher from '../../fetcher';

const serverURL = process.env.REACT_APP_API_URL;

function EditQuestion() {
  const { id } = useParams();

  useEffect(() => {
    fetcher(`${serverURL}/api/v1/admin/questions/${id}`, {
      method: 'GET',
      credentials: 'include',
    }).then((res) => {
      if (!res.ok) {
        throw new Error('Er is iets fout gegaan');
      }

      return res.json();
    })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        toastr.error(err.message);
      });
  }, []);
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-y-10">
        <div className="w-full flex items-center">
          <h1 className="text-2xl font-medium">Bewerk</h1>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default EditQuestion;
