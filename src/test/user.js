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
    afterEach((done) => {
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

    // it('should post a new user', (done) => {
    //     chai.request(app)
    //     .post('/users')
    //     .send({user: {email: 'anotheruser@mailinator.com', password: 'mypassword' }})
    //     .end((err, res) => {
    //         if (err) { done(err) }
    //         expect(res.body.user).to.be.an('object')
    //         expect(res.body.user).to.have.property('email', 'anotheruser@mailinator.com')
    //
    //         // check that user is actually inserted into database
    //         User.findOne({username: 'anotheruser'}).then(user => {
    //             expect(user).to.be.an('object')
    //             done()
    //         })
    //     })
    // })
    //
    // it('should update a user', (done) => {
    //     chai.request(app)
    //     .put(`/users/${SAMPLE_OBJECT_ID}`)
    //     .send({username: 'anotheruser'})
    //     .set({ "Authorization": `Bearer ${bearer}` })
    //     .end((err, res) => {
    //         if (err) { done(err) }
    //         expect(res.body.user).to.be.an('object')
    //         expect(res.body.user).to.have.property('username', 'anotheruser')
    //
    //         // check that user is actually inserted into database
    //         User.findOne({username: 'anotheruser'}).then(user => {
    //             expect(user).to.be.an('object')
    //             done()
    //         })
    //     })
    // })
    //
    // it('should delete a user', (done) => {
    //     chai.request(app)
    //     .delete(`/users/${SAMPLE_OBJECT_ID}`)
    //     .set({ "Authorization": `Bearer ${bearer}` })
    //     .end((err, res) => {
    //         if (err) { done(err) }
    //         expect(res.body.message).to.equal('Successfully deleted.')
    //         expect(res.body._id).to.equal(SAMPLE_OBJECT_ID)
    //
    //         // check that user is actually deleted from database
    //         User.findOne({username: 'myuser'}).then(user => {
    //             expect(user).to.equal(null)
    //             done()
    //         })
    //     })
    // })
})