import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxios from '../../../Hooks/useAxios';
import useAuth from '../../../Hooks/useAuth';

const PaymentHistory = () => {
    const axiosSecure = useAxios();
    const {user} = useAuth()

      const { refetch, data: payments = [] } = useQuery({
    queryKey: ['payments', user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`, 
        // { headers: {
        //   authorization : `Bearer ${localStorage.getItem('access-token')}`
        // }}
      );
     console.log(res.data, 'fd')
      return res.data;
    }
  });

    return (
       <div className="container p-2 mx-auto sm:p-4 dark:text-gray-800">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">Invoices</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col />
				<col className="w-24" />
			</colgroup>
			<thead className="dark:bg-gray-300 border-b border-opacity-20 ">
				<tr className="text-left">
					<th className="p-3">Serial No</th>
					<th className="p-3">Transaction ID</th>
					<th className="p-3">Issued</th>
					<th className="p-3">Due</th>
					<th className="p-3 text-right">Amount</th>
					<th className="p-3">Status</th>
				</tr>
			</thead>
			<tbody>
				{
					payments.map((payment, index) => <tr key={payment?._id} className="border-b border-opacity-20 dark:border-gray-300 dark:bg-gray-50">
					<td className="p-3">
						<p>{index + 1}</p>
					</td>
					<td className="p-3">
						<p>{payment.transactionId}</p>
					</td>
					<td className="p-3">
						<p>{payment.date}</p>
						<p className="dark:text-gray-600">Friday</p>
					</td>
					<td className="p-3">
						<p>01 Feb 2022</p>
						<p className="dark:text-gray-600">Tuesday</p>
					</td>
					<td className="p-3 text-right">
						<p>${payment.price}</p>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-600 dark:text-gray-50">
							<span>{payment.status}</span>
						</span>
					</td>
				</tr>)
				}
				
			</tbody>
		</table>
	</div>
</div>
    );
};

export default PaymentHistory;