import React from 'react'

export default function Error({ error }) {
  return (
    <html>
      <h1>An error has occurred</h1>
      <p>{error}</p>
    </html>
  )
}
