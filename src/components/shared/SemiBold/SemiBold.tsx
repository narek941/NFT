/* global JSX*/
import { SyntheticEvent } from 'react';

interface ISemiBold {
  children: JSX.Element | string;
}
export default function SemiBold({ children, ...props }: ISemiBold) {
  return <span style={{ fontWeight: 600 }}>{children}</span>;
}
