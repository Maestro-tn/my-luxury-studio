import { createPortal } from 'react-dom';

interface PortalsProps {
  children: React.ReactNode;
}

export default function Portals({ children }: PortalsProps) {
  return createPortal(children, document.body);
}
