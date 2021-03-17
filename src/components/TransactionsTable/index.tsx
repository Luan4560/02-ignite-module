import { createServer, Model } from 'miragejs'

import { useTransactions } from '../../hooks/useTransactions';
import { Container } from './styles'

createServer({
  models: {
    transaction: Model,
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Freelancer website',
          type: 'deposit',
          category: 'Dev',
          amount: 6000,
          createdAt: new Date('2021-04-16 09:00:00')
        },
        {
          id: 2,
          title: 'Tax Rent',
          type: 'withdraw',
          category: 'House',
          amount: 1100,
          createdAt: new Date('2021-04-15 11:00:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

export function TransactionsTable() {
  const {transactions} = useTransactions()

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Value</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.title}</td>
              <td className={transaction.type}>
               {new Intl.NumberFormat('pt-BR', {
                 style: 'currency',
                 currency: 'BRL'
               }).format(transaction.amount)}
              </td>
              <td>{transaction.category}</td>
              <td>
              {new Intl.DateTimeFormat('pt-BR').format(
                new Date(transaction.createdAt)
              )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  )
}