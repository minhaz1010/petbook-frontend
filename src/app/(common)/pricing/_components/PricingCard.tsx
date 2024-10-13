/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client"
// import { useState } from 'react'
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
// import { Button } from '@/components/ui/button'
// import { Check } from 'lucide-react'
// import PaymentModal from './PaymentModal'
// import { usePayment } from '@/hooks/payment/usePayment.hook'

// interface IPlan {
//   name: string;
//   price: number;
//   duration: string;
//   benefits: string[];
// }

// const plans: IPlan[] = [
//   {
//     name: '1 Month',
//     price: 200,
//     duration: '1 month',
//     benefits: [
//       'Unlimited pet stories',
//       'Basic tip sharing',
//       'Community access',
//     ]
//   },
//   {
//     name: '3 Months',
//     price: 500,
//     duration: '3 months',
//     benefits: [
//       'All benefits from 1 Month plan',
//       'Advanced pet analytics',
//       'Priority story featuring',
//       'Exclusive pet care webinars',
//     ]
//   },
// ]

// export default function PricingCards() {
//   const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const { mutate: handlePaymentTransaction } = usePayment();

//   const handlePayment = (plan: IPlan) => {
//     setSelectedPlan(plan)
//     setIsModalOpen(true)
//   }

//   const handlePaymentSubmit = (address: string, phone: string) => {
//     const payload = {
//       address,
//       phone,
//       month: selectedPlan?.duration as string,
//       totalPrice: selectedPlan?.price as number
//     }
//     handlePaymentTransaction(payload, {
//       onSuccess: (data) => {
//         if (data?.data) {
//           window.location.href = data?.data;
//         }
//       }
//     });

//   }

//   return (
//     <>
//       <div className="grid md:grid-cols-2 gap-8">
//         {plans.map((plan) => (
//           <Card key={plan.name} className="flex flex-col">
//             <CardHeader>
//               <CardTitle>{plan.name}</CardTitle>
//               <CardDescription>Perfect for {plan.duration} of pet journaling</CardDescription>
//             </CardHeader>
//             <CardContent className="flex-grow">
//               <p className="text-4xl font-bold">{plan.price} BDT</p>
//               <p className="text-sm text-muted-foreground mb-4">
//                 Billed {plan.duration === '1 month' ? 'monthly' : 'every 3 months'}
//               </p>
//               <ul className="space-y-2">
//                 {plan.benefits.map((benefit, index) => (
//                   <li key={index} className="flex items-center">
//                     <Check className="h-4 w-4 mr-2 text-green-500" />
//                     <span>{benefit}</span>
//                   </li>
//                 ))}
//               </ul>
//             </CardContent>
//             <CardFooter>
//               <Button className="w-full" onClick={() => handlePayment(plan)}>
//                 Choose Plan
//               </Button>
//             </CardFooter>
//           </Card>
//         ))}
//       </div>
//       <PaymentModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         plan={selectedPlan}
//         onPaymentSubmit={handlePaymentSubmit}
//       />
//     </>
//   )
// }
"use client"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import PaymentModal from './PaymentModal'
import { usePayment } from '@/hooks/payment/usePayment.hook'
import { useAuth } from '@clerk/nextjs'

interface IPlan {
  name: string;
  price: number;
  duration: string;
  benefits: string[];
}

const plans: IPlan[] = [
  {
    name: '1 Month',
    price: 200,
    duration: '1 month',
    benefits: [
      'Unlimited pet stories',
      'Basic tip sharing',
      'Community access',
    ]
  },
  {
    name: '3 Months',
    price: 500,
    duration: '3 months',
    benefits: [
      'All benefits from 1 Month plan',
      'Advanced pet analytics',
      'Priority story featuring',
      'Exclusive pet care webinars',
    ]
  },
]
interface Props {
  premiumMember?: any
}

export default function PricingCards({ premiumMember }: Props) {
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate: handlePaymentTransaction } = usePayment();
  const { userId } = useAuth();

  const handlePayment = (plan: IPlan) => {
    setSelectedPlan(plan)
    setIsModalOpen(true)
  }

  const handlePaymentSubmit = (address: string, phone: string) => {
    setIsLoading(true);
    const payload = {
      address,
      phone,
      month: selectedPlan?.duration as string,
      totalPrice: selectedPlan?.price as number
    }
    handlePaymentTransaction(payload, {
      onSuccess: (data) => {
        if (data?.data) {
          setTimeout(() => {
            window.location.href = data?.data;
          }, 2000);
        }
      },
      onError: () => {
        setIsLoading(false);
      }
    });
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-8">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>Perfect for {plan.duration} of pet journaling</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold">{plan.price} BDT</p>
              <p className="text-sm text-muted-foreground mb-4">
                Billed {plan.duration === '1 month' ? 'monthly' : 'every 3 months'}
              </p>
              <ul className="space-y-2">
                {plan.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-4 w-4 mr-2 text-green-500" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full "
                disabled={!userId || premiumMember}
                title={!userId ? 'please login' : ''}
                onClick={() => handlePayment(plan)}>
                Choose Plan
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setIsLoading(false);
        }}
        plan={selectedPlan}
        onPaymentSubmit={handlePaymentSubmit}
        isLoading={isLoading}
      />
    </>
  )
}