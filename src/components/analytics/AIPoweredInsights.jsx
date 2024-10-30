import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";

const INSIGHTS = [
	{
		icon: TrendingUp,
		color: "text-green-500",
		insight: "Los ingresos aumentaron un 15% en comparación con el mes pasado, impulsados ​​principalmente por una exitosa campaña de correo electrónico.",
	},
	{
		icon: Users,
		color: "text-blue-500",
		insight: "La retención de clientes ha mejorado un 8% tras el lanzamiento del nuevo programa de fidelización.",
	},
	{
		icon: ShoppingBag,
		color: "text-purple-500",
		insight: 'La categoría de productos "Electrónica" muestra el mayor potencial de crecimiento según las tendencias recientes del mercado.',
	},
	{
		icon: DollarSign,
		color: "text-yellow-500",
		insight: "La optimización de la estrategia de precios podría aumentar potencialmente los márgenes de ganancia generales entre un 5 y un 7%.",
	},
];

const AIPoweredInsights = () => {
	return (
		<motion.div
			className='bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.0 }}
		>
			<h2 className='text-xl font-semibold text-gray-100 mb-4'>Perspectivas basadas en inteligencia artificial</h2>
			<div className='space-y-4'>
				{INSIGHTS.map((item, index) => (
					<div key={index} className='flex items-center space-x-3'>
						<div className={`p-2 rounded-full ${item.color} bg-opacity-20`}>
							<item.icon className={`size-6 ${item.color}`} />
						</div>
						<p className='text-gray-300'>{item.insight}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};
export default AIPoweredInsights;
