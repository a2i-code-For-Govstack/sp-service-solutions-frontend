import React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from './components/ui/chart';
import './MultiCorrectChart.css'; // Ensure you create and import this CSS file

const MultiCorrectChart = ({ question, data }) => {
  const chartData = question.options.map(option => ({
    option,
    count: data.filter(answer => answer.includes(option)).length,
  }));

  const chartConfig = {
    option: {
      label: 'Option',
      color: 'hsl(var(--chart-1))',
    },
    count: {
      label: 'Count',
      color: 'hsl(var(--chart-2))',
    },
  };

  const totalResponses = chartData.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <Card className="boxx">
      <CardHeader >
        <CardTitle className="title">{question.title}</CardTitle>
        <CardDescription>Survey Results</CardDescription>
        <CardDescription>Question Type: Multiple Correct</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer className="graph" config={chartConfig} >
          <BarChart width={500} height={300} data={chartData}>
            <CartesianGrid vertical={false} stroke="green" />
            <XAxis dataKey="option" tickLine={false} tickMargin={10} axisLine={false} />
            <YAxis />
            <Tooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar dataKey="count" fill="#2ab65e" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {/* <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="flex gap-2 font-medium leading-none">
           Showing total survey responses for this question: {totalResponses}
        </div> 
      </CardFooter>
    </Card>
  );
};

export default MultiCorrectChart;
