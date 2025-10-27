import React from 'react';
import { PriceText } from '../../../shared/ui/Price/PriceText';
import { InfoText } from '../../../shared/ui/Info/InfoText';
import { Button } from '../../../shared/ui/Buttons/Button';
import { Icon } from '../../../shared/ui/Icon/Icon';

const BillSummary = () => {
  return (
    <>
      <h1 className='h3 mb-4 font-normal text-primary' style={{ fontWeight: 500 }}>Bill Summary</h1>
      <div className="mb-6 shadow-lg bg-white lg:pb-6 bill-summary-list">
        <div className="border-b-2 border-light-smoky-white">
          <div className="py-6 px-8">
            <PriceText amount={0.00} label="Total Balance Due" />
          </div>
        </div>
        <div className="border-b-2 border-light-smoky-white">
          <div className="py-6 px-8">
            <PriceText amount={179.00} label="Recent Payments and Credits" />
          </div>
        </div>
        <div >
          <div className="py-6 px-8">
            <PriceText amount={179.00} label="Monthly Payment Due September 23, 2025" />
          </div>
        </div>
        <div className='flex justify-center'>
          <Button onClick={''} variant="outline" size="md"> Recent Invoice </Button>
        </div>
      </div>
      <div className="mb-6 shadow-lg bg-white general-list">
        <div className="border-b-2 border-light-smoky-white">
          <div className="py-4 px-8 flex items-center gap-1.5">
            <Icon type="circleDollar" size={20} className="text-green" />
            <InfoText label="Automatic Payments" value="Yes" />
          </div>
          <div className="py-6 px-8">
            <InfoText label="CREDIT OR DEBIT CARD (AUTOMATIC PAYMENT)" value="(••••1111)" />
          </div>
        </div>
      </div>
      <h2 className='h3 font-normal text-primary mb-4' style={{ fontWeight: 500 }}>Invoice History</h2>
      <div className="mb-6 shadow-lg bg-white invoice-history-list">
        <div className="border-b-2 border-light-smoky-white">
          <div className="p-6">
            <InfoText
              label="September 23, 2025"
              value="Download"
              link="/path/to/invoice.pdf"
              billStatus="Current Bill"
              billStatusClassName="uppercase px-2.5 py-0.5 text-sm btn btn-primary br-color-gray"
            />
          </div>
        </div>
      </div>
      <h2 className='h3 text-primary font-normal mb-4' style={{ fontWeight: 500 }}>Payment History</h2>
      <div className="mb-6 shadow-lg bg-white payment-history">
        <div className="border-b-2 border-light-smoky-white">
          <div className="py-6 px-8">
            <PriceText amount={179.00} label="September 23, 2025" />
          </div>
        </div>
      </div>
    </>

  );
};

export default BillSummary;
