const customStyles = {
  option: (
    defaultStyles,
    { isFocused, isSelected, isHovered, isMenuOpen, is }
  ) => ({
    ...defaultStyles,
    backgroundColor: isSelected ? "#2B976F" : "#FFFFFF",
    "&:hover": {
      backgroundColor: isSelected ? "#2B976F" : "#D3E9E1",
    },
    minHeight: "35px",
    height: "35px",
  }),

  control: (defaultStyles, { isFocused }) => ({
    ...defaultStyles,
    borderColor: isFocused ? "#03A96B" : defaultStyles.borderColor,
    "&:hover": {
      borderColor: isFocused ? "#03A96B" : defaultStyles.borderColor,
    },
    minHeight: "35px",
    height: "35px",
    boxShadow: "none",
  }),
  container: (defaultStyles) => ({
    ...defaultStyles,
    width: "100%", // Adjust width as needed
    maxWidth: "300px", // Or set a maximum width
  }),
  indicatorSeparator: () => {},
};

export default customStyles;

