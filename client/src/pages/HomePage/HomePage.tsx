import { useEffect, useState } from "react";
import { PageTemplate, Sidebar, StandupModule } from "../../components";
import {
  useGetStandupsFromDateLazyQuery,
  useMessageAddedSubscription,
} from "../../generated/slackGraphql";
import {
  getEndOfGivenDayTimestamp,
  getStartOfGivenDayTimestamp,
} from "../../@utils";
import { useStyles } from "./styles";
import useUserStore from "../../stores/userStore";
import { TimeRangeType } from "../../@types/globalTypes";

const HomePage = () => {
  const { classes } = useStyles();

  // Global states
  const { refetchFlag, setRefetchFlag } = useUserStore();

  // Local states
  const [roles, setRoles] = useState<string[]>([]);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [timeRange, setTimeRange] = useState<TimeRangeType>({
    startTime: 0.0,
    endTime: 0.0,
  });

  // Data fetching
  const { data: subscriptionData } = useMessageAddedSubscription();
  const [getStandupsFromDate, { data: standupData }] =
    useGetStandupsFromDateLazyQuery({
      fetchPolicy: "network-only",
    });

  // check date every 5 minutes to update current date dynamically
  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      if (now.getDate() !== currentDate.getDate()) {
        setCurrentDate(now);
      }
    };
    setInterval(updateDate, 30000);
  }, [currentDate]);

  // set the filtered time range to current date
  useEffect(() => {
    const startTime = getStartOfGivenDayTimestamp(currentDate);
    const endTime = getEndOfGivenDayTimestamp(currentDate);
    setTimeRange({ startTime, endTime });
  }, [currentDate]);

  // refetch data when user changes date, or new message is added
  useEffect(() => {
    getStandupsFromDate({
      variables: {
        startTs: timeRange.startTime,
        endTs: timeRange.endTime,
      },
    });
    setRefetchFlag(false); // to refetch when dndboard modal closes (changes to user roles could have been made)
  }, [refetchFlag, timeRange, subscriptionData]);

  return (
    <PageTemplate
      children={
        <div className={classes.wrapper}>
          <div className={classes.sidebarContainer}>
            <Sidebar
              roles={roles}
              setRoles={setRoles}
              setTimeRange={setTimeRange}
            />
          </div>
          <div className={classes.contentWrapper}>
            <StandupModule
              data={standupData}
              roles={roles}
              timeRange={timeRange}
            />
          </div>
        </div>
      }
    />
  );
};

export default HomePage;
