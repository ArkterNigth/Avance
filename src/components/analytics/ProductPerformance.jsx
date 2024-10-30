import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { motion } from "framer-motion";

const productPerformanceData = [
	{ name: "Logitech", ventas: 4000, ingresos: 2400, ganancias: 2400 },
	{ name: "Ryzen", ventas: 3000, ingresos: 1398, ganancias: 2210 },
	{ name: "ROG OLED", ventas: 2000, ingresos: 9800, ganancias: 2290 },
	{ name: "Airpods pro", ventas: 2780, ingresos: 3908, ganancias: 2000 },
	{ name: "RTX 5090", ventas: 1890, ingresos: 4800, ganancias: 2181 },
];

const ProductPerformance = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Rendimiento del producto</h2>
			<div style={{ width: "100%", height: 300 }}>
				<ResponsiveContainer>
					<BarChart data={productPerformanceData}>
						<CartesianGrid strokeDasharray='3 3' stroke='#374151' />
						<XAxis dataKey='name' stroke='#9CA3AF' />
						<YAxis stroke='#9CA3AF' />
						<Tooltip
							contentStyle={{
								backgroundColor: "rgba(31, 41, 55, 0.8)",
								borderColor: "#4B5563",
							}}
							itemStyle={{ color: "#E5E7EB" }}
						/>
						<Legend />
						<Bar dataKey='ventas' fill='#8B5CF6' />
						<Bar dataKey='ingresos' fill='#10B981' />
						<Bar dataKey='ganancias' fill='#F59E0B' />
					</BarChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default ProductPerformance;
