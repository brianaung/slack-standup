import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "2rem",
    gap: "2rem",
  },
  droppable: {
    border: "solid 1px",
    borderColor: theme.colors.dark[5],
    backgroundColor: theme.colors.dark[8],

    borderRadius: "4px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  draggableContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",

    width: "100%",
    height: "70vh",
    padding: "1rem",

    // overflowY: "scroll",
  },
  draggableCard: {
    // backgroundColor: theme.colors.dark[7],
    backgroundColor: theme.colors.dark[7],
    border: "solid 1px",
    borderColor: theme.colors.dark[5],
    margin: ".5rem",
    padding: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    "&:hover": {
      backgroundColor: theme.colors.dark[6],
      borderColor: theme.colors.dark[4],
    },
  },
  title: {
    marginRight: "auto",
    padding: "1rem",
    fontWeight: 600,
    // border: "solid 1px red",
  },
}));
