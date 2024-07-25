'use client';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);


const DoughnutChart = ({ accounts }: DoughnutChartProps) => {

    const accountNames = accounts.map((account: any) => account.name);
    const accountBalances = accounts.map((account: any) => account.currentBalance);
    
    const data = {
        labels: accountNames,
        datasets: [{
            label: 'Banks',
            data: accountBalances,
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    return (
        <Doughnut data={data}
            options={{
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                    }
                }
            }

            }
        />
    );
}

export default DoughnutChart;
