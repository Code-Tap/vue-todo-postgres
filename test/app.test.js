const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
let api = 'http://localhost:8080'

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
    it("welcomes user to api", done => {
        chai
            .request(api)
            .get("/")
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res.body.status).to.equals("success");
                expect(res.body.message).to.equals("Welcome to the API");
                done();
            });
    });
})