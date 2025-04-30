import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const BannedWordsChart = ({ summary }) => {
    if (!summary || !summary.banned_word_counts) {
        return null;
    }

    // Sort banned words by count (descending) and take top 10
    const sortedWords = Object.entries(summary.banned_word_counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);

    const data = {
        labels: sortedWords.map(([word, count]) => `${word} (${count})`),
        datasets: [
            {
                data: sortedWords.map(([_, count]) => count),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(199, 199, 199, 0.6)',
                    'rgba(83, 102, 255, 0.6)',
                    'rgba(40, 159, 64, 0.6)',
                    'rgba(210, 199, 199, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(199, 199, 199, 1)',
                    'rgba(83, 102, 255, 1)',
                    'rgba(40, 159, 64, 1)',
                    'rgba(210, 199, 199, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                position: 'right',
                labels: {
                    boxWidth: 20,
                    padding: 20,
                    font: {
                        size: 14,
                        color: 'rgba(255, 255, 255, 0.8)'
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: function(context) {
                        const label = context.label || '';
                        const value = context.raw || 0;
                        return `${label}: ${value} occurrences`;
                    }
                },
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'rgba(255, 255, 255, 0.8)',
                bodyColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderWidth: 1
            }
        },
        maintainAspectRatio: false,
        aspectRatio: 1.2,
        layout: {
            padding: {
                top: 0,
                bottom: 0
            }
        }
    };

    return (
        <div className="max-w-[500px] mx-auto py-0">
            <Pie data={data} options={options} />
        </div>
    );
};

export default BannedWordsChart; 