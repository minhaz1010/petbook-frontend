import { Metadata } from 'next'
import PricingCards from './_components/PricingCard'
import { roboto } from '@/config/font'
import { auth } from '@clerk/nextjs/server'
import { getAllPayment } from '@/services/payment/payment.services'
import { IPayment } from '@/types'

export const metadata: Metadata = {
  title: 'Pricing | Pet Book',
  description: 'Choose the perfect plan for your pet book needs',
}

export default async function PricingPage() {
  const { userId } = auth();
  const paymentDetails = await getAllPayment();

  const premiumMember = paymentDetails.data.find((payment: IPayment) => payment.userId === userId);

  return (
    <div className={`container mx-auto px-4  py-16 ${roboto.className}`}>
      <h1 className="text-4xl font-bold text-center text-white mb-8">
        {premiumMember ? 'You Are a Premium Member!' : 'Choose Your Pet Book Plan'}
      </h1>

      {premiumMember && (
        <div className="text-center mb-11 text-white">
          <p className="text-2xl mb-4">
            Your subscription is valid until{' '}
            <strong>{premiumMember.endSubScriptionAt}</strong>.
          </p>
          <button className="bg-gray-500 text-white py-2 px-4 rounded cursor-not-allowed" disabled>
            You have an active subscription
          </button>
        </div>
      )
      }
      < PricingCards premiumMember={premiumMember} />
    </div>
  );
}
