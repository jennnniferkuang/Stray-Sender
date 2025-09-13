import * as React from 'react';
import Background1 from '@/assets/our/Background1.svg';

export default function LoadingScreen() {
  return (
    <Background1 width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
  );
}