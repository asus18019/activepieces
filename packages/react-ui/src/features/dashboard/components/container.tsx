import { cn } from '@/lib/utils';

type ContainerProps = {
  className?: string,
  children: React.ReactNode
}

const Container = ({ className, children }: ContainerProps) => (
  <div className={ cn("rounded-md border p-4", className) }>{ children }</div>
);

export { Container }