import Tick from 'public/other/tick.svg';
import ModalWrapper from '@components/ModalContentWrapper';
import ModalIconPlaceholder from '@components/ModalIconPlaceholder';
import ModalTitle from '@shared/ModalTitle';
import ModalContentWrapper from '@components/ModalContentWrapper';
import NavButton from '@shared/NavButton';

function PasswordChanged() {
  return (
    <ModalWrapper>
      <ModalIconPlaceholder>
        <Tick />
      </ModalIconPlaceholder>
      <ModalTitle text='Email activated successfully' />
      <ModalContentWrapper>
        <NavButton
          size={'l'}
          color={'blue'}
          fillStyle={false}
          fullWidth={false}
          to='/'
        >
          {'Go Home'}
        </NavButton>
      </ModalContentWrapper>
    </ModalWrapper>
  );
}

export default PasswordChanged;
