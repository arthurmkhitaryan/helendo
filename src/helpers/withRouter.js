import { useParams, useLocation, useNavigate } from "react-router-dom";


const withRouter = (Comp) => (props) => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate();
    return (
        <Comp {...props} params={params} location={location} navigate={navigate} />
    )
}

export default withRouter
