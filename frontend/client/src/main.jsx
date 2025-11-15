import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ClickSpark from './components/CursorClick.jsx'
import TextCursor from './components/TextCursor.jsx'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>

      
      <ClickSpark
        sparkColor="#A57A5F"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <App />
      </ClickSpark>

    
      <div className="fixed inset-0 pointer-events-none z-[9999]">
        <TextCursor
          text="🤎"
          delay={0.01}
          spacing={80}
          followMouseDirection={true}
          randomFloat={true}
          exitDuration={0.3}
          removalInterval={20}
          maxPoints={10}
        />
      </div>

    </BrowserRouter>
  </AuthProvider>
);

