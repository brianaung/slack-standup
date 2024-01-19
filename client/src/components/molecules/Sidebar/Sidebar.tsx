import { DatePickerInput } from "@mantine/dates";
import {
  getEndOfGivenDayTimestamp,
  getStartOfGivenDayTimestamp,
} from "../../../@utils";
import { useStyles } from "./styles";
import { Checkbox, Stack } from "@mantine/core";

type Props = {
  setTimeRange: React.Dispatch<React.SetStateAction<any>>;
  setRoles: React.Dispatch<React.SetStateAction<any>>;
  roles: string[];
};

const Sidebar = ({ setTimeRange, roles, setRoles }: Props) => {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <DatePickerInput
        defaultValue={new Date()}
        label="Pick a date"
        onChange={(date: Date) =>
          setTimeRange({
            startTime: getStartOfGivenDayTimestamp(date),
            endTime: getEndOfGivenDayTimestamp(date),
          })
        }
      />
      <Checkbox.Group
        label="Roles"
        description="Select to filter member roles"
        value={roles}
        onChange={setRoles}
      >
        <Stack mt="xs">
          <Checkbox value="frontend" label="Frontend" />
          <Checkbox value="backend" label="Backend" />
          <Checkbox value="operations" label="Operations" />
          <Checkbox value="product" label="Product" />
          <Checkbox value="others" label="Others" />
        </Stack>
      </Checkbox.Group>
    </div>
  );
};

export default Sidebar;
