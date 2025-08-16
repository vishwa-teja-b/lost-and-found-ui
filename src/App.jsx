import ItemForm from "./components/ItemForm"
import './App.css';
export default function App(){
  return (
    <div className="App">
        <header className = "App-header">
          <h1>Real-Time Lost and Found Network</h1>
        </header>
        <main>
          <ItemForm />
        </main>
    </div>
  )
}