import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { TaskProvider } from './store/TaskContext'
import Layout from './components/Layout'
import Inbox from './pages/Inbox'
import Today from './pages/Today'
import Projects from './pages/Projects'

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Inbox />} />
            <Route path="/today" element={<Today />} />
            <Route path="/projects" element={<Projects />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
