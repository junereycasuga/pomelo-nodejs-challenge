import React from 'react'

export default function App({ repositories }) {
  return (
    <html>
      <h1>NodeJS Github Repositories</h1>
      {repositories?.items?.map((r) => (
        <li className="repo" key={r.id}>
          {r.name}
        </li>
      ))}
    </html>
  )
}
