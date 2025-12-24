import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = {
    FOOD: '#f59e0b',
    SHOPPING: '#a855f7',
    TRANSPORT: '#3b82f6',
    BILLS: '#eab308',
    ENTERTAINMENT: '#ef4444',
    TRANSFER: '#06b6d4',
    OTHER: '#6b7280',
};

export function SpendingPieChart({ data }) {
    // Transform data for recharts
    const chartData = data.map(item => ({
        name: item.category,
        value: item.amount,
        percentage: item.percentage
    }));

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                    <p className="font-semibold text-gray-900">{payload[0].name}</p>
                    <p className="text-emerald-600 font-bold">₹{payload[0].value.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{payload[0].payload.percentage}%</p>
                </div>
            );
        }
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percentage }) => `${name} ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={800}
                >
                    {chartData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[entry.name] || COLORS.OTHER}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
            </PieChart>
        </ResponsiveContainer>
    );
}

export function MiniSparkline({ data, color = '#10b981', height = 40 }) {
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((value, index) => {
        const x = (index / (data.length - 1)) * 100;
        const y = ((max - value) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100%" height={height} className="overflow-visible">
            <polyline
                fill="none"
                stroke={color}
                strokeWidth="2"
                points={points}
                className="transition-all duration-500"
            />
            {/* Add dots at each point */}
            {data.map((value, index) => {
                const x = (index / (data.length - 1)) * 100;
                const y = ((max - value) / range) * height;
                return (
                    <circle
                        key={index}
                        cx={`${x}%`}
                        cy={y}
                        r="2"
                        fill={color}
                        className="transition-all duration-500"
                    />
                );
            })}
        </svg>
    );
}

export function ProgressBar({ value, max, label, color = 'emerald' }) {
    const percentage = Math.min((value / max) * 100, 100);

    const colorClasses = {
        emerald: 'bg-emerald-500',
        blue: 'bg-blue-500',
        purple: 'bg-purple-500',
        red: 'bg-red-500',
        amber: 'bg-amber-500',
    };

    return (
        <div className="space-y-2">
            {label && (
                <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{label}</span>
                    <span className="text-gray-600">
                        ₹{value.toLocaleString()} / ₹{max.toLocaleString()}
                    </span>
                </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                    className={`h-full ${colorClasses[color]} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="text-right text-xs text-gray-600">
                {percentage.toFixed(1)}%
            </div>
        </div>
    );
}

export function AnimatedCounter({ value, duration = 2000, prefix = '₹', suffix = '' }) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            setCount(Math.floor(value * easeOutQuart));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [value, duration]);

    return (
        <span className="number-counter">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

// Trend indicator component
export function TrendIndicator({ value, isPositive }) {
    const isUp = isPositive ? value > 0 : value < 0;
    const color = isUp ? 'text-emerald-500' : 'text-red-500';
    const bgColor = isUp ? 'bg-emerald-50' : 'bg-red-50';
    const arrow = isUp ? '↑' : '↓';

    return (
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${color} ${bgColor}`}>
            <span>{arrow}</span>
            <span>{Math.abs(value)}%</span>
        </span>
    );
}
