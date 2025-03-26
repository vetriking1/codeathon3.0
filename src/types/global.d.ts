declare namespace JSX {
  interface IntrinsicElements {
    // Allows for custom attributes on HTML elements
    a: React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    > & {
      'data-scroll'?: string;
    };
  }
}