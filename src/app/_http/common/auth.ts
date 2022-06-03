import { PyRequests } from "src/app/_helper/Constants/pyrequests-const";

export class Auth {

    public static preparePyLogin(userName: string, password: string) {
        let transform = JSON.parse(JSON.stringify(PyRequests.AUTHENTICATE));
        //assign attributes
        transform.UserParams = [{ UserID: userName },
        { Password: password }]

        return transform;
    }
}