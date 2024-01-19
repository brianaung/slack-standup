import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const FormattedMarkdown = ({ text }: { text: string }) => {
  return (
    <div style={{ whiteSpace: "pre-line" }}>
      <ReactMarkdown children={text} remarkPlugins={[remarkGfm]} />
    </div>
  );
};

export default FormattedMarkdown;
