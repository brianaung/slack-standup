import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  sidebarContainer: {
    width: "15%",
    minWidth: "200px",
    display: "flex",
    justifyContent: "center",
    height: "60vh",
    padding: "1rem",
    // make it sticky
    position: "sticky",
    top: "100px",
    zIndex: 2,
  },
  contentWrapper: {
    borderLeft: `solid 1px ${theme.colors.dark[5]}`,
    width: "85%",
    padding: ".5rem",
  },
}));
