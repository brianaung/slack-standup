import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  cardWrapper: {
    backgroundColor: theme.colors.dark[7],
    width: "100%",
    height: "100%",

    // arrange content inside card
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: ".5rem",
    // fontWeight: "bold",
  },
  body: {
    border: "solid 1px",
    borderColor: theme.colors.dark[4],
    borderRadius: "4px",
    backgroundColor: theme.colors.dark[6],
    "&:hover": {
      backgroundColor: theme.colors.dark[5],
      borderColor: theme.colors.dark[3],
      cursor: "pointer",
    },

    width: "100%",
    height: "100%",
    padding: "1rem",
  },
  username: {
    fontWeight: "bold",
  },
  role: {
    fontSize: "14px",
    color: theme.colors.dark[3],
  },
  time: {
    fontWeight: "bold",
  },
  editHistoryContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    padding: "2rem",
  },
  modalContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    padding: "1rem",
  },
}));
