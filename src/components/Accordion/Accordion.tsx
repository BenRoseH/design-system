import { Accordion as BaseAccordion } from '@base-ui/react/accordion';
import './Accordion.css';

export interface AccordionItem {
  value: string;
  trigger: React.ReactNode;
  panel: React.ReactNode;
  disabled?: boolean;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultValue?: string[];
  multiple?: boolean;
}

export function Accordion({ items, defaultValue, multiple = false }: AccordionProps) {
  return (
    <BaseAccordion.Root
      className="accordion"
      defaultValue={defaultValue}
      openMultiple={multiple}
    >
      {items.map(({ value, trigger, panel, disabled }) => (
        <BaseAccordion.Item key={value} value={value} className="accordion__item" disabled={disabled}>
          <BaseAccordion.Header className="accordion__header">
            <BaseAccordion.Trigger className="accordion__trigger">
              {trigger}
              <span className="accordion__icon" aria-hidden />
            </BaseAccordion.Trigger>
          </BaseAccordion.Header>
          <BaseAccordion.Panel className="accordion__panel">
            <div className="accordion__panel-content">{panel}</div>
          </BaseAccordion.Panel>
        </BaseAccordion.Item>
      ))}
    </BaseAccordion.Root>
  );
}
