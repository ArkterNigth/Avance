import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const salesData = [
	{ month: "en", ventas: 1200 },
	{ month: "feb", ventas: 1420 },
	{ month: "mar", ventas: 1300 },
	{ month: "abr", ventas: 1500 },
	{ month: "may", ventas: 1199 },
	{ month: "jun", ventas: 1480 },
	{ month: "jul", ventas: 1670 },
	{ month: "ago", ventas: 1590 },
	{ month: "set", ventas: 1800 },
	{ month: "oct", ventas: 2000 },
	{ month: "nov", ventas: 1500 },
	{ month: "dic", ventas: 3000 },
];

const SalesTrendChart = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Tendencia de ventas</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<LineChart data={salesData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='month' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Line type='monotone' dataKey='ventas' stroke='#8B5CF6' strokeWidth={2} />
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesTrendChart;
