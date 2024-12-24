import { NavigationButtons } from './NavigationButtons/NavigationButtons';

interface FooterProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  className?: string;
}

export function Footer({
  activeSection,
  onNavigate,
  className = '',
}: FooterProps) {
  return (
    <nav
      className={`bg-background shadow-lg fixed bottom-0 w-full border-t border-border ${className}`}
    >
      <NavigationButtons
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
    </nav>
  );
}
