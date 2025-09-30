import React from 'react';
import { PriceText } from '../atoms/Price/PriceText';
import { Button } from '../atoms/Buttons/Button';
import { InfoText } from '../atoms/Info/InfoText';
import { Icon } from '../atoms/Icon/Icon';

const BillSummary = () => {
  return (
    <>
      <h1 className='text-lg tracking-wide lg:mt-[-0.4375rem] lg:mb-5'>Bill Summary</h1>
      <div className="mb-6 bg-white shadow-sm lg:pb-6 bill-summary-list">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={0.00} label="Total Balance Due" />
          </div>
        </div>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={179.00} label="Recent Payments and Credits" />
          </div>
        </div>
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={179.00} label="Monthly Payment Due September 23, 2025" />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button onClick={''} variant="outline" size="md"> Recent Invoice </Button>
        </div>
      </div>
      <div className="mb-6 bg-white shadow-sm general-list">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4 flex items-center gap-1.5">
            <Icon type="success" className="text-gray-500 hover:text-gray-700" size={20} />
            <InfoText label="Automatic Payments" value="Yes" />
          </div>
          <div className="p-4">
            <InfoText label="CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)" value="(••••1111)" />
          </div>
        </div>
      </div>
      <h1 className='text-lg tracking-wide lg:mt-[-0.4375rem] lg:mb-5'>Invoice History</h1>
      <div className="mb-6 bg-white shadow-sm invoice-history-list">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <InfoText
              label="September 23, 2025"
              value="Download"
              link="/path/to/invoice.pdf"
              billStatus="Current Bill"
              billStatusClassName="uppercase px-2.5 py-0.5 border border-[#1b3e6f] bg-[rgba(27,62,111,0.15)] text-sm text-[#1b3e6f]"
            />
          </div>
        </div>
      </div>
      <h1 className='text-lg tracking-wide lg:mt-[-0.4375rem] lg:mb-5'>Payment History</h1>
      <div className="mb-6 bg-white shadow-sm payment-history">
        <div className="border-b-2 border-[#faf9f9]">
          <div className="p-4">
            <PriceText amount={179.00} label="September 23, 2025" />
          </div>
        </div>
      </div>
    </>

  );
};

export default BillSummary;
