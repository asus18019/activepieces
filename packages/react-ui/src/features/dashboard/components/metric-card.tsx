import { Container } from './container';

type ContainerProps = {
  title: string,
  value: string,
  icon: React.ReactNode,
  className?: string
}

const MetricCard = ({ title, value, icon, className }: ContainerProps) => (
  <Container className={ className }>
    <div className="flex justify-between">
      <h3 className="font-medium mb-2">{ title }</h3>
        { icon }
      </div>
    <h3 className="font-extrabold text-3xl">{ value }</h3>
  </Container>
);

export { MetricCard }