export default (props: any) => {
  const { noRowsMessageFunc } = props;
  return (
    <div>
      <i className="far fa-frown"> {noRowsMessageFunc()}</i>
    </div>
  );
};
