import { 
  Bar,
  BarChart,
  CartesianGrid, 
  XAxis, 
  YAxis
 } from "recharts"
import { 
  ChartConfig,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent
 } from "@/components/ui/chart"

type OverviewChartProps<T> = {
  chartConfig: ChartConfig,
  data: T[],
  keys: {
    XDataKey: string,
    YDataKey: string
  },
  tooltipLabelFormatter?: (value: string) => string
}

const OverviewChart = <T,>({ chartConfig, data, keys, tooltipLabelFormatter }: OverviewChartProps<T>) => (
  <ChartContainer
    config={chartConfig}
    className="aspect-auto grow w-full"
  >
    <BarChart
      accessibilityLayer
      data={ data }
      margin={{
        left: 12,
        right: 12,
      }}
    >
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey={ keys.XDataKey }
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        minTickGap={32}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
      />
      <ChartTooltip
        content={
          <ChartTooltipContent
            className="w-[150px]"
            labelFormatter={tooltipLabelFormatter}
          />
        }
      />
      <Bar dataKey={ keys.YDataKey } fill={`var(--color-tasks)`} name="Registrations" />
    </BarChart>
  </ChartContainer>
);

export { OverviewChart }