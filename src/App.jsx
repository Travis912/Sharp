import { useState, useEffect } from 'react'
import './App.css'
import Sidebar from './components/Sidebar'
import ActivitySection from './components/ActivitySection'
import Endorsements from './components/Endorsements'

function App() {
  const [docsView, setDocsView] = useState('endorsements')

  // Activity notes moved into `ActivitySection` component

  return (
    <div className="app-layout">
      <Sidebar onDocsChange={setDocsView} />
      <main className="content">
        <ActivitySection />

        <section id="quotes" className="quotes-section">
          <div className="quotes-inner">
            <h1>Quotes</h1>
            <p>Put your custom Quotes content here.</p>
          </div>
        </section>

        <section id="docs" className="docs-section">
          <div className="docs-inner">
            {docsView === 'endorsements' ? (
              <Endorsements />
            ) : (
              <h1>Docsss</h1>
            )}
            {docsView === 'setup' && (
              <p>Setup instructions: how to get started, prerequisites, and installation steps.</p>
            )}
            {docsView === 'api' && (
              <div>
                <h2>API</h2>
                <p>API reference and endpoints go here.</p>
              </div>
            )}
            {docsView === 'examples' && (
              <div>
                <h2>Examples</h2>
                <p>Example usage, code snippets, and demos.</p>
              </div>
            )}
            {docsView === 'faq' && (
              <div>
                <h2>FAQ</h2>
                <p>Frequently asked questions and troubleshooting tips.</p>
              </div>
            )}
          </div>
        </section>

        {/* Pricing and Contact sections removed per request */}
        <h1>TEST</h1>
      </main>
    </div>
  )
}

export default App
