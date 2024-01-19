import { createStyles, keyframes } from "@mantine/styles";

export const swing = keyframes({
  "50%": {
    transform: "rotate(-3deg)",
  },
});

export const steamLarge = keyframes({
  "0%": {
    strokeDashoffset: 13,
    opacity: 0.6,
  },
  "80%": {
    strokeDashoffset: 30,
    opacity: 0,
  },
  "100%": {
    strokedashoffset: 39,
    opacity: 0,
  },
});

export const steamSmall = keyframes({
  "10%": {
    strokedashoffset: 9,
    opacity: 0.6,
  },
  "80%": {
    strokeDashoffset: 27,
    opacity: 0,
  },
  "100%": {
    strokeDashoffset: 27,
    opacity: 0,
  },
});

export const useStyles = createStyles(() => ({
  /* loading tea cup animation */
  teabag: {
    transformOrigin: "top center",
    transform: "rotate(3deg)",
    animation: `${swing} 2s infinite`,
  },

  steamL: {
    strokeDasharray: 13,
    strokeDashoffset: 13,
    animation: `${steamLarge} 2s infinite`,
  },

  steamR: {
    strokeDasharray: 9,
    strokeDashoffset: 9,
    animation: `${steamSmall} 2s infinite`,
  },

  /***********************************/
}));
