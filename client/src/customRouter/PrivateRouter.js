import { Route, Redirect} from 'react-router-dom'

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem('firstLogin')
    console.log("PrivateRouter props:", props);
    return firstLogin ? <Route {...props} /> : <Redirect to="/" />
}

export default PrivateRouter