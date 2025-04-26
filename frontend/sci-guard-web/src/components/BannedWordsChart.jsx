import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
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
                label: 'Number of Occurrences',
                data: sortedWords.map(([_, count]) => count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Top Banned Words Found',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Occurrences',
                },
            },
            x: {
                title: {
                    display: true,
                    text: 'Banned Words',
                },
            },
        },
    };

    return (
        <div className="chart-container">
            <Bar data={data} options={options} />
        </div>
    );
};

export default BannedWordsChart; 