import logoIMG from '../../assets/logo.svg'
import {Container, Content} from './styles'

interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header ({onOpenNewTransactionModal}: HeaderProps) {
  return (
    <Container>
      <Content>
        <img src={logoIMG} alt="dtMoney"/>
        <button type="button" onClick={onOpenNewTransactionModal}>
          New transaction
        </button>
      </Content>
    </Container>
  )
} 