// // "use client"

// import { RadialBar, RadialBarChart, PolarRadiusAxis, Label } from "recharts";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// const surveyData = {
//   totalResponses: 100,
//   responsesReceived: 75,
//   singleCorrectMCQ: [
//     { option: "A", count: 30 },
//     { option: "B", count: 20 },
//     { option: "C", count: 15 },
//     { option: "D", count: 10 },
//   ],
//   multiCorrectMCQ: [
//     { option: "Option 1", count: 40 },
//     { option: "Option 2", count: 30 },
//     { option: "Option 3", count: 20 },
//     { option: "Option 4", count: 10 },
//   ],
// };

// const totalResponses = surveyData.totalResponses;
// const responsesReceived = surveyData.responsesReceived;
// const percentageCompleted = (responsesReceived / totalResponses) * 100;

// const chartData = [
//   { name: "Completed", value: percentageCompleted },
//   { name: "Remaining", value: 100 - percentageCompleted },
// ];

// const chartConfig = {
//   Completed: {
//     label: "Completed",
//     color: "hsl(var(--chart-1))",
//   },
//   Remaining: {
//     label: "Remaining",
//     color: "hsl(var(--chart-2))",
//   },
// };

// export function CompletionChart() {
//   return (
//     <Card className="flex flex-col">
//       <CardHeader className="items-center pb-0">
//         <CardTitle>Survey Completion</CardTitle>
//         <CardDescription>Percentage of survey responses received</CardDescription>
//       </CardHeader>
//       <CardContent className="flex flex-1 items-center pb-0">
//         <ChartContainer
//           config={chartConfig}
//           className="mx-auto aspect-square w-full max-w-[250px]"
//         >
//           <RadialBarChart
//             data={chartData}
//             innerRadius={80}
//             outerRadius={130}
//             startAngle={90}
//             endAngle={450}
//           >
//             <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
//               <Label
//                 content={({ viewBox }) => {
//                   if (viewBox && "cx" in viewBox && "cy" in viewBox) {
//                     return (
//                       <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) - 16}
//                           className="fill-foreground text-2xl font-bold"
//                         >
//                           {responsesReceived}
//                         </tspan>
//                         <tspan
//                           x={viewBox.cx}
//                           y={(viewBox.cy || 0) + 4}
//                           className="fill-muted-foreground"
//                         >
//                           Responses
//                         </tspan>
//                       </text>
//                     );
//                   }
//                 }}
//               />
//             </PolarRadiusAxis>
//             <RadialBar
//               dataKey="value"
//               fill={(data) =>
//                 data.name === "Completed"
//                   ? "var(--color-completed)"
//                   : "var(--color-remaining)"
//               }
//               background
//               cornerRadius={10}
//             />
//           </RadialBarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }


import React from 'react'

export default function CompletionChart() {
  return (
    <div>CompletionChart</div>
  )
}
