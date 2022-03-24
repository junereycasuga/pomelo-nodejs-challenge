// import axios from 'axios'
import React from 'react'

export default function App({ repositories }) {
  // const [repositories, setRepositories] = useState([])
  // const { loading, setLoading } = useState(false)

  // useEffect(async () => {
  //   setLoading(true)
  //   const { data } = await axios.get(
  //     'https://api.github.com/search/repositories?q=nodejs&per_page=10&page=2'
  //   )
  //   setRepositories(data)
  //   setLoading(false)
  // }, [])

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
