import React from 'react';
import { Button } from '../../atoms/Buttons/Button';
import AccountClosureModal from '../AccountClosureModal';

const CancelSubscriptionTrigger = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div>CancelSubscriptionTrigger</div>

      <Button
        variant="ghost"
        className="w-full justify-start gap-3 h-auto py-3 px-4 text-left font-normal hover:bg-gray-50"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="flex items-center justify-center w-6 h-6 rounded-full border border-gray-300">
          <Minus className="w-3 h-3 text-gray-600" />
        </div>
        <span className="text-gray-700">Cancel Subscription</span>
      </Button>

      <AccountClosureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default CancelSubscriptionTrigger;