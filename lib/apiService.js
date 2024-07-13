export default class apiServerService {
    static checkTok = (sentTok) => {
        return sentTok == process.env.API_TOK;
    };
}
