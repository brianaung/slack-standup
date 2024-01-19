import { useAuth0 } from "@auth0/auth0-react";
import { useStyles } from "./styles";
import { Text, Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { AnimatedTeaCup, DndBoard } from "../..";
import useUserStore from "../../../stores/userStore";

const Navbar = () => {
  const { classes } = useStyles();
  const { logout } = useAuth0();
  const [opened, { open, close }] = useDisclosure(false);
  const { setRefetchFlag } = useUserStore();

  return (
    <div className={classes.wrapper}>
      <AnimatedTeaCup />
      <div className={classes.title}>StandupBoard</div>
      <div className={classes.navlink} onClick={open}>
        Manage Users
      </div>
      {/*
      <Button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Logout
      </Button>
			*/}
      <Modal
        opened={opened}
        fullScreen
        onClose={() => {
          close();
          setRefetchFlag(true);
        }}
      >
        <div
          style={{
            padding: "0 2rem",
          }}
        >
          <Text fw={700} fz="xl">
            Manage the team
          </Text>
          <Text c="dimmed" fz="sm">
            Move the cards around to assign team members to groups.
          </Text>
          <DndBoard />
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
