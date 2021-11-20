interface Props {
  noRowsMessageFunc: () => string;
}

export default (props: Props): JSX.Element => {
  const { noRowsMessageFunc } = props;
  return (
    <div>
      <i className="far fa-frown"> {noRowsMessageFunc()}</i>
    </div>
  );
};
