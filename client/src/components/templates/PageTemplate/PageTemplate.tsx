import { Navbar } from "../../molecules";
import { useStyles } from "./styles";

type Props = {
  children?: JSX.Element;
};

const PageTemplate = ({ children }: Props) => {
  const { classes } = useStyles();

  return (
    <div id="page-template" className={classes.wrapper}>
      {/* 
      TODO: Can Have:
      - app name/logo
      - dark theme controller
      - footer
    */}
      <Navbar />
      {children}
    </div>
  );
};

export default PageTemplate;
