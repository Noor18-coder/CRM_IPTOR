import { useMediaQuery } from 'react-responsive';

export interface Props {
  component?: string;
}

const Loader: React.FC<Props> = ({ component }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return (
    <div id="loader-overlay">
      <div id={component ? 'loader_container_opp' : 'loader_container'}>
        <div id="loader-bg">
          <div id="loader_part_1_cover">
            <div id="loader_part_1" />
          </div>
          <div id="loader_part_2_cover">
            <div id="loader_part_2" />
          </div>
          <div id="loader_part_3_cover">
            <div id="loader_part_3" />
          </div>
          <span id="loader-cover" />
        </div>
        <p id={component || isMobile || isTablet ? 'loader-text_opp' : 'loader-text'}>Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
