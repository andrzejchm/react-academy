export const globals = {

  colors: {
    backgroundNormal: '#fff',
    backgroundHover: '#f7f7f9',
  },

  dimens: {
    spacingNormal: 16,
    spacingLarge: 32,
    spacingSmall: 8,
  },
};

const styles = {
  clickableListElement: {
    backgroundColor: globals.colors.backgroundNormal,
    ':hover': {
      backgroundColor: globals.colors.backgroundHover,
    },
    marginTop: globals.dimens.spacingNormal,
    padding: globals.dimens.spacingNormal,
    border: '1px solid #ddd',
  },
};

export default styles;
