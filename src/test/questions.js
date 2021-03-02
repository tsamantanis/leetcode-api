require('dotenv').config()
const app = require('../server.js')
require('../config/db-setup.js')
const mongoose = require('mongoose')
const chai = require('chai')
const chaiHttp = require('chai-http')

const User = mongoose.model('User');

chai.config.includeStack = true

const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)

const SAMPLE_OBJECT_ID = 'aaaaaaaaaaaa' // 12 byte string

after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
    done()
})

describe('Question API endpoints', () => {
    let bearer
    // Create a sample user for use in tests.
    before((done) => {
        let sampleUser = new User()
        sampleUser._id = SAMPLE_OBJECT_ID
        sampleUser.email = 'someuser@mailinator.com'
        sampleUser.setPassword('password')
        sampleUser.save(function (err) {
            if (err) { done(err) }
            bearer = sampleUser.toAuthJSON().token
            done()
        });
    })

    // Delete sample user.
    after((done) => {
        User.deleteOne({ email: ['someuser@mailinator.com'] })
        .then(() => {
            done()
        })
    })

    it('should get all questions', (done) => {
        chai.request(app)
        .get('/all')
        .set({ "Authorization": `Bearer ${bearer}` })
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf.above(0)
            done()
        })
    })

    it('should attempt get all questions but fail', (done) => {
        chai.request(app)
        .get('/all')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(401)
            done()
        })
    })

    it('should get all free questions', (done) => {
        chai.request(app)
        .get('/free')
        .set({ "Authorization": `Bearer ${bearer}` })
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf.above(0)
            done()
        })
    })

    it('should attempt get all free questions but fail', (done) => {
        chai.request(app)
        .get('/free')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(401)
            done()
        })
    })

    it('should get all paid questions', (done) => {
        chai.request(app)
        .get('/paid')
        .set({ "Authorization": `Bearer ${bearer}` })
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body).to.be.an('array')
            expect(res.body).to.have.lengthOf.above(0)
            done()
        })
    })

    it('should attempt get all paid questions but fail', (done) => {
        chai.request(app)
        .get('/paid')
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(401)
            done()
        })
    })

})
