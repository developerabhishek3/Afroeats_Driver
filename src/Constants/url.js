
const NETWORKINSTANCE = {
    ngrok: 'https://44b699963a69.ngrok.io',
    server: ''
};
const APIENDPOINT = {
    endPiont: NETWORKINSTANCE.ngrok
}
export const endPoints = {
    createUser: APIENDPOINT.endPiont+'api/',
    GetAllPatient : APIENDPOINT.endPiont+'api/'
}