import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  wrapper: {
    height: "80px",
    padding: "2rem",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "2rem",

    // boxShadow: "0px 1px 1px #373a40",
    border: `solid 1px ${theme.colors.dark[5]}`,
    backgroundColor: theme.colors.dark[7],

    // sticky
    position: "sticky",
    top: 0,
    zIndex: 2,
  },
  title: {
    fontWeight: "bolder",
    fontSize: "22px",
  },
  navlink: {
    marginLeft: "auto",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
