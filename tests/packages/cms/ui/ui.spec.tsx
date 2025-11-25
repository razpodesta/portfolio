import { render, screen } from '@testing-library/react';
import { MetasharkCmsUi } from '@metashark-cms/ui';

describe('Architecture Integrity: CMS UI', () => {
  it('should render library component successfully', () => {
    render(<MetasharkCmsUi />);
    expect(screen.getByText(/Welcome/i)).toBeTruthy();
  });
});
