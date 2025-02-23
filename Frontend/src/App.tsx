import Dashboard from './components/Dashboard';
import DataEntry from './components/DataEntry';

function App() {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <Dashboard />
        <div className="mt-8">
          <DataEntry />
        </div>
      </div>
    </div>
  );
}

export default App;