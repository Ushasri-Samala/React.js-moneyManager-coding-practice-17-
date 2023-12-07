import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
    transactionList: [],
  }

  getIncomeAmount = () => {
    const {transactionList} = this.state
    let incomeAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpensesAmount = () => {
    const {transactionList} = this.state
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getBalanceAmount = () => {
    const {transactionList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })

    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {amountInput, titleInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      amount: parseInt(amountInput),
      title: titleInput,
      type: displayText,
      id: uuidv4(),
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      amountInput: '',
      titleInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTypeInput = event => {
    this.setState({optionId: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  deleteTransactionItem = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTransaction => eachTransaction.id !== id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalanceAmount()
    const incomeAmount = this.getIncomeAmount()
    const expensesAmount = this.getExpensesAmount()

    return (
      <div className="app-container">
        <div className="title-container">
          <h1 className="header">Hi, Richard</h1>
          <p className="greetings">
            Welcome back to your{' '}
            <span className="type-name">Money Manager</span>
          </p>
        </div>
        <MoneyDetails
          balanceAmount={balanceAmount}
          incomeAmount={incomeAmount}
          expensesAmount={expensesAmount}
        />
        <div className="transaction-container">
          <form className="form-container" onSubmit={this.onAddTransaction}>
            <h1 className="form-header">Add Transaction</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              type="text"
              className="input"
              id="title"
              onChange={this.onChangeTitleInput}
              value={titleInput}
              placeholder="TITLE"
            />
            <label htmlFor="amount" className="label">
              AMOUNT
            </label>
            <input
              type="text"
              className="input"
              id="amount"
              onChange={this.onChangeAmountInput}
              value={amountInput}
              placeholder="AMOUNT"
            />
            <label className="input-label" htmlFor="select">
              TYPE
            </label>
            <select
              id="select"
              className="option-input"
              name="type"
              value={optionId}
              onChange={this.onChangeTypeInput}
            >
              {transactionTypeOptions.map(eachTransaction => (
                <option
                  value={eachTransaction.optionId}
                  key={eachTransaction.optionId}
                  className="option"
                >
                  {eachTransaction.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="add-button">
              Add
            </button>
          </form>
          <div className="history-container">
            <h1 className="history-header">History</h1>
            <ul className="transaction-table">
              <li className="transaction-header">
                <p className="table-header-cell">Title</p>
                <p className="table-header-cell">Amount</p>
                <p className="table-header-cell">Type</p>
                <p className="table-header-cell">{}</p>
              </li>
              {transactionList.map(eachTransaction => (
                <TransactionItem
                  key={eachTransaction.id}
                  transactionDetails={eachTransaction}
                  deleteTransactionItem={this.deleteTransactionItem}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
