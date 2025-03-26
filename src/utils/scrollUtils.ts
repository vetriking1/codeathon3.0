type ScrollToSectionOptions = {
  behavior?: ScrollBehavior;
  offset?: number;
};

export const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  sectionId: string,
  options: ScrollToSectionOptions = { behavior: 'smooth', offset: 0 }
) => {
  e.preventDefault();
  const element = document.getElementById(sectionId);
  
  if (element) {
    const yOffset = options.offset || 0;
    const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    
    window.scrollTo({
      top: y,
      behavior: options.behavior
    });
  }
};

// Usage example:
// <a href="#section" onClick={(e) => scrollToSection(e, 'section', { offset: -20 })}>
