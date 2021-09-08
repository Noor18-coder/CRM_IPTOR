export interface Props {
  title: string;
  isSubmit: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const SubmitButton: React.FC<Props> = ({ title, isSubmit, onClick }) => {
  return (
    <button type="submit" className={isSubmit ? 'iptor-login-btn' : 'iptor-login-btn disable-button'} onClick={onClick}>
      {title}
    </button>
  );
};
