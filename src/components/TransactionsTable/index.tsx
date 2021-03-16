import { useEffect } from 'react'
import { createServer } from 'miragejs'
import { Container } from './styles'
import { api } from '../../services/api';

createServer({
  routes() {
    this.namespace = 'api';

    this.get('/transactions', () => {
      return [
        {
          id: 1,
          title: 'Transaction 1',
          amount: 400,
          type: 'deposit',
          category: 'Food',
          createdAt: new Date()
        }
      ]
    })
  }
})

export function TransactionsTable() {

  useEffect(() => {
    api.get('transactions')
    .then(response => console.log(response.data))
  }, []);

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
          <tr>
            <td>Site development</td>
            <td className="deposit">R$12.000</td>
            <td>Development</td>
            <td>05/04/2021</td>
          </tr>

          <tr>
            <td>Tax rent</td>
            <td className="withdraw">- R$1.100</td>
            <td>House</td>
            <td>15/04/2021</td>
          </tr>

        </tbody>
      </table>
    </Container>
  )
}