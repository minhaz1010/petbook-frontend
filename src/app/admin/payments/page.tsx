/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { getAllPayment } from '@/services/payment/payment.services';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CreditCard, DollarSign, Users, TrendingUp } from 'lucide-react';
import { IPayment } from '@/types';
import { jetbrains } from '@/config/font';

const AdminPayment = async () => {
  const paymentInfo = await getAllPayment();
  const payments: IPayment[] = paymentInfo.data;

  const totalRevenue = payments.reduce((sum, payment) => payment.status === "PAID" ? sum + payment.price : sum, 0);
  const paidPayments = payments.filter(payment => payment.status === "PAID").length;
  const failedPayments = payments.filter(payment => payment.status === "FAILED").length;

  return (
    <div className={`min-h-screen  text-gray-100 p-6 sm:p-8 lg:p-12 ${jetbrains.className}`}>
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Payment Management Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`${totalRevenue.toString()}`}
          icon={<DollarSign className="h-6 w-6" />}
          color="from-green-400 to-blue-500"
        />
        <StatCard
          title="Successful Payments"
          value={paidPayments}
          icon={<CreditCard className="h-6 w-6" />}
          color="from-blue-400 to-indigo-500"
        />
        <StatCard
          title="Failed Payments"
          value={failedPayments}
          icon={<TrendingUp className="h-6 w-6" />}
          color="from-red-400 to-pink-500"
        />
        <StatCard
          title="Total Users"
          value={payments.length}
          icon={<Users className="h-6 w-6" />}
          color="from-yellow-400 to-orange-500"
        />
      </div>

      <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Recent Payments
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-white">
                  <TableHead className="text-black">User</TableHead>
                  <TableHead className="text-black">Plan</TableHead>
                  <TableHead className="text-black">Amount</TableHead>
                  <TableHead className="text-black">Status</TableHead>
                  <TableHead className="text-black">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.slice(0, 10).map((payment, index) => (
                  <TableRow key={payment.userId} className=" bg-teal-300 ">
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 border-2 border-purple-500">
                          <AvatarImage src={payment.userMongodbId.imageURL} alt={payment.userMongodbId.fullName} />
                          <AvatarFallback className="bg-purple-600">{payment.userMongodbId.fullName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{payment.userMongodbId.fullName}</div>
                          <div className="text-sm text-red-500">@{payment.userMongodbId.userName}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{payment.month} Month{payment.month > 1 ? 's' : ''}</TableCell>
                    <TableCell className="text-sm font-semibold">${payment.price}</TableCell>
                    <TableCell>
                      <Badge
                        variant={payment.status === "PAID" ? "default" : "destructive"}
                        className={`text-xs px-2 py-1 rounded-full ${payment.status === "PAID" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                          }`}
                      >
                        {payment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm">{payment.startedSubScriptionAt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatProps {
  title: string;
  value: any;
  icon: any;
  color: string
}
const StatCard = ({ title, value, icon, color }: StatProps) => (
  <Card className={`bg-gradient-to-br ${color} text-white border-0 shadow-lg   duration-300`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
    </CardContent>
  </Card>
);

export default AdminPayment;