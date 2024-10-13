// 'use client'

// import { useState } from 'react'
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'

// type Plan = {
//   name: string
//   price: number
//   duration: string
// }

// type PaymentModalProps = {
//   isOpen: boolean
//   onClose: () => void
//   plan: Plan | null
//   onPaymentSubmit: (address: string, phone: string) => void
// }

// export default function PaymentModal({ isOpen, onClose, plan, onPaymentSubmit }: PaymentModalProps) {
//   const [address, setAddress] = useState('')
//   const [phone, setPhone] = useState('')

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onPaymentSubmit(address, phone)
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>Complete Your Payment</DialogTitle>
//           <DialogDescription>
//             {plan ? `You've selected the ${plan.name} plan for ${plan.price} BDT` : 'Please provide your details'}
//           </DialogDescription>
//         </DialogHeader>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <Label htmlFor="address">Address</Label>
//             <Input
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               placeholder="Enter your address"
//               required
//             />
//           </div>
//           <div>
//             <Label htmlFor="phone">Phone Number</Label>
//             <Input
//               id="phone"
//               value={phone}
//               onChange={(e) => setPhone(e.target.value)}
//               placeholder="Enter your phone number"
//               required
//             />
//           </div>
//           <DialogFooter>
//             <Button type="submit">Pay Now</Button>
//             <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }

'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'

type Plan = {
  name: string
  price: number
  duration: string
}

type PaymentModalProps = {
  isOpen: boolean
  onClose: () => void
  plan: Plan | null
  onPaymentSubmit: (address: string, phone: string) => void
  isLoading: boolean
}

export default function PaymentModal({ isOpen, onClose, plan, onPaymentSubmit, isLoading }: PaymentModalProps) {
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPaymentSubmit(address, phone)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Your Payment</DialogTitle>
          <DialogDescription>
            {plan ? `You've selected the ${plan.name} plan for ${plan.price} BDT` : 'Please provide your details'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
              required
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              required
              disabled={isLoading}
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}