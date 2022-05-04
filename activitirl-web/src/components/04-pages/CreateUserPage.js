import CheckToken from "../../CheckToken";
import CreateUserForm from "../02-organisms/forms/createUserForm/CreateUserForm";

const CreateUserPage = () => {
    let token = localStorage.getItem("loginToken");
    return (
        <div>
            {!token && <CreateUserForm/>}
            {token && <h1>Log ud for at oprette en ny bruger</h1>}
        </div>
    )
}

export default CreateUserPage;