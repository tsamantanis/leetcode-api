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

describe('User API endpoints', () => {
    let bearer
    // Create a sample user for use in tests.
    before((done) => {
        let sampleUser = new User()
        sampleUser._id = SAMPLE_OBJECT_ID
        sampleUser.email = 'myuser@mailinator.com'
        sampleUser.setPassword('password')
        sampleUser.save(function (err) {
            if (err) { done(err) }
            bearer = sampleUser.toAuthJSON().token
            done()
        });
    })

    // Delete sample user.
    after((done) => {
        User.deleteMany({ email: ['myuser@mailinator.com', 'anotheruser@mailinator.com'] })
        .then(() => {
            done()
        })
    })

    it('should get one user', (done) => {
        chai.request(app)
        .get(`/users/${SAMPLE_OBJECT_ID}`)
        .set({ "Authorization": `Bearer ${bearer}` })
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(200)
            expect(res.body.user).to.be.an('object')
            expect(res.body.user.email).to.equal('myuser@mailinator.com')
            expect(res.body.user.password).to.equal(undefined)
            done()
        })
    })

    it('should post a new user', (done) => {
        chai.request(app)
        .post('/users/register')
        .send({user: {email: 'anotheruser@mailinator.com', password: 'mypassword' }})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.user).to.be.an('object')
            expect(res.body.user).to.have.property('email', 'anotheruser@mailinator.com')
            // check that user is actually inserted into database
            User.findOne({email: 'anotheruser@mailinator.com'}).then(user => {
                expect(user).to.be.an('object')
                done()
            })
        })
    })

    it('should log an existing user in', (done) => {
        chai.request(app)
        .post('/users/login')
        .send({user: {email: 'myuser@mailinator.com', password: 'password' }})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.user).to.be.an('object')
            expect(res.body.user).to.have.property('email', 'myuser@mailinator.com')
            expect(res.body.user).to.have.property('token')
            // check that user is actually inserted into database
            done()
        })
    })

    it('should fail to log a user in', (done) => {
        chai.request(app)
        .post('/users/login')
        .send({user: {email: 'myuser@mailinator.com', password: 'password1' }})
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.user).to.equal(undefined)
            expect(res.body).to.have.property('message', 'Invalid credentials')
            // check that user is actually inserted into database
            done()
        })
    })

    it('should delete a user', (done) => {
        chai.request(app)
        .delete(`/users/me`)
        .set({ "Authorization": `Bearer ${bearer}` })
        .end((err, res) => {
            if (err) { done(err) }
            expect(res.body.message).to.equal('Successfully deleted.')
            // check that user is actually deleted from database
            User.findOne({email: 'myuser@mailinator.com'}).then(user => {
                expect(user).to.equal(null)
                done()
            })
        })
    })

    it('should fail to delete a user', (done) => {
        chai.request(app)
        .delete(`/users/me`)
        .end((err, res) => {
            if (err) { done(err) }
            expect(res).to.have.status(401)
            done()
        })
    })
})
