'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _firebaseAdmin = require('firebase-admin');

var _firebaseAdmin2 = _interopRequireDefault(_firebaseAdmin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// environment variables are created async and aren't available immediately
// to circumvent this we have an init function for the database, called later
var db = void 0;
function initDatabase() {
  if (db !== undefined) return;

  var privateKey = process.env.FB_SERVICE_ACCOUNT;

  var credential = _firebaseAdmin2.default.credential.cert({
    projectId: process.env.FB_PROJECT_ID,
    clientEmail: process.env.FB_CLIENT_EMAIL,
    privateKey: privateKey
  });

  _firebaseAdmin2.default.initializeApp({
    credential: credential,
    databaseURL: 'https://sweetie-bird.firebaseio.com/',
    databaseAuthVariableOverride: {
      uid: process.env.FB_ADMIN_USER
    }
  });

  db = _firebaseAdmin2.default.database();
}

var FirebaseService = function () {
  function FirebaseService() {
    (0, _classCallCheck3.default)(this, FirebaseService);
  }

  (0, _createClass3.default)(FirebaseService, null, [{
    key: 'getUserPurchases',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(userId) {
        var snapshot;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                initDatabase();

                _context.prev = 1;
                _context.next = 4;
                return db.ref('/users/' + userId + '/purchases').once('value');

              case 4:
                snapshot = _context.sent;
                return _context.abrupt('return', snapshot.val());

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](1);
                throw _context.t0;

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 8]]);
      }));

      function getUserPurchases(_x) {
        return _ref.apply(this, arguments);
      }

      return getUserPurchases;
    }()
  }, {
    key: 'saveUserPurchase',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(userId, purchase, product, guid) {
        var purchaseId;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                initDatabase();

                _context2.next = 3;
                return FirebaseService.savePurchase(userId, purchase, product, guid);

              case 3:
                purchaseId = _context2.sent;
                _context2.next = 6;
                return db.ref('/users/' + userId + '/purchases').push({ payment: purchase, product: product, guid: guid });

              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function saveUserPurchase(_x2, _x3, _x4, _x5) {
        return _ref2.apply(this, arguments);
      }

      return saveUserPurchase;
    }()
  }, {
    key: 'savePurchase',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(userId, purchase, product, guid) {
        var newPurchaseKey;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                initDatabase();

                newPurchaseKey = db.ref('purchases').push().key;
                _context3.next = 4;
                return db.ref('/purchases/' + newPurchaseKey).update({ userId: userId, payment: purchase, product: product, guid: guid });

              case 4:
                return _context3.abrupt('return', newPurchaseKey);

              case 5:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function savePurchase(_x6, _x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
      }

      return savePurchase;
    }()
  }]);
  return FirebaseService;
}();

exports.default = FirebaseService;