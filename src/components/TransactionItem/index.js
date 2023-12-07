// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransactionItem} = props
  const {amount, title, type, id} = transactionDetails

  const onDeleteTransaction = () => {
    deleteTransactionItem(id)
  }

  return (
    <li className="transaction-header">
      <p className="table-cell">{title}</p>
      <p className="table-cell">Rs {amount}</p>
      <p className="table-cell">{type}</p>
      <button
        type="button"
        data-testid="delete"
        className="delete-button"
        onClick={onDeleteTransaction}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          className="delete-img"
        />
      </button>
    </li>
  )
}

export default TransactionItem
