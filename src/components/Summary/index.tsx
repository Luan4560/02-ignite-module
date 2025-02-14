import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import totalImg from '../../assets/total.svg'
import { Container } from "./styles";
import { useTransactions } from '../../hooks/useTransactions';

export function Summary () {
  const {transactions} = useTransactions()

  const summary = transactions.reduce((acc, transactions) => {
    if(transactions.type === 'deposit') {
      acc.deposits += transactions.amount;
      acc.total += transactions.amount;
    } else {
      acc.withdraws += transactions.amount;
      acc.total -= transactions.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0,

  })

  return (
    <Container>
      <div>
        <header>
          <p>Income</p>
          <img src={incomeImg} alt="Incomes"/>
        </header>
        <strong>
        {new Intl.NumberFormat('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }).format(summary.deposits)}
        </strong>
      </div>

      <div>
        <header>
          <p>Outcome</p>
          <img src={outcomeImg} alt="Incomes"/>
        </header>
        <strong>
          -
        {new Intl.NumberFormat('pt-BR',{
          style: 'currency',
          currency: 'BRL'
        }).format(summary.withdraws)}
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Incomes"/>
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR',{
            style: 'currency',
            currency: 'BRL'
          }).format(summary.total)}
        </strong>
      </div>
    </Container>
  )
}