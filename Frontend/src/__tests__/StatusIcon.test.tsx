// src/__tests__/StatusIcon.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import StatusIcon from '../../components/StatusIcon';

describe('StatusIcon', () => {
  it('renders CheckCircle for healthy status', () => {
    render(<StatusIcon status="healthy" />);
    expect(screen.getByRole('img')).toHaveClass('text-green-500');
  });

  it('renders AlertTriangle for warning status', () => {
    render(<StatusIcon status="warning" />);
    expect(screen.getByRole('img')).toHaveClass('text-yellow-500');
  });

  it('renders XCircle for critical status', () => {
    render(<StatusIcon status="critical" />);
    expect(screen.getByRole('img')).toHaveClass('text-red-500');
  });
});