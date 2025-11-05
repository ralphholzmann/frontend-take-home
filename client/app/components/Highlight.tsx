import { createElement, useMemo } from 'react';

type HighlightProps = {
  highlight?: string;
  children?: string;
};

const Highlight = ({
  highlight,
  children,
}: HighlightProps) => {
  const parts = useMemo(() => {
    if (!children) {
      return [null];
    }
    if (!highlight) {
      return [children];
    }

    const index = children.toLowerCase().indexOf(highlight.toLowerCase());

    if (index > -1) {
      return [
        children.slice(0, index),
        <mark key="highlight">
          {children.slice(index, index + highlight.length)}
        </mark>,
        children.slice(index + highlight.length),
      ];
    }

    return [children];
  }, [children, highlight]);

  return createElement('span', {}, ...parts);
};

export default Highlight;
