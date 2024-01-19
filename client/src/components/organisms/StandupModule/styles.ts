import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  contentWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    padding: "0 1rem",
  },
  contentContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "1rem",
    paddingBottom: "2rem",
  },
  cardWrapper: {
    flex: "0 1 300px",
  },
  timeDisplay: {
    // marginLeft: "auto",
    padding: "2rem 1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));
