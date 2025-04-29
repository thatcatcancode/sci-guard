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
        labels: sortedWords.map(([word]) => word),
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
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1.5,
        layout: {
            padding: {
                top: 0,
                bottom: 0
            }
        },
        plugins: {
            legend: {
                position: 'left',
                labels: {
                    font: {
                        size: 14
                    },
                    padding: 20
                }
            },
            title: {
                display: true,
                text: 'Distribution of Banned Words',
            },
        },
    };

    return (
        <div className="chart-container max-w-[500px] mx-auto py-0">
            <Pie data={data} options={options} />
        </div>
    );
};

export default BannedWordsChart; 