import type { Meta, StoryObj } from '@storybook/react';
import { Text, type TextVariant } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
    variant: 'body-medium-default',
    as: 'p',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'label'],
    },
    variant: {
      control: 'select',
      options: [
        'display-large', 'display-medium', 'display-small',
        'heading-xlarge', 'heading-large', 'heading-medium', 'heading-small',
        'body-large-default', 'body-large-moderate', 'body-large-strong',
        'body-medium-default', 'body-medium-moderate', 'body-medium-strong',
        'body-small-default', 'body-small-moderate', 'body-small-strong',
        'code-default',
      ] satisfies TextVariant[],
    },
    color: {
      control: 'select',
      options: ['none', 'muted', 'disable', 'brand-primary'],
      mapping: { none: undefined },
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

function VariantRow({ variant, as: Tag = 'p' }: { variant: TextVariant; as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label' }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <Text as="span" variant="body-small-default" color="muted">{variant}</Text>
      <Text as={Tag} variant={variant}>The quick brown fox jumps over the lazy dog</Text>
    </div>
  );
}

export const Default: Story = {};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {(['default', 'muted', 'disable', 'brand-primary'] as const).map((c) => (
        <div key={c} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <Text as="span" variant="body-small-default" color="muted">{c}</Text>
          <Text as="p" variant="body-medium-default" color={c === 'default' ? undefined : c}>
            The quick brown fox jumps over the lazy dog
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const Display: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <VariantRow variant="display-large"  as="h1" />
      <VariantRow variant="display-medium" as="h1" />
      <VariantRow variant="display-small"  as="h1" />
    </div>
  ),
};

export const Heading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <VariantRow variant="heading-xlarge" as="h1" />
      <VariantRow variant="heading-large"  as="h2" />
      <VariantRow variant="heading-medium" as="h3" />
      <VariantRow variant="heading-small"  as="h4" />
    </div>
  ),
};

export const Body: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <VariantRow variant="body-large-default"  />
      <VariantRow variant="body-large-moderate" />
      <VariantRow variant="body-large-strong"   />
      <VariantRow variant="body-medium-default"  />
      <VariantRow variant="body-medium-moderate" />
      <VariantRow variant="body-medium-strong"   />
      <VariantRow variant="body-small-default"  />
      <VariantRow variant="body-small-moderate" />
      <VariantRow variant="body-small-strong"   />
    </div>
  ),
};

export const Code: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
      <Text as="span" variant="body-small-default" color="muted">code-default</Text>
      <Text as="p" variant="code-default">const greeting = &quot;Hello, world!&quot;;</Text>
    </div>
  ),
};
