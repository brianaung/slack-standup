import { useEffect, useState } from "react";
import { StandupCard } from "../..";
import { TimeRangeType } from "../../../@types/globalTypes";
import { formatTsToDate } from "../../../@utils";
import {
  GetStandupsFromDateQuery,
  StandupUserList,
} from "../../../generated/slackGraphql";
import { useStyles } from "./styles";
import { Text } from "@mantine/core";

type Props = {
  data: GetStandupsFromDateQuery | undefined;
  timeRange: TimeRangeType;
  roles: string[];
};

const StandupModule = ({ data, timeRange, roles }: Props) => {
  const { classes } = useStyles();

  const [standups, setStandups] = useState<
    (StandupUserList | null)[] | undefined
  >();

  // filter the standup cards to display
  useEffect(() => {
    let filteredStandups;
    if (data && data.getStandupsFromDate) {
      if (roles.length > 0) {
        filteredStandups = data.getStandupsFromDate
          .filter((standup) => roles.includes(standup?.role ?? ""))
          .map((standup) => standup);
      } else {
        filteredStandups = data.getStandupsFromDate.map((standup) => standup);
      }
    }
    setStandups(filteredStandups);
  }, [data, roles]);

  return (
    <>
      <div className={classes.contentWrapper}>
        <div className={classes.timeDisplay}>
          <Text c="dimmed">
            Showing standups from <b>{formatTsToDate(timeRange.startTime)}</b>
          </Text>
        </div>

        {/* Main view of the standup cards */}
        <div className={classes.contentContainer}>
          {standups && standups.length > 0 ? (
            <>
              {standups.map((standup, index) => (
                <div className={classes.cardWrapper} key={index}>
                  {standup && <StandupCard standup={standup} />}
                </div>
              ))}
            </>
          ) : (
            <>Nothing to see here</>
          )}
        </div>
      </div>
    </>
  );
};

export default StandupModule;
