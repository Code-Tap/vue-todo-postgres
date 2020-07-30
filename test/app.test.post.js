const app = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");
let api = 'http://localhost:8080'


const { expect } = chai;
chai.use(chaiHttp);
describe("DATABASE TEST WRITE", () => {
    describe("POST OPERATIONS", () => {

        var testEntrys = [{
            "title" : "mocha TEST",
            "description" : "Entry from mocha test suite"
        },{
            "title" : "mocha TEST 1",
            "description" : "Entry 1 from mocha test suite"
        }]

        it("Create DB Entrys", (done) => {
            for (testEntry in testEntrys) {
                chai
                    .request(api)
                    .post("/api/tutorials/")
                    .send(testEntrys[testEntry])
                    .end((err,res) => {
                        expect(res).to.have.status(200);
                        console.log("Response Body:", res.body);

                    });
            }
            done()
            });
    });

        it("Should Fecth all the records", (done)=>{
            chai
                .request(api)
                .get("/api/tutorials/")
                .end((err, result)=>{
                    result.should.have.status(200);
                    console.log ("Got ",result.body.data.length, " docs");

                    done();
                });
        });

        it ("Should Fetch Particular record only", (done)=>{
            chai.request(api)
                .get("/api/tutorials/" + 1 )
                .end((err, result)=>{                    
                    result.should.have.status(200)
                    console.log("Fetched Particlar Record using /:ID ::::", result.body)
                    done()
                })
        })
})