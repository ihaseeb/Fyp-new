var express = require('express');
var router = express.Router();
var List = require('../models/list');

var Khaadi = require('../models/khaadi');
var khaas = require('../models/khaas');
var aa = require('../models/amir_adnan');
var generation = require('../models/generation');


// route for home page
router.get('/', function(req, res, next) {

    Khaadi.find(function(err, khaadi_result) {
        if (err) {
            res.render('Error found');
        } else {
            aa.find(function(err, aa_result) {
                if (err) {
                    res.render('Error found');
                } else {
                    generation.find(function(err, generation_result) {
                        if (err) {
                            res.render('Error found');
                        } else {
                            khaas.find(function(err, khaas_result) {
                                if (err) {
                                    res.render('Error found');
                                } else {
                                    res.render('brand/index', { title: 'Home', aas: aa_result, khaadis: khaadi_result, generations: generation_result, khaass: khaas_result });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});





// route for khaadi brand page
router.get('/khaadi', function(req, res, next) {

    Khaadi.find(function(err, results) {

        res.render('brand/khaadi', { title: 'Khaadi', khaadis: results });

    });

});

// route for Amir_adnan brand page
router.get('/amiradnan', function(req, res, next) {

    aa.find(function(err, docs) {

        res.render('brand/amiradnan', { title: 'Amir Adnan', aas: docs });

    });

});

// route for Generation brand page
router.get('/generation', function(req, res, next) {

    generation.find(function(err, docs) {

        res.render('brand/generation', { title: 'Generation', generations: docs });

    });

});

// route for Generation brand page
router.get('/khaas', function(req, res, next) {

    khaas.find(function(err, docs) {

        res.render('brand/khaas', { title: 'Khaas', khaass: docs });

    });

});

router.get('/add-to-list-khaadi/:id', function(req, res, next) {
    var productId = req.params.id;
    var list = new List(req.session.list ? req.session.list : { items: {} });

    Khaadi.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        list.add(product, product.id);
        req.session.list = list;
        console.log(req.session.list);
        res.redirect('/khaadi');
    });
});

router.get('/add-to-list-aa/:id', function(req, res, next) {
    var productId = req.params.id;
    var list = new List(req.session.list ? req.session.list : { items: {} });

    aa.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        list.add(product, product.id);
        req.session.list = list;
        console.log(req.session.list);
        res.redirect('/amiradnan');
    });
});

router.get('/add-to-list-gen/:id', function(req, res, next) {
    var productId = req.params.id;
    var list = new List(req.session.list ? req.session.list : { items: {} });

    generation.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        list.add(product, product.id);
        req.session.list = list;
        console.log(req.session.list);
        res.redirect('/generation');
    });
});

router.get('/add-to-list-khaas/:id', function(req, res, next) {
    var productId = req.params.id;
    var list = new List(req.session.list ? req.session.list : { items: {} });

    khaas.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        list.add(product, product.id);
        req.session.list = list;
        console.log(req.session.list);
        res.redirect('/khaas');
    });
});

router.get('/clear-list', function(req, res, next) {

    req.session.list = null;
    res.redirect('/');
});

router.get('/remove/:id', function(req, res, next) {
    var productId = req.params.id;
    var list = new List(req.session.list ? req.session.list : { items: {} });

    list.removeItem(productId);
    req.session.list = list;
    res.redirect('/user/wish-list');
});

//shirt route for khaadi

router.get('/khaadi/shirt', function(req, res, next) {

    Khaadi.find(function(err, docs) {

        res.render('brand/khaadi/shirt', { title: 'Khaadi', khaadis: docs });

    });

});
//pant route for khaadi
router.get('/khaadi/pant', function(req, res, next) {

    Khaadi.find(function(err, docs) {

        res.render('brand/khaadi/pant', { title: 'Khaadi', khaadis: docs });

    });

});
//dress route for khaadi
router.get('/khaadi/dress', function(req, res, next) {

    Khaadi.find(function(err, docs) {

        res.render('brand/khaadi/dress', { title: 'Khaadi', khaadis: docs });

    });

});
//accessories route for khaadi
router.get('/khaadi/access', function(req, res, next) {

    Khaadi.find(function(err, docs) {

        res.render('brand/khaadi/access', { title: 'Khaadi', khaadis: docs });

    });

});

//shirt route for amiradnan
router.get('/amiradnan/shirt', function(req, res, next) {

    aa.find(function(err, docs) {

        res.render('brand/amiradnan/shirt', { title: 'Amir Adnan', aas: docs });

    });

});
//pant route for amiradnan
router.get('/amiradnan/pant', function(req, res, next) {

    aa.find(function(err, docs) {

        res.render('brand/amiradnan/pant', { title: 'Amir Adnan', aas: docs });

    });

});
//dress route for amiradnan
router.get('/amiradnan/dress', function(req, res, next) {

    aa.find(function(err, docs) {

        res.render('brand/amiradnan/dress', { title: 'Amir Adnan', aas: docs });

    });

});
//accessories route for amiradnan
router.get('/amiradnan/access', function(req, res, next) {

    aa.find(function(err, docs) {

        res.render('brand/amiradnan/access', { title: 'Amir Adnan', aas: docs });

    });

});


//shirt route for generation
router.get('/generation/shirt', function(req, res, next) {

    generation.find(function(err, docs) {

        res.render('brand/generation/shirt', { title: 'Generation', generations: docs });

    });

});
//pant route for generation
router.get('/generation/pant', function(req, res, next) {

    generation.find(function(err, docs) {

        res.render('brand/generation/pant', { title: 'Generation', generations: docs });

    });

});
//dress route for generation
router.get('/generation/dress', function(req, res, next) {

    generation.find(function(err, docs) {

        res.render('brand/generation/dress', { title: 'Generation', generations: docs });

    });

});
//accessories route for generation
router.get('/generation/access', function(req, res, next) {

    generation.find(function(err, docs) {

        res.render('brand/generation/access', { title: 'Generation', generations: docs });

    });

});


//shirt route for khaas
router.get('/khaas/shirt', function(req, res, next) {

    khaas.find(function(err, docs) {

        res.render('brand/khaas/shirt', { title: 'Khaas', khaass: docs });

    });

});
//pant route for khaas
router.get('/khaas/pant', function(req, res, next) {

    khaas.find(function(err, docs) {

        res.render('brand/khaas/pant', { title: 'Khaas', khaass: docs });

    });

});
//dress route for khaas
router.get('/khaas/dress', function(req, res, next) {

    khaas.find(function(err, docs) {

        res.render('brand/khaas/dress', { title: 'Khaas', khaass: docs });

    });

});
//bedsheet route for khaas
router.get('/khaas/bedsheet', function(req, res, next) {

    khaas.find(function(err, docs) {

        res.render('brand/khaas/bedsheet', { title: 'Khaas', khaass: docs });

    });

});


module.exports = router;