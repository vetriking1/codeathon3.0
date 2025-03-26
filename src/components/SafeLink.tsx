import { Link, LinkProps } from "react-router-dom";
import { scrollToSection } from "../utils/scrollUtils";

type SafeLinkProps = LinkProps & {
  isAnchor?: boolean;
  anchorId?: string;
  scrollOptions?: {
    behavior?: ScrollBehavior;
    offset?: number;
  };
};

const SafeLink = ({
  isAnchor = false,
  anchorId = "",
  scrollOptions,
  onClick,
  ...props
}: SafeLinkProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isAnchor && anchorId) {
      scrollToSection(e, anchorId, scrollOptions);
    }
    onClick?.(e);
  };

  return <Link {...props} onClick={handleClick} />;
};

export default SafeLink;

// Usage examples:
// <SafeLink to="/about">Regular Link</SafeLink>
// <SafeLink to="#section" isAnchor anchorId="section">Anchor Link</SafeLink>
