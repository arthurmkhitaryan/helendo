import { useSearchParams } from "react-router-dom";

const withQuery = (Comp) => (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries([...searchParams])
  return (
    <Comp {...props} query={query} setSearchParams={setSearchParams} />
  )
}

export default withQuery