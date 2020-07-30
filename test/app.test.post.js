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

describe("INITIAL DATABASE TEST WRITE", () => {
    

        var testEntrys = [{
            "title" : "mocha TEST",
            "description" : "Entry from mocha test suite"
        },{
            "title" : "mocha TEST 1",
            "description" : "Entry 1 from mocha test suite"
        },{
            "title" : "mocha TEST 2",
            "description" : "Entry 2 from mocha test suite"
        }]

        it("Create DB Entrys", (done) => {
            for (testEntry in testEntrys) {
                chai
                    .request(api)
                    .post("/api/records/")
                    .send(testEntrys[testEntry])
                    .end((err,res) => {
                        expect(res).to.have.status(200);
                        console.log("Response Body:", res.body);

                    });
            }
            done()
            });
        });
        
describe("TEST OPERATIONS", () => {
    
    // varibles for the tests to use
        var updRecs = [{
            "title" : "mocha TEST UPDATED",
            "published" : true
        }]
    
        it("Should Fetch all the records", (done)=>{
            chai
                .request(api)
                .get("/api/records/")
                .end((err, res)=>{
                    expect(res).to.have.status(200);
                    console.log ("Got ",res.body.length, " docs");
                    // console.log ("res Body:", res.body);
                    done();
                });
        });

        it ("Should Fetch Particular record only", (done)=>{
            chai.request(api)
                .get("/api/records/1/")
                .end((err, res)=>{                    
                    expect(res).to.have.status(200)
                    console.log("Fetched Particlar Record using /:ID ::::", res.body)
                    done()
                })
        })

        it("Should Update one record", (done)=>{
            for (updRec in updRecs) {
                chai.request(api)
                    .put("/api/records/1/")
                    .send(updRecs[updRec])
                    .end((err,res) => {
                        expect(res).to.have.status(200)
                        console.log("Response Body:", res.body);
                    });
            }
            done();
        });

        it ("Should Fetch All published records", (done)=>{
            chai.request(api)
                .get("/api/records/published/")
                .end((err, res)=>{                    
                    expect(res).to.have.status(200)
                    console.log("Fetched Published Records using /published ::::", res.body)
                    done()
                })
        })

        it ("Should Delete Particular record only", (done)=>{
            chai.request(api)
                .delete("/api/records/1/")
                .end((err, res)=>{                    
                    expect(res).to.have.status(200)
                    console.log("Deleted Particlar Record using /:ID ::::", res.body)
                    done()
                })
        })

        it ("Should Delete All records", (done)=>{
            chai.request(api)
                .delete("/api/records/")
                .end((err, res)=>{                    
                    expect(res).to.have.status(200)
                    console.log("Deleted All Records using /:ID ::::", res.body)
                    done()
                })
        })

})