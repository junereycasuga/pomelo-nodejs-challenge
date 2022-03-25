import React from 'react'

export default function App({
  repositories,
  page,
  pageCount,
  nextPage,
  prevPage,
}) {
  return (
    <html>
      <h1>NodeJS Github Repositories</h1>
      <p>Total of {repositories.total_count} result</p>
      <p>
        {page} of {pageCount} page(s)
      </p>
      {repositories?.items?.map((repository) => (
        <li className="repo" key={repository.id}>
          {repository.name}
        </li>
      ))}
      <a href={'?page=' + prevPage}>Prev</a>
      &nbsp;
      <a href={'?page=' + nextPage}>Next</a>
    </html>
  )
}
