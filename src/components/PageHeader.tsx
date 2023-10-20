interface Props {
  text: string;
}

const PageHeader = ({ text }: Props) => {
  return (
    <h1 className="py-4 text-5xl font-extrabold text-black text-center">
      {text}
    </h1>
  );
};
export default PageHeader;