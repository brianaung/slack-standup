import { Avatar, Card, Modal, Text } from "@mantine/core";
import { useStyles } from "./styles";
import { formatTsToDate, formatTsToTime } from "../../../@utils";
import {
  StandupUserList,
  useGetStandupEditHistoryLazyQuery,
} from "../../../generated/slackGraphql";
import { useEffect } from "react";
import { useDisclosure } from "@mantine/hooks";
import { FormattedMarkdown } from "../..";

type Props = {
  standup: StandupUserList;
};

const StandupCard = ({ standup }: Props) => {
  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);

  const [getStandupEditHistory, { data: editHistory }] =
    useGetStandupEditHistoryLazyQuery({
      fetchPolicy: "network-only",
    });

  useEffect(() => {
    if (opened) {
      getStandupEditHistory({
        variables: {
          standupId: standup.standupId,
        },
      });
    }
  }, [opened]);

  return (
    <>
      {/* More standup detail section */}
      <Modal opened={opened} onClose={close} size="xl">
        <div className={classes.modalContainer}>
          <div className={classes.header}>
            <Avatar src={standup.image} radius="xl" />
            <div style={{ marginRight: "auto" }}>
              <div className={classes.username}>{standup.username}</div>
              <div className={classes.role}>
                {standup.role !== "others" && `@${standup.role}`}
              </div>
            </div>
            <div className={classes.time}>
              {<>{formatTsToTime(standup.ts)}</>}
            </div>
          </div>
          <Card withBorder>
            <FormattedMarkdown text={standup.text} />
          </Card>
          {editHistory &&
            editHistory.getStandupEditHistory &&
            editHistory?.getStandupEditHistory?.length !== 0 && (
              <div className={classes.editHistoryContainer}>
                <Text fw={700} fz="lg">
                  Edit history
                  <Text fw={400} c="dimmed" fz="sm">
                    View the previously edited standups.
                  </Text>
                </Text>
                {editHistory.getStandupEditHistory?.map((history, index) => (
                  <Card key={index}>
                    {formatTsToDate(history?.ts ?? 0.0)} @{" "}
                    {formatTsToTime(history?.ts ?? 0.0)}
                    <FormattedMarkdown text={history?.text ?? ""} />
                  </Card>
                ))}
              </div>
            )}
        </div>
      </Modal>

      {/* Card Section */}
      {standup && (
        <Card withBorder onClick={open} className={classes.cardWrapper}>
          <div className={classes.header}>
            <Avatar src={standup.image} radius="xl" />
            <div style={{ marginRight: "auto" }}>
              <div className={classes.username}>{standup.username}</div>
              <div className={classes.role}>
                {standup.role !== "others" && `@${standup.role}`}
              </div>
            </div>
            <div className={classes.time}>
              {<>{formatTsToTime(standup.ts)}</>}
            </div>
          </div>
          <div className={classes.body}>
            <FormattedMarkdown text={standup.text} />
          </div>
        </Card>
      )}
    </>
  );
};

export default StandupCard;
