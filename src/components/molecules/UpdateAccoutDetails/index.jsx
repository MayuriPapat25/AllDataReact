import React, { use, useState } from 'react';
import { InfoText } from '../../atoms/Info/InfoText';
import AccountUpdateModal from '../AccountUpdateModal';

const UpdateAccoutDetails = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex w-full align-center my-4 lg:mt-0 lg:mb-4">
      <h1 className="h5 text-primary w-full font-medium" style={{ fontWeight: 500 }}>Account Information</h1>
      <InfoText
        value="Update Account Details"
        link={() => setIsModalOpen(true)}
      />
      <AccountUpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request to Update Account Details" desc1="Account Details cannot be changed without a request approval." desc2="Please allow 24-48 hours for Account Information to be reviewed and updated. An Account Executive may reach out to confirm changes." />
    </div>
  );
};

export default UpdateAccoutDetails;