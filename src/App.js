import { useReducer } from "react";

export default function App() {
  const initialState = {
    balance: null,
    loan: null,
    isActive: true,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "openAccount":
        return {
          isActive: (state.isActive = false),
          balance: (state.balance = 0),
          loan: (state.loan = 0),
        };
      case "closeAccount":
        return {
          isActive:
            state.balance === 0 && state.loan === 0
              ? (state.isActive = true)
              : (state.isActive = false),
          balance: state.balance,
          loan: state.loan,
        };
      case "deposit":
        return {
          balance: state.balance + action.payload,
          loan: state.loan,
        };
      case "withdraw":
        return {
          balance: state.balance - action.payload,
          loan: state.loan,
        };
      case "requestLoan":
        return {
          balance: state.balance,
          loan: state.loan + action.payload,
        };
      case "payLoan":
        return {
          balance: state.balance < state.loan ? 0 : state.balance,
          loan: state.loan - state.balance,
        };
      default:
    }
  }
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="app">
      <h2>UseReducer Bank Account</h2>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <button
        disabled={!isActive}
        onClick={() => dispatch({ type: "openAccount" })}
      >
        Open Account
      </button>
      <button
        disabled={isActive}
        onClick={() => dispatch({ type: "deposit", payload: 150 })}
      >
        Deposit: 150
      </button>
      <button
        disabled={isActive}
        onClick={() => dispatch({ type: "withdraw", payload: 50 })}
      >
        Withdraw: 50
      </button>
      <button
        disabled={isActive}
        onClick={() => dispatch({ type: "requestLoan", payload: 5000 })}
      >
        Request a loan of: 5000
      </button>
      <button disabled={isActive} onClick={() => dispatch({ type: "payLoan" })}>
        Pay loan
      </button>
      <button
        disabled={isActive}
        onClick={() => dispatch({ type: "closeAccount" })}
      >
        Close Account
      </button>
    </div>
  );
}
