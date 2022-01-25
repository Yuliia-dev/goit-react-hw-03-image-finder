import { Oval } from 'react-loader-spinner';
import { WrapperLoader } from './Loader styled';

export default function Loader() {
  return (
    <WrapperLoader>
      <Oval
        arialLabel="loading-indicator"
        height={100}
        width={100}
        strokeWidth={5}
        color="blue"
        secondaryColor="lightblue"
        textAlign="center"
      />
      ;
    </WrapperLoader>
  );
}
