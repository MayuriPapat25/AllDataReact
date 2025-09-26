import React, { use, useState } from 'react';
import { InfoText } from '../../atoms/Info/InfoText';
import AccountUpdateModal from '../AccountUpdateModal';

const UpdateAccoutDetails = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <h1>Account Information</h1>
      <InfoText
        value="Update Account Details"
        link={() => setIsModalOpen(true)}
      />
      <AccountUpdateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Request to Update Account Details" desc1="Account Details cannot be changed without a request approval." desc2="Please allow 24-48 hours for Account Information to be reviewed and updated. An Account Executive may reach out to confirm changes." />
    </>
  );
};

export default UpdateAccoutDetails;