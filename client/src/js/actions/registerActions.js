import Api from '../utils/api';

const userRegisterRequest = userData => (dispatch) => {
  const username = userData.username,
    fullName = userData.fullName,
    email = userData.email,
    password = userData.password,
    phoneNumber = userData.phoneNumber;

  const userString = `username=${username}&fullName=${fullName}&email=${email}
    &password=${password}&phoneNumber=${phoneNumber}`;
  return Api(userString, '/api/users/signup', 'POST', null).then(
    (registerResponse) => {
      console.log(registerResponse.data);
    }
  );
};

export default userRegisterRequest;
