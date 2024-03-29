const express = require('express')
const router = express.Router()
const dashboardCourseService = require("../services/DashboardCourseService")
const { getDocs } = require("../helpers/own_pagination")
const { authenticateToken } = require("../helpers/jwt")
const {ownStatusCode} = require("../helpers/own_status");


router.get('/add', authenticateToken, (req, res, next) => {
    dashboardCourseService.addToMyCourse(req).then(result => {
        if (result.hasOwnProperty('status') && result.status == "error") {
            res.status(ownStatusCode.not_acceptable).json({message: result.message})
        } else {
            res.json(result)
        }
    }
    ).catch(err => next(err))
})

router.get('/remove', authenticateToken, (req, res, next) => {
    dashboardCourseService.removeFromCourse(req).then(result => {
            res.json(result)
        }
    ).catch(err => next(err))
})

router.get('/my-courses', authenticateToken, (req, res, next) => {
    dashboardCourseService.get_my_course(req).then(courses => {
        res.send(courses)
    }
    ).catch(err => next(err))
})

module.exports = router