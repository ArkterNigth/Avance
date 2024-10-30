import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const revenueData = [
	{ month: "Ene", Ingresos: 4000, Objetivo: 3800 },
	{ month: "Feb", Ingresos: 3000, Objetivo: 3200 },
	{ month: "Mar", Ingresos: 5000, Objetivo: 4500 },
	{ month: "Abr", Ingresos: 4500, Objetivo: 4200 },
	{ month: "May", Ingresos: 6000, Objetivo: 5500 },
	{ month: "Jun", Ingresos: 5500, Objetivo: 5800 },
	{ month: "Jul", Ingresos: 7000, Objetivo: 6500 },
	{ month: "Ago", Ingresos: 6500, Objetivo: 6500 },
	{ month: "Sep", Ingresos: 7500, Objetivo: 6500 },
	{ month: "Oct", Ingresos: 8000, Objetivo: 6500 },
	{ month: "Nov", Ingresos: 10000, Objetivo: 9000 },
	{ month: "Dic", Ingresos: 15500, Objetivo: 10000 },
];

const RevenueChart = () => {

	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold text-gray-100'>Ingresos vs. Objetivo</h2>
			</div>

			<div style={{ width: "100%", height: 400 }}>
				<ResponsiveContainer>
					<AreaChart data={revenueData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{ backgroundColor: "rgba(31, 41, 55, 0.8)", borderColor: "#4B5563" }}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Area type='monotone' dataKey='Ingresos' stroke='#8B5CF6' fill='#8B5CF6' fillOpacity={0.3} />
						<Area type='monotone' dataKey='Objetivo' stroke='#10B981' fill='#10B981' fillOpacity={0.3} />
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default RevenueChart;
